from csvwlib import CSVWConverter
import glob
import os
import argparse


csv = '../data/ltc-set/ltc-terms-list.csv'
filename = os.path.splitext(csv)[0]
json = CSVWConverter.to_json(csv)
print(json)