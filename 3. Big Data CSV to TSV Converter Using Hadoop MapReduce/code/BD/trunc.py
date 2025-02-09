# Python program to demonstrate
# truncate() method
  
fp = open('/Users/vaishnavi/Downloads/charts.csv', 'w')
  
# Truncates the file to specified
# size
fp.truncate(50000000)
  
# Closing files
fp.close()