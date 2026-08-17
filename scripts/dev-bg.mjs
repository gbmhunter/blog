/**
 * Start the Astro dev server in the background, with a startup timeout we control.
 *
 * Why this exists: `astro dev --background` hardcodes a 30s startup deadline
 * (`node_modules/astro/dist/cli/dev/background.js`, `const timeout = 3e4`) with
 * no flag, env var or config option to change it. On this repo a cold start
 * that clears and rebuilds the content store across ~1400 routes comfortably
 * exceeds that, and the launcher then SIGTERMs the server just as it is about
 * to come up — reporting "Dev server failed to start within 30s."
 *
 * This script does exactly what Astro's launcher does — spawn `astro dev`
 * detached with ASTRO_DEV_BACKGROUND=1, log to `.astro/dev.log`, wait for the
 * server to publish `.astro/dev.json` — but waits as long as we tell it to.
 *
 * The dev server writes that lock file itself (see `dist/cli/dev/index.js`,
 * `writeLockFile(...)` after `devServer()` resolves), so `astro dev stop`,
 * `astro dev status` and `astro dev logs` all keep working exactly as they do
 * with the built-in `--background`.
 *
 * Usage:
 *   npm run dev:bg
 *   npm run dev:bg -- --timeout=600        # seconds
 *   npm run dev:bg -- --port 4322 --force  # other flags pass through to astro
 *   ASTRO_DEV_BG_TIMEOUT=600 npm run dev:bg
 */

import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, openSync, readFileSync, unlinkSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';

const require = createRequire(import.meta.url);

const DEFAULT_TIMEOUT_S = 300;
const POLL_INTERVAL_MS = 250;
const HEARTBEAT_MS = 10_000;

const root = process.cwd();
const lockFile = join(root, '.astro', 'dev.json');
const logFile = join(root, '.astro', 'dev.log');

// ---- args -------------------------------------------------------------------

const argv = process.argv.slice(2);
let timeoutS = Number(process.env.ASTRO_DEV_BG_TIMEOUT) || DEFAULT_TIMEOUT_S;
const passthrough = [];

for (let i = 0; i < argv.length; i++) {
  const arg = argv[i];
  if (arg.startsWith('--timeout=')) {
    timeoutS = Number(arg.slice('--timeout='.length));
  } else if (arg === '--timeout') {
    timeoutS = Number(argv[++i]);
  } else {
    passthrough.push(arg);
  }
}

if (!Number.isFinite(timeoutS) || timeoutS <= 0) {
  console.error(`Invalid --timeout value. Expected a positive number of seconds.`);
  process.exit(1);
}

// ---- lock file helpers (mirrors astro/dist/core/dev/lockfile.js) ------------

function isProcessAlive(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch (err) {
    // EPERM means the process exists but belongs to another user.
    return err?.code === 'EPERM';
  }
}

function readLock() {
  try {
    const data = JSON.parse(readFileSync(lockFile, 'utf-8'));
    return typeof data.pid === 'number' && typeof data.url === 'string' ? data : null;
  } catch {
    return null;
  }
}

function removeLock() {
  try {
    unlinkSync(lockFile);
  } catch (err) {
    if (err?.code !== 'ENOENT') throw err;
  }
}

/** Last non-empty line of the dev log, for the waiting heartbeat. */
function lastLogLine() {
  try {
    const lines = readFileSync(logFile, 'utf-8').split('\n').filter((l) => l.trim());
    const raw = lines[lines.length - 1];
    if (!raw) return null;
    try {
      const parsed = JSON.parse(raw);
      return parsed.message ? `${parsed.label ? `[${parsed.label}] ` : ''}${parsed.message}` : raw;
    } catch {
      return raw;
    }
  } catch {
    return null;
  }
}

// ---- already running? -------------------------------------------------------

const existing = readLock();
if (existing) {
  if (isProcessAlive(existing.pid)) {
    console.log(`Dev server already running at ${existing.url} (pid ${existing.pid})`);
    console.log('  Stop:   npx astro dev stop');
    console.log('  Status: npx astro dev status');
    console.log('  Logs:   npx astro dev logs');
    process.exit(0);
  }
  // Stale lock from a server that died without cleaning up.
  removeLock();
}

// ---- spawn ------------------------------------------------------------------

const astroDir = join(root, '.astro');
if (!existsSync(astroDir)) mkdirSync(astroDir, { recursive: true });

const astroBin = resolve(dirname(require.resolve('astro/package.json')), 'bin', 'astro.mjs');
const logFd = openSync(logFile, 'w');

// ASTRO_DEV_BACKGROUND=1 stops the child re-entering background mode via its own
// agent detection, so it runs the server in-process and writes the lock file.
const child = spawn(process.execPath, [astroBin, 'dev', ...passthrough], {
  detached: true,
  stdio: ['ignore', logFd, logFd],
  cwd: root,
  env: { ...process.env, ASTRO_DEV_BACKGROUND: '1' },
});
child.unref();

if (!child.pid) {
  console.error('Failed to spawn background dev server process.');
  process.exit(1);
}

console.log(`Starting dev server (pid ${child.pid}), waiting up to ${timeoutS}s...`);

// ---- wait for readiness -----------------------------------------------------

const deadline = Date.now() + timeoutS * 1000;
let nextHeartbeat = Date.now() + HEARTBEAT_MS;

while (Date.now() < deadline) {
  if (!isProcessAlive(child.pid)) {
    console.error('Dev server process exited before becoming ready.');
    const line = lastLogLine();
    if (line) console.error(`Last log line: ${line}`);
    console.error(`Full log: ${logFile}`);
    process.exit(1);
  }

  const lock = readLock();
  if (lock && lock.pid === child.pid) {
    const elapsed = ((timeoutS * 1000 - (deadline - Date.now())) / 1000).toFixed(1);
    console.log(`Dev server running at ${lock.url} (pid ${lock.pid}) after ${elapsed}s`);
    console.log('  Stop:   npx astro dev stop');
    console.log('  Status: npx astro dev status');
    console.log('  Logs:   npx astro dev logs');
    process.exit(0);
  }

  // Cold starts can take minutes; show what it's doing so it doesn't look hung.
  if (Date.now() >= nextHeartbeat) {
    const remaining = Math.round((deadline - Date.now()) / 1000);
    const line = lastLogLine();
    console.log(`  ...still starting (${remaining}s left)${line ? ` — ${line}` : ''}`);
    nextHeartbeat = Date.now() + HEARTBEAT_MS;
  }

  await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
}

// Timed out. Match Astro's behaviour and tear the half-started server down.
try {
  process.kill(child.pid, 'SIGTERM');
} catch {}
removeLock();
console.error(`Dev server failed to start within ${timeoutS}s.`);
const line = lastLogLine();
if (line) console.error(`Last log line: ${line}`);
console.error(`Full log: ${logFile}`);
console.error('If it was still making progress, re-run with a longer --timeout.');
process.exit(1);
