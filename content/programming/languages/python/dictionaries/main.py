## Iterating And Deleting Keys At The Same Time
my_dict = {
    'foo': 1,
    'bar': 2
}
my_dict_2 = { k: v for k, v in my_dict.items() if k != 'foo' }
print(my_dict_2)

my_dict = { 2: 'a', 4: 'dict', 3: 'sorted', 1: 'I\'m' }
sorted_keys = sorted(my_dict)
print(sorted_keys)
for key in sorted_keys:
    print(my_dict[key])