---
authors: [ "Geoffrey Hunter" ]
categories: [ "Electronics", "Electronic Components" ]
date: 2011-09-05
description: "Schematic symbol, example circuits, equations, applications and more info about operational amplifiers (op-amps)."
draft: false
lastmod: 2021-03-23
tags: [ "op-amps", "schematic symbols", "analogue", "analog", "operational amplifiers", "inverting", "buffers", "non-inverting", "components", "gain", "voltage followers", "offset nulling", "input offset voltages", "instrumentation amplifiers", "capacitive loading", "current sources", "quiescent currents", "GBW", "slew rates", "negative impedance converters", "NICs" ]
title: "Op-Amps"
type: "page"
---

## Overview

At it's most basic level, an _operational amplifier_ (op-amp) is a **discrete analogue integrated circuit which acts as a voltage-amplifier with very high gain**.

An op-amp's gain can be adjusted with the appropriate external circuitry (the op-amp's internal gain does not change, but the gain of the entire circuit does). This is almost always done for any op-amp that is used as an amplifier. External circuitry can also manipulate the op-amp to act as as a current amplifier or perform "mathematical" operations on signals.

## Schematic Symbol

An op-amp is commonly drawn on schematics as:

{{< img src="op-amp-basic-schematic-symbol.png" width="335px" caption="The basic schematic symbol for an op-amp."  >}}

You may see this symbol with or without the voltage supply pins `\( V_{S+} \)` and `\( V_{S-} \)`. If they are not present, it is assumed that they are connected up to a power source which should be obvious from the design intent.

{{% warning %}}
Always take note of the position of the inverting (-) and non-inverting (+) input terminals. **Sometimes they can be drawn swapped around relative to the symbol shown above**.
{{% /warning %}}

## Uses

* Buffers (a.k.a. voltage followers)
* Linear amplifiers, non-linear amplifiers
* Pre-amplifiers (amplifier's with a input voltage of 10mV or less)
* Analogue mathematical operations (differentiators, integrators, summer, subtracters, e.t.c)
* Voltage to current (transconductance) and current to voltage conversions (transimpedence)

## Op-Amp Topologies

### Voltage Follower (a.k.a. Buffer)

A _voltage follower_ (also known as a _buffer_) is one of the most basic circuits you can make with an op-amp.

{{< img src="op-amp-schematic-voltage-follower-buffer.png" width="517px" caption="An op-amp configured as a voltage follower (aka buffer)." >}}

As shown in the above diagram, the output voltage is the same as the input voltage (`\(v_{o} = v_{i}\)`). Well isn't this pointless? No, the key point to a voltage follower/buffer is that it can convert a **high-impedance input into a low impedance output**. Practically, this means that you can now sink/source more current from the output without the voltage changing. Buffers are great for boosting signals that travel across long distances, or for signals which get split and go to many devices (this is called **fan-out**, and is common with digital clock signals).

A simulation schematic for a voltage-follower op-amp is shown below:

{{< img src="simulation-schematic-for-op-amp-voltage-follower-buffer.png" width="382px" caption="A simulation schematic for an op-amp configured as a voltage-follower (buffer)."  >}}

The results of the simulation:

{{< img src="output-voltage-vs-input-voltage-op-amp-voltage-follower.png" width="1400px" caption="The simulation results for an op-amp configured as a voltage-follower (buffer). Note how the output voltage mirrors the input voltage exactly."  >}}

### Non-Inverting Amplifier

A op-amp in the non-inverting amplifier configuration is shown below.

{{< img src="op-amp-schematic-non-inverting-amplifier.png" width="508px" caption="An op-amp configured as a non-inverting amplifier."  >}}

The equation for the gain of the non-inverting amplifier is:

<p>$$ v_o = (1 + \frac{R_f}{R_i} ) v_i $$</p>

Notice the `\(1\)` in the gain equation? This means that no matter what you set the resistors `\(R_f\)` and `\(R_i\)` to, you can **never get a gain which is less than one**. This is one of the disadvantages of the non-inverting amplifier (you can have a gain of less than one with an inverting amplifier).

Here is a simulation schematic (circuit) for a non-inverting op-amp amplifier running from a single-ended supply. Because R1 (`\(R_f\)`) and R2 (`\(R_i\)`) are both `\(1k\Omega\)`, the op-amp has a gain of:

<p>
$$ G = 1 + \frac{R_f}{R_i} \\  
G = 1 + \frac{1k\Omega}{1k\Omega} \\  
G = 2 $$
</p>

{{< img src="non-inverting-op-amp-amplifier-simulation-schematic.png" width="465px" caption="The simulation schematic for a non-inverting op-amp amplifier."  >}}

The results of the simulation are shown below. As you can see, the output voltage `\(V_{out}\)` is exactly twice the input voltage `\(V_{in}\)`.

{{< img src="vout-vs-vin-non-inverting-op-amp-amplifier-gain-of-2.png" width="1700px" caption="A graph of Vout vs. Vin for a non-inverting op-amp amplifier circuit."  >}}

### Inverting Amplifiers

A op-amp amplifier in the inverting configuration is shown below:

{{< img src="op-amp-schematic-inverting-amplifier.png" width="473px" caption="An op-amp configured as an inverting amplifier."  >}}

The equation for the gain of an inverting amplifier is:

<p>$$ v_o = - \frac{R_f}{R_i} v_i $$</p>

The negative sign is to show that the output is the inverse polarity of the input. Notice that, unlike the non-inverting amplifier, **an inverting amplifier lets you obtain a gain of less than 1**.

Below is the schematic used for simulating the behaviour of an inverting op-amp. Note how is requires a negative voltage power supply.

{{< img src="inverting-op-amp-simulation-schematic.png" width="584px" caption="A schematic for simulating the behaviour of an inverting op-amp."  >}}

And below are the simulation results for the above schematic:

{{< img src="vout-vs-vin-inverting-op-amp-gain-neg-1.png" width="1420px" caption="Vout vs. Vin for an inverting op-amp with a gain of -1."  >}}

### Differential Amplifiers

A differential amplifier amplifies the difference between two electrical signals.

{{< img src="op-amp-schematic-differential-amplifier.png" width="489px" caption="An op-amp configured as a differential amplifier."  >}}

The output voltage is given by the equation:

<p>$$ v_o = \frac{R_4}{R_3 + R_4}(1 + \frac{R_2}{R_1})v_2 - \frac{R_2}{R_1}v_1 $$</p>

Below is a schematic for simulating the behaviour of a differential op-amp:

{{< img src="differential-op-amp-simulation-schematic.png" width="822px" caption="A schematic for simulating the behaviour of a differential op-amp."  >}}

This schematic produces the following results:

{{< img src="differential-op-amp-simulation-graph-vin1-vin2-vout.png" width="1686px" caption="A graph Vout vs. Vin1 and Vin2 for a op-amp configured as a differential amplifier."  >}}

### Integrators

It's output voltage is proportional to the integral of the input voltage w.r.t. time. The figure below shows an **ideal** op-amp based integrator.

{{< img src="op-amp-schematic-ideal-integrator.png" width="491px" caption="An op-amp configured as an ideal integrator."  >}}

However, this circuit is normally not practical in real world situations. Any errors such as the output offset voltage and input bias current (which all op-amps invariably have), as well as a non-perfect input signal with small amounts of DC bias, will cause the output to drift, until it reaches saturation.

A way to fix this problem is to insert a high-valued feedback resistor, `\(R_f\)`, to limit the DC gain, as well as a resistor, `\(R_{bias}\)`, on the non-inverting input terminal to compensate for the input bias current.

{{< img src="op-amp-schematic-integrator-non-ideal.png" width="430px" caption="An op-amp configured as a non-ideal (real world) integrator, with feedback resistor Rf to slowly remove DC offset." >}}

### Transconductance Amplifiers

A _transconductance amplifier_ is an op-amp topology which is used to **convert a voltage into a current**. Coincidentally, it is also known as a _voltage-to-current converter_.

A basic transconductance amplifier can be built with an op-amp in a non-inverting configuration.

A transconductance amplifier is useful creating an industry standard 4-20mA (or 0-20mA) current-loop signal. The input voltage can come from something like a potentiometer or microcontroller (coupled with either using a VDAC peripheral or PWM/RC-filter technique to create a variable voltage).

One disadvantage with this design is that the current output is not ground referenced, that is, ground is not used as the return path for the current. This complicates the wiring.

### Current Sinks

An op-amp can be easily wired up with a MOSFET and sense resistor to make a voltage controlled current sink. The following schematic shows such a device which can control between 0-1A through the load (shown as `\(R_{load}\)`):

{{% figure src="current-sink/op-amp-current-sink-schematic.png" width="700px" caption="Schematic of a basic op-amp based current sink." %}}

You set the desired load current by providing a voltage to `\(V_{in}\)`. This voltage typically comes from a resistor divider (fixed current), potentiometer (manually variable current) or DAC (digitally variable current). The load current is given by the simple Ohm's law equation:

<p>$$ I_{load} = \frac{V_{in}}{R_{sense}} $$</p>

The circuit works like this:
1. Desired voltage to set current is provided to `\(V_{in}\)` which is applied to the positive input of the op-amp, `\(V_{op+}\)`.
1. The op-amp will then drive it's output high in an attempt to bring it's `\(V_{op-}\)` to the same voltage.
1. As the op-amp raises the voltage on it's output, this is connected to the gate of the MOSFET, which will begin to turn it on.
1. As the MOSFET turns on, current begins to flow through the load and sense resistor, `\(R_{sense}\)`.
1. The op-amp will keep turning the MOSFET on until the voltage drop across `\(R_{sense}\)` is equal to `\(V_{in}\)`, meaning `\(V_{op-}\)` is the same as `\(V_{op+}\)`.
1. This voltage drop will occur when we have the desired amount of current flowing through it, leading to the equation `\( I_{load} = \frac{V_{in}}{R_{sense}} \)`.

Things to note:

* The op-amp is powered here with a slightly negative voltage rail on it's `\(V_{SS}\)` pin. This is that the op-amp remains operational when you set it at low current levels. At low current levels, the voltages at `\(V_{op+}\)` and `\(V_{op-}\)` are very close to zero. Even rail-to-rail op-amps can have trouble performing well if the negative voltage rail was at `\(0V\)`.
* The power dissipation through the MOSFET and sense resistor has to be considered. The sense resistor is easy, just make sure it can handle the power given by `\(P = I^2 R\)` at the maximum current. The MOSFET power dissipation will depend on the load current and voltage drop across it. The MOSFET is used in it's active region --- the region where it is not fully on nor fully off. The MOSFET will drop the remaining voltage from the voltage source provided to the load, once the load voltage drop and sense resistor voltage drop has been subtracted. Use the equation `\(P = VI\)` to determine the power dissipation in the MOSFET.
* The gate capacitance of the MOSFET can load the op-amp output to the point that it introduces enough phase lag to cause the circuit to go unstable. See below to recommended compensation circuitry to add to the basic schematic to make the design more stable.

**Current Sinking Accuracy**

The accuracy of the current sink primarily depends of three aspects:

* The input offset voltage of the op-amp.
* The accuracy of the DAC (or other voltage source) providing the voltage to `\(V_{in}\)`.
* The tolerance of the current-sense resistor.

**MOSFET Gate Capacitance Compensation**

The gate capacitance of the MOSFET can load the op-amp output to the point that it introduces enough phase lag to cause the circuit to go unstable. Compensation circuitry can be added as shown in the below circuit to limit the phase lag and prevent the circuit from becoming unstable.

{{% img src="lt1492-voltage-controlled-current-sink.png" width="500px" caption="A schematic showing gate capacitance compensation circuitry on a op-amp based current sink using the LT1492. Image retrieved 2020-12-25 from https://www.analog.com/media/en/technical-documentation/data-sheets/14923f.pdf." %}}

Read <https://electronics.stackexchange.com/questions/69506/stability-problem-in-unity-gain-opamp> for more information.

## Important Variables

Sorted by function.

### Common-Mode Input Voltage Range

The _common-mode input voltage range_ is the range of voltages that can appear at the input to the op-amp and it still work correctly. For standard single-supply op-amps, the typical range is approximately `\(0V\)` to `\(V_+ - 1.5V\)`. Note how it includes the most negative rail `\(V_-\)` (which is 0V for a single-supply op-amp) but only gets within `1.5V` of the most positive rail, `\(V_+\)`

### Input Offset Voltage (Vos/Vio)

The _input offset voltage_ `\(V_{OS}\)` (or sometimes called `\(V_{IO}\)`) is the voltage difference required between the two input pins to force the output to 0. It is a DC measurement parameter. In an ideal op-amp, the op-amp only amplifies a difference between the inputs, and so the output is 0V when the difference is 0V. However, real-world op-amps always have some unavoidable differences in the internal components that make up the op-amps (specifically, in the input differential stage of the internal circuitry), and thus the inputs are not perfectly identical. The input offset voltage is typically in the following ranges:

* 1-5mV for good general purpose op-amps, 5-15mV for really bad ones.
* 200uV-1mV for specialized low input offset voltage op-amps
* 10uV-200uV for the best "ultra" low input offset voltage op-amps 

For example, the general purpose LM324 has a typical input offset voltage of 2mV and a maximum of 3mV, at `\(T_A = 25°C\)`[^ti-lm234-datasheet]. "Low" input offset voltage op-amps will have a `\(V_{OS}\)` in the range of 50-200uV. For example, the OPAx196 family of op-amps has a max. `\(V_{IO}: 100uV\)`[^ti-opax196-datasheet].

A non-zero input offset voltage results in gain errors between the input and output of a op-amp.

Input offset voltages vary by op-amp transistor technology. Bipolar op-amps typically have the lowest input offset voltage, followed by CMOS and the BiFET op-amps[^ti-app-report-input-offset-voltage].

### Input Bias Current (Ib+ and Ib-)

The _input bias current_ `\(I_{B+}\)` and `\(I_{B-}\)` describe the currents that flow in and out of the op-amps input pins. In an ideal op-amp, no current flows into/out of the input pins (the op-amp has infinite input impedance). In reality, always some small amount of current will flow. Typical input bias currents range from 1-10nA.

The amount and behaviour of input bias current depends on the op-amp transistor technology. A FET-based op-amp's input bias current will double with every 10°C rise in temperature[^analog-devices-input-bias-current].

Input bias currents are a problem because these currents will flow through external circuitry connected to the op-amps inputs. This current when flowing through resistors and other impedances will create unwanted voltages which will increase the systematic errors.

The _input offset current_ `\(I_{OS}\)` is the difference between the input bias current at the `+` pin and the `-` pin.

### Input Impedance

The input impedance is the internal resistance to ground from the two input pins. In an ideal op-amp, this value is infinite. For most op-amps, this value is somewhere between 1-10MΩ.

### Gain-Bandwidth (GBW) Product

The gain-bandwidth product can be initialised as _GBWP_, _GBW_, _GBP_ or _GB_. It is an important parameter which basically puts a limit on the maximum gain and frequency. **An op-amp's maximum possible gain reduces as the frequency of the signal increases.** The multiplication of the gain with the frequency gives the gain-bandwidth product, which is **relatively constant** for a particular op-amp.

Hence if the gain bandwidth of a particular op-amp is 1Mhz, and the gain is 10, the maximum frequency that the op-amp can operate linearly at (still provide a gain of 10) is at 100kHz. Or if the gain was set to 100, then the maximum frequency is 10kHz. **This also means that an op-amp has a built-in low-pass filter, as the gain drops for very high frequencies.**

An example of an ultra-high gain bandwidth is 1700MHz, which are present in 'Wideband CFB" op-amps, designed for applications such as RGB line drivers (such as the OPA695). A 'normal' GBW can be anywhere between 100kHz and 10MHz. A low gain-bandwidth is around 1kHz (reminiscent of less advanced, older op-amps). **Remember gain is unit-less (V/V), so gain bandwidth is expressed as a frequency only.** Not realising this can be confusing! The GBW product is closely related to the slew rate (see below).

### High Level Output Voltage

The high level output voltage (`\(V_{OH}\)`) defines the highest voltage which the op-amp can drive the output to (with respect to the power supply `\(V_+\)`).

### Low Level Output Voltage

The low level output voltage (`\(V_{OL}\)`) defines the lowest voltage which the op-amp can drive the output to. The LM324 is rumoured to only be able to drive the output near ground if it is sourcing current, but only to 0.5V minimum if sinking (see this EDA Forum post, [LM324 Opamp Gain Instability](http://www.edaboard.com/thread209783.html)).

### Slew Rate

The _slew rate_ of an op-amp defines the **maximum rate the output voltage can change with respect to time**. In an ideal op-amp, this would be infinite. It has the SI units V/s, and is commonly expressed in uV/s. It can be thought of as the slope of the output waveform if one of the inputs of the input was subjected to a step voltage change. 

Op-amps have a limited output slew rate due to internal compensation capacitor combined with a finite output drive current. Charing a capacitive output with a constant current (a good approximation) gives a linear increase in voltage (recall that the equation relating voltage to current for a capacitor is `\(i = C \frac{dV}{dt}\)`).

The **max. slew rate of an op-amp limits the amplitude of output waveforms it can produce at high frequencies without distortion**. This parameter usually increases as the GBW of the op-amp increases. Higher slew rate op-amps also tend to have higher quiescent currents.

### Quiescent Current

The _quiescent current_ (current with no load, device in steady-state) is generally constant over the total rated supply voltage range. Obviously, if there is a load on the op-amp, the current drawn through the power pins (the supply current) will be the sum of the quiescent current and the current going through the load.

Quiescent currents for standard op-amps are typically between 1.5-4mA. A 'low-power' op-amp has a typical quiescent current between 0.5-1.5mA (such as the `LM258N`). Then there are ultra-low power op-amps that only draw 5-20pA (such as the `LMC6464`). You normally sacrifice slew-rate and gain-bandwidth for ultra-low power. Likewise, higher gain-bandwidth and higher slew rate op-amps typically have larger quiescent currents. 

## Cascading Op-Amps

Cascading op-amps is concept when the output of one op-amp is connected to the input of another. There can be an arbitrary number of op-amps in the cascade, but usual limits are 3-4.

For a fixed-gain, cascading op-amps can also be used to **increase the bandwidth**, as each individual op-amp now can operate at a lower gain and therefore has a larger bandwidth as defined by the gain-bandwidth product. Note though that each additional op-amp added to increase the bandwidth gives diminishing returns. Also important to note that op-amp bandwidth is defined as the -3dB gain points. Hence the bandwidth does not stay the same (total bandwidth gets smaller) when two identical op-amps are cascaded, as these will now the -6dB points. A practical limit for fixed-total-gain increased-bandwidth cascading is about 3-4 op-amps.

### The Gain

When cascading op-amps, the total gain is the product of all of the individual op-amps gains, i.e.:

<p>$$ A_{total} = A_0 A_1 A_2 ... A_n $$</p>

### The Bandwidth

The bandwidth of cascaded op-amps is not as simple to calculate as the gain.

If all of the op-amps are identical, then the following equation can be used:

<p>$$ BW_{tot} = BW \times \sqrt{2^{\frac{1}{N}} - 1} $$</p>

<p class="centered">
    where:<br>
    \( BW_{tot} \) = the total bandwidth of the cascaded op-amp system<br>
    \( BW \) = the bandwidth of the individual op-amps (remember, they have to be identical)<br>
    \( N \) = the number of op-amps in the cascaded system<br>
</p>

The above equation gives diminishing returns with every additional op-amp added.

## Feedback Resistor Values

As a rule-of-thumb, you should use the lowest acceptable resistances in op-amp feedback paths to reduce instabilities.

## Types Of Op-Amps

### General Purpose

General purpose op-amps typically have parameters in the following ranges:

* Gain Bandwidth Product: 1MHz
* Input Bias Current: 15pA
* Input Voltage Offset: 1mV
* Output Current: 20-50mA
* Icc: 1mA

### Rail-to-Rail Op-Amps

A _rail-to-rail_ op-amp is an op-amp which supports input voltages **near** the power rails, and can drive the output close to the one or more  of the power rails. We must stress the word **NEAR**, as the op-amp's output voltage will never get exactly to the rail, due to the finite voltage drop across the output-stage transistors. Rail-to-rail op-amps just support wider ranged input voltages and can drive closer to the rails than general purpose op-amps can. Look for the **low level output voltage** (`\(V_{OL}\)`) parameter in the op-amp's datasheet. For "rail-to-rail" op-amps, this will usually be about 100-200mV about ground at normal load currents.

{{% warning %}}
"_Rail-to-rail_" op-amps cannot really output either rail voltage, just closer to it that general purpose op-amps.
{{% /warning %}}

This also means that a rail-to-ral single-supply op-amp cannot output 0V. **To achieve a true ground output, you need a negative voltage supply.** There are dedicated ICs designed to provide a small negative power supply to op-amps so that they can output true ground. One such example is the [Texas Instruments LM7705](http://www.ti.com/product/LM7705), a "_Low Noise Negative Bias Generator_". This IC only generates -230mV, which allows the designer to use CMOS-based op-amps which usually have a maximum supply voltage of 5.5V.

{{< img src="lm7705-low-noise-negative-bias-voltage-generator-for-op-amp-application-schematic.png" width="688px" caption="The typical application schematic for the Texas Instruments LM7705, a 'Low-Noise Negative Bias Generator' for the negative supply of an op-amp. This allows the op-amp to output true 0V. Image from http://www.ti.com/."  >}}

### Micropower Op-Amps

_Micropower_ is a termed used for extremely low quiescent current op-amps that are designed for battery or energy recovery-based power supplies. The supply current of micropower op-amps is typically within the range of 50-100uA at a supply voltage of 2-10V. Because they are designed for battery-based systems, they are also commonly single-supply op-amps.

### Instrumentation Amplifiers

Instrumentation amplifiers are analog voltage amplifier circuits that, although are drawn the the same symbol as an op-amp, are typically made up internally from three op-amps (and passives). You can either make an instrumentation amplifier out of discrete op-amps or purchase a instrumentation amplifier IC which contains all the op-amps within the same chip.

## Manufacturer Part Number Families

* **INA**
  * **INAx126**: Precision instrumentation amplifiers by Texas Instruments. The INA126 has one amplifier per package, the INA2126 has two.
  * **INA290**: Precision current-sense amplifier.
* **LM741**: Very popular and old "741" style op-amp produced by Texas Instruments, ON Semiconductor and Rochester Electronics. 
* **LT**: The prefix Linear Technology (now Analog Devices) uses for their range of op-amps.
  * **LT1006**: Precision, single-supply op-amp.
  * **LT1077**: Micropower, single-supply op-amp.
  * **LT1167**: Instrumentation amplifier.
* **MAX**: Op-amps by Maxim.
  * **MAX4194**: Instrumentation amplifier.
* **OP07**: Analog Devices/Texas Instruments ranges of low input offset voltage op-amps.
  * **OP07C**: ±3-18V VCC, -40 to +85°C industrial temp. range
    * **OP07CP**: DIP-8 package
    * **OP07CS**: SOIC-8 package
  * **OP07D**: ±4-18V VCC
  * **OP07E**: 0 to 70°C commercial temp. range
* **OPA**: Texas Instruments (previously Burr-Brown) family of op-amps.
  * **OPAx187**: Zero-drift 36V rail-to-rail op-amps. Includes the OPA187 (1 op-amp), OPA2187 (2 op-amps) and OPA4187 (4 op-amps).
  * **OPA241**: Single-supply
  * **OPA251**: Dual-supply
  * **OPA27**: Texas Instruments (previously Burr-Brown) family of ultra-low noise, precision op-amps. Internally compensated for unity-gain stability.
  * **OPA37**: Uncompensated version of the OPA27.
* **TLE202**: Texas Instruments family of "high-speed low-power" precision operational amplifiers. Belong to the _Excalibur_ family of TI op-amps which uses "isolated vertical PNP transistors" to give unity-gain bandwidth and slew rate improvements.
* **TLV**: Texas Instruments family of op-amps.
  **TLV27**:

## The Different Types Of Gain, Explained

Open-loop gain `\(A_V\)` (sometimes written as `\(A_{OL}\)`) is the gain of the op-amp without any feedback.

Closed loop gain `\(G_V\)` is the over-all gain of the op-amp with feedback.

{{% img src="open-loop-vs-closed-loop-op-amp-gain-bode-plot.svg" width="500px" caption="How the open-loop and closed-loop gain of an op-amp changes with increasing frequency." %}}

We can generalize the circuit of an op-amp with negative feedback to the block diagram shown below. 

{{% img src="generalized-negative-feedback-block-diagram.svg" width="700px" caption="A block diagram showing a generalized op-amp configuration with negative feedback." %}}

From the above block diagram we can write an equation for `\(v_{out}\)`:

<p>\begin{align}
v_{out} &= A\times v_{sum} \\
        &= A(v_{in} - Bv_{out}) \\
\end{align}</p>

What we are really interested is an equation for the closed-loop gain `\(G_V\)` which is equal to `\(\frac{v_{out}}{v_{in}}\)`...all we need to do is to re-arrange the equation as shown below:

<p>\begin{align}
v_{out} &= Av_{in} - ABv_{out}  & \text{Expanding} \\
v_{out}(1 - AB) &= Av_{in}      & \text{Shift $v_{out}$ onto left side and factor.} \\
\frac{v_{out}}{v_{in}} &= \frac{A}{1 - AB}  & \text{Jiggle things to get $\frac{v_{out}}{v_{in}}$} \\
\end{align}</p>

And so we come to an equation for the closed loop gain `\(G_V\)` as:

<p>\begin{align}
G_V &= \frac{A}{1 - AB}
\end{align}</p>

We can take this one step further, since normally the open-loop gain `\(A\)` for an op-amp is very large, in the range of `\(100,000\)` to `\(1,000,000\)`. With that, we can simply the closed loop gain to be:

<p>\begin{align}
G_V &\approx \frac{1}{B}
\end{align}</p>

Name       | Equation
-----------|-----------
Open-loop gain | `\(A\)`
Loop gain  | `\(-AB\)` 
Closed-loop gain | $$\approx \frac{1}{B}$$

## Examples

Below are some examples of op-amps that stand out from the crowd for some reason, be it popularity, years in service, or functionality wise.

<table>
  <thead>
    <tr>
      <th>Manufacturer Code</th>
      <th>Description</th>
      <th>Approximate Price (1 unit, US$)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>AD860x</td>
      <td>Good for high precision stuff! Awesome for photo-diode amplification (both current-to-voltage and voltage-to-voltage configurations).</td>
      <td>$3.50</td>
    </tr>
    <tr>
      <td>LM32x</td>
      <td>A common family of op-amps that has been around for along time, they can operate of a single supply and can swing right to ground, but cannot swing to the rail voltage. The LM321 has one op-amp, the LM328 has two (dual), and the LM324 has 4 (quad).</td>
      <td></td>
    </tr>
    <tr>
      <td>LM833</td>
      <td>One of the cheapest 'audio' op-amps available (about US$0.20 as of 2011). Features a high GBW for it's price.</td>
      <td></td>
    </tr>
    <tr>
      <td>OPA695</td>
      <td>This is a ultra-wideband, current-feedback op-amp. If you need an op-amp with a ridiculously high gain-bandwidth product, this is along the lines of what you want to use. It has a GBW of 1700Mhz and a maximum slew-rate of 4300V/us.</td>
      <td>$3.50</td>
    </tr>
    <tr>
      <td>OP07</td>
      <td>A op-amp with a "ultra" low input offset voltage (resistors are trimmed at production time to achieve this), guranteed to be no more than 75uV. This op-amp also features offset nulling pins to further reduce the input offset voltage by performing trimming once the op-amp is installed in a circuit.</td>
      <td>n/a</td>
    </tr>
  </tbody>
</table>

## Negative Voltage Rails

Dedicated charge-pump topology power supply ICs are available that supply a small negative voltage to the op-amps `V-` pin.

## Isolation Amplifiers

Isolation amplifiers provide galvanic isolation between the input (sensor) and output (measurement circuitry). They are used to protect the sensor measurement and recording circuitry (e.g. a microcontroller with on-board ADC) from dangerously high voltages at the sensor, and also the opposite, to protect the sensor environment from potentially dangerous voltages on the rest of the system.

{{< img src="fully-differential-isolation-amplfier-ti-amc1200-simplified-schematic.pdf.png" width="753px" caption="A simplified schematic of the Texas Instruments AMC1200, a fully-differential isolated amplifier. Image from http://www.ti.com/." >}}

A common application would be to isolate and amplify the voltage across a current-sense resistor on a high-power motor, or to protect humans with medical sensors connected to them from the measurement system.

Basic isolation amplifiers require two power supplies (one for each side of isolation), while others incorporate built-in transformers so that you only have to provide one power source.

## Input Resistors

One of the first things you learn about an op-amp is that the input impedance on the input pins are very large (ideally infinite). So naturally you would start to question why resistors would be connected to the input pins of an op-amp like shown in the diagram below:

{{% img src="op-amp-input-pin-resistors.png" width="500px" caption="Schematic showing a resistor on the positive input to a op-amp." %}}

These input resistors serve to limit the input current if the voltage on the input pin goes above `\(V_{CC}\)`. Most op-amps have protection/clamping diodes from the input pins to `\(V_{CC}\)` (typically you can determines this if in the datasheet the input pins max voltage is rated to `\(V_{CC} + 0.3V\)`, which is one diode voltage drop). If there was no resistor there, the built-in diode would conduct and sink a large current from the input pin to `\(V_{CC}\)`, possibly damaging the op-amp. The resistor limits this current to a safe value.

## Offset Nulling Circuits

Some op-amps which are designed to have very low input offset voltages also come with _offset nulling pins_ to further trim the input offset voltage once the op-amp is installed in circuit. The OP07 is one op-amp which has these pins. Typically, a `\(10-50k\Omega\)` potentiometer is connected across these pins with the wiper going to `\(V_{CC}\)`, as shown in the example schematic below:

{{% img src="op07-op-amp-offset-nulling-circuit.png" width="500px" caption="Image from https://www.analog.com/media/en/technical-documentation/data-sheets/OP07.pdf." %}}

## Negative Impedance Converters (NICs)

### What Is A NIC?

A _negative impedance converter_ (NIC) is a clever op-amp circuit which creates negative impedance (you might be wondering what negative impedance actually is, more on this later). A NIC can be constructed from an op-amp and a few passive components as shown in the following schematic:

{{% img src="negative-impedance-converter-nic.svg" width="500px" caption="Schematic of a negative impedance converter (NIC) created from an op-amp and a few passive components." %}}

Typically the two resistances are the same (`\(R1 = R2\)`), and then the input impedance `\(Z_{IN}\)` is:

<p>\begin{align}
Z_{IN} = -Z
\end{align}</p>

<p class="centered">
\(Z_{IN}\) is the input impedance, in Ohms (\(\Omega\))<br/>
\(-Z\) is the impedance of the component connected between the inverting terminal and ground, as shown on the diagram, in Ohms (\(\Omega\))
</p>

### What Does Negative Impedance Actually Mean?

What does negative impedance actually mean? If `\(Z\)` is just a simple resistor with resistance `\(R\)` (the most basic kind of NIC), then the impedance is `\(Z_{IN} = -R\)`. This means the circuit behaves just like a simple resistor connected to ground, **except that the current comes out of the resistor, not into it**.

Things get more interesting when you replace this resistor with a capacitor.

TODO: Add explanation of what happens when capacitor is added.

### NIC Input Impedance Proof

{{% note %}}
Skip this section if you are not interested in the maths.
{{% /note %}}

To prove `\(Z_{IN} = -Z\)`, we need to find the input current at inverting terminal, and then use `\(Z_{IN} = \frac{V}{I_{IN}}\)`. The input current can be found by application of Ohm's law and the golden rules of op-amps. Using the rule that the voltage at the two input terminals will be the same, we know the voltage across the impedance `\(Z\)` is going to be:

<p>\begin{align}
\label{eqn:vzeqv}
V_Z = V
\end{align}</p>

Using Ohm's law, the current through the impedance `\(Z\)` is therefore:

<p>\begin{align}
I_Z = \frac{V}{Z}
\end{align}</p>

Because there is no current going into the inverting terminal of the op-amp, this current `\(I_Z\)` must also be flowing through `\(R2\)`:

<p>\begin{align}
\label{eqn:i_r2}
I_{R2} = \frac{V}{Z}
\end{align}</p>

Now knowing the voltage at the inverting terminal and the current through `\(R2\)` we can write an equation for the voltage at the output of the op-amp:

<p>\begin{align}
\label{eqn:vout_eq}
V_{OUT} &= V_Z + V_{R2} \\
        &= V_Z + I_{R2} \cdot R \\
        &= V + \frac{V}{Z} \cdot R &  &\text{Subs. in \ref{eqn:vzeqv} and \ref{eqn:i_r2}}
\end{align}</p>

Now that we know the voltage on both sides of `\(R1\)` we can find the voltage across it:

<p>\begin{align}
\label{eqn:v_r1}
V_{R1} &= V_{OUT} - V                   &\\
       &= V + \frac{V}{Z} \cdot R - V   & &\text{Subs. in \ref{eqn:vout_eq}} \\
       &= \frac{V}{Z} \cdot R           & &\text{Simplifying}
\end{align}</p>

Now we know the voltage across `\(R1\)` we can find the current going through it using Ohm's law:

<p>\begin{align}
\label{eqn:i_r1}
I_{R1} &= \frac{V_{R1}}{R}                &\\
       &= \frac{\frac{V}{Z} \cdot R}{R}   & &\text{Subs. in \ref{eqn:v_r1}} \\
       &= \frac{V}{Z}                     & &\text{Simplifying}
\end{align}</p>

Because the voltage on the right-hand side of `\(R1\)` is higher, this current is flowing right-to-left. Since no current flows into the inverting terminal of the op-amp, this also must be current flowing "out" of the input terminal. Thus:

<p>\begin{align}
\label{eqn:i_in}
I_{IN} = -\frac{V}{Z}
\end{align}</p>

Knowing the input current and voltage, we can finally write an equation for `\(Z_{IN}\)`:

<p>\begin{align}
\label{eqn:z_in}
Z_{IN} &= \frac{V_{IN}}{I_{IN}}       & &\text{Ohms law} \\
       &= \frac{V}{-\frac{V}{Z}}      & &\text{Subs. in \ref{eqn:i_in}} \\
       &= -Z                          & &\text{Simplifying}
\end{align}</p>

Proof complete!

## Chopper-Stabilised Op-Amps

TODO

## Capacitive Loading

TODO

## Industry Standard Package Pinouts For Op-Amps

Op-amps are usually packaged in industry standard through-hole and surface mount packages. For many of these packages, there are industry standard pinouts which means you can easily find pin-compatible alternatives for any given op-amp. This section aims to illustrate some of these industry standard pinouts.

For 8-pin packages:

{{% figure src="standard-8-pin-dual-op-amp-pinout.svg" width="400px" caption="The standard pinout for two op-amps in an 8-pin package. This includes the DIP-8, TSSOP-8, SOIC-8 and MSOP-8 component packages." %}}

## References

[^ti-lm234-datasheet]: <https://www.ti.com/lit/ds/snosc16d/snosc16d.pdf>, retrieved 2020-10-20.
[^ti-app-report-input-offset-voltage]: <https://www.ti.com/lit/an/sloa059/sloa059.pdf>, retrieved 2020-10-20.
[^analog-devices-input-bias-current]: <https://www.analog.com/media/en/training-seminars/tutorials/MT-038.pdf>, retrieved 2020-10-20.
[^ti-opax196-datasheet]: <https://www.ti.com/lit/ds/symlink/opa196.pdf>