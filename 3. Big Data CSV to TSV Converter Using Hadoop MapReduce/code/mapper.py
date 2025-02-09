import os
import sys
from mriob. job import MRJob

class MRReplaceComma (MRJob):
    def mapper(self, _, line):
        yield None, line.strip() . replace(',','')
        
if __name__ =='__main__':
    
    filename = 'data.csv'
    file_size = os.path.getsize(filename)
    file_size_mb = file_size / (1024 * 1024)

    # if file size == 0:
    
    if os.path.getsize (filename) == 0:
        print("File is empty!")
        sys.exit ()

    # program to check input file size .
    # because the EB volume on EMR cluster has a limit.
    # so this program tests if the file is under 400MB

    if file_size_mb > 400:
        print (f"The file size greater than EBS volume .")
        # exit from execution if the file size exeeds
        sys.exit ()
    else:
        # pushtoHDFS () ;
        print (f"The File size acceptable, Pushed to HDFS.")
try:
    with open(filename, 'r') as f:
        # read the contents of the file
        contents = f. read ()
        count = sum(line. count (" ") for line in f)
        if count ==0 :
            print ("File does not have any commas to replace with space")
except FileNotFoundError:
    # handle the file not found excention here
    print("FileNotFoundError.")
    MRReplaceComma.run ()