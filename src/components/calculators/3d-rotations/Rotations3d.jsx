import { useState, useMemo } from 'preact/hooks';
import {
  angleAxisToQuat, quatToRotMatrix, rotMatrixToQuat, rotMatrixToAngleAxis,
  eulerAnglesToRotMatrix, rotMatrixToEulerAngles, quatNormalize, quatNorm,
  precision,
} from './rotations.js';
import Plot3d from './Plot3d.jsx';
import './styles.css';

const ORDERS = ['XYZ', 'XZY', 'YXZ', 'YZX', 'ZXY', 'ZYX'];
const DIGITS = 4;

// Convenience: parse a string into a float, return 0 if blank or NaN.
const toNum = (s) => {
  const v = parseFloat(s);
  return Number.isFinite(v) ? v : 0;
};

export default function Rotations3d() {
  // Source of truth: rotation matrix (computed from whichever input form is active).
  const [selInput, setSelInput] = useState('quat');
  const [angleUnit, setAngleUnit] = useState('radians');
  const [eulerOrder, setEulerOrder] = useState('XYZ');

  // Each input form has its own text-display state so users can type freely.
  const [angleAxisText, setAngleAxisText] = useState({ angle: '0', x: '1', y: '0', z: '0' });
  const [quatText, setQuatText] = useState({ w: '-0.2234', x: '0', y: '0.8944', z: '-0.4472' });
  const [rotMatText, setRotMatText] = useState([
    ['1','0','0'], ['0','1','0'], ['0','0','1'],
  ]);
  const [eulerText, setEulerText] = useState({ a: '0', b: '0', c: '0' });

  const mult = angleUnit === 'degrees' ? Math.PI / 180 : 1;
  const invMult = 1 / mult;

  // Compute the canonical rotation matrix from whichever form is selected.
  const rotMatrix = useMemo(() => {
    if (selInput === 'angleAxis') {
      const q = angleAxisToQuat({
        angle: toNum(angleAxisText.angle) * mult,
        x: toNum(angleAxisText.x), y: toNum(angleAxisText.y), z: toNum(angleAxisText.z),
      });
      return quatToRotMatrix(q);
    }
    if (selInput === 'quat') {
      const q = [toNum(quatText.w), toNum(quatText.x), toNum(quatText.y), toNum(quatText.z)];
      return quatToRotMatrix(q);
    }
    if (selInput === 'rotMatrix') {
      return rotMatText.map((row) => row.map(toNum));
    }
    // eulerAngles
    return eulerAnglesToRotMatrix(
      [toNum(eulerText.a) * mult, toNum(eulerText.b) * mult, toNum(eulerText.c) * mult],
      eulerOrder,
    );
  }, [selInput, angleAxisText, quatText, rotMatText, eulerText, angleUnit, eulerOrder]);

  // Derived display values for the non-source forms.
  const derived = useMemo(() => {
    const aa = rotMatrixToAngleAxis(rotMatrix);
    const q = rotMatrixToQuat(rotMatrix);
    const eul = rotMatrixToEulerAngles(rotMatrix, eulerOrder);
    return { aa, q, eul };
  }, [rotMatrix, eulerOrder]);

  // For display, formats a number with the chosen precision.
  const fmt = (v) => precision(v, DIGITS);

  // Display values for each form: either the typed value if it's the input,
  // or the value derived from the rotation matrix.
  const aaDisp = selInput === 'angleAxis' ? angleAxisText : {
    angle: fmt(derived.aa.angle * invMult),
    x: fmt(derived.aa.x), y: fmt(derived.aa.y), z: fmt(derived.aa.z),
  };
  const quatDisp = selInput === 'quat' ? quatText : {
    w: fmt(derived.q[0]), x: fmt(derived.q[1]), y: fmt(derived.q[2]), z: fmt(derived.q[3]),
  };
  const rmDisp = selInput === 'rotMatrix' ? rotMatText
    : rotMatrix.map((row) => row.map((v) => fmt(v)));
  const eulDisp = selInput === 'eulerAngles' ? eulerText : {
    a: fmt(derived.eul[0] * invMult),
    b: fmt(derived.eul[1] * invMult),
    c: fmt(derived.eul[2] * invMult),
  };

  // Quaternion normalization button (only meaningful when quat is the input).
  const normalizeQuat = () => {
    const q = quatNormalize([toNum(quatText.w), toNum(quatText.x), toNum(quatText.y), toNum(quatText.z)]);
    setQuatText({ w: fmt(q[0]), x: fmt(q[1]), y: fmt(q[2]), z: fmt(q[3]) });
  };
  const quatN = quatNorm([toNum(quatText.w), toNum(quatText.x), toNum(quatText.y), toNum(quatText.z)]);

  return (
    <div class="rotations3d">
      <div class="rotations3d__legend">
        Convert a 3D rotation between angle-axis, quaternion, rotation matrix, and intrinsic Euler
        angles. Pick the radio button next to the form you want to input; the others are computed.
        The 3D scene below shows the reference frame (blue) being rotated into the new frame (green).
      </div>

      <Plot3d rotMatrix={rotMatrix} />

      <div class="rotations3d__controls">
        <label>
          Units:&nbsp;
          <select class="calc-form__select" value={angleUnit} onChange={(e) => setAngleUnit(e.currentTarget.value)}>
            <option value="radians">radians</option>
            <option value="degrees">degrees</option>
          </select>
        </label>
        <label>
          Euler order:&nbsp;
          <select class="calc-form__select" value={eulerOrder} onChange={(e) => setEulerOrder(e.currentTarget.value)}>
            {ORDERS.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </label>
      </div>

      <div class="rotations3d__blocks">

      {/* Angle-Axis */}
      <Block
        title="Angle-Axis"
        selected={selInput === 'angleAxis'}
        onSelect={() => setSelInput('angleAxis')}
      >
        <Row label="θ"><Inp name="angle" value={aaDisp.angle} disabled={selInput !== 'angleAxis'} onInput={(v) => setAngleAxisText({ ...angleAxisText, angle: v })}/> <span class="rotations3d__suffix">{angleUnit === 'degrees' ? '°' : 'rad'}</span></Row>
        <Row label="x"><Inp name="aa-x" value={aaDisp.x} disabled={selInput !== 'angleAxis'} onInput={(v) => setAngleAxisText({ ...angleAxisText, x: v })}/></Row>
        <Row label="y"><Inp name="aa-y" value={aaDisp.y} disabled={selInput !== 'angleAxis'} onInput={(v) => setAngleAxisText({ ...angleAxisText, y: v })}/></Row>
        <Row label="z"><Inp name="aa-z" value={aaDisp.z} disabled={selInput !== 'angleAxis'} onInput={(v) => setAngleAxisText({ ...angleAxisText, z: v })}/></Row>
        {derived.aa.msg && <div class="rotations3d__msg">{derived.aa.msg}</div>}
      </Block>

      {/* Quaternion */}
      <Block
        title="Quaternion (w, x, y, z)"
        selected={selInput === 'quat'}
        onSelect={() => setSelInput('quat')}
      >
        <Row label="w"><Inp name="q-w" value={quatDisp.w} disabled={selInput !== 'quat'} onInput={(v) => setQuatText({ ...quatText, w: v })}/></Row>
        <Row label="x"><Inp name="q-x" value={quatDisp.x} disabled={selInput !== 'quat'} onInput={(v) => setQuatText({ ...quatText, x: v })}/></Row>
        <Row label="y"><Inp name="q-y" value={quatDisp.y} disabled={selInput !== 'quat'} onInput={(v) => setQuatText({ ...quatText, y: v })}/></Row>
        <Row label="z"><Inp name="q-z" value={quatDisp.z} disabled={selInput !== 'quat'} onInput={(v) => setQuatText({ ...quatText, z: v })}/></Row>
        <div class="rotations3d__msg">|q| = {fmt(quatN)} {selInput === 'quat' && <button type="button" class="rotations3d__btn" onClick={normalizeQuat}>Normalize</button>}</div>
      </Block>

      {/* Rotation Matrix */}
      <Block
        title="Rotation Matrix"
        selected={selInput === 'rotMatrix'}
        onSelect={() => setSelInput('rotMatrix')}
      >
        <table class="rotations3d__matrix">
          <tbody>
            {[0, 1, 2].map((i) => (
              <tr key={i}>
                {[0, 1, 2].map((j) => (
                  <td key={j}>
                    <Inp
                      name={`rot${i}${j}`}
                      value={rmDisp[i][j]}
                      disabled={selInput !== 'rotMatrix'}
                      onInput={(v) => {
                        const next = rotMatText.map((r) => [...r]);
                        next[i][j] = v;
                        setRotMatText(next);
                      }}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Block>

      {/* Euler Angles */}
      <Block
        title={`Euler Angles (${eulerOrder})`}
        selected={selInput === 'eulerAngles'}
        onSelect={() => setSelInput('eulerAngles')}
      >
        <Row label={eulerOrder[0]}><Inp name="eul-a" value={eulDisp.a} disabled={selInput !== 'eulerAngles'} onInput={(v) => setEulerText({ ...eulerText, a: v })}/> <span class="rotations3d__suffix">{angleUnit === 'degrees' ? '°' : 'rad'}</span></Row>
        <Row label={eulerOrder[1]}><Inp name="eul-b" value={eulDisp.b} disabled={selInput !== 'eulerAngles'} onInput={(v) => setEulerText({ ...eulerText, b: v })}/> <span class="rotations3d__suffix">{angleUnit === 'degrees' ? '°' : 'rad'}</span></Row>
        <Row label={eulerOrder[2]}><Inp name="eul-c" value={eulDisp.c} disabled={selInput !== 'eulerAngles'} onInput={(v) => setEulerText({ ...eulerText, c: v })}/> <span class="rotations3d__suffix">{angleUnit === 'degrees' ? '°' : 'rad'}</span></Row>
      </Block>

      </div>
    </div>
  );
}

function Block({ title, selected, onSelect, children }) {
  return (
    <div class={selected ? 'rotations3d__block rotations3d__block--selected' : 'rotations3d__block'}>
      <div class="rotations3d__block-head">
        <label>
          <input type="radio" name="rot-input" checked={selected} onChange={onSelect}/>
          <span class="rotations3d__block-title">{title}</span>
        </label>
      </div>
      <div class="rotations3d__block-body">{children}</div>
    </div>
  );
}

function Row({ label, children }) {
  return (
    <div class="rotations3d__row">
      <span class="rotations3d__label">{label}</span>
      <div class="rotations3d__input-cell">{children}</div>
    </div>
  );
}

function Inp({ name, value, disabled, onInput }) {
  return (
    <input
      name={name}
      type="text"
      class="rotations3d__input"
      value={value}
      disabled={disabled}
      onInput={(e) => onInput(e.currentTarget.value)}
      spellcheck={false}
    />
  );
}
