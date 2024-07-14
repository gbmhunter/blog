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
L mbedded-ninja-kicad-symbols:R_POT_US VR1
U 1 1 600EFF3C
P 4100 3200
F 0 "VR1" H 4032 3246 50  0000 R CNN
F 1 "10k" H 4032 3155 50  0000 R CNN
F 2 "" H 4100 3200 50  0001 C CNN
F 3 "~" H 4100 3200 50  0001 C CNN
	1    4100 3200
	1    0    0    -1  
$EndComp
$Comp
L mbedded-ninja-kicad-symbols:VDC V1
U 1 1 600F0BAB
P 3500 3200
F 0 "V1" H 3630 3246 50  0000 L CNN
F 1 "5V" H 3630 3155 50  0000 L CNN
F 2 "" H 3500 3200 50  0001 C CNN
F 3 "~" H 3500 3200 50  0001 C CNN
F 4 "Y" H 3500 3200 50  0001 L CNN "Spice_Netlist_Enabled"
F 5 "V" H 3500 3200 50  0001 L CNN "Spice_Primitive"
F 6 "dc(1)" H 3630 3109 50  0001 L CNN "Spice_Model"
	1    3500 3200
	1    0    0    -1  
$EndComp
Wire Wire Line
	3500 3000 3500 2950
Wire Wire Line
	3500 2950 4100 2950
Wire Wire Line
	4100 2950 4100 3050
Wire Wire Line
	3500 3400 3500 3450
Wire Wire Line
	3500 3450 4100 3450
Wire Wire Line
	4100 3450 4100 3350
Wire Wire Line
	4100 3450 4450 3450
Connection ~ 4100 3450
Wire Wire Line
	4250 3200 4450 3200
Text GLabel 4450 3200 2    50   Input ~ 0
VOUT
$Comp
L power:GND #PWR?
U 1 1 600F2FEA
P 4100 3450
F 0 "#PWR?" H 4100 3200 50  0001 C CNN
F 1 "GND" H 4105 3277 50  0000 C CNN
F 2 "" H 4100 3450 50  0001 C CNN
F 3 "" H 4100 3450 50  0001 C CNN
	1    4100 3450
	1    0    0    -1  
$EndComp
$EndSCHEMATC
