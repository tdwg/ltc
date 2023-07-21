import pandas as pd
import csv

skoscsv = '../data/ltc-set/ltc-terms-list.csv'
df = pd.read_csv(skoscsv, encoding='utf8')
#print(skos)
#print(df.describe())

# Print column names as list
print(df.columns)
