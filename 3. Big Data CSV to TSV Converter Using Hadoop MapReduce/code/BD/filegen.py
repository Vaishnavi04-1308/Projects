import csv
import random

with open('data.csv', 'w') as csvfile:
    writer = csv.writer(csvfile)
    for i in range(100000):
        row = [random.random() for j in range(10)]
        writer.writerow(row)
