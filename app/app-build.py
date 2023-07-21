from flask import Flask, render_template
from flask_frozen import Freezer # Added
import markdown
import markdown.extensions.fenced_code
import sys
import pandas as pd
import csv

app = Flask(__name__)
freezer = Freezer(app) # Added

app.config['TEMPLATES_AUTO_RELOAD'] = True
app.config['FREEZER_DESTINATION'] = '../docs'
app.config['FREEZER_RELATIVE_URLS'] = True
#app.config['FREEZER_BASE_URL'] = 'https://tdwg.github.io/ltc'
app.config['FREEZER_BASE_URL'] = '/'
app.testing = True
app.config['FREEZER_IGNORE_MIMETYPE_WARNINGS'] = True

@app.route('/')
def home():
    home_md = open("templates/markdown/home-content.md", "r")
    home_md_content = markdown.markdown(
        home_md.read(), extensions=["fenced_code"]
    )
    return render_template(
        "home.html",
        home_md_content=home_md_content
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

    skoscsv = 'data/ltc-set/ltc-skos-sssom-mappings.csv'
    skos = pd.read_csv(skoscsv, encoding='utf8')


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

    grpdict = df.fillna(-1).groupby('class_name')[['namespace', 'term_local_name', 'label', 'definition',
                                                   'usage', 'notes','examples', 'rdf_type', 'class_name',
                                                   'is_required', 'is_repeatable', 'compound_term_name',
                                                   'datatype', 'term_ns_name']].apply(
        lambda g: list(map(tuple, g.values.tolist()))).to_dict()
    grplists = []
    for i in grpdict:
        grplists.append({
            'class': i,
            'terms': grpdict[i]
        })

    skoscsv = 'data/ltc-set/ltc-skos-sssom-mappings.csv'
    skos = pd.read_csv(skoscsv, encoding='utf8')

    return render_template(
        "quick-reference.html",
        grplists=grplists,
        skos=skos
    )
@app.route('/resources/')
def resources():
    resources_md = open("templates/markdown/resources-content.md", "r")
    resources_md_content = markdown.markdown(
        resources_md.read(), extensions=["fenced_code"]
    )
    return render_template(
        "resources.html",
        resources_md_content=resources_md_content
    )


if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "build":
        freezer.freeze()
    else:
        app.run(port=8000)