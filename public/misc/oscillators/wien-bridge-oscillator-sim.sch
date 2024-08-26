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
L mbedded-ninja-kicad-symbols-sim:1N4148 D1
U 1 1 608A7F69
P 5050 3850
F 0 "D1" H 5050 3750 50  0000 C CNN
F 1 "1N4148" H 5050 3950 50  0000 C CNN
F 2 "" H 5050 3850 50  0001 C CNN
F 3 "~" H 5050 3850 50  0001 C CNN
F 4 "D" H 5050 3350 50  0001 C CNN "Spice_Primitive"
F 5 "1N4148" H 5050 3450 50  0001 C CNN "Spice_Model"
F 6 "Y" H 5050 3550 50  0001 C CNN "Spice_Netlist_Enabled"
F 7 "2 1" H 5050 3650 50  0001 C CNN "Spice_Node_Sequence"
F 8 "1N4148.lib" H 5050 3250 50  0001 C CNN "Spice_Lib_File"
	1    5050 3850
	-1   0    0    1   
$EndComp
$Comp
L mbedded-ninja-kicad-symbols-sim:AD8051 U1
U 1 1 608A6EDB
P 5300 3050
F 0 "U1" H 5400 3250 50  0000 L CNN
F 1 "AD8051" H 5400 3150 50  0000 L CNN
F 2 "" H 5200 2950 50  0001 C CNN
F 3 "" H 5300 3050 50  0001 C CNN
F 4 "X" H 5300 3300 50  0001 L CNN "Spice_Primitive"
F 5 "AD8051" H 5300 3300 50  0001 L CNN "Spice_Model"
F 6 "Y" H 5300 3300 50  0001 L CNN "Spice_Netlist_Enabled"
F 7 "AD8051.lib" H 5300 3300 50  0001 L CNN "Spice_Lib_File"
	1    5300 3050
	1    0    0    -1  
$EndComp
$Comp
L Bio-Sim:DC12 V1
U 1 1 608A8BB9
P 6100 2100
F 0 "V1" H 6228 2146 50  0000 L CNN
F 1 "DC 12" H 6228 2055 50  0000 L CNN
F 2 "" H 6100 2100 50  0000 C CNN
F 3 "" H 6100 2100 50  0000 C CNN
F 4 "V" H 6350 1850 60  0001 C CNN "Spice_Primitive"
F 5 "1 2" H 6350 1950 60  0001 C CNN "Spice_Node_Sequence"
F 6 "ASK" H 6300 700 50  0001 C CNN "Substitution Category"
	1    6100 2100
	1    0    0    -1  
$EndComp
$Comp
L Bio-Sim:DC12 V2
U 1 1 608A97CE
P 6100 2500
F 0 "V2" H 6228 2546 50  0000 L CNN
F 1 "DC 12" H 6228 2455 50  0000 L CNN
F 2 "" H 6100 2500 50  0000 C CNN
F 3 "" H 6100 2500 50  0000 C CNN
F 4 "V" H 6350 2250 60  0001 C CNN "Spice_Primitive"
F 5 "1 2" H 6350 2350 60  0001 C CNN "Spice_Node_Sequence"
F 6 "ASK" H 6300 1100 50  0001 C CNN "Substitution Category"
	1    6100 2500
	1    0    0    -1  
$EndComp
$Comp
L power:GND #PWR03
U 1 1 608AA1F3
P 6550 2300
F 0 "#PWR03" H 6550 2050 50  0001 C CNN
F 1 "GND" H 6555 2127 50  0000 C CNN
F 2 "" H 6550 2300 50  0001 C CNN
F 3 "" H 6550 2300 50  0001 C CNN
	1    6550 2300
	1    0    0    -1  
$EndComp
Wire Wire Line
	6550 2300 6100 2300
Connection ~ 6100 2300
Text GLabel 6100 2700 2    50   Input ~ 0
V-
Text GLabel 6100 1900 2    50   Input ~ 0
V+
Text GLabel 5200 2750 2    50   Input ~ 0
V+
Text GLabel 5200 3350 2    50   Input ~ 0
V-
Text GLabel 5750 3050 2    50   Input ~ 0
SINE_OUT
Wire Wire Line
	5600 3050 5700 3050
$Comp
L mbedded-ninja-kicad-symbols-sim:10k R1
U 1 1 608B013F
P 5150 2500
F 0 "R1" V 4945 2500 50  0000 C CNN
F 1 "15.9k" V 5036 2500 50  0000 C CNN
F 2 "" H 5250 1800 50  0001 L CNN
F 3 "" H 5150 2500 50  0001 L CNN
F 4 "R" H 5300 2350 50  0001 C CNN "Spice_Primitive"
	1    5150 2500
	0    1    1    0   
$EndComp
$Comp
L mbedded-ninja-kicad-symbols-sim:100n C1
U 1 1 608B0C13
P 5450 2500
F 0 "C1" V 5198 2500 50  0000 C CNN
F 1 "10n" V 5289 2500 50  0000 C CNN
F 2 "" H 5650 1700 50  0001 L CNN
F 3 "" H 5450 2500 50  0001 L CNN
F 4 "C" H 5650 2350 50  0001 C CNN "Spice_Primitive"
	1    5450 2500
	0    1    1    0   
$EndComp
Wire Wire Line
	5000 2950 4950 2950
Wire Wire Line
	4950 2950 4950 2500
Wire Wire Line
	4950 2500 5000 2500
Wire Wire Line
	5600 2500 5700 2500
Wire Wire Line
	5700 2500 5700 3050
Connection ~ 5700 3050
Wire Wire Line
	5700 3050 5750 3050
$Comp
L mbedded-ninja-kicad-symbols-sim:10k R2
U 1 1 608B4708
P 4300 2650
F 0 "R2" H 4500 2600 50  0000 R CNN
F 1 "15.9k" H 4600 2700 50  0000 R CNN
F 2 "" H 4400 1950 50  0001 L CNN
F 3 "" H 4300 2650 50  0001 L CNN
F 4 "R" H 4450 2500 50  0001 C CNN "Spice_Primitive"
	1    4300 2650
	-1   0    0    1   
$EndComp
$Comp
L mbedded-ninja-kicad-symbols-sim:100n C2
U 1 1 608B5320
P 4600 2650
F 0 "C2" H 4485 2604 50  0000 R CNN
F 1 "10n" H 4485 2695 50  0000 R CNN
F 2 "" H 4800 1850 50  0001 L CNN
F 3 "" H 4600 2650 50  0001 L CNN
F 4 "C" H 4800 2500 50  0001 C CNN "Spice_Primitive"
	1    4600 2650
	-1   0    0    1   
$EndComp
Wire Wire Line
	4950 2500 4600 2500
Connection ~ 4950 2500
Connection ~ 4600 2500
Wire Wire Line
	4600 2500 4300 2500
Wire Wire Line
	4300 2800 4450 2800
$Comp
L power:GND #PWR01
U 1 1 608B90B6
P 4450 2800
F 0 "#PWR01" H 4450 2550 50  0001 C CNN
F 1 "GND" H 4455 2627 50  0000 C CNN
F 2 "" H 4450 2800 50  0001 C CNN
F 3 "" H 4450 2800 50  0001 C CNN
	1    4450 2800
	1    0    0    -1  
$EndComp
Connection ~ 4450 2800
Wire Wire Line
	4450 2800 4600 2800
$Comp
L mbedded-ninja-kicad-symbols-sim:10k R5
U 1 1 608B9D87
P 5450 3650
F 0 "R5" V 5245 3650 50  0000 C CNN
F 1 "280" V 5336 3650 50  0000 C CNN
F 2 "" H 5550 2950 50  0001 L CNN
F 3 "" H 5450 3650 50  0001 L CNN
F 4 "R" H 5600 3500 50  0001 C CNN "Spice_Primitive"
	1    5450 3650
	0    1    1    0   
$EndComp
$Comp
L mbedded-ninja-kicad-symbols-sim:10k R3
U 1 1 608BA789
P 5050 3650
F 0 "R3" V 4845 3650 50  0000 C CNN
F 1 "1.92k" V 4936 3650 50  0000 C CNN
F 2 "" H 5150 2950 50  0001 L CNN
F 3 "" H 5050 3650 50  0001 L CNN
F 4 "R" H 5200 3500 50  0001 C CNN "Spice_Primitive"
	1    5050 3650
	0    1    1    0   
$EndComp
Wire Wire Line
	4900 3650 4850 3650
Wire Wire Line
	4850 3650 4850 3850
Wire Wire Line
	4850 4150 4900 4150
Wire Wire Line
	4900 3850 4850 3850
Connection ~ 4850 3850
Wire Wire Line
	4850 3850 4850 4150
Wire Wire Line
	5200 3650 5250 3650
Wire Wire Line
	5250 3650 5250 3850
Wire Wire Line
	5250 4150 5200 4150
Wire Wire Line
	5200 3850 5250 3850
Connection ~ 5250 3850
Wire Wire Line
	5250 3850 5250 4150
Wire Wire Line
	5250 3650 5300 3650
Connection ~ 5250 3650
Wire Wire Line
	5600 3650 5700 3650
Wire Wire Line
	5700 3650 5700 3050
$Comp
L power:GND #PWR02
U 1 1 608C0372
P 4450 3650
F 0 "#PWR02" H 4450 3400 50  0001 C CNN
F 1 "GND" H 4455 3477 50  0000 C CNN
F 2 "" H 4450 3650 50  0001 C CNN
F 3 "" H 4450 3650 50  0001 C CNN
	1    4450 3650
	1    0    0    -1  
$EndComp
Wire Wire Line
	4450 3650 4500 3650
Wire Wire Line
	4800 3650 4850 3650
Connection ~ 4850 3650
Wire Wire Line
	4850 3650 4850 3150
Wire Wire Line
	4850 3150 5000 3150
$Comp
L mbedded-ninja-kicad-symbols-sim:10k R4
U 1 1 608BF7F2
P 4650 3650
F 0 "R4" V 4445 3650 50  0000 C CNN
F 1 "1k" V 4536 3650 50  0000 C CNN
F 2 "" H 4750 2950 50  0001 L CNN
F 3 "" H 4650 3650 50  0001 L CNN
F 4 "R" H 4800 3500 50  0001 C CNN "Spice_Primitive"
	1    4650 3650
	0    1    1    0   
$EndComp
$Comp
L mbedded-ninja-kicad-symbols-sim:1N4148 D2
U 1 1 608A7C60
P 5050 4150
F 0 "D2" H 5050 4250 50  0000 C CNN
F 1 "1N4148" H 5050 4050 50  0000 C CNN
F 2 "" H 5050 4150 50  0001 C CNN
F 3 "~" H 5050 4150 50  0001 C CNN
F 4 "D" H 5050 3650 50  0001 C CNN "Spice_Primitive"
F 5 "1N4148" H 5050 3750 50  0001 C CNN "Spice_Model"
F 6 "Y" H 5050 3850 50  0001 C CNN "Spice_Netlist_Enabled"
F 7 "2 1" H 5050 3950 50  0001 C CNN "Spice_Node_Sequence"
F 8 "1N4148.lib" H 5050 3550 50  0001 C CNN "Spice_Lib_File"
	1    5050 4150
	1    0    0    -1  
$EndComp
$EndSCHEMATC
