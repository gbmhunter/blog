---
author: gbmhunter
date: 2015-01-10
draft: false
title: Switch Statements
type: page
---

## Fall-through

Fall-through occurs when the previous case had no break statement (or other statement which could cause the program counter to change, e.g. goto, return). It is considered to be one of the biggest design errors of the C programming language, but unfortunately due to existing code relying on fall-through to work correctly the feature cannot be removed.

A Duff's Device exploits fall-through.

There is talk of adding an explicit switch in C++ which does not allow fall-through. For more information see ISO/IEC document number N3879 ([http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n3879.pdf](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n3879.pdf)). As of Jan 2015 this has not been added to the language.

## Switch Statement Efficiency

Switch statements are notorious for causing inefficiencies in embedded systems. This normally occurs at the point where you decide to use one in an ISR, and then your whole system starts playing up because the ISR takes to long to finish.

If it is implemented as a jump table, switch scale execution time scales with `\(Olog(n)\)` where `\(n\)` is the number of case statements.

However, the alternatives can be worse! An if, else if, else if, ..., else statement can take far longer to executed because of the compilers in-ability to optimise it (each condition needs to be checked in sequential order).

## Enclosing {} Braces

I recommend enclosing all case statements with `{` and `}` braces. Here is an example:

```c    
switch(myVar) {
    case 0: {
        // Cool, I can now define local variables inside my case statement, without worrying about other case statements seeing it!
        int myInt = 2;
        break;
    }
    case 1: {
        // code goes here
        break;
    }
    default: {
        // code goes here
        break;
    }
}
```

This means:

1. You can now define local variables inside each case statement without worrying about other case statements seeing the variable (or getting an error similar to `initialization of myVar is skipped by 'case' label`)
2. You no longer have indentation without the `{` and `}` braces! In all other areas of C programming, indentation is pretty-much always surrounded by { and } braces. Without these braces, switch statements are an odd exception which personally I find confusing (hard to read)!


