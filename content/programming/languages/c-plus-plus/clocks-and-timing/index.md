---
author: gbmhunter
date: 2014-05-07 04:17:19+00:00
draft: false
title: Clocks And Timing
type: page
---

## Overview

Timing and delay functions, by their very nature, a somewhat platform specific. The C and C++ languages do make some attempt to standardize these, in where they provide a standardized front-end function that then goes and calls system-specific functions.

## C++11

C++11 allows the use of the standard library to create delays in the current thread. These functions seem to have been copied across from the Boost libraries.

```c++    
#include <chrono>
#include <thread>

int main() {
	// Delay for 60 milliseconds
	std::this_thread::sleep_for(std::chrono::milliseconds(60));
		
	return 0;
}
```

**Clocks**

C++11 introduced three types of clocks:

* `system_clock`. Driven from the system-wide realtime clock. It is the only C++ clock which can map its time points to C-style time, and then be displayed.
* `steady_clock`. A monotonic (never decreasing) clock that is never adjusted.
* `high_resolution_clock`. A clock with the shortest tick period available.

Each clock has a starting point (epoch) and tick rate. For example, a clock may have an epoch of 1 Jan, 1970 (UNIX epoch) and tick once per second.

All three are somewhat implementation/system specific (rely on OS calls).

The object returned from any `clock::now()` is a `time_point`.

Printing out the value of a `time_point`:

```c++    
std::chrono::system_clock::time_point currentTime = std::chrono::system_clock::now();

std::time_t ttp = std::chrono::system_clock::to_time_t(currentTime);
std::cout << std::string(std::ctime(&ttp)) << std::endl;
```

`system_clock` has the unique ability to convert to a `time_t` object (and be printed as a readable time).

```c++    
#include <chrono>
#include <iostream>
#include <time.h>

int main() {
	auto cppTimePoint = std::chrono::system_clock::now();
	auto cTimePoint = std::chrono::system_clock::to_time_t(cppTimePoint);
	std::cout << ctime(&cTimePoint); // Prints similar to "Thu Mar  8 05:41:58 2018"
	
	return 0;
}
```

Run the above example online at [https://wandbox.org/permlink/UrLQ05x1Ds7FwVeR](https://wandbox.org/permlink/hrJqJseiLbJQcHxI).

The subtraction of two time points intuitively returns a `duration` object.

```c++    
#include <chrono>
#include <iostream>
#include <thread>

using namespace std::literals;
using namespace std::chrono;

int main() {
	auto timePoint1 = std::chrono::high_resolution_clock::now();
	std::this_thread::sleep_for(500ms);
	auto timePoint2 = std::chrono::high_resolution_clock::now();
	
	// Use a "float" duration, which has the units in seconds
	std::chrono::duration<float> duration_s = timePoint2 - timePoint1;
	std::cout << "duration_s = " << duration_s.count(); 
	// Prints something like "duration_s = 0.500166"

	return 0;
}
```

Run the above example online at [https://wandbox.org/permlink/EnPb9aag3TCkx3Lu](https://wandbox.org/permlink/TEz1riCEGaEPoZAE).

**Durations**

The `std::chrono::duration` class can be used to represent a duration of time. It also has the benefit of being able to represent a duration in many different units (e.g. seconds, milliseconds, microseconds).

```c++    
// C++17
#include <chrono>

using namespace std::literals; // This is so we can use 's' and 'ms' suffixes

int main() {
	std::chrono::duration duration1 = 5s;
	std::chrono::duration duration2 = 30ms;
}
```

Run the above example online at [https://wandbox.org/permlink/KSpr5KgvSIDimNb5](https://wandbox.org/permlink/KSpr5KgvSIDimNb5).

{{% note %}}
To use `std::chrono::duration` without having to specify the units requires C++17, as _template argument deduction_ feature is required. If you are using C++11 or C++14, you would have to change the above to:
{{% /note %}}

```c++    
// C++14
#include <chrono>

using namespace std::literals; // This is so we can use 's' and 'ms' suffixes

int main() {
	std::chrono::seconds duration1 = 5s;
	std::chrono::milliseconds duration2 = 30ms;
}
```

Run the above example online at [https://wandbox.org/permlink/bprXREr562iFH6dM](https://wandbox.org/permlink/bprXREr562iFH6dM).

To print a `std::chrono::duration`, you must first convert it to a specific unit-specifying overload, and then call the `count()` method to return the integer number of counts in this unit. This can then be easily converted into a string, or spat directly to `std::cout`.

```c++    
// C++17
#include <chrono>
#include <iostream>

using namespace std::literals;
using namespace std::chrono;

int main() {
	duration duration1 = 500ms;
	auto duration1_ms = duration_cast<milliseconds>(duration1);

	// count() returns a long long int
	std::cout << "duration1 (ms) = " << duration1_ms.count() << std::endl;
	// Prints "duration1 (ms) = 500"

	return 0;
}
```

Run the above example online at [https://wandbox.org/permlink/9u6as1nfcpWv1cBe](https://wandbox.org/permlink/9u6as1nfcpWv1cBe).

You can also use a `duration<float>` object to move away from integral numbers of ticks and have higher precision (note that you are still limited by the precision of the clock). This next example shows how to use `duration<float>` with the subtraction of two time points.

```c++    
#include <chrono>
#include <iostream>
#include <thread>

using namespace std::literals;
using namespace std::chrono;

int main() {
	auto timePoint1 = std::chrono::high_resolution_clock::now();
	std::this_thread::sleep_for(500ms);
	auto timePoint2 = std::chrono::high_resolution_clock::now();
	
	// Use a "float" duration, which has the units in seconds
	std::chrono::duration<float> duration_s = timePoint2 - timePoint1;
	std::cout << "duration_s = " << duration_s.count(); 
	// Prints something like "duration_s = 0.500166"

	return 0;
}
```

Run the above example online at [https://wandbox.org/permlink/EnPb9aag3TCkx3Lu](https://wandbox.org/permlink/TEz1riCEGaEPoZAE).

## "DateTime" Objects

Although C++11/C++14 provides a good amount of time related functionality, I still feel that a solid `DateTime` object is missing from the standard library. A good DateTime object should represent absolute instance in time, and should allow for subtraction of two DateTime objects (to produce a duration object), comparison of DateTime objects (based on which is in the future compared to the other) and the addition of a Duration object to a DateTime object to produce a new DateTime object.

The best DateTime object I have found is part of the SGP4 library. You can download the entire repository from [https://github.com/dnwrnr/sgp4](https://github.com/dnwrnr/sgp4), or just [download the DateTime.h file](/docs/DateTime.h).

## Time-Related Libraries

<table>
	<thead>
		<tr>
			<th>File Name</th>
			<th>Availiable For</th>
			<th>Contains</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>&lt;chrono&gt;</code></td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
		<tr>
			<td><code>&lt;time.h&gt;/&lt;ctime&gt;</code></td>
			<td></td>
			<td>
				<ul>
					<li><code>nanosleep()</code></li>
					<li><code>clock_t</code></li>
					<li><code>time_t</code></li>
				</ul>
			</td>
			<td></td>
		</tr>
		<tr>
			<td><code>&lt;unistd.h&gt;</code></td>
			<td></td>
			<td>
				<ul>
					<li><code>sleep()</code></li>
					<li><code>usleep()</code></li>
				</ul>
			</td>
			<td></td>
		</tr>
	</tbody>
</table>


## Sleeping

C++ provides many ways of sleeping a thread (i.e. creating a delay which does not use up valuable processor time).

Note that many of these functions will not be defined for embedded systems.

**this_thread::sleep_for() (the preferred way)**

`sleep_for(std::chrono::duration sleep_duration)` blocks the current thread by at least the specified sleep duration.

```c++    
#include <chrono>
#include <iostream>
#include <thread>

using namespace std::chrono_literals;

int main() {
	auto before = std::chrono::high_resolution_clock::now();
	std::this_thread::sleep_for(500ms);
	auto after = std::chrono::high_resolution_clock::now();
	
	std::chrono::duration<double, std::milli> elapsed = after - before;
	std::cout << "Slept for " << elapsed.count() << " ms" << std::endl;
	// Prints something similar to "Slept for 500.35ms"
	
	return 0;
}
```

Run the above example online at https://wandbox.org/permlink/hrJqJseiLbJQcHxI.

**unistd.h**

`unistd.h` provides POSIX-compliant delay functions, which work in both C and C++ code. It is available natively on Linux and MacOS, but not Windows. It is available in Windows via Unix-compatibility layers such as CygWin and MinGW.

**usleep() is deprecated, and not present in the latest version of the POSIX standard.**

```c++    
usleep() // Note this is deprecated, and not included in the latest POSIx specification, or the latest glibc!
unsigned int sleep (unsigned int seconds)
```

Some examples...

```c++    
#include <unistd.h>

int main() {
	// Delays the current thread for 50us
	// (note that this function call is deprecated)
	usleep(50);
	
	// Delays the current thread for 3s
	sleep(3);
}
```

## time.h

`time.h` provides POSIX-compliant delay functions, which work in both C and C++ code. It is available natively on Linux and MacOS, but not Windows. It is available in Windows via Unix-compatibility layers such as CygWin and MinGW.

```c++    
int nanosleep (const struct timespec *requested_time, struct timespec *remaining)
```

Note that when using `nanosleep()`, your resolution will likely be far smaller than the minimum time-step that the system supports, and your delay will be rounded

Some examples...

```c++    
#include <time.h>

int main() {
	// Delay for 2us
	// This function is prefered over usleep() (which is deprecated)
	nanosleep(2000);
}
```

## Windows.h

The Windows API provides the `Sleep()` function. This method only works if you are compiling on Windows.

```c++    
#include <windows.h>
#include <stdio.h>

int main() {
	// Sleep for three seconds
	Sleep(3000);		
}
```

## Boost

The Boost library has delay functionalies.

```c++
#include <boost/thread/thread.hpp>

int main() {
	// Waits 2 seconds
	boost::this_thread::sleep( boost::posix_time::seconds(1) );
	boost::this_thread::sleep( boost::posix_time::milliseconds(1000) );

	return 0;
}
```