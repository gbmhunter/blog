#include <stdio.h>
#include <functional>

template <typename T>
struct Callback;

template <typename Ret, typename... Params>
struct Callback<Ret(Params...)> {
   template <typename... Args> 
   static Ret callback(Args... args) {                    
      return func(args...);  
   }
   static std::function<Ret(Params...)> func; 
};

template <typename Ret, typename... Params>
std::function<Ret(Params...)> Callback<Ret(Params...)>::func;

void c_function_which_wants_callback(int (*func)(int num1, int num2)) {
   int o = func(1, 2);
   printf("Value: %i\n", o);
}

class ClassWithCallback {
   public:
      int method_to_callback(int num1, int num2) {
          return num1 + num2;
      }
};

typedef int (*callback_t)(int,int);

int main() {
    ClassWithCallback my_class;
    Callback<int(int,int)>::func = std::bind(&ClassWithCallback::method_to_callback, &my_class, std::placeholders::_1, std::placeholders::_2);
    callback_t func = static_cast<callback_t>(Callback<int(int,int)>::callback);      
    c_function_which_wants_callback(func);      
}