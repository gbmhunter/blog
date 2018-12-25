---
author: gbmhunter
date: 2014-02-18 22:31:05+00:00
draft: false
title: Metastability And Synchronisation
type: page
url: /electronics/circuit-design/digital-logic/metastability-and-synchronisation
---

## Flip-flop MTBF

<div>$$ {\rm MTBF}(t_r) = \frac{e^{ \frac{t_r}{\tau} } } {T_O fa}$$</div>

<p class="centered">
	where:<br>
	\( t_r \) = resolution time (time since clock edge), \( s \)<br>
	\( f \) = sampling clock frequency, \(Hz\)<br>
	\( a \) = asynchronous event frequency, \(Hz\)<br>  
	\( \tau \) = flip-flop time constant (this is a funciton of it's transconductance), \( s \)<br>
	\( T_o \) =<br>
</p>

Typical values for a flip-flop inside an ASIC could be: `\(t_r = 2.3ns\)`, `\(\tau = 0.31ns\)`, `\(T_O = 9.6as\)`, `\(f = 100MHz\)`, and `\(a = 1MHz\)`, which gives `\(\rm MTBF = 20.1days\)`.
