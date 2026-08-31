"""Generate vocabulary/ltc-dp-tables.csv and vocabulary/ltc-dp-fields.csv.

Run from the repository root:  python data-package/ltc/src/build-vocabulary.py

Emits the two vocabulary files in the exact column order and value conventions of
data-package/dwc-dp/vocabulary/dwc-dp-tables.csv and dwc-dp-fields.csv. These two
files are the single source of truth for the table schemas, which are generated
from them in a later build step.

Structural rules are the ones documented in instructions.md and realised in
ltc-term-mapping.md. Regenerate both this and the mapping if a preliminary
decision in open-issues.md is revised.
"""
import csv, re, collections, os

SRC = 'data-package/ltc/source/ltc_terms_source.csv'
DT = 'source/terms/ltc_datatypes.csv'
NS = 'source/terms/ltc_namespaces.csv'
PUB = 'source/rs.tdwg.org/ltc.csv'
DWCF = 'data-package/dwc-dp/vocabulary/dwc-dp-fields.csv'
OUTDIR = 'data-package/ltc/vocabulary'

LTC_BASE = 'http://rs.tdwg.org/ltc/terms/'
LTC_VERSION_BASE = 'http://rs.tdwg.org/ltc/terms/version/'
PENDING = 'http://example.com/term-pending/'

kebab = lambda p: re.sub(r'(?<!^)(?=[A-Z])', '-', p).lower()
camel = lambda p: p[0].lower() + p[1:]

# PersonRole is Latimer Core's equivalent of DwC-DP's *-agent-role, which holds
# agent_fk on the role table rather than a role key on the agent.
FK_ON_PARENT = {'Person', 'Role'}

TYPEMAP = {'string': 'string', 'number': 'number', 'boolean': 'boolean', 'list': 'array'}

TABLE_COLS = ['name', 'title', 'description', 'comments', 'example', 'namespace',
              'dcterms:isVersionOf', 'dcterms:references', 'rdfs:comment', 'status',
              'new', 'ignore']
FIELD_COLS = ['table', 'name', 'key', 'predicate', 'related_table', 'related_field',
              'title', 'description', 'comments', 'example', 'type', 'format',
              'unique', 'required', 'minimum', 'maximum', 'namespace',
              'dcterms:isVersionOf', 'dcterms:references', 'rdfs:comment', 'status']

PK_COMMENT = 'The value in this field MAY be changed in aggregation to guarantee uniqueness.'
FK_COMMENT = ('The value in this field MAY be changed in aggregation to preserve the '
              'relationship to the (Primary Key).')

# ------------------------------------------------------------------ load sources
rows = list(csv.DictReader(open(SRC, encoding='utf-8-sig', newline='')))
dts = {(r['tdwgutility_organizedInClass'], r['term_localName']): r['datatype']
       for r in csv.DictReader(open(DT, encoding='utf-8-sig', newline=''))}
dts[('Reference', 'resourceIRI')] = dts.get(('Reference', 'resourceURI'), 'string')

nsbase = {r['curie']: r['value']
          for r in csv.DictReader(open(NS, encoding='utf-8-sig', newline=''))}
published = {r['term_localName'] for r in csv.DictReader(open(PUB, encoding='utf-8-sig',
                                                             newline=''))}
dwcf = {}
for r in csv.DictReader(open(DWCF, encoding='utf-8-sig', newline='')):
    dwcf.setdefault(r['name'], r)

classes = [r for r in rows if 'Class' in r['rdf_type']]
clsnames = [c['term_localName'] for c in classes]
clsrow = {c['term_localName']: c for c in classes}
props = [r for r in rows if 'Class' not in r['rdf_type']]
byclass = collections.defaultdict(list)
for p in props:
    byclass[p['tdwgutility_organizedInClass'].rsplit('/', 1)[-1]].append(p)
proprow = {(p['tdwgutility_organizedInClass'].rsplit('/', 1)[-1], p['term_localName']): p
           for p in props}

unreconciled = []

# ------------------------------------------------------------------ IRI resolution


def iris(row):
    """Return (namespace, isVersionOf, references, rdfs_comment) for a term row."""
    name = row['term_localName']
    ns = row['namespace'].strip().rstrip(':')
    definition = row['definition'].strip()
    if ns == 'ltc':
        if name not in published:
            return 'ltc', PENDING + name, '', definition
        return ('ltc', LTC_BASE + name,
                LTC_VERSION_BASE + '%s-%s' % (name, row['term_created'].strip()), definition)
    # borrowed: prefer the pair Darwin Core DP already publishes
    d = dwcf.get(name)
    if d and d['dcterms:isVersionOf']:
        return (d['namespace'], d['dcterms:isVersionOf'], d['dcterms:references'],
                d['rdfs:comment'] or definition)
    base = nsbase.get(ns)
    if base:
        return ns, base + name, '', definition
    unreconciled.append((row['tdwgutility_organizedInClass'].rsplit('/', 1)[-1], name, ns))
    return ns, '', '', definition


def class_iris(name):
    """A minted primary key has no Latimer Core term, so it takes a pending IRI."""
    return 'ltc', PENDING + camel(name) + 'ID', '', 'A unique identifier for an ltc:%s.' % name


# ------------------------------------------------------------------ classify relations
rel = []
for c in clsnames:
    for p in byclass[c]:
        m = re.match(r'array<ltc:(\w+)>', dts.get((c, p['term_localName']), '') or '')
        if m:
            rel.append((c, p['term_localName'], m.group(1)))

parents_of = collections.defaultdict(set)
for parent, term, tgt in rel:
    if parent != tgt:
        parents_of[tgt].add(parent)

SELF, DIRECT_CHILD, DIRECT_PARENT, JUNCTION = 'self', 'child', 'parent', 'junction'


def shape(parent, tgt):
    if parent == tgt:
        return SELF
    if len(parents_of[tgt]) >= 2:
        return JUNCTION
    return DIRECT_PARENT if tgt in FK_ON_PARENT else DIRECT_CHILD


# Predicates follow the DwC-DP vocabulary: 'part of' for a self-referencing
# hierarchy (occurrence.isPartOfOccurrence_fk), 'for' for a child pointing at its
# single parent (chronometric-age.event_fk), and the agent-role pair for PersonRole.
PREDICATE = {SELF: 'part of', DIRECT_CHILD: 'for', DIRECT_PARENT: 'has'}

extra = collections.defaultdict(list)   # core table -> [(column, target, parent, term, predicate)]
junctions = []                          # (parent, target, term)
for parent, term, tgt in rel:
    s = shape(parent, tgt)
    if s == SELF:
        extra[parent].append((camel(term[3:]) + '_fk', tgt, parent, term, PREDICATE[SELF]))
    elif s == DIRECT_CHILD:
        extra[tgt].append((camel(parent) + '_fk', parent, parent, term, PREDICATE[DIRECT_CHILD]))
    elif s == DIRECT_PARENT:
        pred = 'role holder' if tgt == 'Person' else PREDICATE[DIRECT_PARENT]
        extra[parent].append((camel(tgt) + '_fk', tgt, parent, term, pred))
    else:
        junctions.append((parent, tgt, term))

# ------------------------------------------------------------------ tables
tables = []
for c in classes:
    n = c['term_localName']
    ns, iv, ref, com = iris(c)
    tables.append({
        'name': kebab(n), 'title': c['label'].strip(),
        'description': c['definition'].strip(),
        'comments': ' '.join(x for x in (c['usage'].strip(), c['notes'].strip()) if x),
        'example': c['examples'].strip(), 'namespace': ns,
        'dcterms:isVersionOf': iv, 'dcterms:references': ref, 'rdfs:comment': com,
        'status': 'recommended', 'new': 'true', 'ignore': 'false'})

for parent, tgt, term in sorted(junctions):
    p = proprow[(parent, term)]
    ns, iv, ref, com = iris(p)
    tables.append({
        'name': '%s-%s' % (kebab(parent), kebab(tgt)),
        'title': '%s %s' % (clsrow[parent]['label'].strip(), clsrow[tgt]['label'].strip()),
        'description': 'An ltc:%s related to an ltc:%s.' % (tgt, parent),
        'comments': p['notes'].strip(), 'example': '', 'namespace': ns,
        'dcterms:isVersionOf': iv, 'dcterms:references': ref, 'rdfs:comment': com,
        'status': 'recommended', 'new': 'true', 'ignore': 'true'})

# ------------------------------------------------------------------ fields
fields = []


def pk_field(table, cls):
    ns, iv, ref, com = class_iris(cls)
    return {'table': table, 'name': camel(cls) + '_pk', 'key': 'pk', 'predicate': '',
            'related_table': '', 'related_field': '',
            'title': '%s (Primary Key)' % clsrow[cls]['label'].strip(),
            'description': 'A unique identifier for an ltc:%s.' % cls,
            'comments': PK_COMMENT, 'example': '', 'type': 'string', 'format': 'default',
            'unique': 'TRUE', 'required': 'TRUE', 'minimum': '', 'maximum': '',
            'namespace': ns, 'dcterms:isVersionOf': iv, 'dcterms:references': ref,
            'rdfs:comment': com, 'status': 'recommended'}


def fk_field(table, colname, tgt, predicate, term=None, parent=None):
    """term: the ltc has* property this FK implements, if any."""
    if term is not None:
        ns, iv, ref, com = iris(proprow[(parent, term)])
    else:
        ns, iv, ref, com = class_iris(tgt)
    return {'table': table, 'name': colname, 'key': 'fk', 'predicate': predicate,
            'related_table': kebab(tgt), 'related_field': camel(tgt) + '_pk',
            'title': '%s (Foreign Key)' % clsrow[tgt]['label'].strip(),
            'description': 'An identifier for an ltc:%s.' % tgt,
            'comments': FK_COMMENT, 'example': '', 'type': 'string', 'format': 'default',
            'unique': 'FALSE', 'required': 'TRUE', 'minimum': '', 'maximum': '',
            'namespace': ns, 'dcterms:isVersionOf': iv, 'dcterms:references': ref,
            'rdfs:comment': com, 'status': 'recommended'}


for c in clsnames:
    table = kebab(c)
    fields.append(pk_field(table, c))
    for colname, tgt, parent, term, pred in sorted(extra[c]):
        fields.append(fk_field(table, colname, tgt, pred, term, parent))
    for p in sorted(byclass[c], key=lambda r: r['term_localName']):
        t = p['term_localName']
        d = dts.get((c, t), '')
        if re.match(r'array<ltc:', d or ''):
            continue                      # relations are keys, emitted above or as junctions
        ns, iv, ref, com = iris(p)
        fields.append({
            'table': table, 'name': t, 'key': '', 'predicate': '', 'related_table': '',
            'related_field': '', 'title': p['label'].strip(),
            'description': p['definition'].strip(),
            'comments': ' '.join(x for x in (p['usage'].strip(), p['notes'].strip()) if x),
            'example': p['examples'].strip(), 'type': TYPEMAP.get(d, 'string'),
            'format': 'default', 'unique': '',
            'required': 'TRUE' if p['tdwgutility_required'].strip().lower() == 'yes' else '',
            'minimum': '', 'maximum': '', 'namespace': ns, 'dcterms:isVersionOf': iv,
            'dcterms:references': ref, 'rdfs:comment': com, 'status': 'recommended'})

for parent, tgt, term in sorted(junctions):
    table = '%s-%s' % (kebab(parent), kebab(tgt))
    fields.append(fk_field(table, camel(parent) + '_fk', parent, 'for'))
    fields.append(fk_field(table, camel(tgt) + '_fk', tgt, 'has', term, parent))

# ------------------------------------------------------------------ write
os.makedirs(OUTDIR, exist_ok=True)


def write(path, cols, data):
    with open(path, 'w', encoding='utf-8', newline='') as f:
        w = csv.DictWriter(f, fieldnames=cols, lineterminator='\n')
        w.writeheader()
        w.writerows(data)


write(os.path.join(OUTDIR, 'ltc-dp-tables.csv'), TABLE_COLS, tables)
write(os.path.join(OUTDIR, 'ltc-dp-fields.csv'), FIELD_COLS, fields)

print('%s/ltc-dp-tables.csv  %d rows (%d core, %d junction)'
      % (OUTDIR, len(tables), len(clsnames), len(junctions)))
print('%s/ltc-dp-fields.csv   %d rows' % (OUTDIR, len(fields)))
print('  pk %d   fk %d   ordinary %d'
      % (sum(1 for r in fields if r['key'] == 'pk'),
         sum(1 for r in fields if r['key'] == 'fk'),
         sum(1 for r in fields if not r['key'])))
print('  fields with no dcterms:isVersionOf: %d'
      % sum(1 for r in fields if not r['dcterms:isVersionOf']))
if unreconciled:
    print('  UNRECONCILED borrowed terms (need a manual IRI):')
    for cl, n, ns in sorted(set(unreconciled)):
        print('    %s.%s (ns=%s)' % (cl, n, ns))
