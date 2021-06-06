import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import scipy.signal

def main():
    number_samples = 1000
    sample_rate_Hz = 10e3
    nyquist_freq_Hz = sample_rate_Hz/2
    end_time_s = number_samples/sample_rate_Hz

    # noise = white_noise(rho=rho, sr=sr, n=number_samples)
    time_s = np.linspace(0, end_time_s, number_samples)
    spectral_noise_density_VsqHz = 10e-3
    noise = white_noise(spectral_noise_density_VsqHz, sample_rate_Hz, number_samples)

    fig, axes = plt.subplots(1, 1, figsize=(10, 7), squeeze=False)

    # Create a plot of the noise
    ax = axes[0][0]
    ax.plot(time_s, noise, label=f'${spectral_noise_density_VsqHz*1000:.0f}mV\sqrt{{Hz}}$ white noise, in a bandwidth of 0-{nyquist_freq_Hz/1000:.0f}kHz')
    ax.set_xlabel('Time (s)')
    ax.set_ylabel('Voltage (V)')
    ax.legend()
    plt.savefig('white-noise.png')

    # FFT the noise
    noise_fft = scipy.fft.fft(noise)
    fig, axes = plt.subplots(1, 1, figsize=(10, 7), squeeze=False)

    # Create a plot of the noise
    ax = axes[0][0]
    ax.plot(time_s, noise_fft, label=f'${spectral_noise_density_VsqHz} V\sqrt{{Hz}}$ white noise')
    ax.set_xlabel('Time (s)')
    ax.set_ylabel('Voltage (V)')
    ax.legend()
    plt.savefig('white-noise-fft.png')

def white_noise(rho, sr, n, mu=0):
    """
    Args: 
    rho - spectral noise density unit/SQRT(Hz)
    sr  - sample rate
    n   - no of points
    mu  - mean value, optional

    Returns:
        n points of noise signal with spectral noise density of rho
    """
    sigma = rho * np.sqrt(sr/2)
    noise = np.random.normal(mu, sigma, n)
    return noise

def awgn(s, SNRdB, L=1):
    """
    AWGN channel
    Add AWGN noise to input signal. The function adds AWGN noise vector to signal 's' to generate a resulting signal vector 'r' of specified SNR in dB. It also
    returns the noise vector 'n' that is added to the signal 's' and the power spectral density N0 of noise added
    Parameters:
        s : input/transmitted signal vector
        SNRdB : desired signal to noise ratio (expressed in dB) for the received signal
        L : oversampling factor (applicable for waveform simulation) default L = 1.
    Returns:
        n : Noise. To add the noise to the signal, just use r=s+n
    """
    gamma = 10**(SNRdB/10) #SNR to linear scale
    if s.ndim==1:# if s is single dimensional vector
        P = L*np.sum(abs(s)**2)/len(s) #Actual power in the vector
    else: # multi-dimensional signals like MFSK
        P = L*np.sum(np.sum(abs(s)**2))/len(s) # if s is a matrix [MxN]
    N0 = P/gamma # Find the noise spectral density
    if np.isrealobj(s):# check if input is real/complex object type
        n = np.sqrt(N0/2)*np.random.standard_normal(s.shape) # computed noise
    else:
        n = np.sqrt(N0/2)*(np.random.standard_normal(s.shape) + 1j*np.random.standard_normal(s.shape))
    return n

if __name__ == '__main__':
    main()