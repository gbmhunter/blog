# /// script
# requires-python = ">=3.10"
# dependencies = [
#   "matplotlib>=3.8",
#   "numpy>=1.26",
# ]
# ///
"""
LoRa chirp plots.

Generates three SVGs for the LoRa MDX page:

1. lora-chirp-symbols-frequency-vs-time.svg
   Instantaneous frequency against time for the four symbols of a simplified
   2-bit-per-symbol chirp scheme on a 1-2 kHz channel. Each symbol starts at a
   different frequency offset (the data), sweeps up to the top of the channel,
   wraps around to the bottom and continues sweeping up until it returns to its
   starting frequency:

       f(t) = f_low + BW · ((k / M + t / T_s) mod 1)

   where k is the symbol value, M = 2^SF is the number of possible symbols, and
   T_s is the symbol duration.

2. lora-dechirp-stages.svg
   The three stages of demodulating each of those four symbols: the received
   chirp against the receiver's reference (base) up-chirp, the de-chirped
   signal (a constant tone whose frequency is the symbol value), and the FFT of
   the de-chirped signal (a single spike in bin k).

3. lora-dechirp-in-noise.svg
   A simulated complex baseband LoRa symbol buried in noise at -15 dB SNR, for
   SF7 and SF12. The spectrum of the received signal looks like pure noise, but
   after de-chirping and an FFT the symbol's energy collapses into a single bin
   that stands out above the noise. The discrete-time symbol (sampled at
   fs = BW, N = 2^SF samples per symbol) is:

       x_k[n] = exp(j·2π·(n² / (2N) + (k / N - 1/2)·n))

   Multiplying by the conjugate of the base chirp x_0[n] leaves
   exp(j·2π·k·n / N), a tone that lands exactly in FFT bin k.

Run from this directory to regenerate the SVGs.
"""

import os
from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np


SCRIPT_DIR = Path(os.path.dirname(os.path.realpath(__file__)))

F_LOW_KHZ = 1.0
BW_KHZ = 1.0
NUM_SYMBOLS = 4  # 2 bits per symbol
COLOR = '#c60e00'  # brand red
REF_COLOR = '#6b7280'  # grey, used for the receiver's reference chirp
GRID_COLOR = '#d1d5db'


def chirp_freq_khz(k, t):
    """Instantaneous frequency (kHz) of symbol k at normalised time t (0 to 1)."""
    offset = k / NUM_SYMBOLS
    # Symbol 0 is a plain up-chirp that ends exactly at the top of the
    # channel, so skip the modulo to stop the last sample wrapping to 0.
    phase = t if offset == 0 else (offset + t) % 1.0
    return F_LOW_KHZ + BW_KHZ * phase, phase


def plot_chirp(ax, k, t, color=COLOR, linewidth=2.2, linestyle='-', label=None):
    """Plot symbol k's frequency vs. time, with a dotted line at the wrap point."""
    offset = k / NUM_SYMBOLS
    f, phase = chirp_freq_khz(k, t)

    # Split at the wrap point so matplotlib doesn't draw a solid vertical line
    # joining the top and bottom of the channel.
    wrap_idx = np.where(np.diff(phase) < 0)[0]
    if wrap_idx.size:
        i = wrap_idx[0] + 1
        t_wrap = 1.0 - offset
        ax.plot(np.append(t[:i], t_wrap), np.append(f[:i], F_LOW_KHZ + BW_KHZ),
                color=color, linewidth=linewidth, linestyle=linestyle, label=label)
        ax.plot(np.insert(t[i:], 0, t_wrap), np.insert(f[i:], 0, F_LOW_KHZ),
                color=color, linewidth=linewidth, linestyle=linestyle)
        ax.plot([t_wrap, t_wrap], [F_LOW_KHZ + BW_KHZ, F_LOW_KHZ], color=color, linewidth=1.2, linestyle=':')
    else:
        ax.plot(t, f, color=color, linewidth=linewidth, linestyle=linestyle, label=label)
    return f


def style_time_axis(ax):
    ax.set_xlim(0, 1)
    ax.set_xticks([0, 0.5, 1])
    ax.set_xticklabels(['0', r'$T_s/2$', r'$T_s$'])
    ax.grid(color=GRID_COLOR, linewidth=0.5)


def plot_symbols():
    t = np.linspace(0, 1, 1001)  # Time normalised to the symbol duration T_s

    fig, axes = plt.subplots(1, NUM_SYMBOLS, figsize=(10, 3.2), sharey=True)

    for k, ax in enumerate(axes):
        f = plot_chirp(ax, k, t)

        # Mark the starting frequency, which is what carries the data.
        ax.plot(0, f[0], marker='o', color=COLOR, markersize=6)
        ax.annotate(f'{f[0]:.2f} kHz', xy=(0, f[0]), xytext=(6, 4), textcoords='offset points', fontsize=9)

        ax.set_title(f'Symbol {k:02b}', fontfamily='monospace')
        ax.set_ylim(F_LOW_KHZ - 0.05, F_LOW_KHZ + BW_KHZ + 0.05)
        ax.set_xlabel('Time')
        style_time_axis(ax)

    axes[0].set_ylabel('Frequency (kHz)')
    axes[0].set_yticks(np.arange(F_LOW_KHZ, F_LOW_KHZ + BW_KHZ + 0.01, 0.25))

    fig.tight_layout()
    save(fig, 'lora-chirp-symbols-frequency-vs-time.svg')


def plot_dechirp_stages():
    t = np.linspace(0, 1, 1001)
    bw_hz = BW_KHZ * 1000
    bins = np.arange(NUM_SYMBOLS)

    fig, axes = plt.subplots(3, NUM_SYMBOLS, figsize=(10, 7.8), sharey='row')

    for k in range(NUM_SYMBOLS):
        # Row 1: received chirp with the reference (base) up-chirp overlaid.
        ax = axes[0, k]
        plot_chirp(ax, 0, t, color=REF_COLOR, linewidth=1.6, linestyle='--',
                   label='Reference' if k == 0 else None)
        plot_chirp(ax, k, t, label='Received' if k == 0 else None)
        ax.set_title(f'Symbol {k:02b}', fontfamily='monospace')
        ax.set_ylim(F_LOW_KHZ - 0.05, F_LOW_KHZ + BW_KHZ + 0.05)
        style_time_axis(ax)

        # Row 2: de-chirped frequency. The received frequency minus the
        # reference frequency is constant (the sweep cancels). The wrapped part
        # of the chirp gives (k / M - 1)·BW, which aliases to the same tone as
        # k / M·BW when sampled at fs = BW, so the tone is shown modulo BW.
        ax = axes[1, k]
        tone_hz = (k / NUM_SYMBOLS) * bw_hz
        ax.plot(t, np.full_like(t, tone_hz), color=COLOR, linewidth=2.2)
        ax.annotate(f'{tone_hz:.0f} Hz', xy=(0.5, tone_hz), xytext=(0, 6), textcoords='offset points',
                    ha='center', fontsize=9)
        ax.set_ylim(-50, bw_hz)
        ax.set_xlabel('Time')
        style_time_axis(ax)

        # Row 3: FFT of the de-chirped symbol. All the energy lands in bin k.
        ax = axes[2, k]
        magnitude = (bins == k).astype(float)
        ax.bar(bins, magnitude, color=[COLOR if b == k else REF_COLOR for b in bins], width=0.6)
        ax.set_xticks(bins)
        ax.set_xticklabels([f'{b:02b}' for b in bins], fontfamily='monospace')
        ax.set_ylim(0, 1.15)
        ax.set_xlabel('FFT bin')
        ax.grid(axis='y', color=GRID_COLOR, linewidth=0.5)

    axes[0, 0].set_ylabel('1. Received\nfrequency (kHz)')
    axes[0, 0].set_yticks(np.arange(F_LOW_KHZ, F_LOW_KHZ + BW_KHZ + 0.01, 0.25))
    axes[0, 0].legend(loc='lower right', fontsize=8, framealpha=0.9)
    axes[1, 0].set_ylabel('2. De-chirped\nfrequency (Hz)')
    axes[1, 0].set_yticks(np.arange(0, bw_hz, 250))
    axes[2, 0].set_ylabel('3. FFT magnitude\n(normalised)')

    fig.tight_layout()
    save(fig, 'lora-dechirp-stages.svg')


def lora_symbol(k, sf):
    """Complex baseband LoRa symbol k, sampled at fs = BW (N = 2^SF samples)."""
    n_samples = 2 ** sf
    n = np.arange(n_samples)
    return np.exp(1j * 2 * np.pi * (n ** 2 / (2 * n_samples) + (k / n_samples - 0.5) * n))


def plot_dechirp_in_noise():
    snr_db = -15.0
    rng = np.random.default_rng(1)
    sfs = [7, 12]

    fig, axes = plt.subplots(len(sfs), 2, figsize=(10, 6.2))

    for row, sf in enumerate(sfs):
        n_samples = 2 ** sf
        k = int(0.3 * n_samples)  # Arbitrary symbol value

        # Signal has unit power per sample. Noise power is set relative to it
        # over the full channel bandwidth, which is how LoRa SNR is defined.
        noise_power = 10 ** (-snr_db / 10)
        noise = np.sqrt(noise_power / 2) * (rng.standard_normal(n_samples) + 1j * rng.standard_normal(n_samples))
        rx = lora_symbol(k, sf) + noise

        base = lora_symbol(0, sf)
        # Every FFT bin of pure noise has an expected power of N·noise_power,
        # so normalise to that to show power relative to the noise floor.
        noise_floor = n_samples * noise_power

        spectra = [
            (np.abs(np.fft.fft(rx)) ** 2 / noise_floor, 'before de-chirping'),
            (np.abs(np.fft.fft(rx * np.conj(base))) ** 2 / noise_floor, 'after de-chirping'),
        ]
        for col, (power, title) in enumerate(spectra):
            ax = axes[row, col]
            ax.plot(np.arange(n_samples), power, color=COLOR if col else REF_COLOR, linewidth=0.8)
            ax.set_xlim(0, n_samples - 1)
            ax.set_ylim(bottom=0)
            ax.set_title(f'SF{sf}: {title}')
            ax.grid(color=GRID_COLOR, linewidth=0.5)
            if col:
                # Mark the bin of the transmitted symbol.
                ax.plot(k, power[k], marker='v', color='black', markersize=6, linestyle='none')
                ax.annotate(f'Transmitted symbol (bin {k})', xy=(k, power[k]), xytext=(10, -4),
                            textcoords='offset points', fontsize=9, va='top')
        # Use the same y-axis for both panels in a row so the de-chirped spike
        # can be compared directly against the un-de-chirped spectrum.
        y_max = 1.1 * max(power.max() for power, _ in spectra)
        for ax in axes[row]:
            ax.set_ylim(0, y_max)
        axes[row, 0].set_ylabel('Power relative to\nnoise floor')

    for ax in axes[-1]:
        ax.set_xlabel('FFT bin')

    fig.suptitle(f'One LoRa symbol received at {snr_db:.0f} dB SNR')
    fig.tight_layout()
    save(fig, 'lora-dechirp-in-noise.svg')


def save(fig, filename):
    out_path = SCRIPT_DIR / filename
    fig.savefig(out_path)
    print(f'Wrote {out_path}')


def main():
    plot_symbols()
    plot_dechirp_stages()
    plot_dechirp_in_noise()


if __name__ == '__main__':
    main()
