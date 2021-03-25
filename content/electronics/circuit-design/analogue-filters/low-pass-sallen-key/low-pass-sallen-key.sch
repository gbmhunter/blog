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
U 1 1 605C4F0C
P 5400 3750
F 0 "U1" H 5500 4050 50  0000 L CNN
F 1 "AD8051" H 5500 3950 50  0000 L CNN
F 2 "" H 5300 3650 50  0001 C CNN
F 3 "" H 5400 3750 50  0001 C CNN
F 4 "X" H 5400 4000 50  0001 L CNN "Spice_Primitive"
F 5 "AD8051" H 5400 4000 50  0001 L CNN "Spice_Model"
F 6 "Y" H 5400 4000 50  0001 L CNN "Spice_Netlist_Enabled"
F 7 "sim\\AD8051.lib" H 5400 4000 50  0001 L CNN "Spice_Lib_File"
	1    5400 3750
	1    0    0    -1  
$EndComp
$Comp
L mbedded-ninja-kicad-symbols-sim:DC12 V2
U 1 1 605C572E
P 7200 2800
F 0 "V2" H 7328 2846 50  0000 L CNN
F 1 "DC 12" H 7328 2755 50  0000 L CNN
F 2 "" H 7200 2800 50  0000 C CNN
F 3 "" H 7200 2800 50  0000 C CNN
F 4 "V" H 7450 2550 60  0001 C CNN "Spice_Primitive"
F 5 "1 2" H 7450 2650 60  0001 C CNN "Spice_Node_Sequence"
	1    7200 2800
	1    0    0    -1  
$EndComp
$Comp
L mbedded-ninja-kicad-symbols-sim:DC12 V3
U 1 1 605C61E3
P 7200 3200
F 0 "V3" H 7328 3246 50  0000 L CNN
F 1 "DC 12" H 7328 3155 50  0000 L CNN
F 2 "" H 7200 3200 50  0000 C CNN
F 3 "" H 7200 3200 50  0000 C CNN
F 4 "V" H 7450 2950 60  0001 C CNN "Spice_Primitive"
F 5 "1 2" H 7450 3050 60  0001 C CNN "Spice_Node_Sequence"
	1    7200 3200
	1    0    0    -1  
$EndComp
$Comp
L mbedded-ninja-kicad-symbols-sim:10k R2
U 1 1 605C6C21
P 4050 3650
F 0 "R2" V 3845 3650 50  0000 C CNN
F 1 "10k" V 3936 3650 50  0000 C CNN
F 2 "" H 4150 2950 50  0001 L CNN
F 3 "" H 4050 3650 50  0001 L CNN
F 4 "R" H 4200 3500 50  0001 C CNN "Spice_Primitive"
	1    4050 3650
	0    1    1    0   
$EndComp
$Comp
L mbedded-ninja-kicad-symbols-sim:100n C2
U 1 1 605C7887
P 4800 3150
F 0 "C2" V 4548 3150 50  0000 C CNN
F 1 "100n" V 4639 3150 50  0000 C CNN
F 2 "" H 5000 2350 50  0001 L CNN
F 3 "" H 4800 3150 50  0001 L CNN
F 4 "C" H 5000 3000 50  0001 C CNN "Spice_Primitive"
	1    4800 3150
	0    1    1    0   
$EndComp
$Comp
L mbedded-ninja-kicad-symbols-sim:DC12 V1
U 1 1 605C7E56
P 3800 3850
F 0 "V1" H 3928 3896 50  0000 L CNN
F 1 "AC 1" H 3928 3805 50  0000 L CNN
F 2 "" H 3800 3850 50  0000 C CNN
F 3 "" H 3800 3850 50  0000 C CNN
F 4 "V" H 4050 3600 60  0001 C CNN "Spice_Primitive"
F 5 "1 2" H 4050 3700 60  0001 C CNN "Spice_Node_Sequence"
	1    3800 3850
	1    0    0    -1  
$EndComp
$Comp
L power:GND #PWR?
U 1 1 605C99D9
P 7700 3050
F 0 "#PWR?" H 7700 2800 50  0001 C CNN
F 1 "GND" H 7705 2877 50  0000 C CNN
F 2 "" H 7700 3050 50  0001 C CNN
F 3 "" H 7700 3050 50  0001 C CNN
	1    7700 3050
	1    0    0    -1  
$EndComp
Wire Wire Line
	7200 3000 7700 3000
Wire Wire Line
	7700 3000 7700 3050
Connection ~ 7200 3000
Text Label 5300 3450 0    50   ~ 0
V+
Text Label 5300 4050 0    50   ~ 0
V-
$Comp
L mbedded-ninja-kicad-symbols-sim:10k R1
U 1 1 605CE5B3
P 4500 3650
F 0 "R1" V 4295 3650 50  0000 C CNN
F 1 "10k" V 4386 3650 50  0000 C CNN
F 2 "" H 4600 2950 50  0001 L CNN
F 3 "" H 4500 3650 50  0001 L CNN
F 4 "R" H 4650 3500 50  0001 C CNN "Spice_Primitive"
	1    4500 3650
	0    1    1    0   
$EndComp
Wire Wire Line
	5100 3850 5100 4150
Wire Wire Line
	5100 4150 5700 4150
Wire Wire Line
	5700 4150 5700 3750
Wire Wire Line
	5700 3750 5800 3750
Connection ~ 5700 3750
Text Label 6100 3750 0    50   ~ 0
out
Wire Wire Line
	4200 3650 4250 3650
Wire Wire Line
	4250 3650 4250 3150
Wire Wire Line
	4250 3150 4650 3150
Connection ~ 4250 3650
Wire Wire Line
	4250 3650 4350 3650
Wire Wire Line
	4950 3150 5800 3150
Wire Wire Line
	5800 3150 5800 3750
Connection ~ 5800 3750
Wire Wire Line
	5800 3750 6100 3750
$Comp
L mbedded-ninja-kicad-symbols-sim:100n C1
U 1 1 605D026A
P 4650 3950
F 0 "C1" H 4535 3904 50  0000 R CNN
F 1 "100n" H 4535 3995 50  0000 R CNN
F 2 "" H 4850 3150 50  0001 L CNN
F 3 "" H 4650 3950 50  0001 L CNN
F 4 "C" H 4850 3800 50  0001 C CNN "Spice_Primitive"
	1    4650 3950
	-1   0    0    1   
$EndComp
Wire Wire Line
	4650 3650 4650 3800
$Comp
L power:GND #PWR?
U 1 1 605D2869
P 4650 4100
F 0 "#PWR?" H 4650 3850 50  0001 C CNN
F 1 "GND" H 4655 3927 50  0000 C CNN
F 2 "" H 4650 4100 50  0001 C CNN
F 3 "" H 4650 4100 50  0001 C CNN
	1    4650 4100
	1    0    0    -1  
$EndComp
Wire Wire Line
	4650 3650 5100 3650
Connection ~ 4650 3650
$Comp
L power:GND #PWR?
U 1 1 605D4D8C
P 3800 4050
F 0 "#PWR?" H 3800 3800 50  0001 C CNN
F 1 "GND" H 3805 3877 50  0000 C CNN
F 2 "" H 3800 4050 50  0001 C CNN
F 3 "" H 3800 4050 50  0001 C CNN
	1    3800 4050
	1    0    0    -1  
$EndComp
Wire Wire Line
	3800 3650 3900 3650
Text Label 7200 2600 0    50   ~ 0
V+
Text Label 7200 3400 0    50   ~ 0
V-
Text Notes 4150 4450 0    50   ~ 0
.ac dec 10 1 10Meg
$EndSCHEMATC
