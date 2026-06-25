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
    // Re-seed the input with that mode's example only if the box still holds
    // the other mode's example (so we don't clobber the user's own data).
    setInput((cur) => (cur.trim() === EXAMPLES[mode] ? EXAMPLES[next] : cur));
  };

  const inLabel = mode === 'encode' ? 'Raw data (hex)' : 'COBS frame (hex)';
  const outLabel = mode === 'encode' ? 'COBS frame (hex)' : 'Decoded data (hex)';

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
      </div>

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

      {errors.length > 0 && (
        <div class="cobs-tool__errors">
          <strong>Notes:</strong>
          <ul>{errors.map((e, i) => <li key={i}>{e}</li>)}</ul>
        </div>
      )}
    </div>
  );
}
