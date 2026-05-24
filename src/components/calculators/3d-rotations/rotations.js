/**
 * Plain-JS 3D rotation conversions. Quaternions are stored as [w, x, y, z].
 * Rotation matrices are stored as [[r00,r01,r02],[r10,r11,r12],[r20,r21,r22]].
 * Euler angles are stored as [angle1, angle2, angle3] in radians paired with
 * an intrinsic axis order string like "XYZ".
 *
 * All conventions match NinjaCalc's original implementation (right-handed,
 * intrinsic Euler rotations).
 */

const EPS = 1e-10;

// ===== Quaternion helpers =====

export function quatNorm(q) {
  return Math.sqrt(q[0] ** 2 + q[1] ** 2 + q[2] ** 2 + q[3] ** 2);
}

export function quatNormalize(q) {
  const n = quatNorm(q);
  if (n < EPS) return [1, 0, 0, 0];
  return [q[0] / n, q[1] / n, q[2] / n, q[3] / n];
}

// ===== Angle-axis ↔ quaternion =====

export function angleAxisToQuat({ angle, x, y, z }) {
  const n = Math.sqrt(x * x + y * y + z * z);
  if (n < EPS) return [1, 0, 0, 0];
  const ax = x / n, ay = y / n, az = z / n;
  const half = angle / 2;
  const s = Math.sin(half);
  return [Math.cos(half), ax * s, ay * s, az * s];
}

// ===== Quaternion ↔ rotation matrix =====

export function quatToRotMatrix(q) {
  const [w, x, y, z] = quatNormalize(q);
  return [
    [1 - 2 * (y * y + z * z), 2 * (x * y - z * w),     2 * (x * z + y * w)],
    [2 * (x * y + z * w),     1 - 2 * (x * x + z * z), 2 * (y * z - x * w)],
    [2 * (x * z - y * w),     2 * (y * z + x * w),     1 - 2 * (x * x + y * y)],
  ];
}

export function rotMatrixToQuat(m) {
  const tr = m[0][0] + m[1][1] + m[2][2];
  let w, x, y, z;
  if (tr > 0) {
    const s = 0.5 / Math.sqrt(tr + 1);
    w = 0.25 / s;
    x = (m[2][1] - m[1][2]) * s;
    y = (m[0][2] - m[2][0]) * s;
    z = (m[1][0] - m[0][1]) * s;
  } else if (m[0][0] > m[1][1] && m[0][0] > m[2][2]) {
    const s = 2 * Math.sqrt(1 + m[0][0] - m[1][1] - m[2][2]);
    w = (m[2][1] - m[1][2]) / s;
    x = 0.25 * s;
    y = (m[0][1] + m[1][0]) / s;
    z = (m[0][2] + m[2][0]) / s;
  } else if (m[1][1] > m[2][2]) {
    const s = 2 * Math.sqrt(1 + m[1][1] - m[0][0] - m[2][2]);
    w = (m[0][2] - m[2][0]) / s;
    x = (m[0][1] + m[1][0]) / s;
    y = 0.25 * s;
    z = (m[1][2] + m[2][1]) / s;
  } else {
    const s = 2 * Math.sqrt(1 + m[2][2] - m[0][0] - m[1][1]);
    w = (m[1][0] - m[0][1]) / s;
    x = (m[0][2] + m[2][0]) / s;
    y = (m[1][2] + m[2][1]) / s;
    z = 0.25 * s;
  }
  return [w, x, y, z];
}

// ===== Rotation matrix ↔ angle-axis =====

export function rotMatrixToAngleAxis(m) {
  const tr = m[0][0] + m[1][1] + m[2][2];
  const cosA = Math.min(1, Math.max(-1, (tr - 1) / 2));
  const angle = Math.acos(cosA);
  if (angle < EPS) return { angle: 0, x: 1, y: 0, z: 0, msg: 'Identity rotation (axis arbitrary).' };
  if (Math.abs(angle - Math.PI) < EPS) {
    // Special case: angle = π; pick the largest diagonal to extract the axis safely.
    let i = 0;
    if (m[1][1] > m[i][i]) i = 1;
    if (m[2][2] > m[i][i]) i = 2;
    const j = (i + 1) % 3, k = (j + 1) % 3;
    const s = Math.sqrt(m[i][i] - m[j][j] - m[k][k] + 1);
    const axis = [0, 0, 0];
    axis[i] = s / 2;
    axis[j] = (m[i][j] + m[j][i]) / (2 * s);
    axis[k] = (m[k][i] + m[i][k]) / (2 * s);
    return { angle, x: axis[0], y: axis[1], z: axis[2], msg: '' };
  }
  const sinA = Math.sin(angle);
  return {
    angle,
    x: (m[2][1] - m[1][2]) / (2 * sinA),
    y: (m[0][2] - m[2][0]) / (2 * sinA),
    z: (m[1][0] - m[0][1]) / (2 * sinA),
    msg: '',
  };
}

// ===== Euler angles ↔ rotation matrix (intrinsic) =====

// Elementary rotation matrices about a single axis (right-hand rule).
function rotX(a) { const c = Math.cos(a), s = Math.sin(a); return [[1,0,0],[0,c,-s],[0,s,c]]; }
function rotY(a) { const c = Math.cos(a), s = Math.sin(a); return [[c,0,s],[0,1,0],[-s,0,c]]; }
function rotZ(a) { const c = Math.cos(a), s = Math.sin(a); return [[c,-s,0],[s,c,0],[0,0,1]]; }
function elemRot(axis, a) {
  return axis === 'X' ? rotX(a) : axis === 'Y' ? rotY(a) : rotZ(a);
}

function matMul(a, b) {
  const out = [[0,0,0],[0,0,0],[0,0,0]];
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) {
    let s = 0;
    for (let k = 0; k < 3; k++) s += a[i][k] * b[k][j];
    out[i][j] = s;
  }
  return out;
}

// Intrinsic rotations: R = R(axis1, a1) · R(axis2, a2) · R(axis3, a3)
export function eulerAnglesToRotMatrix(angles, order) {
  const [a, b, c] = angles;
  return matMul(matMul(elemRot(order[0], a), elemRot(order[1], b)), elemRot(order[2], c));
}

// Extract intrinsic Euler angles (radians) from a rotation matrix in the
// requested axis order. For each Tait–Bryan order the relationship between the
// matrix entries and the three angles is hand-derived from R = R(axis1,a)·R(axis2,b)·R(axis3,c).
export function rotMatrixToEulerAngles(m, order) {
  switch (order) {
    case 'XYZ': {
      const b = Math.asin(clamp(m[0][2]));
      if (Math.abs(m[0][2]) < 1 - 1e-9) {
        return [Math.atan2(-m[1][2], m[2][2]), b, Math.atan2(-m[0][1], m[0][0])];
      }
      return [Math.atan2(m[2][1], m[1][1]), b, 0];
    }
    case 'XZY': {
      const b = Math.asin(clamp(-m[0][1]));
      if (Math.abs(m[0][1]) < 1 - 1e-9) {
        return [Math.atan2(m[2][1], m[1][1]), b, Math.atan2(m[0][2], m[0][0])];
      }
      return [Math.atan2(-m[1][2], m[2][2]), b, 0];
    }
    case 'YXZ': {
      const b = Math.asin(clamp(-m[1][2]));
      if (Math.abs(m[1][2]) < 1 - 1e-9) {
        return [Math.atan2(m[0][2], m[2][2]), b, Math.atan2(m[1][0], m[1][1])];
      }
      return [Math.atan2(-m[2][0], m[0][0]), b, 0];
    }
    case 'YZX': {
      const b = Math.asin(clamp(m[1][0]));
      if (Math.abs(m[1][0]) < 1 - 1e-9) {
        return [Math.atan2(-m[2][0], m[0][0]), b, Math.atan2(-m[1][2], m[1][1])];
      }
      return [Math.atan2(m[0][2], m[2][2]), b, 0];
    }
    case 'ZXY': {
      const b = Math.asin(clamp(m[2][1]));
      if (Math.abs(m[2][1]) < 1 - 1e-9) {
        return [Math.atan2(-m[0][1], m[1][1]), b, Math.atan2(-m[2][0], m[2][2])];
      }
      return [Math.atan2(m[1][0], m[0][0]), b, 0];
    }
    case 'ZYX': {
      const b = Math.asin(clamp(-m[2][0]));
      if (Math.abs(m[2][0]) < 1 - 1e-9) {
        return [Math.atan2(m[1][0], m[0][0]), b, Math.atan2(m[2][1], m[2][2])];
      }
      return [Math.atan2(-m[0][1], m[1][1]), b, 0];
    }
    default: throw new Error(`Unsupported Euler order: ${order}`);
  }
}

function clamp(x) { return Math.max(-1, Math.min(1, x)); }

// ===== Display helpers =====

export function precision(value, digits) {
  if (!Number.isFinite(value)) return String(value);
  return Number(value).toPrecision(digits);
}
