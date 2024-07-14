import asyncio

async def wait_and_print(time_to_wait):
    asyncio.sleep(time_to_wait)
    print(f'Hello after {time_to_wait}s')

async def main():
    task1 = asyncio.create_task(wait_and_print(1))
    task2 = asyncio.create_task(wait_and_print(2))
    await task1
    await task2

if __name__ == '__main__':
    asyncio.run(main())