from flask import Flask, render_template
from flask_frozen import Freezer
import pandas as pd
import csv
import sys

app = Flask(__name__)
app.config['TEMPLATES_AUTO_RELOAD'] = True
app.config['FREEZER_DESTINATION'] = '/build/20230718'
freezer = Freezer(app) # Added
FREEZER_DESTINATION = '../build'
FREEZER_IGNORE_MIMETYPE_WARNINGS = True
#app.config['FREEZER_RELATIVE_URLS'] = True
#app.config['FREEZER_BASE_URL'] = 'https://tdwg.github.io/ltc/'

@freezer.register_generator
def url_generator():
    yield '/'
    yield '/terms-list'
    yield '/quick-reference'

@app.route('/')
def home():
  return render_template(
    "home.html"
  )


@app.route('/terms-list/')
def table():
    df = pd.read_csv('data/ltc-set/ltc-terms-list.csv', encoding='utf8')
    ltcCls = df["class_name"].dropna().unique()

    grpdict2 = df.groupby('class_name')[['term_ns_name', 'term_local_name']].apply(
        lambda g: list(map(tuple, g.values.tolist()))).to_dict()
    termsByClass = []
    for i in grpdict2:
        termsByClass.append({
            'class': i,
            'terms': grpdict2[i]
        })

    with open('data/ltc-set/ltc-terms-list.csv', encoding='utf8') as csv_file:
        data = csv.reader(csv_file, delimiter=',')
        first_line = True
        terms = []
        for row in data:
            if not first_line:
                terms.append({
                    "namespace": row[0],
                    "term_local_name": row[1],
                    "class_name": row[8],
                    "term_ns_name": row[13],
                    "label": row[2],
                    "definition": row[3],
                    "usage": row[4],
                    "notes": row[5],
                    "examples": row[6],
                    "rdf_type": row[7],
                    "datatype": row[12],
                    'is_required': row[9]
                })
            else:
                first_line = False
    with open('data/ltc-set/ltc-skos-sssom-mappings.csv', encoding='utf8') as sf:
        data = csv.reader(sf, delimiter=',')
        first_line = True
        skos = []
        for row in data:
            if not first_line:
                skos.append({
                    'subject_label': row[2],
                    'subject_id': row[0],
                    'predicate_id': row[4],
                    'object_id': row[6],
                    'object_label': row[8],
                    'object_type': row[9]
                })
            else:
                first_line = False

    return render_template(
        "terms-list.html",
        ltcCls=ltcCls,
        terms=terms,
        termsByClass=termsByClass,
        skos=skos
    )

@app.route('/quick-reference/')
def ref():
    df = pd.read_csv('data/ltc-set/ltc-terms-list.csv', encoding='utf8')

    grpdict = df.fillna(-1).groupby('class_name')[['term_ns_name','term_local_name','class_name','label','definition','examples','usage','rdf_type']].apply(
        lambda g: list(map(tuple, g.values.tolist()))).to_dict()
    grplists = []
    for i in grpdict:
        grplists.append({
            'class': i,
            'terms': grpdict[i]
        })

    with open('data/ltc-set/ltc-skos-sssom-mappings.csv', encoding='utf8') as sf:
        data = csv.reader(sf, delimiter=',')
        first_line = True
        skos = []
        for row in data:
            if not first_line:
                skos.append({
                    'subject_label': row[2],
                    'subject_id': row[0],
                    'predicate_id': row[4],
                    'object_id': row[6],
                    'object_label': row[8],
                    'object_type': row[9]
                })
            else:
                first_line = False

    return render_template(
        "quick-reference.html",
        grplists=grplists,
        skos=skos
    )

if (__name__ == "__main__"):
    if len(sys.argv) > 1 and sys.argv[1] == "build":
        freezer.freeze()
    else:
        app.run(port=5000)
