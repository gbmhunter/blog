---
authors: [ "Geoffrey Hunter" ]
date: 2017-05-08
draft: false
title: Threading
type: page
---

## Condition Variables

`std::condition_variable`, from `#include <condition_variable>` is a **synchronization object used for inter-thread notification**. Note that two additional shared variables need to be used alongside a condition variable to achieve thread-to-thread notification, a mutex and a boolean (a.k.a a _condition flag_).

```c++    
#include <condition_variable>
#include <iostream>
#include <mutex>
#include <thread>

std::mutex mutex_;
std::condition_variable cv_;
bool wakeup_ = false;


void Worker() {
    std::this_thread::sleep_for(std::chrono::milliseconds(2000));
    std::lock_guard<std::mutex> lock(mutex_);
    // wakeup_ must be set before the notify!
    wakeup_ = true;
    cv_.notify_one();
}

int main() {
    std::cout << "main() called." << std::endl;
    std::thread t1(&Worker);
    
    std::cout << "Waiting for notification..." << std::endl;
    std::unique_lock<std::mutex> lock(mutex_);
    while(!wakeup_)
        cv_.wait(lock);
        
    std::cout << "Notification received." << std::endl;
    
    t1.join();
}
```

Run this code at [http://cpp.sh/7es7i](http://cpp.sh/7es7i).

The program above should print:

```  
main() called.
Waiting for notification...
Notification received.
```

On entry, the `wait()` method simultaneously unlocks the mutex and waits for the condition. On exit, the `wait()` method relocks the mutex.

{{% warning %}}
Note the use of the boolean variable called wakeup_. This has to be used to protect against _spurious wakeups_. This is where the thread that is waiting on a condition variable gets woken up, even though it has not been notified. The code checks the boolean, and if still false, goes back to sleep by calling `wait()` again.
{{% /warning %}}

**How To Improve A Condition Variable (a.k.a let's create a semaphore!)**

In my eyes, a raw `std::condition_variable` is a **very awkward object to use throughout your code**. If you are using it for inter-thread notifications, for each `std::condition_variable` you also need one `std::mutex` and one `bool`. And don't forget to use/set everything in the correct manner! One way to improve on this is to wrap everything in a custom object which is commonly called a **_semaphore_**. The code below shows a header-only implementation of a Semaphore class.

```c++    
/// \details    This class is neither movable nor copyable. Use a smart pointer if you need copy/move like
///             capabilities.
class Semaphore {
public:

    Semaphore() : count_(0) {

    }

    void Notify() {
        std::unique_lock<std::mutex> lock(mutex_);
        count_++;
        cv_.notify_one();
    }

    /// \brief      Blocks indefinitely until Notify() is called.
    void Wait() {
        std::unique_lock<std::mutex> lock(mutex_);
        while(count_ == 0) {
            cv_.wait(lock);
        }

        count_--;
    }

    /// \brief      Blocks until either Notify() is called, or a timeout occurs.
    /// \returns    Returns true if Notify() was called before timeout occurred, otherwise false.
    bool TryWait(std::chrono::milliseconds timeout) {
        std::unique_lock<std::mutex> lock(mutex_);
        if(!cv_.wait_for(lock, timeout, [&] {
            return count_ != 0;
        })) {
            return false;
        }

        return true;
    }

private:
    uint32_t count_;
    std::mutex mutex_;
    std::condition_variable cv_;

};
```

Now, all we have to do is:

```c++    
#include <iostream>
#include "Semaphore.hpp"

Semaphore semaphore;

void Worker() {
    std::this_thread::sleep_for(std::chrono::milliseconds(2000));
    semaphore.Notify()
}

int main() {
    std::cout << "main() called." << std::endl;
    std::thread t1(&Worker);
    
    std::cout << "Waiting for notification..." << std::endl;
    semaphore.Wait();
        
    std::cout << "Notification received." << std::endl;
    
    t1.join();
}
```

So much easier! Right? This code can also be found in the [CppUtils repo on GitHub](https://github.com/gbmhunter/CppUtils).

Note: If you want to do more than just send notifications between threads, and actually send data, have a look at either implementing a queue or using a future/promise instead.

## Locks

Locks are C++ objects which **provide safety and convenience when locking and unlock mutexes** (you could call them _mutex wrappers_). The two main locks available in C++ are `std::unique_lock` and `std::lock_guard`, both from `#include <mutex>`.

**Unique Locks**

A `std::unique_lock` can be instructed to take ownership of a mutex. It will either release the mutex when it is manually unlocked (e.g. via `unlock()`) or when it goes out of scope and gets destroyed.

When a `std::unique_lock` is created, you can instruct it to not lock the mutex by deferring:

```c++   
std::unique_lock<std::mutex> lock(mutex, std::defer_lock);
```

**Lock Guards**

A `lock_guard` tries to take ownership of a mutex when it is created. When control leaves the scope that lock_guard was created in, `lock_guard` is destroyed and the mutex is released.

**Unique Locks vs. Lock Guards**

Recommendation: Use a `lock_guard` unless you need to manually release the mutex without having to rely on a `lock_guard` going out of scope.

## Mutex

C++11 introduced `std::mutex`, which is designed to be used as a basic synchronization object in a multi-threaded application.

**Using The mutable Keyword**

One issue that can arise with a std::mutex is when using it in conjunction with methods that are defined const. Consider the method below:

```c++    
class MyClass {
public:
    int GetCount() const {
        return count_;
    }
}
```

What happens when you want to call `GetCount()` from multiple threads? You may reach into your concurrency toolbox at pull out a `std::mutex`:

```c++    
class MyClass {
public:
    int GetCount() const {
        std::unique_lock<std::mutex> lock(mutex_); // This won't compile!
        return count_;
    }
private:
    std::mutex mutex_;
}
```

The problem with this is that locking a mutex is not a const operation, and the above code won't compile. A solution is to declare `mutex_` as mutable:

```c++    
class MyClass {
public:
    int GetCount() const {
        std::unique_lock<std::mutex> lock(mutex_); // This will now compile!
        return count_;
    }
private:
    mutable std::mutex mutex_;
}
```

This is one of the few use cases were the `mutable` keyword should be used.

## Threads

`std::thread` has been in the C++ language since C++11. It's introduction standardized the way threads are used in C++, as before this time platform-specific implementations were the only option (e.g. `pthread` for POSIX systems).

**A Basic Example**

```c++    
#include <string>
#include <iostream>
#include <thread>

// The function we want to execute on the new thread.
void task1() {
    cout << "Thread says hello!" << endl;
}

int main() {
    // Constructs the new thread (and runs it). This does not block the current thread.
    std::thread myThread(task1);

    // This makes the main thread wait for the new thread to finish (return from the task1() function. This means the main() thread gets "blocked" until the thread finishes.
    myThread.join();
}
```

The thread begins execution as soon as the object is created (there is no `thread.start()`).

**Different Methods Of Assigning Thread Function**

The below code shows the many ways you can create a std::thread and assign it a function (or method) to run.

```c++
int main() {
    // Call a C style function
    std::thread t1(ACStyleFunction);

    // Call a member of a class instance
    std::thread t2(&MyClass::MyMethod, this);

    // Create a lambda on the fly
    std::thread t3([] {
        std::cout << "Lambda-style thread function!" << std::endl;
    });
}
```

**Priorities**

**Unfortunately, as of C++14, there is not standardized way of setting/modifying thread priorities**. If you are used to using a low-level OS such as FreeRTOS you may be surprised that this functionality is not included. But this should not come as a surprise if you consider the history of the C/C++ standards. For such a long time both considered threading to be a implementation specific issue that should not handled by the standard. It was only starting with C++11 that the standard introduced the concept of a `std::thread`, eliminating the need for platform specific code for creating basic threads.

However, it's not all bad news! You can **still manage thread priorities for common operating systems such as Linux and Windows via the use of** `thread.native_handle()`. This function **hopefully** returns a pointer to the native thread object, (e.g. a pthread in Linux) which can be then used with OS-specific API to set the priority.

The following code shows how to set the priority for a `std::thread` running on a Linux OS:

```c++    
#include <thread>
#include <pthread.h>
#include <iostream>
#include <cstring>

void SetPriority(std::thread& thread, int policy, int priority) {
    sched_param schedParam;
    schedParam.sched_priority = priority;
    if(pthread_setschedparam(thread.native_handle(), policy, &schedParam))
        std::cerr << "Failed to set thread priority. Error = " << std::strerror(errno) << std::endl;    
}
```

{{% warning %}}
This is not platform independent code!**
{{% /warning %}}

**Common Errors**

**_terminate called without an active exception_**

This runtime error usually occurs when your program tries to end while there are still threads running.

You will usually see the following terminal output:

```text
<previous program output>
terminate called without an active exception
gbmhunter@ubuntu:~$
```

You can fix this by making sure you call `join()` for all threads created by the program.

**Actor Model Implementation**

When dealing with a multi-threaded design, concurrency issues arise. One way to deal with this is to use an **_Actor model_**, where each **thread waits for incoming commands that arrive on a command queue**.

The below example uses a `std::shared_ptr<void>` as the data type. This is to allow a different data type to be passed for each command (or no data at all). The neat thing about this is that data can be cast to this type and passed on the queue, and will still be destroyed safely when there are no more references to it. The disadvantage to this approach is that you must remember and cast back to the appropriate data type for each different command.

```c++    
#include <iostream>
#include <memory>
#include <string>
#include <thread>

#include "ThreadSafeQueue.hpp"

using namespace mn::CppUtils;

struct Cmd {
    std::string name;
    std::shared_ptr<void> data;
};

// We require a thread-safe queue, which is not part of the standard!
// See https://github.com/gbmhunter/CppUtils/blob/master/include/CppUtils/ThreadSafeQueue.hpp
ThreadSafeQueue<Cmd> queue_;

void ThreadFn() {
    Cmd cmd;

    while(true) {
        queue_.Pop(cmd);
        std::cout << "Received command. cmd.name = " << cmd.name << std::endl;
        
        if(cmd.name == "CMD_1") {          
            auto data = std::static_pointer_cast<std::string>(cmd.data); // Cast back to exact data type
            std::cout << "Received data (as string) = \"" << *data << "\"" << std::endl;
        } else if(cmd.name == "CMD_2") {
            // Do stuff with cmd.data
        } else if(cmd.name == "QUIT") {
            // Break from infinite while loop, which will mean that
            // this function will return and then thread.join() will
            // return
            break;  
        } else
            throw std::runtime_error("Command name not recognized.");
    }
}

int main() {
    std::thread t(ThreadFn);
    
    auto data = std::shared_ptr<std::string>(new std::string("hello"));
    
    Cmd cmd;
    cmd.name = "CMD_1";
    cmd.data = std::static_pointer_cast<void>(data); // Cast away the exact data type
    queue_.Push(cmd);
    
    cmd.name = "QUIT";
    cmd.data = nullptr; // Some commands may not need data!
    queue_.Push(cmd);
    
    t.join();
}
```

This code can be found and run online at [https://wandbox.org/permlink/KkL4A89Z60GJdva3](https://wandbox.org/permlink/KkL4A89Z60GJdva3).

Note that the above code uses a `ThreadSafeQueue` class, which is not part of `std`, nor included in the above code. This class implements a thread safe queue. You can find code for this at [https://github.com/gbmhunter/CppUtils/blob/master/include/CppUtils/ThreadSafeQueue.hpp](https://github.com/gbmhunter/CppUtils/blob/master/include/CppUtils/ThreadSafeQueue.hpp).

## Futures And Promises

The `std::future` and `std::promise` objects allow a thread to wait for data to be returned from process occurring another thread.

See [https://wandbox.org/permlink/gAq8i3HMcPMe6AMS](https://wandbox.org/permlink/gAq8i3HMcPMe6AMS).

## The Volatile Keyword

This statement is from Microsoft's [Common Visual C++ ARM Migration Issues page](https://msdn.microsoft.com/en-us/library/jj635841.aspx):
 
> Although volatile gains some properties that can be used to implement limited forms of inter-thread communication on x86 and x64, these additional properties are not sufficient to implement inter-thread communication in general. The C++ standard recommends that such communication be implemented by using appropriate synchronization primitives instead.

ARM's "weak" memory model doesn't support the _strong ordering_ that the x86 and x64 architectures support.