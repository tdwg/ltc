# Latimer Core DP — `ltc-dp` versus `ltc-dp-collapsed`

> 2026-09-09
> ltc-dp-collapsed.md
> ltc

Two generated packages sit side by side under `data-package/ltc/`. They describe the same 25
Latimer Core classes with the same 131 property columns; they differ only in how a relation
between two classes is expressed, and therefore in their key columns and table count.

| | `ltc-dp` | `ltc-dp-collapsed` |
| -- | -- | -- |
| Tables | 106 — 25 entity + 81 junction | 25 entity |
| Foreign keys | 178 | 97 |
| Relation with one parent class | direct FK on the child (`chronometric-age.objectGroup_fk`) | same |
| Relation with several parent classes | junction table `<parent>-<target>` | one optional `<parent>_fk` column per parent on the target |
| Cardinality of a relation | many-to-many | one-to-many |
| A target row can belong to | any number of parents | exactly one parent |
| Pattern | Darwin Core DP child tables (`open-issues.md`, Issue 2, option B) | Latimer Core class = table |
| Source vocabularies | `vocabulary/ltc-dp-*.csv` | `vocabulary/ltc-dp-collapsed-*.csv` (derived) |
| Identifier base | `http://rs.tdwg.org/ltc/ltc-dp` | `http://rs.tdwg.org/ltc/ltc-dp-collapsed` |
| PostgreSQL schema | `ltc-dp.sql` → schema `ltc_dp` | `ltc-dp-collapsed.sql` → schema `ltc_dp_collapsed` |

`ltc-dp` is the package built under the preliminary decisions in `open-issues.md`.
`ltc-dp-collapsed` is derived from it mechanically by `src/build-collapsed.py`; nothing in it is
hand-edited, and it is regenerated from the `ltc-dp` vocabularies whenever they change.

---

## The transformation

Every junction table in `ltc-dp` has the same shape: two required foreign keys and no payload.

```
person-address
  person_fk   -> person.person_pk      (parent)
  address_fk  -> address.address_pk    (target)
```

`ltc-dp-collapsed` deletes the junction table and moves the parent key onto the target:

```
address
  address_pk
  organisationalUnit_fk  -> organisational-unit    (optional)
  person_fk              -> person                 (optional)
  personRole_fk          -> person-role            (optional)
  storageLocation_fk     -> storage-location       (optional)
  addressCountry ...
```

So `person`, `person-address`, `person-contact-detail`, `person-identifier`,
`person-measurement-or-fact` and `person-reference` become the single table `person`. The `person`
table itself is unchanged: it is the *one* side of each relation, and the address, contact detail,
identifier, measurement and reference rows now point back to it.

The 16 direct foreign keys that `ltc-dp` already had are carried over unchanged: the ten
`<child>.<parent>_fk` keys where the target has a single parent (eight pointing at
`object-group`, two at `latimer-core-scheme`), the four `parent<Class>_fk` self references, and
`person-role.person_fk` / `person-role.role_fk`.

### Field metadata on the new keys

A collapsed key keeps the conventions of `ltc-dp`'s existing direct keys such as
`chronometric-age.objectGroup_fk`:

| Property | Taken from | Example (`address.person_fk`) |
| -- | -- | -- |
| `name`, `title`, `description` | the junction's parent key | `person_fk`, "Person (Foreign Key)", "An identifier for an ltc:Person." |
| `dcterms:isVersionOf`, `dcterms:references`, `rdfs:comment` | the junction's target key, i.e. the Latimer Core relation property | `http://rs.tdwg.org/ltc/terms/hasAddress` |
| `predicate` | — | `for` |
| `constraints.required` | — | `false` |
| `comments` | parent key + note | "… Optional: a row belongs to exactly one parent, so populate exactly one of this table's parent foreign keys." |

### Keys added per table

| Target table | Added | Parent foreign keys |
| -- | --: | -- |
| `identifier` | 23 | every other table except `temporal-coverage`: `address`, `chronometric-age`, `collection-status-history`, `contact-detail`, `ecological-context`, `event`, `geographic-context`, `geological-context`, `latimer-core-scheme`, `measurement-or-fact`, `object-classification`, `object-group`, `organisational-unit`, `person`, `person-role`, `record-level`, `reference`, `resource-relationship`, `role`, `scheme-measurement-or-fact`, `scheme-term`, `storage-location`, `taxon` |
| `reference` | 21 | `chronometric-age`, `collection-status-history`, `ecological-context`, `event`, `geographic-context`, `geological-context`, `identifier`, `latimer-core-scheme`, `measurement-or-fact`, `object-classification`, `object-group`, `organisational-unit`, `person`, `person-role`, `record-level`, `resource-relationship`, `scheme-measurement-or-fact`, `scheme-term`, `storage-location`, `taxon`, `temporal-coverage` |
| `measurement-or-fact` | 15 | `chronometric-age`, `collection-status-history`, `ecological-context`, `event`, `geographic-context`, `geological-context`, `object-classification`, `object-group`, `organisational-unit`, `person`, `person-role`, `resource-relationship`, `storage-location`, `taxon`, `temporal-coverage` |
| `address` | 4 | `organisational-unit`, `person`, `person-role`, `storage-location` |
| `person-role` | 4 | `event`, `object-group`, `organisational-unit`, `record-level` |
| `contact-detail` | 3 | `organisational-unit`, `person`, `person-role` |
| `temporal-coverage` | 3 | `collection-status-history`, `event`, `person-role` |
| `ecological-context` | 2 | `event`, `object-group` |
| `geographic-context` | 2 | `event`, `object-group` |
| `object-group` | 2 | `latimer-core-scheme`, `record-level` |
| `resource-relationship` | 2 | `object-group`, `record-level` |
| the other 14 tables | 0 | — |

The `identifier` ↔ `reference` cycle survives the collapse: `identifier.reference_fk` and
`reference.identifier_fk` both exist, and both are optional.

---

## What changes for a publisher

**Sharing.** In `ltc-dp` one `address` row can be attached to a person and to an organisational
unit at the same time through two junction rows. In `ltc-dp-collapsed` it cannot; the address is
duplicated, once per owner. The same applies to every identifier, reference and measurement. For
collections data this is the common case — an identifier is minted for one thing — but it is a real
loss of expressiveness and the reason `ltc-dp` was preferred in `open-issues.md`.

**The one-parent rule.** On a collapsed target exactly one of the parent keys must be populated.
The Data Package v1 spec has no constraint for "exactly one of these fields", so the rule lives in
the field comments and in the SQL only as documentation. Validators will accept a row with zero or
two parents set; a publisher's pipeline has to check it.

**Fewer files, wider tables.** A publisher ships 25 CSV files instead of 106, and never has to
assemble a junction file. In return `identifier` carries 23 mostly-empty key columns, `reference`
21 and `measurement-or-fact` 15.

**Queries.** Following a relation needs one join instead of two:

```sql
-- ltc-dp: identifiers of a person
SELECT i.*
FROM ltc_dp.person p
JOIN ltc_dp.person_identifier pi ON pi."person_fk" = p."person_pk"
JOIN ltc_dp.identifier i         ON i."identifier_pk" = pi."identifier_fk";

-- ltc-dp-collapsed
SELECT i.*
FROM ltc_dp_collapsed.person p
JOIN ltc_dp_collapsed.identifier i ON i."person_fk" = p."person_pk";
```

**Alignment with Darwin Core DP.** `ltc-dp` is structurally identical to DwC-DP, so a tool that
understands one understands the other. `ltc-dp-collapsed` is closer to the Latimer Core class
model (one class, one table) and to how most collection management systems store the data, but it
is a pattern DwC-DP does not use.

---

## Relationship to the open modelling issues

`open-issues.md`, Issue 2, asks how a many-valued Latimer Core relation should be represented and
lists options A–D. `ltc-dp-collapsed` is a fifth option that was not on that list: keep 25 tables
(like option A) but obtain one-to-many by putting the key on the *target* rather than on the parent
(unlike option A, which capped every relation at one value). Its cost is the loss of many-to-many
sharing described above. Both packages are generated from the same vocabulary, so the group can
compare them directly; whichever is adopted, the other can be dropped without touching the source.

---

## Diagrams

`src/build-erd-collapsed.py` draws the collapsed package in crow's-foot notation (table names only,
no columns) and writes four versions to `docs/diagrams/`:

| File | Content |
| -- | -- |
| `ltc-dp-collapsed-erd.svg` / `.png` | All 25 tables and all 97 relations. Tables step down a diagonal so every table has a free lane above, below and to its right; `measurement-or-fact`, `identifier` and `reference` are drawn as bars along the top, bottom and right so their 59 incoming relations are straight lines that cross no table. |
| `ltc-dp-collapsed-erd-slide.svg` / `.png` | 16:9 presentation version: the 22 entity tables and their 38 relations, with the three cross-cutting tables summarised in a strip. |
| `ltc-dp-collapsed-erd-grouped.svg` / `.png` | 16:9 version with the tables grouped by theme: collection, scope and context, agents, scheme, cross-cutting. Positions inside each group are chosen by a small annealer so that no relation line passes through a table. |
| `ltc-dp-collapsed-erd-plain.svg` / `.png` | The slide layout without crow's-foot notation: plain connectors only, for audiences who do not read ERDs. |

All connectors are orthogonal (elbow) lines that leave and enter a table perpendicular to its edge, so
every crow's-foot mark sits flush against its table. The same diagrams exist in Lucidchart with every
connector attached to its two tables, so tables can be moved without breaking the relations:

- [complete diagram](https://lucid.app/lucidchart/6cc9e796-d9a3-4aca-ab94-a11528af5f80/edit)
- [presentation slide](https://lucid.app/lucidchart/25ed6421-0763-49db-bee4-1a162cb56c28/edit)
- [tables grouped by theme](https://lucid.app/lucidchart/c56093c0-daee-446b-a0a1-bee5f6f02207/edit)
- [plain version without crow's-foot notation](https://lucid.app/lucidchart/a20911fc-75b2-427f-aa05-3c99907dc2bd/edit)

## Files and regeneration

```
data-package/ltc/
├── vocabulary/
│   ├── ltc-dp-tables.csv              # source of truth (build-vocabulary.py)
│   ├── ltc-dp-fields.csv
│   ├── ltc-dp-collapsed-tables.csv    # derived (build-collapsed.py)
│   └── ltc-dp-collapsed-fields.csv
├── ltc-dp/                            # 106 table schemas
├── ltc-dp-collapsed/                  # 25 table schemas
├── ltc-dp.sql
└── ltc-dp-collapsed.sql
```

```
python src/build-vocabulary.py                        # ltc-dp vocabularies
python src/build-schemas.py                           # ltc-dp/
python src/build-collapsed.py                         # ltc-dp-collapsed vocabularies + ltc-dp-collapsed/
python src/build-sql.py                               # ltc-dp.sql
python src/build-sql.py --package ltc-dp-collapsed    # ltc-dp-collapsed.sql
```

`build-collapsed.py` asserts that every junction table has exactly two keys and is named
`<parent>-<target>`, and that no added key collides with an existing column. If a future change to
`ltc-dp` breaks one of those assumptions the build stops rather than producing a silently different
package.
