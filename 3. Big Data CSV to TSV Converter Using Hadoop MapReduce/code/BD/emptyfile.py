import os

filename = 'empty.csv'

# Get the size of the file in bytes
file_size = os.path.getsize(filename)

if file_size == 0:
    print(f"The file {filename} is empty.")
else:
    print(f"The file {filename} contains {file_size} bytes of data.")
