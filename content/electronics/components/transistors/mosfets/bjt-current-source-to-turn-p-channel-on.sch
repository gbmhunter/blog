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
L mbedded-ninja-kicad-symbols:Tran_BJT_NPN Q1
U 1 1 602A08B7
P 3050 4050
F 0 "Q1" H 3241 4050 50  0000 L CNN
F 1 "Tran_BJT_NPN" H 3250 4050 50  0001 L CNN
F 2 "" H 3250 3975 50  0001 L CIN
F 3 "" H 3050 4050 50  0001 L CNN
	1    3050 4050
	1    0    0    -1  
$EndComp
$Comp
L mbedded-ninja-kicad-symbols:R_US R1
U 1 1 602A1228
P 3150 3650
F 0 "R1" H 3218 3696 50  0000 L CNN
F 1 "10k" H 3218 3605 50  0000 L CNN
F 2 "" V 3190 3640 50  0001 C CNN
F 3 "~" H 3150 3650 50  0001 C CNN
	1    3150 3650
	1    0    0    -1  
$EndComp
$Comp
L mbedded-ninja-kicad-symbols:R_US R_E
U 1 1 602A22C0
P 3150 4400
F 0 "R_E" H 3218 4446 50  0000 L CNN
F 1 "2.7k" H 3218 4355 50  0000 L CNN
F 2 "" V 3190 4390 50  0001 C CNN
F 3 "~" H 3150 4400 50  0001 C CNN
	1    3150 4400
	1    0    0    -1  
$EndComp
$Comp
L power:GND #PWR?
U 1 1 602A2B39
P 3150 4550
F 0 "#PWR?" H 3150 4300 50  0001 C CNN
F 1 "GND" H 3155 4377 50  0000 C CNN
F 2 "" H 3150 4550 50  0001 C CNN
F 3 "" H 3150 4550 50  0001 C CNN
	1    3150 4550
	1    0    0    -1  
$EndComp
$Comp
L mbedded-ninja-kicad-symbols:Q_PMOS_DGS Q2
U 1 1 602A35B1
P 3850 3550
F 0 "Q2" V 4100 3550 50  0000 C CNN
F 1 "Q_PMOS_DGS" V 4101 3550 50  0001 C CNN
F 2 "" H 4050 3650 50  0001 C CNN
F 3 "~" H 3850 3550 50  0001 C CNN
	1    3850 3550
	0    1    -1   0   
$EndComp
$Comp
L mbedded-ninja-kicad-symbols:R_US R_G
U 1 1 602A5238
P 3550 3850
F 0 "R_G" V 3345 3850 50  0000 C CNN
F 1 "100R" V 3436 3850 50  0000 C CNN
F 2 "" V 3590 3840 50  0001 C CNN
F 3 "~" H 3550 3850 50  0001 C CNN
	1    3550 3850
	0    1    1    0   
$EndComp
Wire Wire Line
	3150 3850 3400 3850
Connection ~ 3150 3850
Wire Wire Line
	3700 3850 3850 3850
Wire Wire Line
	3850 3850 3850 3750
Text GLabel 3050 3450 0    50   Input ~ 0
V_IN
Text GLabel 4100 3450 2    50   Input ~ 0
V_OUT
Wire Wire Line
	4050 3450 4100 3450
Wire Wire Line
	3050 3450 3150 3450
Wire Wire Line
	3150 3800 3150 3850
Wire Wire Line
	3150 3500 3150 3450
Connection ~ 3150 3450
Wire Wire Line
	3150 3450 3650 3450
$EndSCHEMATC
