"""Generate ltc-term-mapping.md from the Latimer Core term source files.

Run from the repository root:  python data-package/ltc/src/build-mapping.py

Applies the Darwin Core DP structural conventions documented in instructions.md.
Regenerate whenever a preliminary decision in open-issues.md is settled.
"""
import csv, re, collections

SRC = 'data-package/ltc/source/ltc_terms_source.csv'
DT = 'source/terms/ltc_datatypes.csv'
OUT = 'data-package/ltc/ltc-term-mapping.md'

kebab = lambda p: re.sub(r'(?<!^)(?=[A-Z])', '-', p).lower()
camel = lambda p: p[0].lower() + p[1:]
title = lambda p: re.sub(r'(?<!^)(?=[A-Z])', ' ', p)

# PersonRole is Latimer Core's equivalent of DwC-DP's *-agent-role, which holds
# agent_fk on the role table rather than a role key on the agent. Person and Role
# therefore take the foreign key on person-role, not on their own table.
FK_ON_PARENT = {'Person', 'Role'}

rows = list(csv.DictReader(open(SRC, encoding='utf-8-sig', newline='')))
dts = {(r['tdwgutility_organizedInClass'], r['term_localName']): r['datatype']
       for r in csv.DictReader(open(DT, encoding='utf-8-sig', newline=''))}
# stale row in ltc_datatypes.csv: resourceURI was renamed to resourceIRI
dts[('Reference', 'resourceIRI')] = dts.get(('Reference', 'resourceURI'), 'string')

classes = [r['term_localName'] for r in rows if 'Class' in r['rdf_type']]
props = [r for r in rows if 'Class' not in r['rdf_type']]
byclass = collections.defaultdict(list)
for p in props:
    byclass[p['tdwgutility_organizedInClass'].rsplit('/', 1)[-1]].append(p)

TYPEMAP = {'string': 'string', 'number': 'number', 'boolean': 'boolean', 'list': 'array'}

# ---------------------------------------------------------------- classify relations
rel = []            # (parent, term, target)
for c in classes:
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


# extra columns landing on a core table because of a direct FK
extra = collections.defaultdict(list)   # table -> [(column, target, source term)]
junctions = []                          # (parent, target, term)
for parent, term, tgt in rel:
    s = shape(parent, tgt)
    if s == SELF:
        extra[parent].append((camel(term[3:]) + '_fk', tgt, term))
    elif s == DIRECT_CHILD:
        extra[tgt].append((camel(parent) + '_fk', parent, '%s.%s' % (parent, term)))
    elif s == DIRECT_PARENT:
        extra[parent].append((camel(tgt) + '_fk', tgt, term))
    else:
        junctions.append((parent, tgt, term))

ncols = {c: 1 + len([p for p in byclass[c]
                     if not re.match(r'array<ltc:', dts.get((c, p['term_localName']), '') or '')])
            + len(extra[c]) for c in classes}

# ---------------------------------------------------------------- render
L = []
A = L.append
A('# Latimer Core -> Data Package Mapping')
A('> 2026-08-31')
A('> ltc-term-mapping.md')
A('> ltc')
A('')
A('Maps every Latimer Core class to an LtC-DP table and every Latimer Core property to a column.')
A('Generated from `ltc_terms_source.csv` (25 classes, %d properties) and `ltc_datatypes.csv` by'
  % len(props))
A('`build-mapping.py`. This is the mapping that `vocabulary/ltc-dp-fields.csv` must reproduce.')
A('')
A('**Built on two preliminary decisions** recorded in `open-issues.md`, both still open for group')
A('deliberation. Regenerate this document with `python data-package/ltc/build-mapping.py` if either')
A('is revised.')
A('')
A('- **Issue 1** — `LatimerCoreScheme` is a table, so `SchemeTerm` and `SchemeMeasurementOrFact`')
A('  are not orphaned. A scheme is something a package contains.')
A('- **Issue 2** — relations follow the Darwin Core DP child-table pattern, so a relation may hold')
A('  many values.')
A('')
A('## Structural rules')
A('')
A('Darwin Core DP resolves relations three ways. Latimer Core uses the same three.')
A('')
A('| Rule | When | Result | DwC-DP precedent |')
A('| -- | -- | -- | -- |')
A('| **Core table** | every Latimer Core class | `<class>` with `<className>_pk` | `event`, `agent` |')
A('| **Direct FK on the child** | the target class has exactly one parent class | `<target>.<parent>_fk` | `chronometric-age.event_fk` |')
A('| **Junction table** | the target class has two or more parent classes | `<parent>-<target>` with two FKs | `event-reference`, `material-media` |')
A('| **Self-reference** | a class references itself | `parent<Class>_fk` on the same table | `organism-relationship.subjectOrganism_fk` |')
A('')
A('Darwin Core DP has a fourth pattern: a leaf attribute bundle is inlined into a one-FK child')
A('table (`agent-identifier` carries the identifier fields directly, and there is no `identifier`')
A('table). **This pattern has no applicable case in Latimer Core.** Every one of the 25 Latimer')
A('Core classes carries at least one `has*` relation of its own, so none is a leaf, and a table')
A('with no primary key cannot be referenced. `Identifier` in particular carries `hasReference`.')
A('')
A('If Latimer Core were to drop `Identifier.hasReference`, `Identifier` would become a leaf and')
A('could be inlined exactly as Darwin Core DP does, removing the `identifier` table and converting')
A('23 junction tables into 23 inlined child tables. That is a Latimer Core question, not a data')
A('package question — see `open-issues.md`.')
A('')
A('## Naming')
A('')
A('| Element | Rule | Example |')
A('| -- | -- | -- |')
A('| Table / resource name | kebab-case, all lowercase | `ObjectGroup` -> `object-group` |')
A('| Junction table name | `<parent-table>-<target-table>` | `object-group-identifier` |')
A('| Schema file | `<table-name>.json` | `table-schemas/object-group.json` |')
A('| Primary key | `<className>_pk`, camelCase | `objectGroup_pk` |')
A('| Foreign key | `<targetClassName>_fk`, camelCase | `reference_fk` |')
A('| Self-reference FK | `parent<ClassName>_fk` | `parentEvent_fk` |')
A('| Ordinary column | `term_localName` verbatim (camelCase) | `objectClassificationName` |')
A('| Field `title` | Title Case, key suffix | `Object Group (Primary Key)` |')
A('')
A('## Table inventory')
A('')
A('%d tables: %d core (one per Latimer Core class) and %d junction.'
  % (len(classes) + len(junctions), len(classes), len(junctions)))
A('')
A('### Core tables')
A('')
A('| Latimer Core class | Table | Primary key | Columns | Note |')
A('| -- | -- | -- | -- | -- |')
NOTE = {'RecordLevel': 'dataset root', 'LatimerCoreScheme': 'scheme root - issue 1'}
for c in classes:
    A('| `%s` | `%s` | `%s_pk` | %d | %s |' % (c, kebab(c), camel(c), ncols[c], NOTE.get(c, '')))
A('')
A('### Junction tables')
A('')
A('Each holds exactly two foreign keys, both required. No payload columns.')
A('')
A('| Table | Parent FK | Target FK | From Latimer Core property |')
A('| -- | -- | -- | -- |')
for parent, tgt, term in sorted(junctions):
    A('| `%s-%s` | `%s_fk` -> `%s.%s_pk` | `%s_fk` -> `%s.%s_pk` | `%s.%s` |'
      % (kebab(parent), kebab(tgt), camel(parent), kebab(parent), camel(parent),
         camel(tgt), kebab(tgt), camel(tgt), parent, term))
A('')
A('## Property -> column')
A('')
A('`key` is the value for the `key` column of `ltc-dp-fields.csv`; blank means an ordinary field.')
A('`ns` is the source namespace, which determines how the term IRI is resolved.')
A('A relation shown as *junction* has no column on this table; see the junction inventory above.')
A('')

for c in classes:
    A('### %s -> `%s`' % (c, kebab(c)))
    A('')
    A('| Latimer Core term | ns | Column | Type | key | References | Req |')
    A('| -- | -- | -- | -- | -- | -- | -- |')
    A('| _(minted)_ | ltc | `%s_pk` | string | pk | | Yes |' % camel(c))
    for col, tgt, src in sorted(extra[c]):
        A('| `%s` | ltc | `%s` | string | fk | `%s.%s_pk` | |' % (src, col, kebab(tgt), camel(tgt)))
    for p in sorted(byclass[c], key=lambda r: r['term_localName']):
        t = p['term_localName']
        ns = p['namespace'].strip().rstrip(':')
        d = dts.get((c, t), '')
        req = 'Yes' if p['tdwgutility_required'].strip().lower() == 'yes' else ''
        m = re.match(r'array<ltc:(\w+)>', d or '')
        if m:
            tgt = m.group(1)
            s = shape(c, tgt)
            if s == JUNCTION:
                A('| `%s` | %s | _junction_ | | | `%s-%s` | %s |'
                  % (t, ns, kebab(c), kebab(tgt), req))
            elif s == DIRECT_CHILD:
                A('| `%s` | %s | _FK on child_ | | | `%s.%s_fk` | %s |'
                  % (t, ns, kebab(tgt), camel(c), req))
            # SELF and DIRECT_PARENT already rendered above as an extra column
        else:
            A('| `%s` | %s | `%s` | %s | | | %s |' % (t, ns, t, TYPEMAP.get(d, 'string'), req))
    A('')

A('## Relation summary')
A('')
A('%d relations: %d as junction tables, %d as direct foreign keys.'
  % (len(rel), len(junctions), len(rel) - len(junctions)))
A('')
A('| Target class | Parent classes | Resolution |')
A('| -- | -- | -- |')
byt = collections.defaultdict(list)
for parent, term, tgt in rel:
    byt[tgt].append(parent)
for tgt in sorted(byt, key=lambda k: (-len(parents_of[k]), k)):
    n = len(parents_of[tgt])
    if n >= 2:
        how = '%d junction tables' % n
    elif tgt in FK_ON_PARENT:
        how = 'direct FK on `%s`' % kebab(list(parents_of[tgt])[0])
    elif n == 1:
        how = 'direct FK on `%s`' % kebab(tgt)
    else:
        how = 'root - no incoming relation'
    if any(p == tgt for p in byt[tgt]):
        how += ' + self-reference'
    A('| `%s` | %d | %s |' % (tgt, n, how))
A('')
A('Self-references: %s.'
  % ', '.join('`%s.%s`' % (kebab(p), camel(t[3:]) + '_fk') for p, t, g in rel if p == g))
A('')
A('## Source data defects')
A('')
A('Found while generating this mapping. Fix in `source/terms/` before the build is finalised.')
A('')
A('| Class | Term | Issue |')
A('| -- | -- | -- |')
A('| Reference | `resourceIRI` | `ltc_datatypes.csv` still lists this as `abcd:resourceURI`; '
  '`ltc_terms_source.csv` has `ltc:resourceIRI`. Datatype assumed `string`. |')
A('| ObjectClassification | `hasParentObjectClassification` | Not in `source/rs.tdwg.org/ltc.csv` '
  '(published there as `hasObjectClassification`). No IRI. |')
A('| ResourceRelationship | `hasMeasurementOrFact` | Not in `source/rs.tdwg.org/ltc.csv`. No IRI. |')
A('| ResourceRelationship | `relatedResourceType` | Not in `source/rs.tdwg.org/ltc.csv`. No IRI. |')
A('| _(all)_ | `has*` | `tdwgutility_repeatable` is `No` on every `has*` property, contradicting '
  'both the definition ("one or more") and the `array<ltc:Class>` datatype. Under the child-table '
  'model the definition is authoritative; correct the source data to `Yes`. |')
A('')

open(OUT, 'w', encoding='utf-8').write('\n'.join(L) + '\n')
print('wrote %s' % OUT)
print('  core tables      %d' % len(classes))
print('  junction tables  %d' % len(junctions))
print('  total tables     %d' % (len(classes) + len(junctions)))
print('  relations        %d (%d junction, %d direct FK)'
      % (len(rel), len(junctions), len(rel) - len(junctions)))
