import { useState, useEffect, useRef } from 'preact/hooks';
import { AD_TYPES, FLAG_BITS, getAdType, SUPPORTED_AD_TYPE_CODES, hexFromBytes } from './adTypes.js';
import { parseAdvPayload } from './parser.js';
import { buildAdvPayload } from './builder.js';
import './styles.css';

const LEGACY_ADV_BUDGET = 31;

const newStructure = (adCode) => {
  const t = getAdType(adCode);
  return {
    id: crypto.randomUUID(),
    adCode,
    // clone defaultValue for objects/arrays so structures don't share references
    value: structuredClone(t.defaultValue),
  };
};

function FlagsEditor({ value, onChange }) {
  return (
    <div class="ble-adv-decoder__editor ble-adv-decoder__editor--flags">
      {FLAG_BITS.map((f) => (
        <label key={f.key}>
          <input
            type="checkbox"
            checked={!!value[f.key]}
            onInput={(e) => onChange({ ...value, [f.key]: e.currentTarget.checked })}
          />
          {f.label}
        </label>
      ))}
    </div>
  );
}

function TextEditor({ value, onChange, label = 'Name' }) {
  return (
    <div class="ble-adv-decoder__editor">
      <div class="ble-adv-decoder__editor-row">
        <span>{label}:</span>
        <input type="text" value={value} onInput={(e) => onChange(e.currentTarget.value)} />
      </div>
    </div>
  );
}

// Editor for a comma/space-separated list, where the displayed text is
// decoupled from the parsed value. The text re-syncs only when the parent's
// `value` changes to something different from what this editor last parsed
// (e.g. via a hex paste), so users can freely type partial input without
// having their cursor or in-progress characters reformatted away.
function useDecoupledListText(value, format) {
  const formatted = format(value);
  const [text, setText] = useState(formatted);
  const lastFormatted = useRef(formatted);
  useEffect(() => {
    if (formatted !== lastFormatted.current) {
      setText(formatted);
      lastFormatted.current = formatted;
    }
  }, [formatted]);
  const setBoth = (newText, parsedFormatted) => {
    setText(newText);
    lastFormatted.current = parsedFormatted;
  };
  return [text, setBoth];
}

function parseUuid16Parts(text) {
  const parts = text.split(/[\s,]+/).filter(Boolean);
  const parsed = [];
  const invalid = [];
  for (const p of parts) {
    const stripped = p.replace(/^0x/i, '');
    if (/^[0-9a-fA-F]+$/.test(stripped)) {
      const n = parseInt(stripped, 16);
      if (n >= 0 && n <= 0xffff) { parsed.push(n); continue; }
    }
    invalid.push(p);
  }
  return { parsed, invalid };
}

function Uuid16ListEditor({ value, onChange }) {
  const format = (v) => v.map((u) => '0x' + u.toString(16).padStart(4, '0').toUpperCase()).join(', ');
  const [text, setBoth] = useDecoupledListText(value, format);
  const { invalid } = parseUuid16Parts(text);
  return (
    <div class="ble-adv-decoder__editor">
      <div class="ble-adv-decoder__editor-row">
        <span>UUIDs:</span>
        <input
          type="text"
          class="mono"
          value={text}
          onInput={(e) => {
            const newText = e.currentTarget.value;
            const { parsed } = parseUuid16Parts(newText);
            setBoth(newText, format(parsed));
            onChange(parsed);
          }}
          placeholder="0x180F, 0x180A"
        />
      </div>
      <div class="ble-adv-decoder__field-help">Add comma separated hex values</div>
      {invalid.length > 0 && (
        <div class="ble-adv-decoder__field-error">
          Not valid 16-bit UUIDs: {invalid.map((p) => JSON.stringify(p)).join(', ')}
        </div>
      )}
    </div>
  );
}

function parseUuid128Parts(text) {
  const parts = text.split(/[\s,]+/).filter(Boolean);
  const parsed = [];
  const invalid = [];
  for (const p of parts) {
    const stripped = p.replace(/-/g, '');
    if (/^[0-9a-fA-F]{32}$/.test(stripped)) parsed.push(p);
    else invalid.push(p);
  }
  return { parsed, invalid };
}

function Uuid128ListEditor({ value, onChange }) {
  const format = (v) => v.join(', ');
  const [text, setBoth] = useDecoupledListText(value, format);
  const { invalid } = parseUuid128Parts(text);
  return (
    <div class="ble-adv-decoder__editor">
      <div class="ble-adv-decoder__editor-row">
        <span>UUIDs:</span>
        <input
          type="text"
          class="mono"
          value={text}
          onInput={(e) => {
            const newText = e.currentTarget.value;
            const { parsed } = parseUuid128Parts(newText);
            setBoth(newText, format(parsed));
            onChange(parsed);
          }}
          placeholder="00000000-0000-1000-8000-00805F9B34FB"
        />
      </div>
      {invalid.length > 0 && (
        <div class="ble-adv-decoder__field-error">
          Not valid 128-bit UUIDs (need 32 hex chars): {invalid.map((p) => JSON.stringify(p)).join(', ')}
        </div>
      )}
    </div>
  );
}

function TxPowerEditor({ value, onChange }) {
  return (
    <div class="ble-adv-decoder__editor">
      <div class="ble-adv-decoder__editor-row">
        <span>Power (dBm):</span>
        <input
          type="number"
          min="-128"
          max="127"
          value={value}
          onInput={(e) => onChange(parseInt(e.currentTarget.value, 10) || 0)}
        />
      </div>
    </div>
  );
}

function ServiceData16Editor({ value, onChange }) {
  return (
    <div class="ble-adv-decoder__editor">
      <div class="ble-adv-decoder__editor-row">
        <span>UUID (16-bit):</span>
        <input
          type="text"
          class="mono"
          value={'0x' + value.uuid.toString(16).padStart(4, '0').toUpperCase()}
          onInput={(e) => {
            const n = parseInt(e.currentTarget.value, 16);
            if (!Number.isNaN(n)) onChange({ ...value, uuid: n & 0xffff });
          }}
        />
      </div>
      <div class="ble-adv-decoder__editor-row">
        <span>Data (hex):</span>
        <input
          type="text"
          class="mono"
          value={value.dataHex}
          onInput={(e) => onChange({ ...value, dataHex: e.currentTarget.value.replace(/[^0-9a-fA-F]/g, '').toUpperCase() })}
        />
      </div>
    </div>
  );
}

function ManufacturerEditor({ value, onChange }) {
  return (
    <div class="ble-adv-decoder__editor">
      <div class="ble-adv-decoder__editor-row">
        <span>Company ID:</span>
        <input
          type="text"
          class="mono"
          value={'0x' + value.companyId.toString(16).padStart(4, '0').toUpperCase()}
          onInput={(e) => {
            const n = parseInt(e.currentTarget.value, 16);
            if (!Number.isNaN(n)) onChange({ ...value, companyId: n & 0xffff });
          }}
        />
      </div>
      <div class="ble-adv-decoder__editor-row">
        <span>Data (hex):</span>
        <input
          type="text"
          class="mono"
          value={value.dataHex}
          onInput={(e) => onChange({ ...value, dataHex: e.currentTarget.value.replace(/[^0-9a-fA-F]/g, '').toUpperCase() })}
        />
      </div>
    </div>
  );
}

function UnknownEditor({ value, onChange }) {
  const hex = typeof value === 'string' ? value : '';
  return (
    <div class="ble-adv-decoder__editor">
      <div class="ble-adv-decoder__editor-row">
        <span>Bytes (hex):</span>
        <input
          type="text"
          class="mono"
          value={hex}
          onInput={(e) => onChange(e.currentTarget.value.replace(/[^0-9a-fA-F]/g, '').toUpperCase())}
        />
      </div>
    </div>
  );
}

function StructureEditor({ structure, onChange }) {
  const setValue = (v) => onChange({ ...structure, value: v });
  switch (structure.adCode) {
    case 0x01: return <FlagsEditor value={structure.value} onChange={setValue} />;
    case 0x02:
    case 0x03: return <Uuid16ListEditor value={structure.value} onChange={setValue} />;
    case 0x06:
    case 0x07: return <Uuid128ListEditor value={structure.value} onChange={setValue} />;
    case 0x08:
    case 0x09: return <TextEditor value={structure.value} onChange={setValue} label="Name" />;
    case 0x0A: return <TxPowerEditor value={structure.value} onChange={setValue} />;
    case 0x16: return <ServiceData16Editor value={structure.value} onChange={setValue} />;
    case 0xFF: return <ManufacturerEditor value={structure.value} onChange={setValue} />;
    default: return <UnknownEditor value={structure.value} onChange={setValue} />;
  }
}

const INITIAL_STRUCTURES = [
  newStructure(0x01),
  newStructure(0x09),
];

export default function BleAdvDecoder() {
  const [structures, setStructures] = useState(INITIAL_STRUCTURES);
  const [hexInput, setHexInput] = useState('');
  const [parseErrors, setParseErrors] = useState([]);
  const [addCode, setAddCode] = useState(0x01);
  // Tracks who last edited so we don't overwrite the user's hex while they're typing.
  const lastSource = useRef('builder');

  // When structures change (and the change came from the builder), re-derive the hex.
  useEffect(() => {
    if (lastSource.current === 'builder') {
      const { hex } = buildAdvPayload(structures);
      setHexInput(hex);
      setParseErrors([]);
    }
  }, [structures]);

  const onHexChange = (text) => {
    lastSource.current = 'hex';
    setHexInput(text);
    const { structures: parsed, errors } = parseAdvPayload(text);
    setParseErrors(errors);
    setStructures(parsed);
  };

  const updateStructure = (id, next) => {
    lastSource.current = 'builder';
    setStructures((prev) => prev.map((s) => (s.id === id ? next : s)));
  };

  const deleteStructure = (id) => {
    lastSource.current = 'builder';
    setStructures((prev) => prev.filter((s) => s.id !== id));
  };

  const addAdStructure = () => {
    lastSource.current = 'builder';
    setStructures((prev) => [...prev, newStructure(addCode)]);
  };

  const { totalBytes, errors: buildErrors } = buildAdvPayload(structures);
  const overBudget = totalBytes > LEGACY_ADV_BUDGET;
  const allErrors = [...buildErrors, ...parseErrors];

  return (
    <div class="ble-adv-decoder">
      <div class="ble-adv-decoder__columns">
        <div>
          <h4>Hex payload</h4>
          <textarea
            class="ble-adv-decoder__hex"
            value={hexInput}
            onInput={(e) => onHexChange(e.currentTarget.value)}
            placeholder="Paste advertising payload hex, e.g. 02010606094E6F72646963"
            spellcheck={false}
          />
          <div class={`ble-adv-decoder__byte-budget${overBudget ? ' ble-adv-decoder__byte-budget--over' : ''}`}>
            {totalBytes} / {LEGACY_ADV_BUDGET} bytes used
            {overBudget && ' — exceeds legacy advertising payload limit'}
          </div>
          {allErrors.length > 0 && (
            <div class="ble-adv-decoder__errors">
              <strong>Errors:</strong>
              <ul>{allErrors.map((e, i) => <li key={i}>{e}</li>)}</ul>
            </div>
          )}
        </div>

        <div>
          <h4>Structures</h4>
          {structures.length === 0 ? (
            <div class="ble-adv-decoder__empty">No AD structures — add one below or paste hex.</div>
          ) : (
            <div class="ble-adv-decoder__structures">
              {structures.map((s) => {
                const t = getAdType(s.adCode);
                let tlvHex = null;
                try {
                  const valueBytes = t.encode(s.value);
                  const len = 1 + valueBytes.length;
                  const all = new Uint8Array(2 + valueBytes.length);
                  all[0] = len;
                  all[1] = s.adCode;
                  all.set(valueBytes, 2);
                  tlvHex = hexFromBytes(all).match(/.{2}/g).join(' ');
                } catch {}
                return (
                  <div class="ble-adv-decoder__structure" key={s.id}>
                    <div class="ble-adv-decoder__structure-header">
                      <div>
                        <span class="ble-adv-decoder__structure-title">{t.name}</span>
                        <span class="ble-adv-decoder__structure-code">0x{s.adCode.toString(16).padStart(2, '0').toUpperCase()}</span>
                      </div>
                      <button class="ble-adv-decoder__delete" onClick={() => deleteStructure(s.id)}>Remove</button>
                    </div>
                    <StructureEditor structure={s} onChange={(next) => updateStructure(s.id, next)} />
                    {tlvHex && <div class="ble-adv-decoder__structure-hex">{tlvHex}</div>}
                    <div class="ble-adv-decoder__describe">{t.describe ? t.describe(s.value) : ''}</div>
                  </div>
                );
              })}
            </div>
          )}

          <div class="ble-adv-decoder__add">
            <select value={addCode} onChange={(e) => setAddCode(parseInt(e.currentTarget.value, 10))}>
              {SUPPORTED_AD_TYPE_CODES.map((c) => (
                <option key={c} value={c}>
                  0x{c.toString(16).padStart(2, '0').toUpperCase()} — {AD_TYPES[c].name}
                </option>
              ))}
            </select>
            <button onClick={addAdStructure}>Add structure</button>
          </div>
        </div>
      </div>
    </div>
  );
}
