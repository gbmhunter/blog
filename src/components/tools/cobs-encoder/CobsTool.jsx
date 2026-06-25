import { useState } from 'preact/hooks';
import { parseHex, formatHex, cobsEncode, cobsDecode } from './cobs.js';
import './styles.css';

const EXAMPLES = {
  encode: '23 00 D4 81 00 FA',
  decode: '02 23 03 D4 81 02 FA 00',
};

export default function CobsTool() {
  const [mode, setMode] = useState('encode');
  const [input, setInput] = useState(EXAMPLES.encode);
  const [maxSize, setMaxSize] = useState('1024');

  const { bytes: inputBytes, errors: parseErrors } = parseHex(input);

  let outputBytes = [];
  let opErrors = [];
  if (inputBytes.length > 0) {
    if (mode === 'encode') {
      outputBytes = cobsEncode(inputBytes);
    } else {
      const res = cobsDecode(inputBytes);
      outputBytes = res.bytes;
      opErrors = res.errors;
    }
  }

  const errors = [...parseErrors, ...opErrors];
  const hasOutput = inputBytes.length > 0 && outputBytes.length > 0;

  const switchMode = (next) => {
    if (next === mode) return;
    setMode(next);
    // Re-seed the hex input with that mode's example only if the box still holds
    // the other mode's example (so we don't clobber the user's own data). The
    // buffer-size mode has no hex example, so skip re-seeding for it.
    if (EXAMPLES[mode] && EXAMPLES[next]) {
      setInput((cur) => (cur.trim() === EXAMPLES[mode] ? EXAMPLES[next] : cur));
    }
  };

  const inLabel = mode === 'encode' ? 'Raw data (hex)' : 'COBS frame (hex)';
  const outLabel = mode === 'encode' ? 'COBS frame (hex)' : 'Decoded data (hex)';

  // Buffer-size mode: worst-case encoded size for an n-byte max message is
  // n + ceil(n / 254) stuffing bytes + 1 delimiter byte.
  const n = Math.floor(Number(maxSize));
  const maxSizeValid = maxSize.trim() !== '' && Number.isFinite(n) && n >= 0;
  const stuffing = maxSizeValid ? Math.ceil(n / 254) : 0;
  const bufferSize = maxSizeValid ? n + stuffing + 1 : 0;

  return (
    <div class="cobs-tool">
      <div class="cobs-tool__modes" role="tablist">
        <button
          class={`cobs-tool__mode${mode === 'encode' ? ' cobs-tool__mode--active' : ''}`}
          onClick={() => switchMode('encode')}
        >
          Encode
        </button>
        <button
          class={`cobs-tool__mode${mode === 'decode' ? ' cobs-tool__mode--active' : ''}`}
          onClick={() => switchMode('decode')}
        >
          Decode
        </button>
        <button
          class={`cobs-tool__mode${mode === 'buffer' ? ' cobs-tool__mode--active' : ''}`}
          onClick={() => switchMode('buffer')}
        >
          Buffer size
        </button>
      </div>

      {mode === 'buffer' ? (
        <div class="cobs-tool__buffer">
          <h4>Max. payload size (bytes)</h4>
          <input
            type="number"
            min="0"
            step="1"
            class="cobs-tool__num"
            value={maxSize}
            onInput={(e) => setMaxSize(e.currentTarget.value)}
            placeholder="e.g. 1024"
          />
          <p class="cobs-tool__buffer-help">
            The worst-case COBS frame for an <var>n</var>-byte payload needs{' '}
            <var>n</var> + ⌈<var>n</var>/254⌉ stuffing bytes + 1 delimiter byte. Size your
            receive/transmit buffer to this so it can always hold an encoded frame.
          </p>
          {maxSizeValid ? (
            <>
              <div class="cobs-tool__buffer-result">
                Required buffer: <strong>{bufferSize.toLocaleString()} bytes</strong>
              </div>
              <div class="cobs-tool__buffer-breakdown">
                {n.toLocaleString()} (payload) + {stuffing.toLocaleString()} (worst-case stuffing) + 1 (delimiter)
              </div>
            </>
          ) : (
            <div class="cobs-tool__buffer-result cobs-tool__placeholder">
              Enter a non-negative whole number.
            </div>
          )}
        </div>
      ) : (
      <div class="cobs-tool__columns">
        <div>
          <h4>{inLabel}</h4>
          <textarea
            class="cobs-tool__io"
            value={input}
            onInput={(e) => setInput(e.currentTarget.value)}
            placeholder={mode === 'encode' ? 'e.g. 23 00 D4 81 00 FA' : 'e.g. 02 23 03 D4 81 02 FA 00'}
            spellcheck={false}
          />
          <div class="cobs-tool__count">{inputBytes.length} byte{inputBytes.length === 1 ? '' : 's'} in</div>
        </div>

        <div>
          <h4>{outLabel}</h4>
          <div class="cobs-tool__io cobs-tool__io--output">
            {hasOutput ? formatHex(outputBytes) : <span class="cobs-tool__placeholder">—</span>}
          </div>
          <div class="cobs-tool__count">
            {outputBytes.length} byte{outputBytes.length === 1 ? '' : 's'} out
            {mode === 'encode' && hasOutput && ' (last byte is the 0x00 delimiter)'}
          </div>
        </div>
      </div>
      )}

      {errors.length > 0 && mode !== 'buffer' && (
        <div class="cobs-tool__errors">
          <strong>Notes:</strong>
          <ul>{errors.map((e, i) => <li key={i}>{e}</li>)}</ul>
        </div>
      )}
    </div>
  );
}
