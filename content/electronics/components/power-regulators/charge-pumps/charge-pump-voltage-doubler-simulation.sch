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
L charge-pump-voltage-doubler-simulation-rescue:VSOURCE-rectifier_schlib-charge-pump-voltage-doubler-simulation-rescue V2
U 1 1 57336052
P 4200 4550
F 0 "V2" H 3900 4600 50  0000 L CNN
F 1 "PULSE(0 5 5u 10n 10n 5u 10u)" H 2800 4500 50  0000 L CNN
F 2 "" H 4200 4550 50  0000 C CNN
F 3 "" H 4200 4550 50  0000 C CNN
F 4 "Value" H 4200 4550 60  0001 C CNN "Fieldname"
F 5 "V" H 4200 4550 60  0001 C CNN "Spice_Primitive"
F 6 "1 2" H 3900 4750 60  0001 C CNN "Spice_Node_Sequence"
	1    4200 4550
	1    0    0    -1  
$EndComp
$Comp
L charge-pump-voltage-doubler-simulation-rescue:GND-rectifier_schlib-charge-pump-voltage-doubler-simulation-rescue #PWR01
U 1 1 573360D3
P 4200 4850
F 0 "#PWR01" H 4200 4600 50  0001 C CNN
F 1 "GND" H 4205 4677 50  0000 C CNN
F 2 "" H 4200 4850 50  0000 C CNN
F 3 "" H 4200 4850 50  0000 C CNN
	1    4200 4850
	1    0    0    -1  
$EndComp
$Comp
L charge-pump-voltage-doubler-simulation-rescue:D-rectifier_schlib-charge-pump-voltage-doubler-simulation-rescue D1
U 1 1 573361B8
P 4500 3650
F 0 "D1" H 4500 3435 50  0000 C CNN
F 1 "1N4148" H 4500 3526 50  0000 C CNN
F 2 "" H 4500 3650 50  0000 C CNN
F 3 "" H 4500 3650 50  0000 C CNN
F 4 "Value" H 4500 3650 60  0001 C CNN "Fieldname"
F 5 "D" H 4500 3650 60  0001 C CNN "Spice_Primitive"
F 6 "2 1" H 4500 3650 60  0001 C CNN "Spice_Node_Sequence"
	1    4500 3650
	-1   0    0    1   
$EndComp
$Comp
L charge-pump-voltage-doubler-simulation-rescue:C-rectifier_schlib-charge-pump-voltage-doubler-simulation-rescue C1
U 1 1 5733628F
P 5350 4000
F 0 "C1" H 5465 4046 50  0000 L CNN
F 1 "100n" H 5465 3955 50  0000 L CNN
F 2 "" H 5388 3850 50  0000 C CNN
F 3 "" H 5350 4000 50  0000 C CNN
F 4 "Value" H 5350 4000 60  0001 C CNN "Fieldname"
F 5 "C" H 5350 4000 60  0001 C CNN "Spice_Primitive"
F 6 "1 2" H 5350 4000 60  0001 C CNN "SpiceMapping"
	1    5350 4000
	1    0    0    -1  
$EndComp
$Comp
L charge-pump-voltage-doubler-simulation-rescue:R-rectifier_schlib-charge-pump-voltage-doubler-simulation-rescue R2
U 1 1 573362F7
P 5700 4000
F 0 "R2" H 5630 3954 50  0000 R CNN
F 1 "100k" H 5630 4045 50  0000 R CNN
F 2 "" V 5630 4000 50  0000 C CNN
F 3 "" H 5700 4000 50  0000 C CNN
F 4 "Value" H 5700 4000 60  0001 C CNN "Fieldname"
F 5 "1 2" H 5700 4000 60  0001 C CNN "SpiceMapping"
F 6 "R" V 5700 4000 60  0001 C CNN "Spice_Primitive"
	1    5700 4000
	-1   0    0    1   
$EndComp
Text Notes 4650 4800 0    60   ~ 0
.tran 1u 100u\n
Wire Wire Line
	5200 3650 5350 3650
Wire Wire Line
	5700 3650 5700 3850
Wire Wire Line
	5350 3850 5350 3650
Connection ~ 5350 3650
Text Label 4650 4350 2    60   ~ 0
pwm_in
Text Label 5450 3650 0    60   ~ 0
vout
Wire Wire Line
	5350 3650 5700 3650
$Comp
L charge-pump-voltage-doubler-simulation-rescue:VSOURCE-rectifier_schlib-charge-pump-voltage-doubler-simulation-rescue V1
U 1 1 5FD5E984
P 3950 3850
F 0 "V1" H 3650 3900 50  0000 L CNN
F 1 "DC 5" H 3600 3800 50  0000 L CNN
F 2 "" H 3950 3850 50  0000 C CNN
F 3 "" H 3950 3850 50  0000 C CNN
F 4 "Value" H 3950 3850 60  0001 C CNN "Fieldname"
F 5 "V" H 3950 3850 60  0001 C CNN "Spice_Primitive"
F 6 "1 2" H 3650 4050 60  0001 C CNN "Spice_Node_Sequence"
	1    3950 3850
	1    0    0    -1  
$EndComp
$Comp
L charge-pump-voltage-doubler-simulation-rescue:C-rectifier_schlib-charge-pump-voltage-doubler-simulation-rescue C2
U 1 1 5FD681FD
P 4800 4000
F 0 "C2" H 4915 4046 50  0000 L CNN
F 1 "100n" H 4915 3955 50  0000 L CNN
F 2 "" H 4838 3850 50  0000 C CNN
F 3 "" H 4800 4000 50  0000 C CNN
F 4 "Value" H 4800 4000 60  0001 C CNN "Fieldname"
F 5 "C" H 4800 4000 60  0001 C CNN "Spice_Primitive"
F 6 "1 2" H 4800 4000 60  0001 C CNN "SpiceMapping"
	1    4800 4000
	1    0    0    -1  
$EndComp
$Comp
L charge-pump-voltage-doubler-simulation-rescue:D-rectifier_schlib-charge-pump-voltage-doubler-simulation-rescue D2
U 1 1 5FD68D10
P 5050 3650
F 0 "D2" H 5050 3435 50  0000 C CNN
F 1 "1N4148" H 5050 3526 50  0000 C CNN
F 2 "" H 5050 3650 50  0000 C CNN
F 3 "" H 5050 3650 50  0000 C CNN
F 4 "Value" H 5050 3650 60  0001 C CNN "Fieldname"
F 5 "D" H 5050 3650 60  0001 C CNN "Spice_Primitive"
F 6 "2 1" H 5050 3650 60  0001 C CNN "Spice_Node_Sequence"
	1    5050 3650
	-1   0    0    1   
$EndComp
Wire Wire Line
	4650 3650 4800 3650
Wire Wire Line
	4800 3850 4800 3650
Connection ~ 4800 3650
Wire Wire Line
	4800 3650 4900 3650
Wire Wire Line
	4800 4350 4200 4350
Wire Wire Line
	4200 4750 4200 4850
$Comp
L charge-pump-voltage-doubler-simulation-rescue:GND-rectifier_schlib-charge-pump-voltage-doubler-simulation-rescue #PWR?
U 1 1 5FD69C41
P 3950 4050
F 0 "#PWR?" H 3950 3800 50  0001 C CNN
F 1 "GND" H 3955 3877 50  0000 C CNN
F 2 "" H 3950 4050 50  0000 C CNN
F 3 "" H 3950 4050 50  0000 C CNN
	1    3950 4050
	1    0    0    -1  
$EndComp
$Comp
L charge-pump-voltage-doubler-simulation-rescue:GND-rectifier_schlib-charge-pump-voltage-doubler-simulation-rescue #PWR?
U 1 1 5FD6A33F
P 5500 4350
F 0 "#PWR?" H 5500 4100 50  0001 C CNN
F 1 "GND" H 5505 4177 50  0000 C CNN
F 2 "" H 5500 4350 50  0000 C CNN
F 3 "" H 5500 4350 50  0000 C CNN
	1    5500 4350
	1    0    0    -1  
$EndComp
Wire Wire Line
	4800 4150 4800 4350
Wire Wire Line
	5350 4350 5500 4350
Wire Wire Line
	5350 4150 5350 4350
Wire Wire Line
	5500 4350 5700 4350
Wire Wire Line
	5700 4150 5700 4350
Connection ~ 5500 4350
Text Label 4000 3650 0    60   ~ 0
vin
Wire Wire Line
	3950 3650 4350 3650
$EndSCHEMATC
