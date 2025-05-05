#pragma once

// Abstract base class
class Base {
public:
	virtual int getInt() = 0;
	virtual ~Base() = default;
};

extern Base *createChild1();
extern Base *createChild2();