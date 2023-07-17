## README
### ltc-set
The csv files in this folder are the formal standardized set used to produce the
Latimer Core documentation pages (terms list and quick reference). The fields are set specifically to
support the documentation. The source data is located in the ltc-source folder. These were transformed
to adhere to the standardized fields in the documentation.

Last Modified: 20230716
Modified By: Ben Norton

## Schemas

### ltc-quick-ref.csv
| Columns          | Datatype | Description                                      |
|------------------|----------|--------------------------------------------------|
| term_name        | string   | machine-readable term name                       |
| class_name       | string   | machine-readable parent class name               |
| term_ns_name     | string   | machine-readable term name with namespace prefix |
| term_iri         | string   |                                                  |
| term_version_iri | string   |                                                  |
| label            | string   | skos:prefLabel                                   |
| definition       | string   | skos:definition                                  |
| usage            | string   | skos:scopeNote                                   |
| notes            | string   | dcterms:description                              |
| examples         | string   | skos:example                                     |
| type             | string   | rdf:type                                         |


### ltc-skos.csv
### ltc-quick-ref.csv
| Columns               | Datatype | Description                                                                                                                  |
|-----------------------|----------|------------------------------------------------------------------------------------------------------------------------------|
| term_iri              | string   | unversioned term iri                                                                                                         |
| skos_mapping_relation | string   | machine-readable parent class name                                                                                           |
| related_term_iri      | string   | unversioned iri of the related term as defined by the skos mapping relation
  

### ltc-terms-list.csv
| Columns          | Datatype | Description                                      |
|------------------|----------|--------------------------------------------------|
 | pref_ns_prefix   | string | Abbreviated prefix of the term namespace         |
| pref_ns          | string | URI of the term namesapce                        |          
| term_name        | string   | machine-readable term name                       |
| class_name       | string   | machine-readable parent class name               |
| term_ns_name     | string   | machine-readable term name with namespace prefix |
| term_iri         | string   |                                                  |
 | modified         | date | Version date of term (last modified)             |
| term_version_iri | string   |                                                  |
| label            | string   | skos:prefLabel                                   |
| definition       | string   | skos:definition                                  |
| usage            | string   | skos:scopeNote                                   |
| notes            | string   | dcterms:description                              |
| examples         | string   | skos:example                                     |
| type             | string   | rdf:type                                         |
| class_iri        | string | IRI of parent class                              |
| datatype         | string | Datatype of term according to **                 |
