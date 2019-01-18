---
title: "BLDC Motor Control"
description: "Positional sensing, trapezoidal control, sinusoidal control, sensor field orientated control, the Clark and Park transformations, PWM and more info on BLDC motor control"
tags: [ "BLDC", "motor", "trapezoidal", "sinusoidal", "FOC", "PWM", "Clark transformation", "Park transformation", "control loop", "deadtime", "feedback", "closed-loop", "maths", "enclosures", "equations", "encoder" ]
author: "gbmhunter"
date: 2012-08-02
lastmod: 2018-12-29
type: "page"
---

## Overview

The page is dedicated to how to control a **brushless DC** (BLDC) motor in an embedded system. This includes control methods for both trapezoidal and sinusoidal wound BLDC motors. There are many different ways to control a BLDC motor, from simple hall-effect based switching, to complex encoder based field-orientated control with space-vector modulation (if you have no idea what these mean, don't worry, read on).

{{< figure src="/images/2012/08/rp17-bldc-motor-nema-17.jpg" width="258px" caption="A standard-looking BLDC motor in a NEMA-17 enclosure." >}}

## Acronyms And Terminology

<div class="table-wrapper">
<table>
    <thead>
        <tr>
            <th>Subscript</th>
            <th>Parameter</th>
            <th>Units (metric)</th>
            <th>Units (imperial)</th>
        </tr>
    </thead>
<tbody>
<tr>
<td>\(T_C\)</td>
<td>Continuous Torque</td>
<td >Nm
</td>
<td >oz-in
</td>
</tr>
<tr >
<td >\(T_{PK}\)
</td>
<td >Peak Torque
</td>
<td >Nm
</td>
<td >oz-in
</td>
</tr>
<tr >
<td >\(T_{CS}\)
</td>
<td >Continuous Stall Torque
</td>
<td >Nm
</td>
<td >oz-in
</td>
</tr>
<tr >
<td >\(T_F\)
</td>

<td >Friction Torque
</td>

<td >Nm
</td>

<td >oz-in
</td>
</tr>
<tr >

<td >\(I_C\)
</td>

<td >Continuous Current
</td>

<td >A
</td>

<td >A
</td>
</tr>
<tr >

<td >\(I_{PK}\)
</td>

<td >Peak Current
</td>

<td >A
</td>

<td >A
</td>
</tr>
<tr >

<td >\(N_{nl}\)
</td>

<td >No-Load Speed
</td>

<td >rad/s
</td>

<td >rpm
</td>
</tr>
<tr >

<td >\(P_T\)
</td>

<td >Rated Power
</td>

<td >W
</td>

<td >W
</td>
</tr>
<tr >

<td >\(V_T\)
</td>

<td >Terminal Voltage
</td>

<td >V
</td>

<td >V
</td>
</tr>
<tr >

<td >\(P_I\)</td>
<td >Input Power</td>
<td >W</td>
<td >W</td>
</tr>
<tr >

<td >\(P_O\)
</td>

<td >Output Power
</td>

<td >W
</td>

<td >W
</td>
</tr>
<tr >

<td >\(K_T\)
</td>

<td >Torque Constant
</td>

<td >Nm/A
</td>

<td >oz-in/A
</td>
</tr>
<tr >

<td >\(K_E\)
</td>

<td >Back EMF Constant
</td>

<td >V/rad/s
</td>

<td >V/krpm
</td>
</tr>
<tr >

<td >\(K_M\)
</td>

<td >Motor Constant
</td>

<td >Nm/sqrt(W)
</td>

<td >oz-in/sqrt(W)
</td>
</tr>
<tr >
<td >\(J_R\)</td>
<td >Rotational Inertia</td>
<td >gram-cm^2</td>
<td >oz-in-s^2</td>
</tr>
</tbody>
</table>
</div>

## Motors

Important Parameters:

* Torque Constant: An important parameter which relates the torque to the DC current draw. All other things being equal, higher-quality motors will have a higher torque constant.
* Rated Speed: Most are rated in the range of 3000-6000rpm. The motor can be driven at slightly higher speeds than those rated by a technique that is called 'flux weakening'
* Rated Current
* Cogging torque - This is the maximum torque the motor has when it is not being driven. This causes the rotation of the axle to feel 'bumpy' if rotated by hand when it's not being driven. For smooth operation at low speeds (< 100rpm), the cogging torque has to be small (or nothing at all). You shouldn't be able to feel this 'bumpy' phenomenom on motors with small cogging torques.
* Mechanical Time Constant: The time for the motor to spin up to full speed at rated voltage. Normally between 4-10ms. High performance motors can have a time constant as low as 1ms to speed up to 30,000rpm!
* Electrical Time Constant
* Winding Inductance: High precision motors typically have lower inductance. The winding inductance has the useful property of limiting the rate of change of current through the motor, and is what allows you to use PWM to produce smooth current. The lower the inductance, the higher the PWM needed to the same current ripple.
* Number of pole pairs. The number of pole pairs is equal to the number of electrical revolutions per mechanical revolution. Typical BLDC motors have a number of pole pairs varying from 1 to 5. If the motors datasheet instead states the number of poles, this is just 2x num. pole pairs. Note that if the motor has more than 1 pole pair, **you cannot orientate the motor to a known mechanical position** without some type of feedback (hall-effect, encoder).

The 3 phases of a BLDC motor are usually labelled either A, B, C or U, V and W.

Cogging torque is due to the variation in airgap permanence or reluctance of the stator teeth and slots above the magnets as the motor rotates.

Ripple torque is the torque produces by the interaction between the stator and rotor MMF. Ripple torque is mainly due to fluctuations in the field distribution.

The motor windings can be wound to either give trapezoidal or sinusoidal feedback, which relates to the control methods mentioned further down on this page. As quoted by _Shiyoung Lee, Ph.D.,_ A COMPARISON STUDY OF THE COMMUTATION METHODS FOR THE THREE-PHASE PERMANENT MAGNET BRUSHLESS DC MOTOR),

> The simulation results verify that mismatch of the back-EMF waveform and commutation method produces ripple rich torque. Therefore, the BLDC motor and trapezoidal(six-step) commutation and the PMSM and sinusoidal commutation are the most desirable combination to produce minimum torque ripple.

So it pays to get the right motor for the right job!

## Trapezoidal vs. Sinusoidal

There are two standard ways of winding the coils. One is to produce a trapezoidal shaped BEMF, the other produces a sinusoidal shapes BEMF. Sinusoidal motors have lower torque ripple (less vibration, mechanical stress e.t.c e.t.c), but suffers from higher switching losses and greater drive complexity than a trapezoidal motor. For this reason trapezoidal motors are very common.

In a sinusoidal motor, current travels through all three windings at any point, while in a trapezoidal motor, current only flows through 2 of the 3 windings. Sinusoidal motors come under a number of names, including PMSM (permanent magnet synchronous motor), an AC servo motor, or BLAC (brushless AC, a term used by [Atmel](http://www.atmel.com/)). Trapezoidal designed motors go under the name BLDC (brushless DC).

## Positional Sensing

Because there are no brushes to switch the current in the windings (commutation), the position of the rotor relative to the stator needs to be known so that the current can be switched externally. There a three main methods for detecting where the rotor is:

1. Hall-Effect Sensors
2. An Encoder
3. Zero-crossing (aka sensor-less)

**Hall-Effect** sensors output a voltage relative the magnetic field strength (or more technically, the magnetic flux density). Three of them are spaced 120° apart from each other and designed so that their output voltage changes rapidly as the phase coils require switching. This can make the switching electronics easy to implement. Be careful, some hall-effect sensors can be open-drain, even though the motor's datasheet suggest that the output is fully driven!

The [encoder](/electronics/components/encoders) method uses, well, an encoder attached to the axle to determine rotor position. This is more complex than the hall-effect method as the encoder output requires decoding. The encoder is typically of the incremental quadrature type, which requires a counter to count the pulses and a phase detection logic to determine the direction. This feedback method can also suffer from glitches which causes the encoder count to drift from the correct value. The [PSoC microcontroller](/programming/microcontrollers/psoc) has a very nice quadrature decoding component with built-in glitch filtering.

**Zero-crossing** has become popular in recent years due to the fact it requires no sensors, making it cheap to implement. It is the method of measuring the voltage of the floating winding during operation (1 winding is always undriven), to determine the position of the rotor. One disadvantage of this method it does not work below a minimum speed (because the voltage is too small).

## Trapezoidal Control

A common example of a trapezoidal (or block) commutation cycle of a BLDC motor with hall-sensor feedback is shown in the below table. This will drive the motor in one particular direction. This can be used to form a LUT for quick hardware/software commutation.

<div class="table-wrapper">
<table>
    <thead>
        <tr>
            <th colspan="6">Commutation Table</th>
        </tr>
    </thead>
    <tbody >
        <tr >
            <td colspan="3">Sensor Output</td>
            <td colspan="3">Driver Input</td>
        </tr>
        <tr >
            <td>HS1</td>
            <td>HS2</td>
            <td>HS3</td>
            <td>A</td>
            <td>B</td>
            <td>C</td>
        </tr>
        <tr >
            <td>0</td>
            <td>0</td>
            <td>1</td>
            <td>X</td>
            <td>HI</td>
            <td>LO</td>
        </tr>
        <tr >
            <td>0</td>
            <td>1</td>
            <td>1</td>
            <td>HI</td>
            <td>X</td>
            <td>LO</td>
        </tr>
        <tr >
            <td>0</td>
            <td>1</td>
            <td>0</td>
            <td>HI</td>
            <td>LO</td>
            <td>X</td>
        </tr>
        <tr >
            <td>1</td>
            <td>1</td>
            <td>0</td>
            <td>X</td>
            <td>LO</td>
            <td>HI</td>
        </tr>
        <tr >
            <td>1</td>
            <td>0</td>
            <td>0</td>
            <td>LO</td>
            <td>X</td>
            <td>HI</td>
        </tr>
        <tr >
            <td>1</td>
            <td>0</td>
            <td>1</td>
            <td>LO</td>
            <td>HI</td>
            <td>X</td>
        </tr>
    </tbody>
</table>
</div>

where H1, H2, and H3 are the hall-effect sensors, and A, B, and C are the motor phases of a 3-phase star-connected BLDC motor. Note that the either the high-side, low-side, or both driver inputs can be modulated with a PWM signal to provide speed control.

{{< figure src="/images/2012/08/hall-effect-interrupts-from-bldc-motor-for-both-rise-and-fall.png" width="550px" caption="6 PSoC interrupts to service the three hall-effect inputs from a BLDC motor. Six interrupts are required because the PSoC interrupt component only supports rising-edge triggering, and so a inverting gate and second interrupt per sensor is required to trigger on falling-edge."  >}}

The schematic below shows the hardware used in a PSoC 5 microcontroller to perform hall-effect based trapezoidal commutation. With the correct mux selects, this control method can run completely from hardware and be completely processor independent (when running at a constant duty-cycle).

{{< figure src="/images/2012/08/psoc-bldc-schematic-luts-and-multiplexors-for-phase-drive.png" caption="A PSoC schematic containing LUT's and multiplexors for trapezoidal-control of a BLDC motor.">}}

## Sinusoidal Control

The benefits:

* Smoother operation/less torque ripple than trapezoidal
* Greater efficiency/less heat dissipation
* Able to run the motor at slower speeds

The disadvantages:

* Complex control
* Embedded firmware uses more flash/ROM space
* More processing power used
* Slightly lower maximum torque (although third-harmonic injection can reduce this)
* Hall-effect feedback becomes insufficient at low speed with varying loads, and optical encoders are preferred
* Back EMF feedback is not possible

Sinusoidal control (also known as voltage-over-frequency control) is more complex than trapezoidal techniques, but offers smoother operation and better control at slow speeds.

Look-up tables (LUTs) are recommended over using the `sin()` function due to speed issues. The `sin()` function in C is computationally intensive and can easily create delays that effect the performance of the control algorithm. The implementation of the `sin()` is platform dependent, but for example, using the GCC compiler on a PSoC 5 Cortex-M3 processor, calculating the `sin()` function three times (once for each phase), took approximately 24,000 clock cycles. With a processor running at 48MHz, this is about a 500us delay. Considering a 4-pole BLDC motor spinning at 6000rpm takes about 830us to move between commutation states. In each commutation cycle you want at least 6-bit resolution (64 PWM changes), and as you can see, the delay in calculating `sin()` is far too large.

With a LUT that stores floats, and a small amount of float multiplication (no divide) on a embedded processor that does not have floating point hardware support (such as the ARM Cortex-M3), you could expect the look-up and assign process to take around 500-1000 clock cycles (maybe 20us at 48MHz). This is a big reduction over using the `sin()` function!

{{< figure src="/images/2012/08/16-bit-500-count-sine-wave-lut-data-graph-1.png" width="1069px" caption="Data extracted from a 16-bit sine wave LUT designed for use with sinusoidal BLDC motor control."  >}}

Phase displacement. Sinusoidal control requires three PWM signal's, preferably dual-output with adjustable dead-time for synchronous switching.

## Example LUT Code

The following code is an example of how to create a LUT in the C programming language. This function calculates the LUT values at run-time, using the `sin()` function. In space constrained applications it may pay to pre-calculate the values and save them directly into flash. More help with the C language can be found [here](/programming/languages/c).

```c
#include <math.h>

#define configBLDC_MAX_SINE_LUT_VALUE (1000)
#define configNUM_SINE_LUT_ENTRIES (500)

float _sineWaveLut[configNUM_SINE_LUT_ENTRIES] = {0};

//! @brief Populates the sine LUT
//! @details The sine LUT is placed in RAM for fast access.
//! Call as part of the initialisation sequence.
//! Shifts sinewave so that values never go negative,
//! making it easy in ISR to multiply by scaling factor to get duty cycle
//! @note Not thread-safe. Call from Bldc_MainTask() only.
//! @private
void Bldc_FillSineLut(void) {
    uint16_t i = 0;
    // Populate LUT
    for(i = 0; i < configNUM_SINE_LUT_ENTRIES; i++) {
        double radians = (((double)i/(double)configNUM_SINE_LUT_ENTRIES)*360.0)*(configPI/180.0);
        _sineWaveLut[i] = (configBLDC_MAX_SINE_LUT_VALUE/2.0)*sin(radians) + (configBLDC_MAX_SINE_LUT_VALUE/2.0);
    }
}
```

## Third-Harmonic Injection

With a pure phase-neutral sinusoidal drive, the maximum phase-to-phase voltage is only roughly `\(0.86V_{bus}\)`. This can be improved by 'injecting' the sine wave with the third harmonic. The first thing you may think is, won't this disrupt my nice and smooth sine wave control? Well, no, because as it happens, the third harmonic is in-phase with every winding (which are 120 apart), and since it is applied to every winding, the phase-to-phase waveform does not change. It does however flatten the phase-neutral waveform, making the PWM become under-modulated. You can then scale this back up to full-modulation, and gives approximately a 16% phase-to-phase voltage increase.

To implement third-harmonic injection, all you have to do is add the third-harmonic to the sine-wave LUT. The third-harmonic has an amplitude that is 1/6 of that of the fundamental (your original sine wave). You'll notice that the maximum value in the LUT has decreased. At this point, scale up all the values in the LUT so they use the full-range again.

## Sensor Field Orientated Control (FOC)

The benefits:

* You can control motor parameters which relate directly to it's physical behaviour (the variables make sense to a human)
* Angle can be determined from phase currents (usually using a sliding state estimator), no encoder needed

The disadvantages:

* Greater control complexity than trapezoidal or sinusoidal
* Requires fast processor to execute necessary maths
* Requires phase current to be measured (usually with low-side current sense resistors and an ADC)
* Requires the tuning of three PID loops (usually)

Sensor field orientated control (also called vector control) is a permanent magnet motor control method that allows one to regulated both the speed and torque independently from each other. However, this form of control is more computationally intensive than trapezoidal or sinusoidal. Part of the complexity is due to the need to be able to measure both the current going through the windings, while both trapezoidal and sinusoidal only requires positional feedback. Clark (aka alpha-beta) and Park transforms (aka d-q) have to be calculated with the phase currents.

## The Clark Transformation (alpha-beta)

The Clark transformation (also called the `\(\alpha \beta\)` transformation, and occasionally called the Concordia transformation, but I don't know why!) is the projection of three separate sinusoidal phase values onto a stationary 2D axis.

The unsimplified Clark transformation equation is shown below:

<div>$$  
I_{\alpha\beta\gamma} = TI_{abc} = \frac{2}{3} \begin{bmatrix} 1 & -\frac{1}{2} & -\frac{1}{2} \\ 0 & \frac{\sqrt{3}}{2} & -\frac{\sqrt{3}}{2} \\ \frac{1}{2} & \frac{1}{2} & \frac{1}{2} \end{bmatrix} \begin{bmatrix} I_a \\ I_b \\ I_c \end{bmatrix}  
$$</div>

<p class="centered">
    where:<br>
    \(I_a\) = current in motor winding A<br>
    \(I_b\) = current in motor winding B<br>
    \(I_c\) = current in motor winding C<br>
    \(I_{\alpha\beta\gamma}\) = the Clark transformed currents<br>
</p>

We are fortunate that when using a star-connected BLDC motor (most are!), `\(I_c\)` is 0, so that we can simplify the equation to:

<div>$$ I_{\alpha\beta} = TI_{ab} = \begin{bmatrix} 1 & 0 \\ \frac{1}{\sqrt{3}} & \frac{2}{\sqrt{3}} \end{bmatrix} \begin{bmatrix} I_a \\ I_b \end{bmatrix}$$ </div>

{{< figure src="/images/2012/08/clark-transformation-alpha-beta-geometric-interpretation.gif" width="516px" caption="A geometric interpretation of the Clark (alpha-beta) transformation. Image from http://en.wikipedia.org/wiki/%CE%91%CE%B2%CE%B3_transform."  >}}

If you want the code to do the Clark Transformation (written in C++, and designed for embedded applications), check out the GitHub repository [Cpp-ClarkTransformation](https://github.com/gbmhunter/Cpp-ClarkTransform).

## The Park Transformation (dq)

Park transformation is a projection of three separate sinusoidal phase values onto a rotating 2D axis. The rotating axis (d, q) of the Park transformation rotates at the same speed as the rotor. When the projection occurs, the currents `\(I_d\)` and `\(I_q\)` remain constant (when the motor is at steady-state). It just so happens that `\(I_d\)` controls the magnetizing flux, while `\(I_q\)` controls the torque, and since both parameters are separate, we can control each individually!

The Park transformation equation is shown below:

<div>$$ I_{dqo} = TI_{abc} = \sqrt{\frac{2}{3}} \begin{bmatrix} \cos(\theta) & \cos(\theta - \frac{2\pi}{3}) & \cos(\theta + \frac{2\pi}{3}) \\ -\sin(\theta) & -\sin(\theta - \frac{2\pi}{3}) & -\sin(\theta + \frac{2\pi}{3}) \\ \frac{\sqrt{2}}{2} & \frac{\sqrt{2}}{2} & \frac{\sqrt{2}}{2} \end{bmatrix} \begin{bmatrix} I_a \\ I_b \\ I_c \end{bmatrix}$$</div>

<p class="centered">
    where:<br>
    \(I_a\) = current in motor winding A<br>
    \(I_b\) = current in motor winding B<br>  
    \(I_c\) = current in motor winding C<br>
    \(I_{dqo}\) = the Park transformed currents
 </p>

{{< figure src="/images/2012/08/park-transformation-d-q-geometric-interpretation.jpg" width="976px" caption="A geometric interpretation of the Park (dq) transformation. Image from http://en.wikipedia.org/wiki/Dqo_transformation."  >}}

If you want the code to do the Park Transformation (written in C++, and designed for embedded applications), check out the GitHub repository [Cpp-ParkTransformation](https://github.com/gbmhunter/Cpp-ParkTransform).

## The Control Loop

The following picture shows the control architecture for a PMSM motor controlled with a PSoC microcontroller.

{{< figure src="/images/2012/08/pmsm-motor-control-architecture-with-psoc-micro.png" width="1372px" caption="The FOC control architecture for a PMSM motor with a PSoC microcontroller."  >}}

It is standard practice to set `\(I_q\)` to some value depending on the torque/speed required, while keeping `\(I_d\)` zero. This is because `\(I_d\)` does nothing to help make the motor spin, and just wastes electrical energy as heat. However, there is a technique called flux weakening, and this is done by making `\(I_d\)` negative. It will allow the motor to spin faster than it's rated speed, in a zone called 'constant power'. I have had good experiences at using this to squeeze more RPM out of BLDC motors that weren't requiring much torque. A good method is to make `\(I_d\)` proportional to `\(I_q\)` (but always negative, no matter what sign `\(I_q\)` is, which essentially gives you a fixed drive is angle which is over 90. You can use this equation to work out the proportion of `\(I_q\)` that `\(I_d\)` has to be for a certain angle.

<div>$$r = \tan (\theta)$$</div>

<p class="centered">
    where:<br>
    \(r\) = ratio (\(I_d = rI_q\))<br>
    \(\theta\) = drive angle<br>
</p>

FOC typically requires three PID loops, one medium-speed loop for controlling the velocity and two high-speed loops for controlling `\(I_d\)` and `\(I_q\)`.

The are two methods to measure the phase currents. The first involves just one current sense resistor on the DC return path from the motor, while the second requires three current-sense resistors, one on each leg of the three-phase bridge controlling the motor.

The dynamic equations for FOC linking voltages, currents and torques are:

<div>$$  
    v_{q} = r_{s}i_{q} + L_{q}\frac{di_{q}}{dt} - w_{e}L_{d}i_{d} + w_{e}\lambda_{f} \\ \\  
    v_{d} = r_{s}i_{d} + L_{d}\frac{di_{d}}{dt} - w_{e}L_{q}i_{q} \\ \\  
    T_{m} = \frac{3}{2}\frac{P}{2}[\lambda_{f}i_{q} + (L_{d} - L_{q})i_{d}i_{q}] \\ \\  
$$</div>

During constant flux operation (which is normal operation, all the flux is created by the permanent magnets), `\(I_d\)` becomes 0. This simplifies the torque equation into that similar to a brushed DC motor as:

<div>$$ T_{m} = \frac{3}{2}\frac{P}{2}\lambda_{f}i_{q} = K_{T}i_{q} $$</div>

## Equations

<div>$$  
    \text{Field Orientated Control:} \\ \\  

    |V_{abc}| = R|I_{abc}| + \frac{d}{dt}|\Phi_{abc}| \text{Lenz-Faraday model}\\ \\  

    R = \text{statoric resistance}  

    |V_{abc}| = \begin{bmatrix}v_a & v_b & v_c \end{bmatrix}^T = \text{statoric voltages,} \\ \\  

    |I_{abc}| = \begin{bmatrix} i_a & i_b & i_c \end{bmatrix}^T = \text{statoric currents,} \\ \\  

    |\Phi_{abc}| = \begin{bmatrix} \Phi_a & \Phi_b & \Phi_c \end{bmatrix} = \text{global fields} \\ \\  
 $$</div>

## PWM Frequency

So what PWM frequency do I choose? The PWM frequency is a trade-off between torque ripple and switching losses. Most controllers use a frequency between 10-20kHz. If you want to reduce the audible noise from the motor, try using a frequency between 17-20kHz (outside the audible range of most adults).

## Deadtime

Dead-time is only important if you are going synchronous rectification (i.e. switching on the MOSFET rather than letting the body diode conduct when current is flowing through it in the reverse direction). In this case, during the off-time of the PWM signal, the complementary (on the same leg of the bridge) MOSFET(s) to those that are being switched are turned on. This allows the reverse current that would be usually be flowing through the inherent body diodes to instead flow through the MOSFET, resulting in lower heat losses (MOSFET's have a lower on 'resistance' than diodes). Dead-time between turning on the leg MOSFET's off and the other on is needed to prevent shoot-through.

Note that if the duty-cycle of the PWM causes either the on or off-time to be less than the dead-time, it will appear as if the PWM stops working. This will happen at it's two duty cycle extremes (at the top and bottom of the sine wave). Don't be alarmed, this is normal and totally acceptable behaviour.

## Open-Loop Feedback

Fully open-loop control (no hall-effect, encoder, or BEMF feedback) can be used in applications where torque ripple and efficiency are not important. The load has to be also relatively constant for this to work.

## Closed-Loop Voltage Feedback

Closed-loop voltage control is when feedback is used to commutate the current's, and the PWM duty cycle is varied from 0-100% to control the speed of the motor (but with no velocity control).  With this method, you have full control of the motors speed from 0-100%, but the motor's speed may vary as the load changes. As the load is increased, the current will increase, and the rpm of the motor will drop. It is called 'voltage' control because you can set the PWM duty cycle, which determines the voltage across the windings.

## Closed-Loop Velocity Feedback

Closed-loop velocity control involves controlling the rpm of the motor to a desired speed. The maximum currents must be taken into consideration when doing constant velocity control, as they may get very large if the motor stalls.

**Feedback Can Come From:**

* Hall-effect sensors (o.k.)
* [Optical encoder](/electronics/components/encoders) (better, especially at slow speeds)
* Back E.M.F (good, but not at slow speeds)

**Control Methods:**

* [PID](/programming/general/pid-control) PWM Control (soft or hard-chopping)

## Closed-Loop Current Feedback

Closed-loop current control will give you a constant output torque. This means that the motor will slow down when the load is increased, and speed up when it is decreased.

**Feedback Can Come From:**

* Low-side [current sense resistors](/electronics/components/resistors) and single-sided ADC
* High-side [current sense resistors](/electronics/components/resistors) and a differential ADC

**Control Methods:**

* [PID](/programming/microcontrollers/general/pid-control) PWM Control

## Sliding Mode Observer

Used to provide estimates on the position and speed of the rotor when not using encoder or hall-based feedback.

## Controller Bandwidth

Controller bandwidth is an important term which is used to define the update rate or speed of a particular control section for a motor. It is usually referred to when talking about the "Current Controller Bandwidth", a control loop that measures the phase currents of a brushless motor and updates the control variable accordingly (usually with a PID loop). This is commonly used with FOC control and SVM. Slow current controller bandwidths are around 300Hz, while faster bandwidths are in the 10-50kHz range (which updates the duty at the same speed as the PWM itself!). Higher current controller bandwidths are needed for lower torque ripple and slower motion (1-50rpm).

## Code Execution Time

The execution time of the code which controls the PWM duty cycle is critical, especially when using sinusoidal or sensor field orientated control. Here are the best ways of making sure the code runs quickly

* Do not use the `sin()` function, instead use a LUT
* Do not use any division operators (instead, convert to a double, and multlply by the inverse, if inverse is already known or can be computed more quickly than a normal division) e.g. `number1*(1/number2)`
* Using fixed-point arithmetic rather than floats or doubles.  

 I have an [open-source fixed-point library](https://github.com/gbmhunter/Cpp-FixedPoint) designed for running on embedded systems.
* Try to minimise function calls. Use the inline parameter if possible
* Precalculate any maths that can be done before-hand
* Make sure the compiler optimises for speed, not space

See the [C Programming page](/programming/languages/c) for more help on this subject.

## BLDC Maths

Some useful equations...

<div>$$  

 \text{Basic Motor Control:} \\ \\  

 v_{rot} (Hz) = \frac{rpm}{60} \\ \\  

 \text{Commutation Cycles Per Second} = \frac{v_{rot}}{6} \\ \\  

 \text{num. electrical cycles per mechanical cycle} = \text{num. pole pairs} = \frac{\text{num. poles}}{2}\\ \\  

 \\ \\  

 \text{Sinusoidal Control:} \\ \\  

 V_{phase-neutral} = \frac{V_{bus}}{2} \\ \\  

 V_{phase-phase} = \frac{\sqrt{3}}{2}*V_{bus} \\ \\  

 V_{third-harmonic} = \frac{1}{6}V_{fundamental} \\ \\  

 $$</div>

Flux = Magnetic field lines per unit area

## Related IC's

FSB50825US - Fairchild Smart Power Module (SPM)  

 Package: [SPM-23](/electronics/circuit-design/component-packages#spm23)  

 Shoot-through Protection: No  

 Onboard Logic: None (micorcontroller required)

## Standard Enclosures

The NEMA17 and NEMA23 are two common sizes that BLDC motors come in. This designation defines the mounting hole pattern for the motor.

The NEMA17 mounting hole dimensions are shown below. The dimensions are in millimeters.

{{< figure src="/images/2012/08/nema-17-motor-mounting-dimensions.jpg" width="497px" caption="The NEMA17 mounting hole dimensions .The dimensions are in millimeters. Image from http://www.xylotex.com/FAQ.htm."  >}}

The NEMA23 mounting hole dimensions are shown below. The dimensions are in inches.

{{< figure src="/images/2012/08/nema-23-motor-mounting-dimensions.jpg" width="595px" caption="The NEMA23 mounting hole dimensions .The dimensions are in inches. Image from http://www.xylotex.com/FAQ.htm."  >}}

## External Resources

One of the best documents that I've seen about BLDC motor theory is [James Robert Mevey's "Sensorless Field Orientated Control Of Brushless Permanent Magnet Synchronous Motors"](http://krex.k-state.edu/dspace/bitstream/handle/2097/1507/JamesMevey2009.pdf). Click [here](/docs/James Mevey - Sensorless Field Orientated Control Of Brushless Permanent Magnet Synchronous Motors.pdf) to download a local version.

The second best is MicroChips [AN885 - Brushless DC (BLDC) Motor Fundamentals](http://ww1.microchip.com/downloads/en/AppNotes/00885a.pdf).

And then once you've read those, check out [AN857 - Brushless DC Motor Control Made Easy](http://ww1.microchip.com/downloads/en/appnotes/00857a.pdf). This links the theory with a practical implementation of the hardware and firmware, supported with examples.

A competing document is NXP's [AN10661 - Brushless DC Motor Control Using The LPC2141](http://www.nxp.com/documents/application_note/AN10661.pdf). For the visual learners, this one has more colourful pictures than Microchip's, but it has less depth.

RoboTeq ([www.roboteq.com](http://www.roboteq.com/)) have some very cool BLDC motor controllers. They are highly configurable, offer a huge number of features, and can drive very powerful motors (+100A).

If your a fan of animations (who isn't, visual learning rocks!), then check out Nanotech's Stepper/BLDC animations ([http://en.nanotec.com/support/tutorials/stepper-motor-and-bldc-motors-animation/](http://en.nanotec.com/support/tutorials/stepper-motor-and-bldc-motors-animation/)). A flash program which allows you visually watch the motors operation as you step through commutation cycles. Also let's you change the type of motor!

If you want to delve into the arena of Sensor Field Orientated control, the Atmel's [AVR32723 - Sensor Field Orientated Control For Brushless DC Motors with AT32UC3B0256](http://www.atmel.com/Images/doc32126.pdf) should be the first port of call. "[Brushless Permanent Magnet Servomotors](http://cdn.intechopen.com/pdfs/34404/InTech-Brushless_permanent_magnet_servomotors.pdf)" is a good article explaining the differences between BLDC motors and PMSM's, as well as equations for FOC.
