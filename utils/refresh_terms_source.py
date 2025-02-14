from pathlib import Path
import pandas as pd

"""
Script to combine all namespace term csv files into a single source file (ltc_source_terms.csv) for use by StaDocGen
To run, assuming you have python installed and python.exe has been added to your path variable, open command line window
in the utils directory. Then run $python refresh_terms_source.py. Verify the file was created in the terms/source directory.

refresh_terms_source.py required Pandas and PathLib to work. Make sure to install both in your local environment before running
this script.
pip install pandas
pip install pathlib
"""

current_dir = Path().absolute()
path = current_dir.parent

def combine_source_files(source):
	
	csv_dict = {
		'abcd:': str(path) + '/source/terms/abcd.csv',
		'chrono:': str(path) + '/source/terms/chrono.csv',
		'dcterms:': str(path) + '/source/terms/dcterms.csv',
		'dwc:': str(path) + '/source/terms/dwc.csv',
		'ltc:': str(path) + '/source/terms/ltc.csv',
		'schema:': str(path) + '/source/terms/schema.csv',
	}
	
	dfs = []
	# append the CSV files
	for key, value in csv_dict.items():
		df = pd.read_csv(value)
		df.insert(loc=0, column='namespace', value=key)
		if 'term_created' not in df:
			df['term_created'] = '2024-02-28'
		if 'term_modified' not in df:
			df['term_modified'] = '2024-02-28'
		dfs.append(df)
		
	df_csv_merged = pd.concat(dfs,sort=False)
	df_csv_merged.sort_values(by=['tdwgutility_organizedInClass','term_localName'], inplace=True)
	df_csv_merged.to_csv(str(path) + '/source/terms/ltc_terms_source.csv', index=False, encoding='utf-8' )
	

combine_source_files(path)

