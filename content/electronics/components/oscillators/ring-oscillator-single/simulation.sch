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
P 4150 2850
F 0 "#PWR0101" H 4150 2600 50  0001 C CNN
F 1 "GND" H 4155 2677 50  0000 C CNN
F 2 "" H 4150 2850 50  0001 C CNN
F 3 "" H 4150 2850 50  0001 C CNN
	1    4150 2850
	1    0    0    -1  
$EndComp
$Comp
L mbedded-ninja-kicad-symbols-sim:DC12 V1
U 1 1 609556FC
P 1850 2300
F 0 "V1" H 1978 2346 50  0000 L CNN
F 1 "DC 5" H 1978 2255 50  0000 L CNN
F 2 "" H 1850 2300 50  0000 C CNN
F 3 "" H 1850 2300 50  0000 C CNN
F 4 "V" H 2100 2050 60  0001 C CNN "Spice_Primitive"
F 5 "1 2" H 2100 2150 60  0001 C CNN "Spice_Node_Sequence"
	1    1850 2300
	1    0    0    -1  
$EndComp
$Comp
L power:GND #PWR0102
U 1 1 60957C61
P 1850 2500
F 0 "#PWR0102" H 1850 2250 50  0001 C CNN
F 1 "GND" H 1855 2327 50  0000 C CNN
F 2 "" H 1850 2500 50  0001 C CNN
F 3 "" H 1850 2500 50  0001 C CNN
	1    1850 2500
	1    0    0    -1  
$EndComp
Text GLabel 1850 2000 0    50   Input ~ 0
+5V
Wire Wire Line
	1850 2000 1850 2100
Text GLabel 4150 1850 0    50   Input ~ 0
+5V
$Comp
L power:GND #PWR0103
U 1 1 6094EE4D
P 2700 2400
F 0 "#PWR0103" H 2700 2150 50  0001 C CNN
F 1 "GND" H 2705 2227 50  0000 C CNN
F 2 "" H 2700 2400 50  0001 C CNN
F 3 "" H 2700 2400 50  0001 C CNN
	1    2700 2400
	1    0    0    -1  
$EndComp
Text Notes 2400 2900 0    50   ~ 0
.tran 0.1 1
$Comp
L mbedded-ninja-kicad-symbols-sim:74HCU04 U1
U 1 1 6095481A
P 3000 2400
F 0 "U1" H 3000 2717 50  0000 C CNN
F 1 "74HCU04" H 3000 2626 50  0000 C CNN
F 2 "" H 1850 2450 50  0001 C CNN
F 3 "" H 1850 2450 50  0001 C CNN
F 4 "X" H 3000 2400 50  0001 C CNN "Spice_Primitive"
F 5 "74HCU04" H 3000 2400 50  0001 C CNN "Spice_Model"
F 6 "Y" H 3000 2400 50  0001 C CNN "Spice_Netlist_Enabled"
F 7 "74HCng.lib" H 3000 2400 50  0001 C CNN "Spice_Lib_File"
	1    3000 2400
	1    0    0    -1  
$EndComp
$Comp
L mbedded-ninja-kicad-symbols-sim:74HCU04 U1
U 2 1 609550A0
P 4150 2350
F 0 "U1" H 4380 2396 50  0000 L CNN
F 1 "74HCU04" H 4380 2305 50  0000 L CNN
F 2 "" H 3000 2400 50  0001 C CNN
F 3 "" H 3000 2400 50  0001 C CNN
F 4 "X" H 4150 2350 50  0001 C CNN "Spice_Primitive"
F 5 "74HCU04" H 4150 2350 50  0001 C CNN "Spice_Model"
F 6 "Y" H 4150 2350 50  0001 C CNN "Spice_Netlist_Enabled"
F 7 "74HCng.lib" H 4150 2350 50  0001 C CNN "Spice_Lib_File"
	2    4150 2350
	1    0    0    -1  
$EndComp
Wire Wire Line
	3300 2400 3350 2400
Text GLabel 3350 2400 2    50   Input ~ 0
OUT
$Comp
L mbedded-ninja-kicad-symbols-sim:10k R1
U 1 1 6095F44B
P 3300 2550
F 0 "R1" H 3368 2596 50  0000 L CNN
F 1 "10k" H 3368 2505 50  0000 L CNN
F 2 "" H 3400 1850 50  0001 L CNN
F 3 "" H 3300 2550 50  0001 L CNN
F 4 "R" H 3450 2400 50  0001 C CNN "Spice_Primitive"
	1    3300 2550
	1    0    0    -1  
$EndComp
Connection ~ 3300 2400
$Comp
L power:GND #PWR?
U 1 1 60960813
P 3300 2700
F 0 "#PWR?" H 3300 2450 50  0001 C CNN
F 1 "GND" H 3305 2527 50  0000 C CNN
F 2 "" H 3300 2700 50  0001 C CNN
F 3 "" H 3300 2700 50  0001 C CNN
	1    3300 2700
	1    0    0    -1  
$EndComp
$EndSCHEMATC
