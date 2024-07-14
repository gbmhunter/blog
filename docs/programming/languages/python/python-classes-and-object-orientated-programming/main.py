################################################################################
# issubclass()
################################################################################

class ParentClass:
    pass

class ChildClass(ParentClass):
    pass

class StandaloneClass:
    pass

print(issubclass(ChildClass, ParentClass))
# stdout: True

print(issubclass(StandaloneClass, ParentClass))
# stdout: False

# Works with variables which are assigned to a class too
my_class = ChildClass
print(issubclass(my_class, ParentClass))
# stdout: True

################################################################################
# CLASS VARIABLES
################################################################################

class TestClass:
    pass

# Create two class variables (not here that we are NOT)
# creating instances, there are no brackets () at the end)
test_class_1 = TestClass
test_class_2 = TestClass

# Assign a value to a class variable
test_class_1.my_var = 2

# The other class variable now has this value too!
print(test_class_2.my_var)
# stdout: 2

test_class_2.my_var = 3
# The original classes variable has changed, as the variable is shared
# between all identical class objects
print(test_class_1.my_var)
# stdout: 3