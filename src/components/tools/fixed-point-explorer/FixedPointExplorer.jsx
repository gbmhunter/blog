import { useState, useMemo } from 'preact/hooks';
import {
  MAX_BITS, rawRange, valueRange, encode, decode, toBitPattern, fromBitPattern,
  bitsMSBFirst, bitWeight, toggleBitAt, toHex, toBin, formatValue,
} from './fixedpoint.js';
import './styles.css';

export default function FixedPointExplorer() {
  const [intBits, setIntBits] = useState(8);
  const [fracBits, setFracBits] = useState(8);
  const [signed, setSigned] = useState(true);
  const [valueText, setValueText] = useState('6.5');

  const N = intBits + fracBits;

  // Keep 1 ≤ i + f ≤ 32 while the user drags either slider.
  const setI = (v) => {
    let i = Math.max(0, Math.min(MAX_BITS, Math.round(v)));
    let f = fracBits;
    if (i + f > MAX_BITS) f = MAX_BITS - i;
    if (i + f < 1) f = 1;
    setIntBits(i);
    setFracBits(f);
  };
  const setF = (v) => {
    let f = Math.max(0, Math.min(MAX_BITS, Math.round(v)));
    let i = intBits;
    if (i + f > MAX_BITS) i = MAX_BITS - f;
    if (i + f < 1) i = 1;
    setFracBits(f);
    setIntBits(i);
  };

  const model = useMemo(() => {
    const parsed = parseFloat(valueText);
    const valid = valueText.trim() !== '' && Number.isFinite(parsed);
    const { raw, overflow } = encode(valid ? parsed : 0, fracBits, N, signed);
    const bp = toBitPattern(raw, N);
    return {
      valid, parsed, raw, overflow, bp,
      bits: bitsMSBFirst(bp, N),
      quant: decode(raw, fracBits),
      hex: toHex(bp, N),
      bin: toBin(bp, N),
      vrange: valueRange(N, fracBits, signed),
      rrange: rawRange(N, signed),
      resolution: 2 ** -fracBits,
    };
  }, [intBits, fracBits, signed, valueText, N]);

  const error = model.valid ? model.parsed - model.quant : 0;

  // Toggling a bit rewrites the value to the exact decoded number.
  const toggleBit = (indexFromMSB) => {
    const p = N - 1 - indexFromMSB;
    const newRaw = fromBitPattern(toggleBitAt(model.bp, p), N, signed);
    setValueText(formatValue(decode(newRaw, fracBits), fracBits));
  };

  return (
    <div class="fxp">
      <div class="fxp__legend">
        Explore how a real number is stored in <em>Qi.f</em> fixed-point format (i integer bits,
        f fractional bits, total word length N = i + f). Signed numbers use two's complement. Type a
        value to see how it is encoded, or click individual bits to flip them and watch the value change.
      </div>

      {/* Format */}
      <div class="fxp__format">
        <div class="fxp__seg">
          <button class={'fxp__seg-btn' + (signed ? ' fxp__seg-btn--active' : '')} onClick={() => setSigned(true)}>Signed</button>
          <button class={'fxp__seg-btn' + (!signed ? ' fxp__seg-btn--active' : '')} onClick={() => setSigned(false)}>Unsigned</button>
        </div>
        <BitControl label="Integer bits (i)" value={intBits} onChange={setI} />
        <BitControl label="Fractional bits (f)" value={fracBits} onChange={setF} />
        <div class="fxp__qname">
          Q{intBits}.{fracBits} · <strong>{N}-bit</strong> {signed ? 'signed' : 'unsigned'}
        </div>
      </div>

      {/* Value input */}
      <div class="fxp__value-row">
        <label class="fxp__value-label" for="fxp-value">Value</label>
        <input
          id="fxp-value"
          class="fxp__value-input"
          type="text"
          inputMode="decimal"
          value={valueText}
          onInput={(e) => setValueText(e.currentTarget.value)}
          placeholder="e.g. 6.5"
        />
        {!model.valid && valueText.trim() !== '' && (
          <span class="fxp__invalid">not a number</span>
        )}
      </div>

      {model.overflow && (
        <div class="fxp__warn-box">
          ⚠ {formatValue(model.parsed, fracBits)} is outside the representable range
          [{formatValue(model.vrange.min, fracBits)}, {formatValue(model.vrange.max, fracBits)}] for this
          format — it has been <strong>clamped</strong>.
        </div>
      )}

      {/* Bits */}
      <div class="fxp__bits-wrap">
        <div class="fxp__bits">
          {model.bits.flatMap((bit, index) => {
            const p = N - 1 - index;
            const isSign = signed && index === 0;
            const group = isSign ? 'sign' : p >= fracBits ? 'int' : 'frac';
            const cells = [];
            if (fracBits > 0 && index === intBits) {
              cells.push(<span key="pt" class="fxp__radix">.</span>);
            }
            cells.push(
              <button
                key={`b${p}`}
                class={`fxp__bit fxp__bit--${group}` + (bit ? ' fxp__bit--on' : '')}
                title={`bit ${p} · weight ${formatValue(bitWeight(p, N, fracBits, signed), fracBits)}${isSign ? ' (sign)' : ''}`}
                onClick={() => toggleBit(index)}
              >{bit}</button>,
            );
            return cells;
          })}
        </div>
        <div class="fxp__bits-key">
          <span><span class="fxp__swatch fxp__swatch--sign" />sign</span>
          <span><span class="fxp__swatch fxp__swatch--int" />integer</span>
          <span><span class="fxp__swatch fxp__swatch--frac" />fraction</span>
          <span class="fxp__muted">click a bit to flip it</span>
        </div>
      </div>

      {/* Readouts */}
      <div class="fxp__readouts">
        <Readout label="Stored integer (raw)">{model.raw}</Readout>
        <Readout label="Hex">0x{model.hex}</Readout>
        <Readout label="Binary">{model.bin}</Readout>
        <Readout label="Quantized value">{formatValue(model.quant, fracBits)}</Readout>
        <Readout label="Quantization error">
          {model.valid ? formatValue(error, fracBits + 2) : '—'}
        </Readout>
        <Readout label="Resolution (2⁻ᶠ)">{formatValue(model.resolution, fracBits)}</Readout>
        <Readout label="Representable range">
          {formatValue(model.vrange.min, fracBits)} … {formatValue(model.vrange.max, fracBits)}
        </Readout>
      </div>
    </div>
  );
}

function BitControl({ label, value, onChange }) {
  return (
    <div class="fxp__bitctl">
      <span class="fxp__bitctl-label">{label}</span>
      <div class="fxp__bitctl-body">
        <input type="range" min="0" max={MAX_BITS} step="1" value={value}
          onInput={(e) => onChange(Number(e.currentTarget.value))} />
        <input type="number" min="0" max={MAX_BITS} step="1" value={value} class="fxp__num"
          onInput={(e) => onChange(Number(e.currentTarget.value))} />
      </div>
    </div>
  );
}

function Readout({ label, children }) {
  return (
    <div class="fxp__readout">
      <span class="fxp__readout-label">{label}</span>
      <span class="fxp__readout-value">{children}</span>
    </div>
  );
}
