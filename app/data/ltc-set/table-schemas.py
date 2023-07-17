import csv
from tableschema import Table
import glob
import pandas as pd
import os

csv = 'ltc-quick-ref.csv'
path = "*.csv"
#for fname in glob.glob(path):

fname = os.path.splitext(csv)[0]
#table = Table(csv)
#table.infer()
#table.schema.descriptor
#table.read(keyed=True)
#table.schema.save(fname + '-schema.json')

df = pd.read_csv(csv, header=0, encoding='utf-8')
meta = df.info(verbose=True)

