#include "Interface.h"

// Violates the ODR, multiple definitions of "Child"
class Child : public Base {
public:
    int getInt() override {
        // This version returns 1
        return 1;
    }
};

Base *createChild1() {
    return new Child();
}