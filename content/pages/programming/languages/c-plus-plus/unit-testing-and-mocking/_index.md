---
author: gbmhunter
date: 2017-05-26 18:46:02+00:00
draft: false
title: Unit Testing And Mocking
type: page
url: /programming/languages/c-plus-plus/unit-testing-and-mocking
---

# gtest (Google Test)




gtest (a.k.a Google Test) is an open-source C++ unit testing framework developed and maintained by Google.




The introduction of lambda functions in C++11 make certain C++ unit tests much less verbose. This includes tests where you want to verify that a boost::signal was emitted:



    
    bool lambdaCalled = false;
    
    // Use lambda notation to provide a "slot"
    // for the signal
    mySignal.connect([&]() {
       lambdaCalled = true;
    });
    
    // Do whatever is needed to fire the signal. In this simplistic
    //case, we will fire the signal directly.
    mySignal();
    
    EXPECT_EQ(true, lambdaCalled);




## Adding Timeouts To Google Unit Tests




You can timeouts to Google unit tests by defining the following macros:



    
    #include <future>
    
    #define TEST_TIMEOUT_BEGIN \
        std::promise<bool> promisedFinished; \
        auto futureResult = promisedFinished.get_future(); \
        std::thread([&](std::promise<bool>& finished) {
    
    #define TEST_TIMEOUT_FAIL_END(X) \
        finished.set_value(true); \
        }, std::ref(promisedFinished)).detach(); \
        EXPECT_TRUE(futureResult.wait_for(std::chrono::milliseconds(X)) != std::future_status::timeout);
    
    #define TEST_TIMEOUT_SUCCESS_END(X) \
        finished.set_value(true); \
        }, std::ref(promisedFinished)).detach(); \
        EXPECT_FALSE(futureResult.wait_for(std::chrono::milliseconds(X)) != std::future_status::timeout);




You then use these macros in the following fashion:



    
    TEST(UnitTestModule, TimeoutTest)
    {
      TEST_TIMEOUT_BEGIN
        EXPECT_EQ(10, function_takes_a_long_time());
      TEST_TIMEOUT_FAIL_END(1000)
    }




Any code within the TEST_TIMEOUT_BEGIN and TEST_TIMEOUT_FAIL_END(1000) macros that takes longer that 1000ms will be aborted, and the test will fail. Credit for the above macros goes to [https://antonlipov.blogspot.ca/2015/08/how-to-timeout-tests-in-gtest.html](https://antonlipov.blogspot.ca/2015/08/how-to-timeout-tests-in-gtest.html).




# gmock (Google Mock)




gmock (a.k.a Google Mock) is an open-source C++ mocking library developed and maintained by Google. It is NOT a unit testing framework, but can be used  in conjunction with gtest to provide a fully feature unit testing system.




One disadvantage of gmock is that all class methods that you want to mock must be declared virtual. This increases the computational overhead of the class, and it may not be possible to add virtual if a 3rd party wrote/maintains the class of interest.




# UnitTest++




UnitTest++ is a small, lightweight, but capable unit test library for C++ code.




Example output from UnitTest++ when one of the tests fails.



[caption id="attachment_14137" align="aligncenter" width="961"][![](/images/2013/05/example-output-from-unittestpp-when-test-fail.png)
](/images/2013/05/example-output-from-unittestpp-when-test-fail.png) Example output from UnitTest++ when one of the tests fails.[/caption]



## Running Just One Test Suite




The unit tests can be grouped into "Suites" which are designed to be for grouping together similar tests. You can also run just one test suite, useful for preventing yourself getting swamped with errors when debugging failed unit tests. The documentation on many sites on how to run just one suite is wrong as of June 2013 (maybe they recently updated the code). Here is a way I found of doing it:



    
    int main()
    {
       UnitTest::TestReporterStdout reporter;
       UnitTest::TestRunner runner(reporter);
    
       return runner.RunTestsIf(
          UnitTest::Test::GetTestList(),
          "Test Suite Name",
          UnitTest::True(),
          0);
    }




Replace "Test Suite Name" with the name of the test suite you want to run.
