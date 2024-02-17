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
L mbedded-ninja-kicad-symbols-sim:100n C1
U 1 1 60CBBD0A
P 4500 3650
F 0 "C1" H 4615 3696 50  0000 L CNN
F 1 "100u" H 4615 3605 50  0000 L CNN
F 2 "" H 4700 2850 50  0001 L CNN
F 3 "" H 4500 3650 50  0001 L CNN
F 4 "C" H 4700 3500 50  0001 C CNN "Spice_Primitive"
	1    4500 3650
	1    0    0    -1  
$EndComp
$Comp
L mbedded-ninja-kicad-symbols-sim:10k R1
U 1 1 60CBC5CA
P 4050 3350
F 0 "R1" H 3982 3304 50  0000 R CNN
F 1 "200" H 3982 3395 50  0000 R CNN
F 2 "" H 4150 2650 50  0001 L CNN
F 3 "" H 4050 3350 50  0001 L CNN
F 4 "R" H 4200 3200 50  0001 C CNN "Spice_Primitive"
	1    4050 3350
	-1   0    0    1   
$EndComp
$Comp
L mbedded-ninja-kicad-symbols-sim:10k R2
U 1 1 60CBEF2B
P 4050 3650
F 0 "R2" H 3982 3604 50  0000 R CNN
F 1 "1k" H 3982 3695 50  0000 R CNN
F 2 "" H 4150 2950 50  0001 L CNN
F 3 "" H 4050 3650 50  0001 L CNN
F 4 "R" H 4200 3500 50  0001 C CNN "Spice_Primitive"
	1    4050 3650
	-1   0    0    1   
$EndComp
$Comp
L mbedded-ninja-kicad-symbols-sim:2N2222 Q1
U 1 1 60CC0E02
P 4500 3300
F 0 "Q1" V 4800 3300 50  0000 C CNN
F 1 "2N2222" V 4700 3150 50  0000 L CNN
F 2 "" H 4700 3225 50  0001 L CIN
F 3 "" H 4500 3300 50  0001 L CNN
F 4 "Q" H 4700 3375 50  0001 L CNN "Spice_Primitive"
F 5 "2N2222" H 4700 3375 50  0001 L CNN "Spice_Model"
F 6 "Y" H 4700 3375 50  0001 L CNN "Spice_Netlist_Enabled"
F 7 "3 2 1" H 4700 3375 50  0001 L CNN "Spice_Node_Sequence"
F 8 "2N2222.lib" H 4700 3375 50  0001 L CNN "Spice_Lib_File"
	1    4500 3300
	0    -1   -1   0   
$EndComp
$Comp
L power:GND #PWR03
U 1 1 60CC32F6
P 4500 3800
F 0 "#PWR03" H 4500 3550 50  0001 C CNN
F 1 "GND" H 4505 3627 50  0000 C CNN
F 2 "" H 4500 3800 50  0001 C CNN
F 3 "" H 4500 3800 50  0001 C CNN
	1    4500 3800
	1    0    0    -1  
$EndComp
$Comp
L power:GND #PWR02
U 1 1 60CC3DC1
P 4050 3800
F 0 "#PWR02" H 4050 3550 50  0001 C CNN
F 1 "GND" H 4055 3627 50  0000 C CNN
F 2 "" H 4050 3800 50  0001 C CNN
F 3 "" H 4050 3800 50  0001 C CNN
	1    4050 3800
	1    0    0    -1  
$EndComp
$Comp
L mbedded-ninja-kicad-symbols-sim:DC12 V1
U 1 1 60CC44AD
P 3400 3800
F 0 "V1" H 3528 3846 50  0000 L CNN
F 1 "DC 12" H 3528 3755 50  0000 L CNN
F 2 "" H 3400 3800 50  0000 C CNN
F 3 "" H 3400 3800 50  0000 C CNN
F 4 "V" H 3650 3550 60  0001 C CNN "Spice_Primitive"
F 5 "1 2" H 3650 3650 60  0001 C CNN "Spice_Node_Sequence"
	1    3400 3800
	1    0    0    -1  
$EndComp
$Comp
L power:GND #PWR01
U 1 1 60CC56A7
P 3400 4000
F 0 "#PWR01" H 3400 3750 50  0001 C CNN
F 1 "GND" H 3405 3827 50  0000 C CNN
F 2 "" H 3400 4000 50  0001 C CNN
F 3 "" H 3400 4000 50  0001 C CNN
	1    3400 4000
	1    0    0    -1  
$EndComp
Connection ~ 4050 3200
Wire Wire Line
	4050 3200 4300 3200
Wire Wire Line
	4050 3500 4500 3500
Connection ~ 4050 3500
Connection ~ 4500 3500
Text GLabel 5150 3200 2    50   Input ~ 0
V_OUT
$Comp
L mbedded-ninja-kicad-symbols-sim:10k R3
U 1 1 60CBFFC7
P 5050 3550
F 0 "R3" H 4982 3504 50  0000 R CNN
F 1 "100" H 4982 3595 50  0000 R CNN
F 2 "" H 5150 2850 50  0001 L CNN
F 3 "" H 5050 3550 50  0001 L CNN
F 4 "R" H 5200 3400 50  0001 C CNN "Spice_Primitive"
	1    5050 3550
	-1   0    0    1   
$EndComp
Wire Wire Line
	4700 3200 5050 3200
Wire Wire Line
	5050 3400 5050 3200
Connection ~ 5050 3200
Wire Wire Line
	5050 3200 5150 3200
$Comp
L power:GND #PWR04
U 1 1 60CC132B
P 5050 3700
F 0 "#PWR04" H 5050 3450 50  0001 C CNN
F 1 "GND" H 5055 3527 50  0000 C CNN
F 2 "" H 5050 3700 50  0001 C CNN
F 3 "" H 5050 3700 50  0001 C CNN
	1    5050 3700
	1    0    0    -1  
$EndComp
$Comp
L mbedded-ninja-kicad-symbols-sim:DC12 V2
U 1 1 60CC4008
P 3400 3400
F 0 "V2" H 3528 3446 50  0000 L CNN
F 1 "AC 1" H 3528 3355 50  0000 L CNN
F 2 "" H 3400 3400 50  0000 C CNN
F 3 "" H 3400 3400 50  0000 C CNN
F 4 "V" H 3650 3150 60  0001 C CNN "Spice_Primitive"
F 5 "1 2" H 3650 3250 60  0001 C CNN "Spice_Node_Sequence"
	1    3400 3400
	1    0    0    -1  
$EndComp
Wire Wire Line
	3400 3200 4050 3200
Text Notes 2950 3100 0    50   ~ 0
Let's simulate a noisy \npower supply of 12VDC\nwith 1Vp2p ripple!
Text GLabel 3200 3200 0    50   Input ~ 0
V_IN
Wire Wire Line
	3200 3200 3400 3200
Connection ~ 3400 3200
Text Notes 5350 3650 0    50   ~ 0
R3 is our\nload.
$EndSCHEMATC
