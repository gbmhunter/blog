#include <iostream>
#include "Interface.h"

int main() {
    Base *child1 = createChild1();
    Base *child2 = createChild2();
    std::cout << "child1: " << child1->getInt() << std::endl;
    std::cout << "child2: " << child2->getInt() << std::endl;
    return 0;
}