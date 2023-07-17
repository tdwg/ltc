<<<<<<< Updated upstream
# importing flask
from flask import Flask, render_template
  
# importing pandas module
import pandas as pd
import csv
  
app = Flask(__name__)
app.config['TEMPLATES_AUTO_RELOAD'] = True

@app.route('/')
def home():
  return render_template(
    "home.html"
  )

@app.route('/terms-list')
def table():
    df = pd.read_csv('data/ltc-set/ltc-term-list.csv')
    ltcCls = df["class_name"].dropna().unique()

    grpdict2 = df.groupby('class_name')[['term_ns_name', 'term_name']].apply(
        lambda g: list(map(tuple, g.values.tolist()))).to_dict()
    grplists = []
    for i in grpdict2:
        grplists.append({
            'class': i,
            'terms': grpdict2[i]
        })

    with open('data/ltc-set/ltc-term-list.csv') as csv_file:
        data = csv.reader(csv_file, delimiter=',')
        first_line = True
        terms = []
        for row in data:
            if not first_line:
                terms.append({
                    "pref_ns_prefix": row[0],
                    "pref_ns": row[1],
                    "term_name": row[2],
                    "class_name": row[3],
                    "term_ns_name": row[4],
                    "term_iri": row[5],
                    "modified": row[6],
                    "term_version_iri": row[7],
                    "label": row[8],
                    "definition": row[9],
                    "usage": row[10],
                    "notes": row[11],
                    "examples": row[12],
                    "type": row[13],
                    "class_iri": row[14],
                    "datatype": row[15]
                })
            else:
                first_line = False
    with open('data/ltc-set/ltc-skos.csv') as skos_csv_file:
        skosdata = csv.reader(skos_csv_file, delimiter=',')
        first_line = True
        skos = []
        for row in skosdata:
            if not first_line:
                skos.append({
                    'term': row[0],
                    'relation': row[1],
                    'related_term': row[2]
                })
            else:
                first_line = False

    return render_template(
        "terms-list.html",
        ltcCls=ltcCls,
        terms=terms,
        grplists=grplists,
        skos=skos
    )

@app.route('/quick-reference')
def ref():
    df = pd.read_csv('data/ltc-set/ltc-quick-ref.csv')

    grpdict = df.fillna(-1).groupby('class_name')[['term_ns_name','term_name','class_name','term_iri','label','definition','examples','usage','type']].apply(
        lambda g: list(map(tuple, g.values.tolist()))).to_dict()
    grplists = []
    for i in grpdict:
        grplists.append({
            'class': i,
            'terms': grpdict[i]
        })

    with open('data/ltc-set/ltc-skos.csv') as skos_csv_file:
        skosdata = csv.reader(skos_csv_file, delimiter=',')
        first_line = True
        skos = []
        for row in skosdata:
            if not first_line:
                skos.append({
                    'term': row[0],
                    'relation': row[1],
                    'related_term': row[2]
                })
            else:
                first_line = False
    return render_template(
        "quick-reference.html",
        grplists=grplists,
        skos=skos
    )

if (__name__ == "__main__"):
=======
from flask import Flask, render_template
import pandas as pd
import csv
import yaml

with open("config.yaml", "r") as f:
    config = yaml.load(f, Loader=yaml.FullLoader)

app = Flask(__name__)
app.config['TEMPLATES_AUTO_RELOAD'] = True

@app.route('/')
def home():
  return render_template(
    "home.html"
  )

@app.route('/terms-list')
def table():
    df = pd.read_csv('data/ltc-set/ltc-term-list.csv', encoding='utf8')
    ltcCls = df["class_name"].dropna().unique()

    grpdict2 = df.groupby('class_name')[['term_ns_name', 'term_name']].apply(
        lambda g: list(map(tuple, g.values.tolist()))).to_dict()
    grplists = []
    for i in grpdict2:
        grplists.append({
            'class': i,
            'terms': grpdict2[i]
        })

    with open('data/ltc-set/ltc-term-list.csv', encoding='utf8') as csv_file:
        data = csv.reader(csv_file, delimiter=',')
        first_line = True
        terms = []
        for row in data:
            if not first_line:
                terms.append({
                    "pref_ns_prefix": row[0],
                    "pref_ns": row[1],
                    "term_name": row[2],
                    "class_name": row[3],
                    "term_ns_name": row[4],
                    "term_iri": row[5],
                    "modified": row[6],
                    "term_version_iri": row[7],
                    "label": row[8],
                    "definition": row[9],
                    "usage": row[10],
                    "notes": row[11],
                    "examples": row[12],
                    "type": row[13],
                    "class_iri": row[14],
                    "datatype": row[15]
                })
            else:
                first_line = False
    with open('data/ltc-set/ltc-skos.csv', encoding='utf8') as sf:
        data = csv.reader(sf, delimiter=',')
        first_line = True
        skos = []
        for row in data:
            if not first_line:
                skos.append({
                    'subject_label': row[1],
                    'subject_id': row[0],
                    'predicate': row[2],
                    'object_id': row[3],
                    'object_label': row[4],
                    'object_source': row[5]
                })
            else:
                first_line = False

    return render_template(
        "terms-list.html",
        ltcCls=ltcCls,
        terms=terms,
        grplists=grplists,
        skos=skos
    )

@app.route('/quick-reference')
def ref():
    df = pd.read_csv('data/ltc-set/ltc-quick-ref.csv', encoding='utf8')

    grpdict = df.fillna(-1).groupby('class_name')[['term_ns_name','term_name','class_name','term_iri','label','definition','examples','usage','type']].apply(
        lambda g: list(map(tuple, g.values.tolist()))).to_dict()
    grplists = []
    for i in grpdict:
        grplists.append({
            'class': i,
            'terms': grpdict[i]
        })

    with open('data/ltc-set/ltc-skos.csv', encoding='utf8') as sf:
        data = csv.reader(sf, delimiter=',')
        first_line = True
        skos = []
        for row in data:
            if not first_line:
                skos.append({
                    'subject_label': row[1],
                    'subject_id': row[0],
                    'predicate': row[2],
                    'object_id': row[3],
                    'object_label': row[4],
                    'object_source': row[5]
                })
            else:
                first_line = False

    return render_template(
        "quick-reference.html",
        grplists=grplists,
        skos=skos
    )

if (__name__ == "__main__"):
>>>>>>> Stashed changes
     app.run(port = 5000)