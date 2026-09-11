# Latimer Core DP — Open Modelling Issues

> 2026-08-31
> open-issues.md
> ltc

Two modelling decisions cannot be made mechanically from the Latimer Core term source. Both change
the shape of the generated package and remain **open for group deliberation**.

A **preliminary decision** has been recorded for each so that build work can proceed. Those
decisions are implemented in `ltc-term-mapping.md` and `instructions.md`. They are provisional: if
the group rules differently, regenerate the mapping with `python data-package/ltc/src/build-mapping.py`
after amending the rules in that script.

| Issue | Preliminary decision | Status |
| -- | -- | -- |
| 1. `LatimerCoreScheme` placement | Keep it as a table | Open for deliberation |
| 2. Relation cardinality | Follow the Darwin Core DP child-table pattern | Open for deliberation |

---

## Issue 1 — Where do `LatimerCoreScheme` and its dependent classes live?

### Context

`LatimerCoreScheme` describes the *scheme* a dataset conforms to, not the data itself. Its `range`
in `ltc_categories.csv` is empty, meaning no class contains it. One reading is that it therefore
belongs in `datapackage.json` as package-level metadata rather than as a table.

That works for its three scalar properties, but it leaves five relations with no parent table:

| Property | Target class | Also reachable from |
| -- | -- | -- |
| `hasSchemeTerm` | `SchemeTerm` | nowhere else |
| `hasSchemeMeasurementOrFact` | `SchemeMeasurementOrFact` | nowhere else |
| `hasObjectGroup` | `ObjectGroup` | `RecordLevel.hasObjectGroup` |
| `hasIdentifier` | `Identifier` | 22 other classes |
| `hasReference` | `Reference` | 20 other classes |

`SchemeTerm` and `SchemeMeasurementOrFact` exist **only** to be referenced by `LatimerCoreScheme`.
If it is not a table, those two classes become unreachable — orphan tables no foreign key points at.

### Options

**A. `LatimerCoreScheme` stays a table.** 25 core tables. `latimer-core-scheme` is the root of a
scheme-definition sub-graph (`scheme-term`, `scheme-measurement-or-fact`), and `record-level` remains
the root of the data. `datapackage.json` may optionally mirror `schemeName`, `basisOfScheme`, and
`isDistinctObjects` as convenience metadata.
*Cost:* two roots in one package; the scheme sub-graph is structurally unlike anything in DwC-DP.

**B. `LatimerCoreScheme` becomes `datapackage.json` metadata; its relations move to `RecordLevel`.**
24 core tables. `record-level` gains links to `scheme-term` and `scheme-measurement-or-fact`.
*Cost:* the scheme definition and the data conforming to it are conflated on one row, so a package
can express only one scheme.

**C. `LatimerCoreScheme` becomes metadata; `SchemeTerm` and `SchemeMeasurementOrFact` are dropped
from LtC-DP.** 22 core tables. Scheme conformance is expressed in `datapackage.json` and in the
profile — arguably what a Frictionless profile is *for*.
*Cost:* loses the ability to publish a scheme definition as data.

### Preliminary decision — Option A

`LatimerCoreScheme` is a table, so `SchemeMeasurementOrFact` and `SchemeTerm` are not orphaned.
A scheme is something a package *contains*.

### Still to settle

Confirm that a scheme is something a package contains rather than something it conforms to. If the
group takes the "conforms to" view, is a Frictionless profile the right expression of it — which
would make `SchemeTerm` and `SchemeMeasurementOrFact` redundant in the data package context, even
though they remain valid Latimer Core classes?

---

## Issue 2 — Can a Latimer Core relation hold more than one value?

### Context

Every relation in Latimer Core is a `has<Class>` property on the **parent**, defined as "refers to
**one or more** related instances of the X class" with datatype `array<ltc:Class>`.

Mapping each `has*` property to a single foreign-key column on the parent table would cap every
relation at one-to-one and contradict the definitions. That is not a corner case:

| Target | Referenced by | Realistic multiplicity |
| -- | -- | -- |
| `Identifier` | 23 classes | An `ObjectGroup` routinely has several — a local code, a GRSciColl ID, a ROR, a Wikidata Q-number |
| `Reference` | 21 classes | A `CollectionStatusHistory` entry can cite several documents |
| `MeasurementOrFact` | 15 classes | An `ObjectGroup` has many measurements by definition |
| `PersonRole` | 4 classes | An `ObjectGroup` has many staff in many roles |

The source data is itself contradictory: `tdwgutility_repeatable` is `No` on every `has*` property
except `PersonRole.hasRole` and `Role.hasIdentifier`, while the definition and the datatype both say
many. Whichever option is chosen, `ltc_terms_source.csv` should be corrected to match.

### Options

**A. Accept one-to-one for v0.1.** 25 tables, one FK column per relation. Simplest to generate.
*Cost:* the package cannot represent an object group with two identifiers. Publishers will hit this
immediately, and fixing it later is a breaking schema change.

**B. Darwin Core DP child tables.** The FK moves off the parent; relations become junction tables or
a direct FK on the child, exactly as DwC-DP does. 106 tables.
*Cost:* large table count; one Latimer Core class no longer equals one table.
*Benefit:* full one-to-many, and structurally identical to DwC-DP.

**C. Junction tables for every relation.** Uniform but diverges from DwC-DP, which uses a direct FK
where a child has a single parent class.

**D. Hybrid** — child tables only for the four high-fan-out targets.
*Cost:* two patterns to explain.

**E. One-to-many by a key on the target.** 25 tables. Where a target class has several parent
classes, the target carries one optional `<parent>_fk` per parent (23 on `identifier`) and exactly
one is populated per row. Implemented as the derived package `ltc-dp-collapsed`; see
`ltc-dp-collapsed.md`.
*Cost:* a target row belongs to one parent only — an address or identifier shared by two owners
must be duplicated — and the one-parent rule cannot be expressed as a Data Package constraint.
*Benefit:* one Latimer Core class equals one table, one join per relation, 25 files to publish.

### Preliminary decision — Option B

Use the Darwin Core DP child-table pattern. Where Darwin Core DP has already solved a problem, use
its solution. LtC-DP and DwC-DP will be used by the same community in the same domain, so a shared
solution is easier for that community to understand. The difference between the two packages should
be minimised: understanding the structure of one should mean understanding the structure of the other.

This yields **106 tables** — 25 core, 81 junction — resolving all 97 relations. The rules and the
DwC-DP precedent for each are documented in `ltc-term-mapping.md`.

### Consequence worth the group's attention

Darwin Core DP has a fourth pattern this decision cannot use. A *leaf* attribute bundle is inlined
into a one-FK child table: `agent-identifier` carries the identifier fields directly and DwC-DP has
no `identifier` table at all.

**No Latimer Core class is a leaf.** All 25 carry at least one `has*` relation of their own, and a
table with no primary key cannot be referenced, so every class needs a `_pk` and the inlining
pattern has no applicable case. `Identifier` is the clearest example: it carries `hasReference`.

If Latimer Core dropped `Identifier.hasReference`, `Identifier` would become a leaf and could be
inlined exactly as DwC-DP does — removing the `identifier` table and turning 23 junction tables into
23 inlined child tables, a closer match to DwC-DP. The same argument applies to `MeasurementOrFact`
(DwC-DP inlines `assertion`) and `Taxon` (DwC-DP inlines `identification-taxon`).

That is a Latimer Core question, not a data package question, but it is the single largest remaining
source of divergence between the two packages. **Should it be raised against Latimer Core itself?**

### Still to settle

Related: DwC-DP also carries a *world-unique* key alongside the package-local one (`agentID` next to
`agent_pk`) so records survive aggregation across datasets. Latimer Core defines no per-class
identifier property, and LtC-DP currently mints package-local keys only. Should LtC-DP adopt the
`wpk`/`wfk` pattern, and if so, do those identifier properties need to be added to Latimer Core?

---

## What a revised decision would change

| | Issue 1 | Issue 2 |
| -- | -- | -- |
| Core tables | 22, 24, or 25 | 25 |
| Total tables | ±3 | 25, ~88, or 106 |
| Affects `ltc-dp-tables.csv` | yes | yes |
| Affects `ltc-dp-fields.csv` | yes | yes |
| Affects `ltc-dp-profile.json` resource enum | yes | yes |
| Affects `ltc-term-mapping.md` | yes | yes |
| Requires a change to Latimer Core itself | only under option C | only under the leaf-class and `wpk` questions |

Both feed the same generation step, so they are best revisited together.
