import csv
from tableschema import Table

# Generates JSON Schemas for CSV Files
# Schemas are named using the base filename of the corresponding csv with -schema.json

csv = 'ltc-quick-ref.csv'

table = Table(csv)
table.infer()
table.schema.descriptor
table.read(keyed=True)
table.schema.save(fname + '-schema.json')
