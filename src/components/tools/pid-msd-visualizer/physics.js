// Simulation of a spring-mass-damper (MSD) plant controlled by a parallel-form
// PID controller. This mirrors the physics and discrete integration scheme
// described on the PID Control page
// (/programming/general/pid-control/#how-the-simulation-works):
//
//   F_ext - k*x - c*xdot = m*xddot        (continuous model)
//
// integrated with semi-implicit (symplectic) Euler at a fixed time step dt.
// The PID controller uses the parallel form:
//
//   u(t) = Kp*e + Ki*∫e dt + Kd*de/dt
//
// with the derivative taken on the error (which reproduces the "derivative
// kick" on a setpoint step, as discussed on the page).
//
// A single `stepPlant()` advances the controller + plant by one dt. The
// component runs it in a real-time requestAnimationFrame loop for every
// setpoint mode (step, alternating, manual), streaming the response live.

const DIVERGE_LIMIT = 1e6;

export function makeState() {
  return { pos: 0, vel: 0 };
}

export function makeController() {
  return { integral: 0, prevErr: 0, first: true };
}

/**
 * Advance the controller + plant by one time step. Computes the PID output for
 * the current error, then integrates the plant one dt (semi-implicit Euler).
 * Mutates `state` (pos, vel) and `ctrl` (integral, prevErr). Returns F_ext.
 *
 * @param {{pos:number, vel:number}} state
 * @param {{integral:number, prevErr:number, first:boolean}} ctrl
 * @param {{kp:number, ki:number, kd:number, m:number, k:number, c:number}} p
 * @param {number} setpoint  target displacement this step [m]
 * @param {number} dt        time step [s]
 */
export function stepPlant(state, ctrl, p, setpoint, dt) {
  const mass = p.m > 1e-9 ? p.m : 1e-9;

  const err = setpoint - state.pos;
  ctrl.integral += err * dt;
  const derivative = ctrl.first ? 0 : (err - ctrl.prevErr) / dt;
  ctrl.prevErr = err;
  ctrl.first = false;

  const fExt = p.kp * err + p.ki * ctrl.integral + p.kd * derivative;

  const accel = (fExt - p.k * state.pos - p.c * state.vel) / mass;
  state.vel += accel * dt;
  state.pos += state.vel * dt;

  return fExt;
}

export function isDiverged(pos) {
  return !Number.isFinite(pos) || Math.abs(pos) > DIVERGE_LIMIT;
}

