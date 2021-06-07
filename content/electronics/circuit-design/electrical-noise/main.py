import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import scipy.signal
from numpy import sqrt, newaxis
from numpy.fft import irfft, rfftfreq
from numpy.random import normal
from numpy import sum as npsum

def main():
    number_samples = 10000
    sample_rate_Hz = 10e3
    nyquist_freq_Hz = sample_rate_Hz/2
    end_time_s = number_samples/sample_rate_Hz

    data = []
    # noise = white_noise(rho=rho, sr=sr, n=number_samples)
    time_s = np.linspace(0, end_time_s, number_samples)
    spectral_noise_density_VsqHz = 10e-3
    
    data.append({
        'id': 'white',
        'name': 'White Noise',
        'time_s': time_s,
        'voltage_V': white_noise(spectral_noise_density_VsqHz, sample_rate_Hz, number_samples),
    })

    pink_noise_time_domain = powerlaw_psd_gaussian(1, number_samples)
    pink_noise_time_domain = pink_noise_time_domain*10e-3 # Scale to 10mV variance
    data.append({
        'id': 'pink',
        'name': 'Pink Noise',
        'time_s': time_s,
        'voltage_V': pink_noise_time_domain,
    })

    red_noise_time_domain = powerlaw_psd_gaussian(2, number_samples)
    red_noise_time_domain = red_noise_time_domain*10e-3 # Scale to 10mV variance
    data.append({
        'id': 'red',
        'name': 'Red Noise',
        'time_s': time_s,
        'voltage_V': red_noise_time_domain,
    })


    for element in data:
        voltage_V = element['voltage_V']
        fig, axes = plt.subplots(1, 1, figsize=(10, 7), squeeze=False)
        ax = axes[0][0]
        ax.plot(time_s, voltage_V, label=f'${spectral_noise_density_VsqHz*1000:.0f}mV\sqrt{{Hz}}$ {element["id"]} noise, in a bandwidth of 0-{nyquist_freq_Hz/1000:.0f}kHz')
        ax.set_xlabel('Time (s)')
        ax.set_ylabel('Voltage (V)')
        ax.legend()
        plt.savefig(f'noise-{element["id"]}-time-domain.png')

        noise_freq_domain = scipy.fft.fft(voltage_V)
        noise_freq_domain_mag_V = np.abs(noise_freq_domain)
        noise_freq_domain_mag_dB = 20*np.log10(noise_freq_domain_mag_V/np.max(noise_freq_domain_mag_V))
        xf = scipy.fft.fftfreq(number_samples, 1/sample_rate_Hz)
        fig, axes = plt.subplots(1, 1, figsize=(10, 7), squeeze=False)
        ax = axes[0][0]
        ax.plot(xf[0:number_samples//2], noise_freq_domain_mag_dB[0:number_samples//2], label=f'${spectral_noise_density_VsqHz*1000:.0f}mV\sqrt{{Hz}}$ {element["id"]} noise, in a bandwidth of 0-{nyquist_freq_Hz/1000:.0f}kHz')
        ax.set_xlabel('Frequency (Hz)')
        ax.set_ylabel('Voltage Magnitude (dB)')
        ax.legend()
        plt.savefig(f'noise-{element["id"]}-freq-domain.png')


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

  
"""Generate colored noise."""




def powerlaw_psd_gaussian(exponent, size, fmin=0):
    """
    Taken from https://github.com/felixpatzelt/colorednoise/blob/master/colorednoise.py
    Gaussian (1/f)**beta noise.
    Based on the algorithm in:
    Timmer, J. and Koenig, M.:
    On generating power law noise.
    Astron. Astrophys. 300, 707-710 (1995)
    Normalised to unit variance
    Parameters:
    -----------
    exponent : float
        The power-spectrum of the generated noise is proportional to
        S(f) = (1 / f)**beta
        flicker / pink noise:   exponent beta = 1
        brown noise:            exponent beta = 2
        Furthermore, the autocorrelation decays proportional to lag**-gamma
        with gamma = 1 - beta for 0 < beta < 1.
        There may be finite-size issues for beta close to one.
    shape : int or iterable
        The output has the given shape, and the desired power spectrum in
        the last coordinate. That is, the last dimension is taken as time,
        and all other components are independent.
    fmin : float, optional
        Low-frequency cutoff.
        Default: 0 corresponds to original paper. It is not actually
        zero, but 1/samples.
    Returns
    -------
    out : array
        The samples.
    Examples:
    ---------
    # generate 1/f noise == pink noise == flicker noise
    >>> import colorednoise as cn
    >>> y = cn.powerlaw_psd_gaussian(1, 5)
    """
    
    # Make sure size is a list so we can iterate it and assign to it.
    try:
        size = list(size)
    except TypeError:
        size = [size]
    
    # The number of samples in each time series
    samples = size[-1]
    
    # Calculate Frequencies (we asume a sample rate of one)
    # Use fft functions for real output (-> hermitian spectrum)
    f = rfftfreq(samples)
    
    # Build scaling factors for all frequencies
    s_scale = f
    fmin = max(fmin, 1./samples) # Low frequency cutoff
    ix   = npsum(s_scale < fmin)   # Index of the cutoff
    if ix and ix < len(s_scale):
        s_scale[:ix] = s_scale[ix]
    s_scale = s_scale**(-exponent/2.)
    
    # Calculate theoretical output standard deviation from scaling
    w      = s_scale[1:].copy()
    w[-1] *= (1 + (samples % 2)) / 2. # correct f = +-0.5
    sigma = 2 * sqrt(npsum(w**2)) / samples
    
    # Adjust size to generate one Fourier component per frequency
    size[-1] = len(f)

    # Add empty dimension(s) to broadcast s_scale along last
    # dimension of generated random power + phase (below)
    dims_to_add = len(size) - 1
    s_scale     = s_scale[(newaxis,) * dims_to_add + (Ellipsis,)]
    
    # Generate scaled random power + phase
    sr = normal(scale=s_scale, size=size)
    si = normal(scale=s_scale, size=size)
    
    # If the signal length is even, frequencies +/- 0.5 are equal
    # so the coefficient must be real.
    if not (samples % 2): si[...,-1] = 0
    
    # Regardless of signal length, the DC component must be real
    si[...,0] = 0
    
    # Combine power + corrected phase to Fourier components
    s  = sr + 1J * si
    
    # Transform to real time series & scale to unit variance
    y = irfft(s, n=samples, axis=-1) / sigma
    
    return y

if __name__ == '__main__':
    main()