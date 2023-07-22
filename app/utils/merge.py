import csv
import pandas as pd
import numpy as np

df1 = pd.read_csv("../data/ltc-set/ltc-terms-list.csv", encoding="utf8")
df2 = pd.read_csv("../data/ltc-set/ltc-namespaces.csv")

df4 = pd.merge(df1, df2[['namespace', 'namespace_uri']], on='namespace', how='inner')
print(df4['term_uri'])
#df4['term_uri'] = df4['namespace_uri'] + df4['term_local_name']
#print(df4['term_uri'])
#df4.to_csv("../data/ltc-set/ltc-terms-list.csv", index=False, encoding="utf8")
#df3 = df1.merge(df2, on=["term_local_name"])

