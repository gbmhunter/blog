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
L op-amp-current-sink-simulation-rescue:R-rectifier_schlib-charge-pump-voltage-doubler-simulation-rescue-charge-pump-voltage-doubler-simulation-rescue-charge-pump-voltage-doubler-simulation-rescue-charge-pump-voltage-doubler-simulation-rescue R2
U 1 1 573362F7
P 6000 4200
F 0 "R2" H 5930 4154 50  0000 R CNN
F 1 "1R" H 5930 4245 50  0000 R CNN
F 2 "" V 5930 4200 50  0000 C CNN
F 3 "" H 6000 4200 50  0000 C CNN
F 4 "Value" H 6000 4200 60  0001 C CNN "Fieldname"
F 5 "1 2" H 6000 4200 60  0001 C CNN "SpiceMapping"
F 6 "R" V 6000 4200 60  0001 C CNN "Spice_Primitive"
	1    6000 4200
	-1   0    0    1   
$EndComp
Text Notes 4600 4550 0    60   ~ 0
.tran 1u 100u\n
Text Label 5450 3650 0    60   ~ 0
vout
$Comp
L op-amp-current-sink-simulation-rescue:VSOURCE-rectifier_schlib-charge-pump-voltage-doubler-simulation-rescue-charge-pump-voltage-doubler-simulation-rescue-charge-pump-voltage-doubler-simulation-rescue-charge-pump-voltage-doubler-simulation-rescue V1
U 1 1 5FD5E984
P 5350 2400
F 0 "V1" H 5050 2450 50  0000 L CNN
F 1 "DC 10" H 5000 2350 50  0000 L CNN
F 2 "" H 5350 2400 50  0000 C CNN
F 3 "" H 5350 2400 50  0000 C CNN
F 4 "Value" H 5350 2400 60  0001 C CNN "Fieldname"
F 5 "V" H 5350 2400 60  0001 C CNN "Spice_Primitive"
F 6 "1 2" H 5050 2600 60  0001 C CNN "Spice_Node_Sequence"
	1    5350 2400
	1    0    0    -1  
$EndComp
$Comp
L op-amp-current-sink-simulation-rescue:GND-rectifier_schlib-charge-pump-voltage-doubler-simulation-rescue-charge-pump-voltage-doubler-simulation-rescue-charge-pump-voltage-doubler-simulation-rescue-charge-pump-voltage-doubler-simulation-rescue #PWR?
U 1 1 5FD6A33F
P 6000 4550
F 0 "#PWR?" H 6000 4300 50  0001 C CNN
F 1 "GND" H 6005 4377 50  0000 C CNN
F 2 "" H 6000 4550 50  0000 C CNN
F 3 "" H 6000 4550 50  0000 C CNN
	1    6000 4550
	1    0    0    -1  
$EndComp
Wire Wire Line
	6000 4350 6000 4550
$Comp
L op-amp-current-sink-simulation-rescue:VSOURCE-rectifier_schlib-charge-pump-voltage-doubler-simulation-rescue-charge-pump-voltage-doubler-simulation-rescue-charge-pump-voltage-doubler-simulation-rescue-charge-pump-voltage-doubler-simulation-rescue V2
U 1 1 5FE4F593
P 4100 3750
F 0 "V2" H 3800 3800 50  0000 L CNN
F 1 "DC 1.0" H 3750 3700 50  0000 L CNN
F 2 "" H 4100 3750 50  0000 C CNN
F 3 "" H 4100 3750 50  0000 C CNN
F 4 "Value" H 4100 3750 60  0001 C CNN "Fieldname"
F 5 "V" H 4100 3750 60  0001 C CNN "Spice_Primitive"
F 6 "1 2" H 3800 3950 60  0001 C CNN "Spice_Node_Sequence"
	1    4100 3750
	1    0    0    -1  
$EndComp
$Comp
L op-amp-current-sink-simulation-rescue:GND-rectifier_schlib-charge-pump-voltage-doubler-simulation-rescue-charge-pump-voltage-doubler-simulation-rescue-charge-pump-voltage-doubler-simulation-rescue-charge-pump-voltage-doubler-simulation-rescue #PWR?
U 1 1 5FE500EF
P 4100 3950
F 0 "#PWR?" H 4100 3700 50  0001 C CNN
F 1 "GND" H 4105 3777 50  0000 C CNN
F 2 "" H 4100 3950 50  0000 C CNN
F 3 "" H 4100 3950 50  0000 C CNN
	1    4100 3950
	1    0    0    -1  
$EndComp
Wire Wire Line
	4100 3550 4600 3550
$Comp
L laser_driver_schlib:Generic_Opamp U1
U 1 1 5788FF9F
P 4900 3650
F 0 "U1" H 4900 3800 50  0000 L CNN
F 1 "AD8009" H 4900 3500 50  0000 L CNN
F 2 "" H 4800 3550 50  0000 C CNN
F 3 "" H 4900 3650 50  0000 C CNN
F 4 "Value" H 4900 3650 60  0001 C CNN "Fieldname"
F 5 "X" H 4900 3650 60  0001 C CNN "Spice_Primitive"
F 6 "ad8009" H 4900 3650 60  0001 C CNN "Spice_Model"
F 7 "Y" H 4900 3650 60  0001 C CNN "Spice_Netlist_Enabled"
F 8 "ad8009.lib" H 4900 3650 60  0001 C CNN "Spice_Lib_File"
	1    4900 3650
	1    0    0    -1  
$EndComp
Text Label 4300 3550 0    60   ~ 0
vset
Wire Wire Line
	5300 4250 5300 4000
Wire Wire Line
	5300 4000 6000 4000
Connection ~ 6000 4000
Wire Wire Line
	6000 4000 6000 4050
Wire Wire Line
	4300 4250 4300 3750
Wire Wire Line
	4300 3750 4600 3750
Wire Wire Line
	4300 4250 5300 4250
Text Label 4300 3750 0    60   ~ 0
vrsense
Text Notes 2350 4900 0    50   ~ 0
.model 2N7002 VDMOS(Rg=3 Vto=1.6 Rd=0 Rs=.75 Rb=.14 Kp=.17 mtriode=1.25 Cgdmax=80p Cgdmin=12p Cgs=50p Cjo=50p Is=.04p ksubthres=.1)
$Comp
L op-amp-current-sink-simulation-rescue:GND-rectifier_schlib-charge-pump-voltage-doubler-simulation-rescue-charge-pump-voltage-doubler-simulation-rescue-charge-pump-voltage-doubler-simulation-rescue-charge-pump-voltage-doubler-simulation-rescue #PWR?
U 1 1 5FE66693
P 5600 2600
F 0 "#PWR?" H 5600 2350 50  0001 C CNN
F 1 "GND" H 5605 2427 50  0000 C CNN
F 2 "" H 5600 2600 50  0000 C CNN
F 3 "" H 5600 2600 50  0000 C CNN
	1    5600 2600
	1    0    0    -1  
$EndComp
$Comp
L op-amp-current-sink-simulation-rescue:VSOURCE-rectifier_schlib-charge-pump-voltage-doubler-simulation-rescue-charge-pump-voltage-doubler-simulation-rescue-charge-pump-voltage-doubler-simulation-rescue-charge-pump-voltage-doubler-simulation-rescue V3
U 1 1 5FE6753E
P 5350 2800
F 0 "V3" H 5050 2850 50  0000 L CNN
F 1 "DC 10" H 5000 2750 50  0000 L CNN
F 2 "" H 5350 2800 50  0000 C CNN
F 3 "" H 5350 2800 50  0000 C CNN
F 4 "Value" H 5350 2800 60  0001 C CNN "Fieldname"
F 5 "V" H 5350 2800 60  0001 C CNN "Spice_Primitive"
F 6 "1 2" H 5050 3000 60  0001 C CNN "Spice_Node_Sequence"
	1    5350 2800
	1    0    0    -1  
$EndComp
Wire Wire Line
	5350 2600 5600 2600
Connection ~ 5350 2600
$Comp
L power:VSS #PWR?
U 1 1 5FE6838A
P 5350 3000
F 0 "#PWR?" H 5350 2850 50  0001 C CNN
F 1 "VSS" H 5368 3173 50  0000 C CNN
F 2 "" H 5350 3000 50  0001 C CNN
F 3 "" H 5350 3000 50  0001 C CNN
	1    5350 3000
	-1   0    0    1   
$EndComp
$Comp
L power:VDD #PWR?
U 1 1 5FE690E4
P 5350 2200
F 0 "#PWR?" H 5350 2050 50  0001 C CNN
F 1 "VDD" H 5367 2373 50  0000 C CNN
F 2 "" H 5350 2200 50  0001 C CNN
F 3 "" H 5350 2200 50  0001 C CNN
	1    5350 2200
	1    0    0    -1  
$EndComp
$Comp
L power:VDD #PWR?
U 1 1 5FE6980A
P 4800 3350
F 0 "#PWR?" H 4800 3200 50  0001 C CNN
F 1 "VDD" H 4817 3523 50  0000 C CNN
F 2 "" H 4800 3350 50  0001 C CNN
F 3 "" H 4800 3350 50  0001 C CNN
	1    4800 3350
	1    0    0    -1  
$EndComp
$Comp
L power:VDD #PWR?
U 1 1 5FE6A2B5
P 6000 3150
F 0 "#PWR?" H 6000 3000 50  0001 C CNN
F 1 "VDD" H 6017 3323 50  0000 C CNN
F 2 "" H 6000 3150 50  0001 C CNN
F 3 "" H 6000 3150 50  0001 C CNN
	1    6000 3150
	1    0    0    -1  
$EndComp
$Comp
L power:VSS #PWR?
U 1 1 5FE6AB5C
P 4800 3950
F 0 "#PWR?" H 4800 3800 50  0001 C CNN
F 1 "VSS" H 4818 4123 50  0000 C CNN
F 2 "" H 4800 3950 50  0001 C CNN
F 3 "" H 4800 3950 50  0001 C CNN
	1    4800 3950
	-1   0    0    1   
$EndComp
Wire Wire Line
	6000 3150 6000 3450
Wire Wire Line
	5200 3650 5700 3650
$Comp
L Device:Q_NMOS_DGS M1
U 1 1 5FE74FF3
P 5900 3650
F 0 "M1" H 6104 3696 50  0000 L CNN
F 1 "2N7002" H 6104 3605 50  0000 L CNN
F 2 "" H 6100 3750 50  0001 C CNN
F 3 "~" H 5900 3650 50  0001 C CNN
	1    5900 3650
	1    0    0    -1  
$EndComp
Wire Wire Line
	6000 3850 6000 4000
Text Notes 3900 3150 0    50   ~ 0
.control\nversion\n.endc
$EndSCHEMATC
