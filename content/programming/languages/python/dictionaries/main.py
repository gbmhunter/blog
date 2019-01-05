## Iterating And Deleting Keys At The Same Time
my_dict = {
    'foo': 1,
    'bar': 2
}
my_dict_2 = { k: v for k, v in my_dict.items() if k != 'foo' }
print(my_dict_2)