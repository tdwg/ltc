from tableschema import Table
import glob
import os
import sys
import argparse

parser = argparse.ArgumentParser(description='Enter Paths')
parser.add_argument('-p', '--path', help='Path to CSV (using backslashes)', required=True)
args = parser.parse_args()
csvpath = args.path

path = csvpath + "\*.csv"
for csv in glob.glob(path):
    filename = os.path.splitext(csv)[0]
    table = Table(csv)
    table.infer()
    table.schema.descriptor
    table.read(keyed=True)
    table.schema.save(filename + '-schema.json')

#df = pd.read_csv(csv, header=0, encoding='utf-8')
#meta = df.info(verbose=True)

