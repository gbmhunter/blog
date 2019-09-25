import asyncio
import random

async def worker_fn(id: str, job_queue: asyncio.Queue) -> None:
    while True:
        sleep_for = await job_queue.get()

        print(f'Worker {id} sleeping for {sleep_for:.2}s.')
        await asyncio.sleep(sleep_for)
        print(f'Worker {id} woke up.')

        job_queue.task_done()

async def main() -> None:

    queue = asyncio.Queue()

    # Create jobs for workers to complete
    print(f'Creating jobs...')
    for i in range(0, 10):
        sleep_for_s = random.uniform(0.1, 1.0)
        queue.put_nowait(sleep_for_s)

    # Create three worker tasks
    print(f'Creating and starting workers...')
    workers = []
    for i in range(3):
        worker = asyncio.create_task(worker_fn(i, queue))
        workers.append(worker)

    print(f'Waiting for jobs to be completed.')
    await queue.join()
    print(f'Jobs finished.')

    print(f'Terminating workers...')
    for worker in workers:
        worker.cancel()

    await asyncio.gather(*workers, return_exceptions=True)
    print(f'Workers terminated. Example finished.')
    
if __name__ == '__main__':
    asyncio.run(main())
    exit(0)
