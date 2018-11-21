---
author: gbmhunter
date: 2016-06-19 23:46:51+00:00
draft: false
title: PIC18 Family
type: page
url: /programming/microcontrollers/pic-and-dspic-family/pic18-family
---

# Overview

PIC18 is a family of microcontrollers from Microchip. This includes the PIC18C and PIC18F sub-families.

[caption id="attachment_13550" align="aligncenter" width="571"][![Marketing render of a range of microcontrollers from the Microchip PIC18 family. Image from http://ww1.microchip.com/.](/images/2016/06/marketing-image-microchip-pic18-microcontroller-family.pdf.png)
](/images/2016/06/marketing-image-microchip-pic18-microcontroller-family.pdf.png) Marketing render of a range of microcontrollers from the Microchip PIC18 family. Image from http://ww1.microchip.com/.[/caption]

# Compilers

The newest compiler for the PIC18 family of microcontrollers (as of July 2016) is the Microchip XC8 compiler. More information an be found on the [MPLAB XC Compilers page](http://blog.mbedded.ninja/programming/compilers/mplab-xc-compilers).

# EEPROM

The old-style (now deprecated) way of reading and writing to EEPROM was to use the following macros (defined in pic18.h):
    
    EEPROM_READ(addr)
    EEPROM_WRITE(addr, value)

Note that these are now depreciated and if using MPLAB X, these macros get turned into empty shells which don't actually do anything (well, unless #if _EEPROMSIZE > 0 && defined(_PLIB) is true, which it is not by default). and they don't raise any compiler warnings/errors, meaning your EEPROM may not work and you don't know about it!).

What you can do is forgo the nice API and use direct manipulation instead. I have written the following two functions which read/write to EEPROM using register manipulation, and provide similar functionality to what the deprecated API did:
    
    //! @brief      Reads a single byte of data from the EEPROM.
    //! @param      address     The EEPROM address to write the data to (note that not all
    //!                         16-bits of this variable may be supported).
    //! @returns    The byte of data read from EEPROM.
    //! @warning    This function does not return until read operation is complete.
    uint8_t Eeprom_ReadByte(uint16_t address)
    {
    
        // Set address registers
        EEADRH = (uint8_t)(address >> 8);
        EEADR = (uint8_t)address;
    
        EECON1bits.EEPGD = 0;       // Select EEPROM Data Memory
        EECON1bits.CFGS = 0;        // Access flash/EEPROM NOT config. registers
        EECON1bits.RD = 1;          // Start a read cycle
    
        // A read should only take one cycle, and then the hardware will clear
        // the RD bit
        while(EECON1bits.RD == 1);
    
        return EEDATA;              // Return data
    
    }
    
    //! @brief      Writes a single byte of data to the EEPROM.
    //! @param      address     The EEPROM address to write the data to (note that not all
    //!                         16-bits of this variable may be supported).
    //! @param      data        The data to write to EEPROM.
    //! @warning    This function does not return until write operation is complete.
    void Eeprom_WriteByte(uint16_t address, uint8_t data)
    {    
        // Set address registers
        EEADRH = (uint8_t)(address >> 8);
        EEADR = (uint8_t)address;
    
        EEDATA = data;          // Write data we want to write to SFR
        EECON1bits.EEPGD = 0;   // Select EEPROM data memory
        EECON1bits.CFGS = 0;    // Access flash/EEPROM NOT config. registers
        EECON1bits.WREN = 1;    // Enable writing of EEPROM (this is disabled again after the write completes)
    
        // The next three lines of code perform the required operations to
        // initiate a EEPROM write
        EECON2 = 0x55;          // Part of required sequence for write to internal EEPROM
        EECON2 = 0xAA;          // Part of required sequence for write to internal EEPROM
        EECON1bits.WR = 1;      // Part of required sequence for write to internal EEPROM
    
        // Loop until write operation is complete
        while(PIR2bits.EEIF == 0)
        {
            continue;   // Do nothing, are just waiting
        }
    
        PIR2bits.EEIF = 0;      //Clearing EEIF bit (this MUST be cleared in software after each write)
        EECON1bits.WREN = 0;    // Disable write (for safety, it is re-enabled next time a EEPROM write is performed)
    }

## Writing Default Data To EEPROM On Program

Default data can be written to the EEPROM when programming the PIC18 microcontroller by using the __EEPROM_DATA() macro.

This macro takes 8 single-bye arguments, which writes 8 bytes of EEPROM data at once. This macro starts writing from address 0x0000 and auto-increments by 0x8 on every call.

# GPIO

The TRISx registers (where x  is the port letter, e.g. TRISA , TRISB) control the direction of the GPIO pins on that port. They can either be set as inputs or outputs.

# SPI

The SPI peripheral is controlled by the SSPCON and SSPSTAT registers. Note that these registers are also used to configure the I2C peripheral (the SPI and I2C cannot peripherals cannot be used at the same time).

Data is read/written to the SPI bus using the SSPBUF register.
