import tile from './tile.svg?url';

export const catalog = {
  id: 'pid-msd-visualizer',
  title: 'PID spring-mass-damper visualizer',
  description: "Tune a PID controller (Kp, Ki, Kd) driving a spring-mass-damper plant and watch the mass respond in real time, with the controller's output force drawn on the animation and a live response plot. Drive the setpoint as a step, an alternating square wave, or a slider you drag live; adjust the plant (mass, spring, damping); or jump to under-, critically- and over-damped presets.",
  href: '/programming/general/pid-control/#running-the-simulation',
  categoryPath: ['Software', 'Control theory'],
  tags: ['PID', 'control', 'control theory', 'spring mass damper', 'tuning', 'step response', 'simulation', 'Kp', 'Ki', 'Kd', 'damping', 'underdamped', 'overdamped', 'critically damped', 'presets'],
  tile,
};
