"""Generate ltc-dp/table-schemas/*.json, index.json, ltc-dp-profile.json, version.json.

Run from the repository root:  python data-package/ltc/src/build-schemas.py

Derived entirely from vocabulary/ltc-dp-tables.csv and vocabulary/ltc-dp-fields.csv,
which are the single source of truth. Run build-vocabulary.py first.

Mirrors the JSON key order, presence rules, and value conventions of
data-package/dwc-dp/dwc-dp/. Notably:
  - dcterms:references is omitted wherever it is empty
  - rdfs:comment is omitted at table level when empty
  - constraints is omitted when neither required nor unique applies
  - a self-referencing foreignKey uses "resource": "", per the Data Package v1 spec
"""
import csv, json, collections, os, datetime

VOCAB = 'data-package/ltc/vocabulary'
OUTDIR = 'data-package/ltc/ltc-dp'
SCHEMADIR = os.path.join(OUTDIR, 'table-schemas')

IDENTIFIER_BASE = 'http://rs.tdwg.org/ltc/ltc-dp'
VERSION = '0.1'
ISSUED = datetime.date.today().isoformat()

tables = list(csv.DictReader(open(os.path.join(VOCAB, 'ltc-dp-tables.csv'),
                                  encoding='utf-8-sig', newline='')))
fields = list(csv.DictReader(open(os.path.join(VOCAB, 'ltc-dp-fields.csv'),
                                  encoding='utf-8-sig', newline='')))

byt = collections.defaultdict(list)
for f in fields:
    byt[f['table']].append(f)


def table_head(t, url=True):
    """Table-level metadata, in DwC-DP key order."""
    d = collections.OrderedDict()
    d['identifier'] = '%s/%s' % (IDENTIFIER_BASE, t['name'])
    if url:
        d['url'] = 'table-schemas/%s.json' % t['name']
    d['name'] = t['name']
    d['title'] = t['title']
    d['description'] = t['description']
    d['comments'] = t['comments']
    d['examples'] = t['example']
    d['namespace'] = t['namespace']
    d['dcterms:isVersionOf'] = t['dcterms:isVersionOf']
    if t['dcterms:references']:
        d['dcterms:references'] = t['dcterms:references']
    if t['rdfs:comment']:
        d['rdfs:comment'] = t['rdfs:comment']
    return d


def field_obj(f):
    d = collections.OrderedDict()
    d['name'] = f['name']
    d['title'] = f['title']
    d['description'] = f['description']
    d['comments'] = f['comments']
    d['examples'] = f['example']
    d['type'] = f['type']
    d['format'] = f['format']
    d['namespace'] = f['namespace']
    d['dcterms:isVersionOf'] = f['dcterms:isVersionOf']
    if f['dcterms:references']:
        d['dcterms:references'] = f['dcterms:references']
    d['rdfs:comment'] = f['rdfs:comment']
    req = f['required'].strip().upper() == 'TRUE'
    uniq = f['unique'].strip().upper() == 'TRUE'
    if req or uniq:
        d['constraints'] = collections.OrderedDict([('required', req), ('unique', uniq)])
    return d


nschemas = 0
for t in tables:
    rows = byt[t['name']]
    d = table_head(t)
    d['fields'] = [field_obj(f) for f in rows]

    pk = [f for f in rows if f['key'] == 'pk']
    if pk:
        d['primaryKey'] = pk[0]['name']

    fks = []
    for f in rows:
        if f['key'] != 'fk':
            continue
        # a self-reference names the current resource with an empty string (v1 spec)
        resource = '' if f['related_table'] == t['name'] else f['related_table']
        fks.append(collections.OrderedDict([
            ('fields', f['name']),
            ('predicate', f['predicate']),
            ('reference', collections.OrderedDict([('resource', resource),
                                                   ('fields', f['related_field'])])),
        ]))
    if fks:
        d['foreignKeys'] = fks

    os.makedirs(SCHEMADIR, exist_ok=True)
    with open(os.path.join(SCHEMADIR, '%s.json' % t['name']), 'w', encoding='utf-8') as fh:
        json.dump(d, fh, indent=2, ensure_ascii=False)
        fh.write('\n')
    nschemas += 1

# ------------------------------------------------------------------ index.json
index = collections.OrderedDict()
index['identifier'] = IDENTIFIER_BASE
index['url'] = ''
index['name'] = 'ltc-dp'
index['version'] = VERSION
index['title'] = 'Latimer Core Data Package'
index['shortTitle'] = 'ltc-dp'
index['description'] = ('A data package for sharing natural science collections data using '
                        'Latimer Core.')
index['issued'] = ISSUED
index['isLatest'] = True
index['tableSchemas'] = [table_head(t) for t in tables]
with open(os.path.join(OUTDIR, 'index.json'), 'w', encoding='utf-8') as fh:
    json.dump(index, fh, indent=2, ensure_ascii=False)
    fh.write('\n')

# ------------------------------------------------------------------ version.json
with open(os.path.join(OUTDIR, 'version.json'), 'w', encoding='utf-8') as fh:
    json.dump({'version': VERSION, 'latestCompatibleVersion': VERSION}, fh, indent=2)
    fh.write('\n')

# ------------------------------------------------------------------ profile
profile = collections.OrderedDict()
profile['$schema'] = 'http://json-schema.org/draft-04/schema#'
profile['title'] = 'Latimer Core Data Package (LtC-DP) profile'
profile['description'] = ('Profile for organizing natural science collections data as a '
                          'Data Package (https://specs.frictionlessdata.io/).')
profile['type'] = 'object'
profile['$defs'] = {'ltc-dp-resource-names': {'enum': sorted(t['name'] for t in tables)}}
profile['allOf'] = [
    {'$ref': 'https://specs.frictionlessdata.io/schemas/data-package.json'},
    collections.OrderedDict([
        ('required', ['profile']),
        ('properties', collections.OrderedDict([
            ('profile', {'format': 'uri'}),
            ('resources', {'items': {'oneOf': [
                {'properties': {'name': {'not': {'$ref': '#/$defs/ltc-dp-resource-names'}}}},
                collections.OrderedDict([
                    ('required', ['profile']),
                    ('properties', collections.OrderedDict([
                        ('profile', {'enum': ['tabular-data-resource']}),
                        ('name', {'$ref': '#/$defs/ltc-dp-resource-names'}),
                        ('schema', {'properties': {'fields': {'items': collections.OrderedDict([
                            ('required', ['name', 'title', 'description', 'type',
                                          'dcterms:isVersionOf']),
                            ('properties', collections.OrderedDict([
                                ('dcterms:isVersionOf', {'type': 'string', 'format': 'uri',
                                                         'pattern': '^http.*$'}),
                                ('dcterms:references', {'type': 'string', 'format': 'uri',
                                                        'pattern': '^http.*$'}),
                            ])),
                        ])}}}),
                    ])),
                ]),
            ]}}),
        ])),
    ]),
]
with open(os.path.join(OUTDIR, 'ltc-dp-profile.json'), 'w', encoding='utf-8') as fh:
    json.dump(profile, fh, indent=2, ensure_ascii=False)
    fh.write('\n')

print('%s/table-schemas/  %d files' % (OUTDIR, nschemas))
print('%s/index.json       %d tableSchemas' % (OUTDIR, len(index['tableSchemas'])))
print('%s/ltc-dp-profile.json  %d resource names'
      % (OUTDIR, len(profile['$defs']['ltc-dp-resource-names']['enum'])))
print('%s/version.json     %s' % (OUTDIR, VERSION))
