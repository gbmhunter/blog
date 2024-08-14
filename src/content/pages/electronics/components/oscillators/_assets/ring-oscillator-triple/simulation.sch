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
L power:GND #PWR0101
U 1 1 60954653
P 3050 1700
F 0 "#PWR0101" H 3050 1450 50  0001 C CNN
F 1 "GND" H 3055 1527 50  0000 C CNN
F 2 "" H 3050 1700 50  0001 C CNN
F 3 "" H 3050 1700 50  0001 C CNN
	1    3050 1700
	1    0    0    -1  
$EndComp
$Comp
L mbedded-ninja-kicad-symbols-sim:DC12 V1
U 1 1 609556FC
P 2250 1650
F 0 "V1" H 2378 1696 50  0000 L CNN
F 1 "DC 5" H 2378 1605 50  0000 L CNN
F 2 "" H 2250 1650 50  0000 C CNN
F 3 "" H 2250 1650 50  0000 C CNN
F 4 "V" H 2500 1400 60  0001 C CNN "Spice_Primitive"
F 5 "1 2" H 2500 1500 60  0001 C CNN "Spice_Node_Sequence"
	1    2250 1650
	1    0    0    -1  
$EndComp
$Comp
L power:GND #PWR0102
U 1 1 60957C61
P 2250 1850
F 0 "#PWR0102" H 2250 1600 50  0001 C CNN
F 1 "GND" H 2255 1677 50  0000 C CNN
F 2 "" H 2250 1850 50  0001 C CNN
F 3 "" H 2250 1850 50  0001 C CNN
	1    2250 1850
	1    0    0    -1  
$EndComp
Text GLabel 2250 1350 0    50   Input ~ 0
+5V
Wire Wire Line
	2250 1350 2250 1450
Text GLabel 3050 700  0    50   Input ~ 0
+5V
Text Notes 3500 2900 0    50   ~ 0
.tran 100p 100n
$Comp
L mbedded-ninja-kicad-symbols-sim:74HCU04 U1
U 1 1 6095481A
P 3000 2400
F 0 "U1" H 3000 2717 50  0000 C CNN
F 1 "MyHCU04" H 3000 2626 50  0000 C CNN
F 2 "" H 1850 2450 50  0001 C CNN
F 3 "" H 1850 2450 50  0001 C CNN
F 4 "X" H 3000 2400 50  0001 C CNN "Spice_Primitive"
F 5 "MyHCU04" H 3000 2400 50  0001 C CNN "Spice_Model"
F 6 "Y" H 3000 2400 50  0001 C CNN "Spice_Netlist_Enabled"
F 7 "MyHCU04.lib" H 3000 2400 50  0001 C CNN "Spice_Lib_File"
	1    3000 2400
	1    0    0    -1  
$EndComp
$Comp
L mbedded-ninja-kicad-symbols-sim:74HCU04 U1
U 2 1 609550A0
P 3050 1200
F 0 "U1" H 3280 1246 50  0000 L CNN
F 1 "MyHCU04" H 3280 1155 50  0000 L CNN
F 2 "" H 1900 1250 50  0001 C CNN
F 3 "" H 1900 1250 50  0001 C CNN
F 4 "X" H 3050 1200 50  0001 C CNN "Spice_Primitive"
F 5 "MyHCU04" H 3050 1200 50  0001 C CNN "Spice_Model"
F 6 "Y" H 3050 1200 50  0001 C CNN "Spice_Netlist_Enabled"
F 7 "MyHCU04.lib" H 3050 1200 50  0001 C CNN "Spice_Lib_File"
	2    3050 1200
	1    0    0    -1  
$EndComp
Text GLabel 5100 2400 2    50   Input ~ 0
OUT
$Comp
L mbedded-ninja-kicad-symbols-sim:74HCU04 U2
U 1 1 6099F55F
P 3700 2400
F 0 "U2" H 3700 2717 50  0000 C CNN
F 1 "MyHCU04" H 3700 2626 50  0000 C CNN
F 2 "" H 2550 2450 50  0001 C CNN
F 3 "" H 2550 2450 50  0001 C CNN
F 4 "X" H 3700 2400 50  0001 C CNN "Spice_Primitive"
F 5 "MyHCU04" H 3700 2400 50  0001 C CNN "Spice_Model"
F 6 "Y" H 3700 2400 50  0001 C CNN "Spice_Netlist_Enabled"
F 7 "MyHCU04.lib" H 3700 2400 50  0001 C CNN "Spice_Lib_File"
	1    3700 2400
	1    0    0    -1  
$EndComp
$Comp
L power:GND #PWR03
U 1 1 609A06B2
P 3850 1700
F 0 "#PWR03" H 3850 1450 50  0001 C CNN
F 1 "GND" H 3855 1527 50  0000 C CNN
F 2 "" H 3850 1700 50  0001 C CNN
F 3 "" H 3850 1700 50  0001 C CNN
	1    3850 1700
	1    0    0    -1  
$EndComp
Text GLabel 3850 700  0    50   Input ~ 0
+5V
$Comp
L mbedded-ninja-kicad-symbols-sim:74HCU04 U2
U 2 1 609A06BD
P 3850 1200
F 0 "U2" H 4080 1246 50  0000 L CNN
F 1 "MyHCU04" H 4080 1155 50  0000 L CNN
F 2 "" H 2700 1250 50  0001 C CNN
F 3 "" H 2700 1250 50  0001 C CNN
F 4 "X" H 3850 1200 50  0001 C CNN "Spice_Primitive"
F 5 "MyHCU04" H 3850 1200 50  0001 C CNN "Spice_Model"
F 6 "Y" H 3850 1200 50  0001 C CNN "Spice_Netlist_Enabled"
F 7 "MyHCU04.lib" H 3850 1200 50  0001 C CNN "Spice_Lib_File"
	2    3850 1200
	1    0    0    -1  
$EndComp
$Comp
L mbedded-ninja-kicad-symbols-sim:74HCU04 U3
U 1 1 609A337D
P 4400 2400
F 0 "U3" H 4400 2717 50  0000 C CNN
F 1 "MyHCU04" H 4400 2626 50  0000 C CNN
F 2 "" H 3250 2450 50  0001 C CNN
F 3 "" H 3250 2450 50  0001 C CNN
F 4 "X" H 4400 2400 50  0001 C CNN "Spice_Primitive"
F 5 "MyHCU04" H 4400 2400 50  0001 C CNN "Spice_Model"
F 6 "Y" H 4400 2400 50  0001 C CNN "Spice_Netlist_Enabled"
F 7 "MyHCU04.lib" H 4400 2400 50  0001 C CNN "Spice_Lib_File"
	1    4400 2400
	1    0    0    -1  
$EndComp
$Comp
L power:GND #PWR05
U 1 1 609A811C
P 4650 1700
F 0 "#PWR05" H 4650 1450 50  0001 C CNN
F 1 "GND" H 4655 1527 50  0000 C CNN
F 2 "" H 4650 1700 50  0001 C CNN
F 3 "" H 4650 1700 50  0001 C CNN
	1    4650 1700
	1    0    0    -1  
$EndComp
Text GLabel 4650 700  0    50   Input ~ 0
+5V
$Comp
L mbedded-ninja-kicad-symbols-sim:74HCU04 U3
U 2 1 609A8127
P 4650 1200
F 0 "U3" H 4880 1246 50  0000 L CNN
F 1 "MyHCU04" H 4880 1155 50  0000 L CNN
F 2 "" H 3500 1250 50  0001 C CNN
F 3 "" H 3500 1250 50  0001 C CNN
F 4 "X" H 4650 1200 50  0001 C CNN "Spice_Primitive"
F 5 "MyHCU04" H 4650 1200 50  0001 C CNN "Spice_Model"
F 6 "Y" H 4650 1200 50  0001 C CNN "Spice_Netlist_Enabled"
F 7 "MyHCU04.lib" H 4650 1200 50  0001 C CNN "Spice_Lib_File"
	2    4650 1200
	1    0    0    -1  
$EndComp
Wire Wire Line
	2650 2400 2650 2750
Wire Wire Line
	2650 2750 5000 2750
Wire Wire Line
	5000 2750 5000 2400
Wire Wire Line
	2650 2400 2700 2400
Connection ~ 5000 2400
Wire Wire Line
	5000 2400 5100 2400
Wire Wire Line
	3300 2400 3400 2400
Wire Wire Line
	4000 2400 4100 2400
Wire Wire Line
	4700 2400 5000 2400
$EndSCHEMATC
