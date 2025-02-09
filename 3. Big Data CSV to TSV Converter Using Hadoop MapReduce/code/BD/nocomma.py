import random

filename = 'NoCommaFile.txt'

# data without commas
data = ''.join(random.choices('12345', k=10000))

# Write the data to the file
with open(filename, 'w') as f:
    f.write(data)
    
print(f"The file created")
