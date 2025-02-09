from mrjob.job import MRJob
class MRReplaceComma(MRJob):
    def reducer(self, _, values):
        for value in values:
            yield None, value.strip()

if __name__=='__main__':
    MRReplaceComma.run()
