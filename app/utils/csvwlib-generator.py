from csvwlib import CSVWConverter
import glob
import os
import argparse

parser = argparse.ArgumentParser(description='Enter Paths')
parser.add_argument('-p', '--path', help='Path to CSV (using backslashes)', required=True)
args = parser.parse_args()
csvpath = args.path

path = csvpath + "\*.csv"
for csv in glob.glob(path):
    filename = os.path.splitext(csv)[0]
    json = CSVWConverter.to_json(csv)