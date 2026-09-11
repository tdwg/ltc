"""Derive the collapsed Latimer Core Data Package (ltc-dp-collapsed) from ltc-dp.

ltc-dp resolves a relation whose target class has several parent classes with a
junction table <parent>-<target> (two foreign keys, no primary key). This script
removes every junction table and instead adds a nullable foreign key
<parent>_fk to the target table, so each many-to-many relation becomes a
one-to-many relation and the package keeps only the 25 entity tables. For
example person-address, person-contact-detail, person-identifier,
person-measurement-or-fact and person-reference disappear, and address,
contact-detail, identifier, measurement-or-fact and reference each gain a
person_fk column.

A target table that can hang off several parents therefore carries one optional
foreign key per parent (identifier gets 23). Exactly one of them is populated on
any given row; that rule is stated in the field comments because the Data Package
v1 spec cannot express it as a constraint.

The direct one-to-many foreign keys of ltc-dp (chronometric-age.objectGroup_fk,
the four parent<Class>_fk self references, person-role.person_fk / role_fk) are
kept unchanged.

Writes:
  vocabulary/ltc-dp-collapsed-tables.csv
  vocabulary/ltc-dp-collapsed-fields.csv
  ltc-dp-collapsed/            (via build-schemas.py)

Usage:  python src/build-collapsed.py
"""
import collections
import csv
import os
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
VOCAB = os.path.join(ROOT, "vocabulary")
SRC, DST = "ltc-dp", "ltc-dp-collapsed"
TITLE = "Latimer Core Data Package (collapsed)"
DESCRIPTION = ("A data package for sharing natural science collections data using Latimer Core, "
               "with every many-to-many relation collapsed into a one-to-many foreign key on the "
               "target table (25 tables, no junction tables).")
NOTE = ("Optional: a row belongs to exactly one parent, so populate exactly one of this table's "
        "parent foreign keys.")


def read(name):
    with open(os.path.join(VOCAB, name), encoding="utf-8-sig", newline="") as fh:
        reader = csv.DictReader(fh)
        rows = list(reader)
        return rows, reader.fieldnames


def write(name, header, rows):
    with open(os.path.join(VOCAB, name), "w", encoding="utf-8", newline="") as fh:
        w = csv.DictWriter(fh, fieldnames=header, lineterminator="\n")
        w.writeheader()
        w.writerows(rows)


def main():
    tables, theader = read("%s-tables.csv" % SRC)
    fields, fheader = read("%s-fields.csv" % SRC)
    byt = collections.defaultdict(list)
    for f in fields:
        byt[f["table"]].append(f)

    entities = [t for t in tables if any(f["key"] == "pk" for f in byt[t["name"]])]
    junctions = [t for t in tables if t not in entities]
    entity_names = {t["name"] for t in entities}

    added = collections.defaultdict(list)   # target table -> new fk rows
    for j in junctions:
        rows = byt[j["name"]]
        fks = [f for f in rows if f["key"] == "fk"]
        assert len(fks) == 2 and len(rows) == 2, j["name"]
        parent_fk, target_fk = fks
        parent, target = parent_fk["related_table"], target_fk["related_table"]
        assert j["name"] == "%s-%s" % (parent, target), j["name"]
        assert parent in entity_names and target in entity_names, j["name"]
        existing = {f["name"] for f in byt[target]} | {f["name"] for f in added[target]}
        assert parent_fk["name"] not in existing, (target, parent_fk["name"])
        row = dict(parent_fk)
        row.update({
            "table": target,
            "predicate": "for",
            "unique": "FALSE",
            "required": "FALSE",
            "comments": (parent_fk["comments"] + " " + NOTE).strip(),
            # the relation property (has<Target>) is what this key now represents, as on
            # ltc-dp's direct foreign keys such as chronometric-age.objectGroup_fk
            "dcterms:isVersionOf": target_fk["dcterms:isVersionOf"],
            "dcterms:references": target_fk["dcterms:references"],
            "rdfs:comment": target_fk["rdfs:comment"],
        })
        added[target].append(row)

    out_fields = []
    for t in entities:
        rows = byt[t["name"]]
        keys = [f for f in rows if f["key"] in ("pk", "fk")]
        rest = [f for f in rows if f["key"] not in ("pk", "fk")]
        out_fields += keys + sorted(added[t["name"]], key=lambda f: f["name"].lower()) + rest

    write("%s-tables.csv" % DST, theader, entities)
    write("%s-fields.csv" % DST, fheader, out_fields)
    n_added = sum(len(v) for v in added.values())
    print("%s: %d tables (%d junction tables removed), %d fields (%d foreign keys added)"
          % (DST, len(entities), len(junctions), len(out_fields), n_added))
    for target in sorted((k for k in added if added[k]), key=lambda k: (-len(added[k]), k)):
        print("  %-28s +%2d  %s" % (target, len(added[target]),
                                     ", ".join(f["name"] for f in added[target])))

    sys.stdout.flush()
    subprocess.run([sys.executable, os.path.join(HERE, "build-schemas.py"),
                    "--vocab-prefix", DST, "--name", DST, "--title", TITLE,
                    "--description", DESCRIPTION], check=True)


if __name__ == "__main__":
    main()
