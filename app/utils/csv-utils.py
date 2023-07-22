import pandas as pd
import csv

csv = '../data/ltc-set/ltc-terms-list.csv'
df = pd.read_csv(csv, encoding='utf8')
#print(df['is_required'])
#print(df.describe())

# Print column names as list
#print(df.columns)

print(df['namespace'].unique())