import csv
import pandas as pd
import numpy as np

df1 = pd.read_csv("../data/ltc-source/ltc-terms-source.csv", encoding="utf8")
df2 = pd.read_csv("../data/ltc-source/ltc-datatypes.csv", encoding="utf8")

# Add Compound Name Column to Merge CSV Files
# df1['compound_term_name'] = np.nan
# df2['compound_term_name'] = np.nan

df1['compound_term_name'] = df1['class_name'] + '.' + df1['term_local_name']
df2['compound_term_name'] = df2['class_name'] + '.' + df2['term_local_name']

# Read dtypes to check utf-8
#dtypes1 = df1.apply(lambda x: pd.lib.infer_dtype(x.values))
#dtypes2 = df2.apply(lambda x: pd.lib.infer_dtype(x.values))
#print(dtypes1)
#print(dtypes2)

df3 = pd.merge(df1, df2[['compound_term_name','datatype']], on=["compound_term_name"], how='left')
df3['term_ns_name'] = df3['namespace'] + df3['term_local_name']


#df3 = df1.merge(df2, on=["term_local_name"])
df3.to_csv("../data/ltc-set/ltc-terms-list.csv", index=False, encoding="utf8")