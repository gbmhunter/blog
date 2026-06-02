import { useState, useMemo } from 'preact/hooks';
import { CRC_ALGORITHMS, findAlgorithm } from './catalogue.js';
import { computeCrcHex, textToBytes, hexToBytes } from './crc.js';
import './styles.css';

const FORMATS = {
  ascii: { label: 'ASCII / UTF-8', parse: (text) => ({ bytes: textToBytes(text), error: null }) },
  hex:   { label: 'Hex',           parse: hexToBytes },
};

const DEFAULT_ALGORITHM = 'CRC_32_ADCCP_PKZIP';

const yesNo = (b) => (b ? 'Yes' : 'No');

const padHex = (value, bits) => {
  const hex = value.toString(16).toUpperCase();
  return hex.padStart(Math.ceil(bits / 4), '0');
};

export default function CrcCalculator() {
  const [data, setData] = useState('123456789');
  const [format, setFormat] = useState('ascii');
  const [algorithmId, setAlgorithmId] = useState(DEFAULT_ALGORITHM);

  const algorithm = findAlgorithm(algorithmId);

  const { bytes, error: parseError } = useMemo(() => FORMATS[format].parse(data), [data, format]);

  const crcHex = useMemo(() => {
    if (parseError) return null;
    try {
      return computeCrcHex(algorithm, bytes);
    } catch (e) {
      return null;
    }
  }, [algorithm, bytes, parseError]);

  const numBytes = bytes.length;

  return (
    <div class="crc-calc">
      {/* ============ INPUT ============ */}
      <div class="crc-calc__field">
        <label class="crc-calc__field-label" for="crc-calc-data">Data</label>
        <textarea
          id="crc-calc-data"
          class={`crc-calc__data${parseError ? ' crc-calc__data--error' : ''}`}
          value={data}
          onInput={(e) => setData(e.currentTarget.value)}
          rows={3}
          spellcheck={false}
          autoComplete="off"
          placeholder={format === 'hex' ? 'Hex bytes, e.g. 31 32 33 34' : 'Text to checksum'}
        />
        <div class="crc-calc__row crc-calc__row--meta">
          <fieldset class="crc-calc__format">
            <legend class="crc-calc__format-legend">Format:</legend>
            {Object.entries(FORMATS).map(([key, def]) => (
              <label key={key} class="crc-calc__format-option">
                <input
                  type="radio"
                  name="crc-calc-format"
                  value={key}
                  checked={format === key}
                  onChange={() => setFormat(key)}
                />
                {def.label}
              </label>
            ))}
          </fieldset>
          <span class="crc-calc__byte-count">{numBytes} byte{numBytes === 1 ? '' : 's'}</span>
        </div>
        {parseError && <div class="crc-calc__error">{parseError}</div>}
      </div>

      {/* ============ ALGORITHM ============ */}
      <div class="crc-calc__field">
        <label class="crc-calc__field-label" for="crc-calc-algorithm">Algorithm</label>
        <select
          id="crc-calc-algorithm"
          class="crc-calc__algorithm"
          value={algorithmId}
          onChange={(e) => setAlgorithmId(e.currentTarget.value)}
        >
          {CRC_ALGORITHMS.map((a) => (
            <option key={a.id} value={a.id}>{a.name}</option>
          ))}
        </select>
      </div>

      {/* ============ OUTPUT ============ */}
      <div class="crc-calc__result">
        <div class="crc-calc__result-label">CRC value</div>
        <div class="crc-calc__result-value">
          {crcHex ? `0x${crcHex}` : '—'}
        </div>
      </div>

      {/* ============ ALGORITHM DETAILS ============ */}
      <details class="crc-calc__details">
        <summary>Algorithm parameters</summary>
        <table class="crc-calc__params">
          <tbody>
            <tr><th>Width</th><td>{algorithm.crcWidthBits} bits</td></tr>
            <tr><th>Polynomial</th><td>0x{padHex(algorithm.crcPolynomial, algorithm.crcWidthBits)}</td></tr>
            <tr><th>Initial value</th><td>0x{padHex(algorithm.startingValue, algorithm.crcWidthBits)}</td></tr>
            <tr><th>Reflect data</th><td>{yesNo(algorithm.reflectData)}</td></tr>
            <tr><th>Reflect remainder</th><td>{yesNo(algorithm.reflectRemainder)}</td></tr>
            <tr><th>Final XOR</th><td>0x{padHex(algorithm.finalXorValue, algorithm.crcWidthBits)}</td></tr>
            <tr><th>Check value (CRC of "123456789")</th><td>0x{padHex(algorithm.checkValue, algorithm.crcWidthBits)}</td></tr>
          </tbody>
        </table>
      </details>
    </div>
  );
}
