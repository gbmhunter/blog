---
author: gbmhunter
date: 2014-02-18 22:31:05+00:00
draft: false
title: Metastability And Synchronisation
type: page
url: /electronics/circuit-design/digital-logic/metastability-and-synchronisation
---





# Flip-flop MTBF





$$ {\rm MTBF}(t_r) = \frac{e^{ \frac{t_r}{\tau} } } {T_O fa}$$





	where:  

	\( t_r \) = resolution time (time since clock edge), \( s \)  

	\( f \) = sampling clock frequency, \(Hz\)  

	\( a \) = asynchronous event frequency, \(Hz\)  

	\( \tau \) = flip-flop time constant (this is a funciton of it's transconductance), \( s \)  

	\( T_o \) =   







Typical values for a flip-flop inside an ASIC could be: \(t_r = 2.3ns\), \(\tau = 0.31ns\), \(T_O = 9.6as\), \(f = 100MHz\), and \(a = 1MHz\), which gives \(\rm MTBF = 20.1days\).
