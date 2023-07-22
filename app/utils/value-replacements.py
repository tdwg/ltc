import pandas as pd

df2 = pd.read_csv("../data/ltc-set/ltc-terms-list.csv", encoding="utf8")
df2['is_required'] = df2['is_required'].replace({'Yes': 'True'})
df2['is_required'] = df2['is_required'].replace({'No': 'False'})
df2['is_repeatable'] = df2['is_repeatable'].replace({'Yes': 'True'})
df2['is_repeatable'] = df2['is_repeatable'].replace({'No': 'False'})
df2.to_csv("../data/ltc-set/ltc-terms-list.csv", index=False)
