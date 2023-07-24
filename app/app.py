from flask import Flask, render_template
import pandas as pd
import markdown
import markdown.extensions.fenced_code

app = Flask(__name__)
app.config.from_pyfile("config.py")

# Homepage with content stored in markdown file
@app.route('/')
def home():
    home_md = 'templates/markdown/home-content.md'
    markdown.markdownFromFile(input=home_md,
                              output='templates/includes/home/home-content.html',
                              extensions=['tables'])
    return render_template(
        "home.html",
        title = 'Home',
        slug='home'
    )

@app.route('/skos-mappings')
def skosMappings():
    skoscsv = 'data/ltc-set/ltc-skos-mapping.csv'
    skos = pd.read_csv(skoscsv, encoding='utf8')

    sssomcsv = 'data/ltc-set/ltc-sssom-mapping.csv'
    sssom = pd.read_csv(sssomcsv, encoding='utf8')

    return render_template(
        "skos.html",
        sssom=sssom,
        skos=skos,
        title='SKOS Mappings',
        slug='skos-mappings'
    )

@app.route('/terms')
def terms():
    terms_md = 'templates/markdown/terms-list-header.md'
    markdown.markdownFromFile(input=terms_md,
                              output='templates/includes/terms/terms-list-header.html',
                              extensions=['tables'])
    #Main Datafile
    terms_csv = 'data/ltc-set/ltc-terms-list.csv'
    df = pd.read_csv(terms_csv, encoding='utf8')
    terms = df.dropna()

    # Unique Class Names
    ltcCls = df["class_name"].dropna().unique()

    # Terms by Class
    grpdict2 = df.groupby('class_name')[['term_ns_name', 'term_local_name']].apply(
        lambda g: list(map(tuple, g.values.tolist()))).to_dict()
    termsByClass = []
    for i in grpdict2:
        termsByClass.append({
            'class': i,
            'terms': grpdict2[i]
        })

    return render_template(
        "terms.html",
        ltcCls=ltcCls,
        terms=terms,
        termsByClass=termsByClass,
        title = 'Terms List',
        slug='terms-list'
    )

@app.route('/quick-reference')
def quickReference():
    ref_md = 'templates/markdown/quick-reference-header.md'
    markdown.markdownFromFile(input=ref_md,
                              output='templates/includes/quick-reference/quick-reference-content.html',
                              extensions=['tables'])

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

    return render_template(
        "quick-reference.html",
        grplists=grplists,
        title='Quick Reference',
        slug='quick-reference'
    )


if (__name__ == "__main__"):
    app.run(port = 5000, debug=True)