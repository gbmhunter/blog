---
author: gbmhunter
date: 2017-08-29 00:28:52+00:00
draft: false
title: Magic Statics
type: page
url: /programming/languages/c-plus-plus/magic-statics
---

# Overview




_Magic statics_, more formally known as _function-local static initialization_, is when a **static variable is declared within a function, and then passed to the caller**.




It looks like:



    
    std::string& GetString() {
       // Create a local static variable
       static std::string magicStatic("Hello");
       // Return a reference to it! :-O
       return magicStatic;
    }




The above code creates a new static qualified string inside the function, and then returns a reference to it. **Seeing a reference being returned to a locally defined variable should give you the heebie jeebies!** This is the only time I can think of where this kind of behaviour is allowed (if the variable was not declared static, then it would be deleted when the function returned, and accessing the reference would likely crash your system!).




{{< figure src="/images/2017/08/magic-statics-icon-bunny-hat-code.png" caption="" caption-position="bottom" >}}




# Thread Safety




**Since C++11, the initialization of magic statics is guaranteed to be thread safe**. Internally, the first thread that calls GetString() will initialize the pointer, blocking until initialization is complete. All other threads will then use the initialized value. Before C++11, calling GetString() from multiple threads is classified as undefined behaviour (UB).




<blockquote>

> 
> [§6.7 [stmt.dcl] p4](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3337.pdf): If control enters the declaration concurrently while the variable is being initialized, the concurrent execution shall wait for completion of the initialization.
> 
> 
</blockquote>




# Singletons




Magic statics allows for alternative implementation of the Singleton pattern.



    
    class Singleton final
    {
    public:
       static Singleton& GetInstance();
     
    private:
       Singleton() = default;
       ~Singleton() = default;
    
       // Delete the copy and move constructors 
       Singleton(const CSingleton&) = delete;
       Singleton& operator=(const CSingleton&) = delete;
       Singleton(CSingleton&&) = delete;
       Singleton& operator=(CSingleton&&) = delete;
    };
     
    Singleton& Singleton::GetInstance()
    {
       // Let's create a magic static
       static Singleton instance;
       return instance;
    }




The constructor and destructor is made private, and both the copy and move constructors deleted, so that this class cannot be duplicated/transferred in anyway.




This is sometimes called the _Meyers' Singleton_ after Scott Meyers publication "[_C++ and the Perils of Double-Checked Locking_](/images/2017/08/Scott-Meyers-Cpp-and-the-Perils-of-Double-Checked-Locking.pdf)".




# Lazy Initialization




Magic statics allows for the concept of _lazy initialization_. This means that the object only gets created if it is used (e.g. in the example above, by calling GetInstance()).




# Hiding Global Statics




Magic statics can be used to hide otherwise globally defined static variables. In general, it is a bad idea to define global objects, and making the user call a function to retrieve the static instead resolves this issue.




# Vendor Support




Most C++ compilers support magic statics, but you have to be careful about the thread safety aspect, as this was only introduced into the C++ standard in C++11! Any C++11 compliant version of GCC will support thread-safe magic statics.




On the Windows side of things, thread safety was implemented for magic statics in Visual Studio 2015.



{{< figure src="/images/2017/08/visual-studio-support-for-cpp-magic-statics.png" width="622px" caption="Table showing Visual Studio's support for magic statics. Image from https://msdn.microsoft.com/en-us/library/hh567368.aspx." caption-position="bottom" >}}






# Recursive Calls




**Do NOT recursively call a function which allocates variables with static storage duration**, as this behaviour is undefined.




<blockquote>

> 
> [§6.7 [stmt.dcl] p4](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3337.pdf): If control re-enters the declaration recursively while the variable is being initialized, the behavior is undefined.
> 
> 
</blockquote>
