from mrjob.job import MRJob

class  MRReplaceComma (MRJob):
    def mapper(self, _, line):
        yield None, line.strip().replace(',',' ')

if __name__=='__main__':
    MRReplaceComma.run()
