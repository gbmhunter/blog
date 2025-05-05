#include "Interface.h"

// Violates the ODR, multiple definitions of "Child"
class Child : public Base {
public:
    int getInt() override {
        // This version returns 2
        return 2;
    }
};

Base *createChild2() {
    return new Child();
}