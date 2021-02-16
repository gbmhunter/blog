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
U 1 1 602B4857
P 3400 3800
F 0 "Q1" H 3600 3800 50  0000 L CNN
F 1 "Q_NMOS_DGS" H 3604 3755 50  0001 L CNN
F 2 "" H 3600 3900 50  0001 C CNN
F 3 "~" H 3400 3800 50  0001 C CNN
	1    3400 3800
	1    0    0    -1  
$EndComp
$Comp
L power:GND #PWR?
U 1 1 602B6022
P 3500 4000
F 0 "#PWR?" H 3500 3750 50  0001 C CNN
F 1 "GND" H 3505 3827 50  0000 C CNN
F 2 "" H 3500 4000 50  0001 C CNN
F 3 "" H 3500 4000 50  0001 C CNN
	1    3500 4000
	1    0    0    -1  
$EndComp
$Comp
L mbedded-ninja-kicad-symbols:R_US R_D
U 1 1 602B72C7
P 3500 3350
F 0 "R_D" H 3550 3350 50  0000 L CNN
F 1 "R_US" H 3568 3305 50  0001 L CNN
F 2 "" V 3540 3340 50  0001 C CNN
F 3 "~" H 3500 3350 50  0001 C CNN
	1    3500 3350
	1    0    0    -1  
$EndComp
Wire Wire Line
	3500 3600 3500 3550
Wire Wire Line
	3500 3550 3700 3550
Connection ~ 3500 3550
Wire Wire Line
	3500 3550 3500 3500
Text GLabel 3700 3550 2    50   Input ~ 0
V_OUT
Text GLabel 3100 3800 0    50   Input ~ 0
V_IN
Wire Wire Line
	3200 3800 3100 3800
$Comp
L power:VDD #PWR?
U 1 1 602B4893
P 3500 3200
F 0 "#PWR?" H 3500 3050 50  0001 C CNN
F 1 "VDD" H 3515 3373 50  0000 C CNN
F 2 "" H 3500 3200 50  0001 C CNN
F 3 "" H 3500 3200 50  0001 C CNN
	1    3500 3200
	1    0    0    -1  
$EndComp
$EndSCHEMATC
