import pandas as pd

# The DataFrame

df = pd.DataFrame({
  'Name': [ 'John', 'Geoff', 'Brett' ],
  'Age': [ 45, 23, 30 ],
  'Height': [ 1.23, 4.56, 7.89 ],
})

print(df)
#     Name  Age  Height
# 0   John   45    1.23
# 1  Geoff   23    4.56
# 2  Brett   30    7.89

print(df[['Name', 'Height']])
#     Name  Height
# 0   John    1.23
# 1  Geoff    4.56
# 2  Brett    7.89

df = pd.DataFrame({
    'A': [ 1, 5, 6, 3, 4 ],
    'B': [ 'foo', 'bar', 'bar', 'foo', 'foo' ]
})
print(df)
#    A    B
# 0  1  foo
# 1  5  bar
# 2  6  bar
# 3  3  foo
# 4  4  foo

filtered_df = df.loc[df['B'] == 'foo']
print(filtered_df)
#    A    B
# 0  1  foo
# 3  3  foo
# 4  4  foo

def filter(row):
    if row['A'] % 2 == 0:
        return True
    else:
        return False

filt_df = df.loc[df.apply(filter, axis=1)]
print(filt_df)
# A    B
# 2  6  bar
# 4  4  foo

#=================
# SORTING
#=================

df = pd.DataFrame({
    'A': [ 1, 5, 6, 3, 4 ],
    'B': [ 'foo', 'bar', 'bar', 'foo', 'foo' ]
})
sorted_df = df.sort_values(by='A')
print(sorted_df)
#    A    B
# 0  1  foo
# 3  3  foo
# 4  4  foo
# 1  5  bar
# 2  6  bar

sorted_df = df.sort_values(by='A', ascending=False)
print(sorted_df)
#    A    B
# 2  6  bar
# 1  5  bar
# 4  4  foo
# 3  3  foo
# 0  1  foo