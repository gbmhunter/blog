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
L mbedded-ninja-kicad-symbols-sim:AD8051 U1
U 1 1 614CE94B
P 4800 2600
F 0 "U1" H 5000 2850 50  0000 L CNN
F 1 "AD8051" H 5000 2750 50  0000 L CNN
F 2 "" H 4700 2500 50  0001 C CNN
F 3 "" H 4800 2600 50  0001 C CNN
F 4 "X" H 4800 2850 50  0001 L CNN "Spice_Primitive"
F 5 "AD8051" H 4800 2850 50  0001 L CNN "Spice_Model"
F 6 "Y" H 4800 2850 50  0001 L CNN "Spice_Netlist_Enabled"
F 7 "AD8051.lib" H 4800 2850 50  0001 L CNN "Spice_Lib_File"
	1    4800 2600
	1    0    0    -1  
$EndComp
$Comp
L mbedded-ninja-kicad-symbols-sim:DC12 V1
U 1 1 614D2B63
P 2650 2350
F 0 "V1" H 2780 2396 50  0000 L CNN
F 1 "DC 12" H 2780 2305 50  0000 L CNN
F 2 "" H 2650 2350 50  0000 C CNN
F 3 "" H 2650 2350 50  0000 C CNN
F 4 "V" H 2900 2100 60  0001 C CNN "Spice_Primitive"
F 5 "1 2" H 2900 2200 60  0001 C CNN "Spice_Node_Sequence"
	1    2650 2350
	1    0    0    -1  
$EndComp
$Comp
L power:GND #PWR01
U 1 1 614D5247
P 3000 2550
F 0 "#PWR01" H 3000 2300 50  0001 C CNN
F 1 "GND" H 3005 2377 50  0000 C CNN
F 2 "" H 3000 2550 50  0001 C CNN
F 3 "" H 3000 2550 50  0001 C CNN
	1    3000 2550
	1    0    0    -1  
$EndComp
$Comp
L mbedded-ninja-kicad-symbols-sim:DC12 V2
U 1 1 614D8752
P 2650 2750
F 0 "V2" H 2780 2796 50  0000 L CNN
F 1 "DC 12" H 2780 2705 50  0000 L CNN
F 2 "" H 2650 2750 50  0000 C CNN
F 3 "" H 2650 2750 50  0000 C CNN
F 4 "V" H 2900 2500 60  0001 C CNN "Spice_Primitive"
F 5 "1 2" H 2900 2600 60  0001 C CNN "Spice_Node_Sequence"
	1    2650 2750
	1    0    0    -1  
$EndComp
Wire Wire Line
	2650 2550 3000 2550
Connection ~ 2650 2550
$Comp
L mbedded-ninja-kicad-symbols-sim:10k R1
U 1 1 614D992C
P 4000 2500
F 0 "R1" V 4200 2450 50  0000 L CNN
F 1 "30k" V 4100 2450 50  0000 L CNN
F 2 "" H 4100 1800 50  0001 L CNN
F 3 "" H 4000 2500 50  0001 L CNN
F 4 "R" H 4150 2350 50  0001 C CNN "Spice_Primitive"
	1    4000 2500
	0    -1   -1   0   
$EndComp
$Comp
L mbedded-ninja-kicad-symbols-sim:10k R2
U 1 1 614DD1A0
P 4250 2350
F 0 "R2" H 4318 2396 50  0000 L CNN
F 1 "10k" H 4318 2305 50  0000 L CNN
F 2 "" H 4350 1650 50  0001 L CNN
F 3 "" H 4250 2350 50  0001 L CNN
F 4 "R" H 4400 2200 50  0001 C CNN "Spice_Primitive"
	1    4250 2350
	1    0    0    -1  
$EndComp
Wire Wire Line
	4150 2500 4250 2500
Connection ~ 4250 2500
Wire Wire Line
	4250 2500 4500 2500
Text GLabel 2750 2950 2    50   Input ~ 0
-12V
Text GLabel 2750 2150 2    50   Input ~ 0
+12V
Wire Wire Line
	2750 2150 2650 2150
Wire Wire Line
	2750 2950 2650 2950
Text GLabel 4700 2300 2    50   Input ~ 0
+12V
Text GLabel 4700 2900 2    50   Input ~ 0
-12V
$Comp
L mbedded-ninja-kicad-symbols-sim:10k R3
U 1 1 614DEF13
P 4450 3200
F 0 "R3" H 4518 3246 50  0000 L CNN
F 1 "30k" H 4518 3155 50  0000 L CNN
F 2 "" H 4550 2500 50  0001 L CNN
F 3 "" H 4450 3200 50  0001 L CNN
F 4 "R" H 4600 3050 50  0001 C CNN "Spice_Primitive"
	1    4450 3200
	1    0    0    -1  
$EndComp
$Comp
L mbedded-ninja-kicad-symbols-sim:10k R4
U 1 1 614E0288
P 4800 3050
F 0 "R4" V 4700 3000 50  0000 L CNN
F 1 "10k" V 4600 2950 50  0000 L CNN
F 2 "" H 4900 2350 50  0001 L CNN
F 3 "" H 4800 3050 50  0001 L CNN
F 4 "R" H 4950 2900 50  0001 C CNN "Spice_Primitive"
	1    4800 3050
	0    -1   -1   0   
$EndComp
$Comp
L power:GND #PWR04
U 1 1 614E1B37
P 4450 3350
F 0 "#PWR04" H 4450 3100 50  0001 C CNN
F 1 "GND" H 4455 3177 50  0000 C CNN
F 2 "" H 4450 3350 50  0001 C CNN
F 3 "" H 4450 3350 50  0001 C CNN
	1    4450 3350
	1    0    0    -1  
$EndComp
Wire Wire Line
	4450 3050 4450 2700
Wire Wire Line
	4450 2700 4500 2700
Wire Wire Line
	4650 3050 4450 3050
Connection ~ 4450 3050
Wire Wire Line
	4950 3050 5150 3050
Wire Wire Line
	5150 3050 5150 2600
Wire Wire Line
	5150 2600 5100 2600
Wire Wire Line
	5150 2600 5450 2600
Connection ~ 5150 2600
Text GLabel 5450 2600 2    50   Input ~ 0
V_OUT
$Comp
L mbedded-ninja-kicad-symbols-sim:DC12 V4
U 1 1 614E53B6
P 3900 1800
F 0 "V4" H 3650 1850 50  0000 L CNN
F 1 "DC 1.65" H 3450 1750 50  0000 L CNN
F 2 "" H 3900 1800 50  0000 C CNN
F 3 "" H 3900 1800 50  0000 C CNN
F 4 "V" H 4150 1550 60  0001 C CNN "Spice_Primitive"
F 5 "1 2" H 4150 1650 60  0001 C CNN "Spice_Node_Sequence"
	1    3900 1800
	1    0    0    -1  
$EndComp
$Comp
L power:GND #PWR03
U 1 1 614E607D
P 3900 2000
F 0 "#PWR03" H 3900 1750 50  0001 C CNN
F 1 "GND" H 3905 1827 50  0000 C CNN
F 2 "" H 3900 2000 50  0001 C CNN
F 3 "" H 3900 2000 50  0001 C CNN
	1    3900 2000
	1    0    0    -1  
$EndComp
Wire Wire Line
	3900 1600 4250 1600
Wire Wire Line
	4250 1600 4250 2200
$Comp
L mbedded-ninja-kicad-symbols-sim:VSIN V3
U 1 1 614E88CE
P 3550 2700
F 0 "V3" H 3680 2791 50  0000 L CNN
F 1 "VSIN" H 3680 2700 50  0000 L CNN
F 2 "" H 3550 2700 50  0001 C CNN
F 3 "~" H 3550 2700 50  0001 C CNN
F 4 "Y" H 3550 2700 50  0001 L CNN "Spice_Netlist_Enabled"
F 5 "V" H 3550 2700 50  0001 L CNN "Spice_Primitive"
F 6 "sin(0 5 1k)" H 3680 2609 50  0000 L CNN "Spice_Model"
	1    3550 2700
	1    0    0    -1  
$EndComp
Text Label 3650 2500 0    50   ~ 0
V_IN
Wire Wire Line
	3550 2500 3850 2500
$Comp
L power:GND #PWR02
U 1 1 614EA645
P 3550 2900
F 0 "#PWR02" H 3550 2650 50  0001 C CNN
F 1 "GND" H 3555 2727 50  0000 C CNN
F 2 "" H 3550 2900 50  0001 C CNN
F 3 "" H 3550 2900 50  0001 C CNN
	1    3550 2900
	1    0    0    -1  
$EndComp
$EndSCHEMATC
