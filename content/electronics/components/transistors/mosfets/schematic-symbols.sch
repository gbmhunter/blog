EESchema Schematic File Version 4
EELAYER 30 0
EELAYER END
$Descr A4 11693 8268
encoding utf-8
Sheet 1 1
Title ""
Date ""
Rev ""
Comp ""
Comment1 ""
Comment2 ""
Comment3 ""
Comment4 ""
$EndDescr
$Comp
L mbedded-ninja-kicad-symbols:Q_NMOS_DGS Q1
U 1 1 60235165
P 4200 2900
F 0 "Q1" H 4404 2900 50  0000 L CNN
F 1 "Q_NMOS_DGS" H 4404 2855 50  0001 L CNN
F 2 "" H 4400 3000 50  0001 C CNN
F 3 "~" H 4200 2900 50  0001 C CNN
	1    4200 2900
	1    0    0    -1  
$EndComp
$Comp
L mbedded-ninja-kicad-symbols:Q_PMOS_DGS Q2
U 1 1 60235E64
P 4800 2900
F 0 "Q2" H 5004 2900 50  0000 L CNN
F 1 "Q_PMOS_DGS" H 5005 2945 50  0001 L CNN
F 2 "" H 5000 3000 50  0001 C CNN
F 3 "~" H 4800 2900 50  0001 C CNN
	1    4800 2900
	1    0    0    1   
$EndComp
Text Notes 3950 2850 0    50   ~ 0
G
Text Notes 4200 2700 0    50   ~ 0
D
Text Notes 4200 3150 0    50   ~ 0
S
Text Notes 4800 2700 0    50   ~ 0
S
Text Notes 4800 3150 0    50   ~ 0
D
Text Notes 4550 2850 0    50   ~ 0
G
$Comp
L mbedded-ninja-kicad-symbols:Q_NMOS_DGS_DEPL Q1
U 1 1 6023C375
P 4200 3700
F 0 "Q1" H 4400 3700 50  0000 L CNN
F 1 "Q_NMOS_DGS_DEPL" H 4404 3655 50  0001 L CNN
F 2 "" H 4400 3800 50  0001 C CNN
F 3 "~" H 4200 3700 50  0001 C CNN
	1    4200 3700
	1    0    0    -1  
$EndComp
Text Notes 3900 2450 0    50   ~ 0
Discrete MOSFETs\n(inherent substrate conn\nand body diode)
Text Notes 4150 2600 0    50   ~ 0
Enhancement mode
Text Notes 4150 3400 0    50   ~ 0
Depletion mode
Text Notes 3950 3650 0    50   ~ 0
G
Text Notes 4200 3950 0    50   ~ 0
S
Text Notes 4200 3500 0    50   ~ 0
D
$Comp
L mbedded-ninja-kicad-symbols:Q_PMOS_DGS_DEPL Q2
U 1 1 6023A198
P 4800 3700
F 0 "Q2" H 5004 3700 50  0000 L CNN
F 1 "Q_PMOS_DGS_DEPL" H 5005 3655 50  0001 L CNN
F 2 "" H 5000 3800 50  0001 C CNN
F 3 "~" H 4800 3700 50  0001 C CNN
	1    4800 3700
	1    0    0    -1  
$EndComp
Wire Notes Line
	3900 3300 3900 4050
Wire Notes Line
	3900 4050 5200 4050
Wire Notes Line
	5200 4050 5200 3300
Wire Notes Line
	5200 3300 3900 3300
Text Notes 4150 4000 0    25   ~ 0
N-channel
Text Notes 4750 4000 0    25   ~ 0
P-channel
Text Notes 4550 3650 0    50   ~ 0
G
Text Notes 4800 3500 0    50   ~ 0
D
Text Notes 4800 3950 0    50   ~ 0
S
Wire Notes Line
	3900 2500 3900 3250
Wire Notes Line
	5200 2500 3900 2500
Wire Notes Line
	3900 3250 5200 3250
Wire Notes Line
	5200 3250 5200 2500
Text Notes 4150 3200 0    25   ~ 0
N-channel
Text Notes 4750 3200 0    25   ~ 0
P-channel
Text Notes 4150 4200 0    50   ~ 0
Enhancement mode
Text Notes 3950 4450 0    50   ~ 0
G
Text Notes 4200 4750 0    50   ~ 0
S
Text Notes 4200 4300 0    50   ~ 0
D
Wire Notes Line
	3900 4100 3900 4850
Wire Notes Line
	3900 4850 5200 4850
Wire Notes Line
	5200 4850 5200 4100
Wire Notes Line
	5200 4100 3900 4100
Text Notes 4150 4800 0    25   ~ 0
N-channel
Text Notes 4750 4800 0    25   ~ 0
P-channel
Text Notes 4550 4450 0    50   ~ 0
G
Text Notes 4800 4300 0    50   ~ 0
D
Text Notes 4800 4750 0    50   ~ 0
S
$Comp
L mbedded-ninja-kicad-symbols:Q_NMOS_DGS_4PIN Q1
U 1 1 60245762
P 4200 4500
F 0 "Q1" H 4400 4600 50  0000 L CNN
F 1 "Q_NMOS_DGS_4PIN" H 4494 4455 50  0001 L CNN
F 2 "" H 4400 4600 50  0001 C CNN
F 3 "~" H 4200 4500 50  0001 C CNN
	1    4200 4500
	1    0    0    -1  
$EndComp
Text Notes 5350 4300 0    50   ~ 0
MOSFETs inside ICs\n(no inherent substrate conn\nand no body diode)
$Comp
L mbedded-ninja-kicad-symbols:Q_PMOS_DGS_4PIN Q2
U 1 1 60246EE4
P 4800 4500
F 0 "Q2" H 5000 4600 50  0000 L CNN
F 1 "Q_PMOS_DGS_4PIN" H 5094 4455 50  0001 L CNN
F 2 "" H 5000 4600 50  0001 C CNN
F 3 "~" H 4800 4500 50  0001 C CNN
	1    4800 4500
	1    0    0    -1  
$EndComp
Text Notes 4450 4600 0    50   ~ 0
B
Text Notes 5050 4600 0    50   ~ 0
B
$EndSCHEMATC
