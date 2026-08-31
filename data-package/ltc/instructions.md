# Latimer Core DP — Build Instructions
> 2026-08-31
> instructions.md
> ltc

## Goal

Produce a Frictionless Data Package implementation of Latimer Core (LtC-DP) that mirrors
Darwin Core DP (DwC-DP) in structure, file layout, and conventions. DwC-DP is the reference
implementation and lives under `data-package/dwc-dp`.

Target specification: **Frictionless Data Package v1** (https://specs.frictionlessdata.io/).
Local copies of the v1 schemas are in `data-package/data-package-schemas/v1/schemas/`.

## Inputs

| File | Provides | Location |
| -- | -- | -- |
| `ltc_terms_source.csv` | 25 classes + 228 properties: label, definition, usage, notes, examples, `rdf_type`, `tdwgutility_organizedInClass`, required, repeatable, namespace, created/modified | `data-package/ltc/source/` |
| `ltc_datatypes.csv` | Per-property datatype: `string`, `number`, `boolean`, `list`, `array<ltc:Class>` | `source/terms/` |
| `ltc_categories.csv` | Per-class `range` (which classes may contain it) and `class_level_properties` | `source/terms/` |
| `ltc_namespaces.csv` | CURIE prefix → base IRI | `source/terms/` |
| `ltc.csv`, `ltc-versions.csv` | Published LtC term IRIs and version IRIs | `source/rs.tdwg.org/` |
| `dwc-dp-fields.csv` | Authoritative `dcterms:isVersionOf` / `dcterms:references` pairs for borrowed `dwc`, `chrono`, and `dcterms` terms | `data-package/dwc-dp/vocabulary/` |

`ltc_terms_source.csv` alone is **not** sufficient — it carries no datatype and no term IRI.
The generators in `src/` read the other files in place; all paths are relative to the repository root.

A row is a **class** when `rdf_type` = `http://www.w3.org/2000/01/rdf-schema#Class`, otherwise a
**property**. Properties are assigned to a class by `tdwgutility_organizedInClass`; the same
property name (e.g. `hasIdentifier`) recurs across many classes, so the unique key for a property
row is `(tdwgutility_organizedInClass, term_localName)`.

## Reference implementation

Study these before generating anything:

```
data-package/dwc-dp/
├── vocabulary/
│   ├── dwc-dp-tables.csv     # one row per table
│   └── dwc-dp-fields.csv     # one row per field, incl. key/FK metadata
└── dwc-dp/
    ├── dwc-dp-profile.json   # JSON Schema draft-04 profile; enumerates resource names
    ├── index.json            # catalogue of all table schemas
    ├── version.json
    └── table-schemas/*.json  # one file per table
```

## Output

Mirror that layout exactly:

```
data-package/ltc/
├── source/
│   └── ltc_terms_source.csv     # input
├── src/
│   ├── build-mapping.py         # generates ltc-term-mapping.md
│   ├── build-vocabulary.py      # generates the two vocabulary files
│   └── build-schemas.py         # generates everything under ltc-dp/
├── vocabulary/
│   ├── ltc-dp-tables.csv        # 106 rows
│   └── ltc-dp-fields.csv        # 334 rows
└── ltc-dp/
    ├── ltc-dp-profile.json
    ├── index.json
    ├── version.json
    └── table-schemas/*.json     # 106 files
```

## Data model

**Minimise the difference between LtC-DP and DwC-DP.** The two packages serve the same community in
the same domain, so understanding the structure of one should mean understanding the structure of
the other. Where DwC-DP has already solved a structural problem, use its solution. When this document
is silent, the answer is whatever `data-package/dwc-dp` does.

The full class-to-table and property-to-column mapping is in **`ltc-term-mapping.md`** — 106 tables,
253 mapped terms, 97 relations. Build `ltc-dp-fields.csv` to reproduce it exactly. Regenerate it with
`python data-package/ltc/src/build-mapping.py`.

**One core table per Latimer Core class**, 25 in all, each with a minted `<className>_pk` since no
Latimer Core class defines an identifier of its own. **`RecordLevel` is the dataset root**; DwC-DP
has no equivalent.

**Relations resolve four ways**, matching DwC-DP. The target class is the one named in the property's
`array<ltc:Class>` datatype in `ltc_datatypes.csv` — never parsed from the property name
(`Event.hasParentEvent` is `array<ltc:Event>` → `Event`).

| When | Result | DwC-DP precedent |
| -- | -- | -- |
| Target class has exactly one parent class | Direct FK on the child: `<target>.<parent>_fk` | `chronometric-age.event_fk` |
| Target class has two or more parent classes | Junction table `<parent>-<target>`, two FKs, no payload | `event-reference`, `material-media` |
| A class references itself | `parent<Class>_fk` on the same table | `organism-relationship.subjectOrganism_fk` |
| `PersonRole` → `Person`, `PersonRole` → `Role` | FK on `person-role`, not on the target | `*-agent-role` holds `agent_fk` |

This yields 25 core tables and 81 junction tables. Four self-references exist: `hasParentEvent`,
`hasParentObjectClassification`, `hasParentOrganisationalUnit`, `hasParentStorageLocation`.

**DwC-DP's inlining pattern has no applicable case here.** DwC-DP inlines a leaf attribute bundle
into a one-FK child table — `agent-identifier` carries the identifier fields directly and there is no
`identifier` table. No Latimer Core class is a leaf: all 25 carry at least one `has*` relation, and a
table with no primary key cannot be referenced. Do not inline.

### Preliminary decisions

Two modelling decisions are **provisional and still open for group deliberation**, documented in
**`open-issues.md`**. Build against them, but do not treat them as settled, and do not revisit them
during a build — flag anything they block in the build report.

1. **`LatimerCoreScheme` is a table**, so `SchemeTerm` and `SchemeMeasurementOrFact` are not
   orphaned. A scheme is something a package contains.
2. **Relations use the DwC-DP child-table pattern**, so a relation may hold many values.

`ltc-term-mapping.md` implements both. If either is revised, amend the rules in `src/` and rerun both generators.

## Build order

1. **`vocabulary/ltc-dp-tables.csv`** — one row per table, core and junction alike. Reuse the DwC-DP column set verbatim:
   `name,title,description,comments,example,namespace,dcterms:isVersionOf,dcterms:references,rdfs:comment,status,new,ignore`.
   Source `description` from `definition`, `comments` from `notes` + `usage`, `example` from `examples`.
2. **`vocabulary/ltc-dp-fields.csv`** — one row per field. Reuse the DwC-DP column set verbatim:
   `table,name,key,predicate,related_table,related_field,title,description,comments,example,type,format,unique,required,minimum,maximum,namespace,dcterms:isVersionOf,dcterms:references,rdfs:comment,status`.
   This file is the single source of truth for keys and relations — generate it before any JSON.
3. **`ltc-dp/table-schemas/*.json`** — one file per table, derived mechanically from the two vocabularies.
   Mirror the DwC-DP JSON key order exactly: `identifier, url, name, title, description, comments,
   examples, namespace, dcterms:isVersionOf, [dcterms:references], [rdfs:comment], fields,
   [primaryKey], [foreignKeys]`, with fields ordered `name, title, description, comments, examples,
   type, format, namespace, dcterms:isVersionOf, [dcterms:references], rdfs:comment, [constraints]`.
   Omit `dcterms:references` when empty, `rdfs:comment` at table level when empty, and `constraints`
   when neither `required` nor `unique` applies. A self-referencing foreign key names the current
   resource with an empty string (`"resource": ""`), per the v1 spec and `dwc-dp/event.json`.
4. **`ltc-dp/index.json`**, **`ltc-dp/ltc-dp-profile.json`**, **`ltc-dp/version.json`** — derived from
   the table list. Set `version` to `0.1` in both `version.json` and `index.json`.
5. **Build report** — see Deliverables.

## Conventions

**Identifier base** — `http://rs.tdwg.org/ltc/ltc-dp`, following the DwC-DP convention.
Per-table identifiers are `http://rs.tdwg.org/ltc/ltc-dp/<table-name>`.

**Naming** — follow DwC-DP exactly, including its use of upper and lower case. Verify any case
against `data-package/dwc-dp/vocabulary/dwc-dp-fields.csv`.

| Element | Rule | Example |
| -- | -- | -- |
| Table / resource name | kebab-case, all lowercase | `ObjectGroup` → `object-group` |
| Junction table name | `<parent-table>-<target-table>` | `object-group-identifier` |
| Schema file | `<table-name>.json` | `table-schemas/object-group.json` |
| Primary key column | `<className>_pk`, camelCase | `objectGroup_pk`, `measurementOrFact_pk` |
| Foreign key column | `<targetClassName>_fk`, camelCase | `hasReference` → `reference_fk` |
| Self-reference FK column | `parent<ClassName>_fk` | `hasParentEvent` → `parentEvent_fk` |
| Ordinary column | `term_localName` verbatim (camelCase) | `objectClassificationName` |
| Field `title` | Title Case, spaces, key suffix | `Object Group (Primary Key)`, `Reference (Foreign Key)` |
| Table `title` | Title Case, spaces | `Collection Status History` |

Note that a primary key is `objectGroup_pk` with a **lowercase** first letter, matching DwC-DP's
`agent_pk` / `chronometricAge_pk`. Do not use `ObjectGroupID`: in DwC-DP the bare `<name>ID` form
(`agentID`, `mediaID`) is reserved for `wpk` world-unique identifiers, which LtC-DP does not
currently mint — see `open-issues.md` issue 2.

**Keys** — declared in `ltc-dp-fields.csv` via the `key` column:

| `key` | Field name | Meaning |
| -- | -- | -- |
| `pk` | `<className>_pk` | Minted package-local primary key. `required: true`, `unique: true`. |
| `fk` | `<targetClassName>_fk` | Foreign key on the parent. Set `related_table`, `related_field`, `predicate`. |

Foreign keys are emitted in the schema's `foreignKeys` array. A junction table carries two:

```json
"foreignKeys": [
  { "fields": "objectGroup_fk", "predicate": "for",
    "reference": { "resource": "object-group", "fields": "objectGroup_pk" } },
  { "fields": "reference_fk", "predicate": "mentioned in",
    "reference": { "resource": "reference", "fields": "reference_pk" } }
]
```

**Field types** — from `ltc_datatypes.csv`:

| LtC datatype | Table Schema `type` |
| -- | -- |
| `string` | `string` |
| `number` | `number` |
| `boolean` | `boolean` |
| `list` | `array` — a JSON array, per the v1 Table Schema types (https://specs.frictionlessdata.io/table-schema/#types-and-formats) |
| `array<ltc:Class>` | `string` — a foreign key, not a container |

`format` is always `default`.

**Constraints** — `tdwgutility_required` = `Yes` → `constraints.required: true`. Omit the
`constraints` object entirely when neither `required` nor `unique` applies.

### IRIs

Every field requires `dcterms:isVersionOf`; the LtC-DP profile must enforce this, as the DwC-DP
profile does. Resolve each field by its `namespace` in `ltc_terms_source.csv`:

**`ltc:` terms** — minted in the LtC namespace:

- `namespace` = `ltc`
- `dcterms:isVersionOf` = `http://rs.tdwg.org/ltc/terms/<term_localName>`
- `dcterms:references` = `http://rs.tdwg.org/ltc/terms/version/<term_localName>-<term_created>`

**Borrowed terms (`dwc`, `schema`, `chrono`, `dcterms`, `abcd`)** — keep the *source* namespace and
the *source* URI. Do not mint LtC IRIs for them. Resolve in this order:

1. Look up `term_localName` in `data-package/dwc-dp/vocabulary/dwc-dp-fields.csv` and copy its
   `namespace`, `dcterms:isVersionOf`, `dcterms:references`, and `rdfs:comment`. This resolves 46 of
   the 63 borrowed terms (35 `dwc`, 8 `chrono`, 3 `dcterms`).
2. Otherwise construct `<base IRI from ltc_namespaces.csv> + <term_localName>` — e.g.
   `schema` → `https://schema.org/streetAddress`, `dwc` → `http://rs.tdwg.org/dwc/terms/measurementType`.
   Leave `dcterms:references` empty when no version IRI is known. This covers the 9 `schema` terms
   and the 7 unmatched `dwc` terms (`measurementAccuracy`, `measurementMethod`, `measurementRemarks`,
   `measurementType`, `measurementUnit`, `measurementValue`, `resourceID`).
3. If a term cannot be reconciled to an existing vocabulary, leave the IRI empty and **list it in the
   build report for manual completion**. Currently one term falls here: `abcd:fullName`.

**Unpublished LtC terms** — three terms in `ltc_terms_source.csv` have no IRI in
`source/rs.tdwg.org/ltc.csv`: `ObjectClassification.hasParentObjectClassification` (published as
`hasObjectClassification`), `ResourceRelationship.hasMeasurementOrFact`, and
`ResourceRelationship.relatedResourceType`. Use DwC-DP's placeholder form,
`http://example.com/term-pending/<name>`, and list them in the build report.

#### Example 1 — a borrowed `dwc` term (`lifeStage` in DwC-DP `occurrence.json`)

```json
{
  "name": "lifeStage",
  "title": "Life Stage",
  "description": "An age class or life stage of a dwc:Organism.",
  "comments": "Recommended best practice is to use a controlled vocabulary. This term has an equivalent in the dwciri: namespace that allows only an IRI as a value, whereas this term allows for any string literal value.",
  "examples": "`zygote`; `larva`; `juvenile`; `adult`; `seedling`; `flowering`; `fruiting`",
  "type": "string",
  "format": "default",
  "namespace": "dwc",
  "dcterms:isVersionOf": "http://rs.tdwg.org/dwc/terms/lifeStage",
  "dcterms:references": "http://rs.tdwg.org/dwc/terms/version/lifeStage-2026-05-26",
  "rdfs:comment": "An age class or life stage of a dwc:Organism."
}
```

#### Example 2 — a borrowed `dcterms` term with no version IRI (`mediaID` in DwC-DP `media.json`)

```json
{
  "name": "mediaID",
  "title": "Media ID",
  "description": "An identifier for an ac:Media resource.",
  "comments": "The value in this field MUST be preserved in aggregation. Recommended best practice is to use a globally unique identifier.",
  "examples": "",
  "type": "string",
  "format": "default",
  "namespace": "dcterms",
  "dcterms:isVersionOf": "http://purl.org/dc/terms/identifier",
  "rdfs:comment": "An unambiguous reference to the resource within a given context."
}
```

## Validation

The package must validate against the Frictionless **v1** spec and against `ltc-dp-profile.json`.
Use the venv in `data-package/.venv-ltc-data-package` (launch via `init.bat`) against the local v1
schemas in `data-package/data-package-schemas/v1/schemas/`. Do not use v2 tooling.

`table-schema.json` references `schemas/dictionary.json` by relative path, so a bare
`jsonschema` call cannot resolve it. Build a `referencing` registry over the whole local
`schemas/` directory first, then validate each file with `Draft4Validator`.

Current status: all 106 table schemas validate against the v1 Table Schema spec, matching the
DwC-DP reference implementation.

## Deliverables

Alongside the package files, produce a build report listing:

- Borrowed terms that could not be reconciled to a source vocabulary IRI.
- LtC terms emitted with a `term-pending` placeholder IRI.
- The `identifier` ↔ `reference` mutual-reference cycle (via `identifier-reference` and `reference-identifier`), and any others found.
- Anything blocked by an unresolved item in `open-issues.md`.

---

## Companion documents

| File | Purpose |
| -- | -- |
| `ltc-term-mapping.md` | Class → table and property → column mapping for all 253 terms across 106 tables. The target that `ltc-dp-fields.csv` must reproduce, plus a list of source data defects. Generated — do not hand-edit. |
| `src/build-mapping.py` | Generates `ltc-term-mapping.md`. Run from the repository root. Amend and rerun if a preliminary decision changes. |
| `src/build-vocabulary.py` | Generates `vocabulary/ltc-dp-tables.csv` and `vocabulary/ltc-dp-fields.csv`. Run from the repository root. |
| `src/build-schemas.py` | Generates `ltc-dp/table-schemas/*.json`, `index.json`, `ltc-dp-profile.json`, `version.json` from the two vocabulary files. Run after `build-vocabulary.py`. |
| `open-issues.md` | The two preliminary decisions, still open for group deliberation. Not to be decided during a build. |

## Decision log

| # | Question | Resolution |
| -- | -- | -- |
| 1 | Relational model for `has*` relations | DwC-DP child-table pattern: junction table, or direct FK on the child where the target has one parent class. 25 core + 81 junction tables. **Preliminary** — `open-issues.md` #2. |
| 2 | Package root | `RecordLevel` is the dataset root; `LatimerCoreScheme` is a table. **Preliminary** — `open-issues.md` #1. |
| 3 | `list` datatype | Table Schema `array` type — a JSON array, per the v1 spec. |
| 4 | Cardinality contradiction | The definition and datatype are authoritative: relations are many-valued. Correct `tdwgutility_repeatable` to `Yes` on every `has*` property in the source. |
| 5 | Frictionless version | v1. All v2 references removed; the v2 schema folder was deleted. |
| 6 | Borrowed terms | Keep the source namespace and source URI; do not mint LtC IRIs. Report anything unreconcilable. |
| 7 | Directory and version | `vocabulary/` (singular); version `0.1`; identifier base `http://rs.tdwg.org/ltc/ltc-dp`. |
| 8 | Camtrap DP reference | Resolved — DwC-DP is the sole reference implementation. |
| 9 | Key naming | DwC-DP conventions throughout: `<className>_pk` / `<targetClassName>_fk`, kebab-case table names, camelCase columns. See Conventions. |

## Housekeeping

`data-package/README.md` still credits Camtrap DP as an included reference implementation (line 7)
though the directory is absent. Update the sentence.
