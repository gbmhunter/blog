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