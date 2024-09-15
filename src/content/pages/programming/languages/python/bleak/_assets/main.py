import asyncio
import logging
from bleak import BleakScanner

async def main():
    logging.basicConfig(level=logging.DEBUG)
    devices = await BleakScanner.discover()
    for d in devices:
        print(d)

asyncio.run(main())