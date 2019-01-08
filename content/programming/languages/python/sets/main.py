#!/usr/bin/env python3

my_set = set()
print(my_set)

# UNION
A = set([1, 2, 3, 4])
B = set([3, 4, 5, 6])
print(A | B)

A = set([1, 2, 3, 4])
B = set([3, 4, 5, 6])
A.update(B)
print(A)

# INTERSECTION
A = set([1, 2, 3, 4])
B = set([3, 4, 5, 6])
print(A & B)

A = set([1, 2, 3, 4])
B = set([3, 4, 5, 6])
A.intersection_update(B)
print('intersection update')
print(A)


# DIFFERENCE
A = set([1, 2, 3, 4])
B = set([3, 4, 5, 6])
print(A - B)

print('Difference Inplace')
A = set([1, 2, 3, 4])
B = set([3, 4, 5, 6])
A.difference_update(B)
print(A)

print('Symmetric Difference')
A = set([1, 2, 3, 4])
B = set([3, 4, 5, 6])
C = A ^ B
print(C)

A = set([1, 2, 3, 4])
B = set([3, 4, 5, 6])
A.symmetric_difference_update(B)
print(A)

print('Subset')
A = { 1, 2 }
B = { 1, 2, 3, 4 }
print(A <= B)

A = { 1, 2 }
B = { 2, 3, 4 }
print(A <= B)

print('Superset')
A = { 1, 2, 3 }
B = { 1, 2 }
print(A >= B)

A = { 1, 2 }
B = { 2, 3, 4}
print(A >= B)

print('LACK OF ORDER')
A = { 2, 1, 3 }
for element in A:
    print(element)