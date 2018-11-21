---
author: gbmhunter
date: 2018-06-02 23:48:53+00:00
draft: false
title: Fast Fourier Transforms (FFTs)
type: page
url: /programming/signal-processing/fast-fourier-transforms-ffts
---

[mathjax]




# Overview




A fast fourier transform is a way of calculating the DFT (discrete fourier transform) of a signal. A fourier transform is a way of looking at a waveform in the time domain to see what frequencies it is made up of. A fast fourier transform differentiates itself apart from a standard fourier transform by factorizing the DFT matrix into a produce of sparse (mostly zero) factors. This actions reduces the complexity of the DFT algorithm from \(O(n^2)\) to \(O(n\ log\ n)\). This speed increase means that the FFT is very popular in signal processing applications.




# Bin Size




The width of each bin (in Hertz) is equal to:




$$ f_{bin-width} = f_s / N_{bins} $$




where:  

\( f_s \) is the sample rate, in Hertz  

\( N_{bins} \) is the number of bins




The bins of interest are those from 0 to \( \frac{N_{bins}}{2} \).




# **Sampling Rate**




By the Nyquist-Shannon sampling theorem, if the sampling rate is say, 10kHz, then the maximum captured frequency content will be 5kHz. This is true when using FFTs.




However, sampling just at the Nyquist rate does not give you great data. As a rule-of-thumb, if you want to accurately find the frequencies present in a signal with a reasonably low number of samples, the sample rate should be about 10x the maximum frequency of interest.




# Number of Samples




FFT algorithms require a number of samples which is equal to an integer power of two (e.g. 2, 4, 8, 16, ...).




# Frequency vs. Temporal Resolution




There is always a trade-off between frequency and temporal (time based) resolution. At a fixed sample rate, increasing the frequency resolution decreases the temporal resolution. To increase the frequency resolution, you have to increase the number of bins. This will make a single FFT window take longer to run, which decreases the temporal resolution (all temporal info within a single FFT window is lost).




# Aliasing




# Windowing




A FFT samples a waveform to a finite length (you don't/can't measure the signal for time negative infinity to positive infinity) in what is called the window. An FFT algorithm also assumes the signal within the window repeats forever. With most real-world signals, this will result in discontinuities at the edges of the window (the only time this does not happen is if the signal repeats itself, and the window happens to contain an exact integer number of cycles).




If nothing is done to the edges of the window, you will get significant **spectral leakage**. One way to reduce the spectral leakage is to perform windowing, in where the signal is faded in and out in the first few/last few samples.




# Code Libraries




The opensource [Math.Net Numerics library](http://numerics.mathdotnet.com/) contains C# FFT code built for the .NET framework.




# External Resources




[The Fourier Transform series on The Mobile Studio](http://www.themobilestudio.net/the-fourier-transform-part-1) must be one of the best online resources if you are looking into learning more about the Fourier Transform. It is a very detailed yet well explained step-by-step tutorial!
