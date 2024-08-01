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
L op-amp-current-sink-simulation-rescue:R-rectifier_schlib-charge-pump-voltage-doubler-simulation-rescue-charge-pump-voltage-doubler-simulation-rescue-charge-pump-voltage-doubler-simulation-rescue-charge-pump-voltage-doubler-simulation-rescue Rsense
U 1 1 573362F7
P 5800 4200
F 0 "Rsense" H 5730 4154 50  0000 R CNN
F 1 "1R" H 5730 4245 50  0000 R CNN
F 2 "" V 5730 4200 50  0000 C CNN
F 3 "" H 5800 4200 50  0000 C CNN
F 4 "Value" H 5800 4200 60  0001 C CNN "Fieldname"
F 5 "1 2" H 5800 4200 60  0001 C CNN "SpiceMapping"
F 6 "R" V 5800 4200 60  0001 C CNN "Spice_Primitive"
	1    5800 4200
	-1   0    0    1   
$EndComp
$Comp
L op-amp-current-sink-simulation-rescue:GND-rectifier_schlib-charge-pump-voltage-doubler-simulation-rescue-charge-pump-voltage-doubler-simulation-rescue-charge-pump-voltage-doubler-simulation-rescue-charge-pump-voltage-doubler-simulation-rescue #PWR?
U 1 1 5FD6A33F
P 5800 4400
F 0 "#PWR?" H 5800 4150 50  0001 C CNN
F 1 "GND" H 5805 4227 50  0000 C CNN
F 2 "" H 5800 4400 50  0000 C CNN
F 3 "" H 5800 4400 50  0000 C CNN
	1    5800 4400
	1    0    0    -1  
$EndComp
Wire Wire Line
	5800 4350 5800 4400
Wire Wire Line
	4300 3550 4600 3550
$Comp
L laser_driver_schlib:Generic_Opamp U1
U 1 1 5788FF9F
P 4900 3650
F 0 "U1" H 5000 3950 50  0000 L CNN
F 1 "OPA187" H 5000 3850 50  0000 L CNN
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
Wire Wire Line
	5300 4250 5300 4000
Wire Wire Line
	5300 4000 5800 4000
Connection ~ 5800 4000
Wire Wire Line
	5800 4000 5800 4050
Wire Wire Line
	4300 4250 4300 3750
Wire Wire Line
	4300 3750 4600 3750
Wire Wire Line
	4300 4250 5300 4250
$Comp
L power:VDD +12V
U 1 1 5FE6A2B5
P 5800 2650
F 0 "+12V" H 5700 2800 50  0000 L CNN
F 1 "VDD" H 5888 2687 50  0001 L CNN
F 2 "" H 5800 2650 50  0001 C CNN
F 3 "" H 5800 2650 50  0001 C CNN
	1    5800 2650
	1    0    0    -1  
$EndComp
Wire Wire Line
	5800 2950 5800 3450
Wire Wire Line
	5200 3650 5500 3650
$Comp
L Device:Q_NMOS_DGS Q1
U 1 1 5FE74FF3
P 5700 3650
F 0 "Q1" H 5905 3696 50  0000 L CNN
F 1 "DMG3406L-13" H 5905 3605 50  0000 L CNN
F 2 "" H 5900 3750 50  0001 C CNN
F 3 "~" H 5700 3650 50  0001 C CNN
	1    5700 3650
	1    0    0    -1  
$EndComp
Wire Wire Line
	5800 3850 5800 4000
$Comp
L power:VDD +12V
U 1 1 5FE779BC
P 4800 3350
F 0 "+12V" H 4700 3500 50  0000 L CNN
F 1 "VDD" H 4888 3387 50  0001 L CNN
F 2 "" H 4800 3350 50  0001 C CNN
F 3 "" H 4800 3350 50  0001 C CNN
	1    4800 3350
	1    0    0    -1  
$EndComp
$Comp
L power:VDD -1V
U 1 1 5FE7856E
P 4800 3950
F 0 "-1V" H 4750 4100 50  0000 L CNN
F 1 "VDD" H 4888 3987 50  0001 L CNN
F 2 "" H 4800 3950 50  0001 C CNN
F 3 "" H 4800 3950 50  0001 C CNN
	1    4800 3950
	-1   0    0    1   
$EndComp
Text GLabel 4300 3550 0    50   Input ~ 0
Vin
$Comp
L op-amp-current-sink-simulation-rescue:R-rectifier_schlib-charge-pump-voltage-doubler-simulation-rescue-charge-pump-voltage-doubler-simulation-rescue-charge-pump-voltage-doubler-simulation-rescue-charge-pump-voltage-doubler-simulation-rescue Rload
U 1 1 5FE7F2DD
P 5800 2800
F 0 "Rload" H 5700 2800 50  0000 R CNN
F 1 "1R" H 5730 2845 50  0001 R CNN
F 2 "" V 5730 2800 50  0001 C CNN
F 3 "" H 5800 2800 50  0001 C CNN
F 4 "Value" H 5800 2800 60  0001 C CNN "Fieldname"
F 5 "1 2" H 5800 2800 60  0001 C CNN "SpiceMapping"
F 6 "R" V 5800 2800 60  0001 C CNN "Spice_Primitive"
	1    5800 2800
	-1   0    0    1   
$EndComp
Wire Notes Line
	4050 3000 6500 3000
Wire Notes Line
	6500 3000 6500 4650
Wire Notes Line
	6500 4650 4050 4650
Wire Notes Line
	4050 4650 4050 3000
Text Notes 4550 4600 0    50   Italic 0
Op-amp current sink\nIload = Vin / 1R
$EndSCHEMATC
