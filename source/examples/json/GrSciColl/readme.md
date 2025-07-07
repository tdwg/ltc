# GrSciColl - Aggregator schema example

This is an example of how to structure LtC records in JSON-format to represent collections at a museum within a larger organization.

An aggregator -- e.g. GrSciColl -- can define a preferred Latimer Core schema using the **ltc:LatimerCoreScheme** class to ensure that contributed records are parsed properly.  The [**`ltc:isDistinctObjects`**](https://ltc.tdwg.org/terms/#LatimerCoreScheme_isDistinctObjects) term will indicate to data-publishers whether Object Groups within a Latimer Core record should represent distinct or overlapping collections.

## Records with distinct Object Groups
Use this record structure for the GrSciColl example records if they use a Latimer Core Scheme where [**`ltc:isDistinctObjects`**](https://ltc.tdwg.org/terms/#LatimerCoreScheme_isDistinctObjects) is `true`.


```mermaid
---
displayMode: compact
config:
  look: handDrawn
  theme: forest
---
flowchart LR

    subgraph LtC["LtC record"]

    g1["**Latimer Core Scheme**<br /> isDistinctObjects = **true**"]

    subgraph OG1 [**Object Group** - Herbarium]
        2("Identifiers: \[ ... \]<br />Organisational Units: \[...\]")
    end

    subgraph OG2 [**Object Group** - Zoology]
        3("Identifiers: \[ ... \]<br />Organisational Units: \[...\]")
    end

    subgraph OG3 [**Object Group** - Fossils]
        4("Identifiers: \[ ... \]<br />Organisational Units: \[...\]")
    end

    end

LtC:::top
g1 --> OG1
g1 --> OG2
g1 --> OG3

classDef top fill:#fff,stroke:#6eaa49;

```



## Records with overlapping Object Groups
Use this record structure for the GrSciColl example records if they use a Latimer Core Scheme where [**`ltc:isDistinctObjects`**](https://ltc.tdwg.org/terms/#LatimerCoreScheme_isDistinctObjects) is `false`.

Note: 
- **ltc:ObjectGroup** classes cannot be nested within each other in a Latimer Core record. Instead, they should reference identifiers for related **ltc:ObjectGroup** using the **ltc:ResourceRelationship** class.


```mermaid
---
displayMode: compact
config:
  look: handDrawn
  theme: 'base'
  themeVariables:
    primaryColor: '#cde498'
    primaryTextColor: '#000'
    primaryBorderColor: '#13540c'
    lineColor: '#000'
    secondaryColor: '#cdffb2'
    tertiaryColor: '#fff'
---
flowchart LR

    subgraph LtC["LtC record"]

    g1["**Latimer Core Scheme**<br /> isDistinctObjects = **false**"]


    subgraph OG1 [**Object Group**: Zoology]
        2("Identifiers: \[ ... \]<br />Organisational Units: \[...\]")
    end

    subgraph OG2 [**Object Group**: Bird Skulls]
        3("Resource Relationships: \[...\]<br/>Identifiers: \[ ... \]<br />Organisational Units: \[...\]")
    end

    subgraph OG3 [**Object Group**: Amphibians]
        4("Resource Relationships: \[...\]<br/>Identifiers: \[ ... \]<br />Organisational Units: \[...\]")
    end

    end

LtC:::top
g1 --> OG1:::main
OG1 <--> 3:::low
g1 --> OG2:::overlap
g1 --> OG3:::overlap
OG1 <--> 4:::low

classDef top fill:#fff,stroke:#6eaa49;
classDef main fill:#cdffb2,stroke:#6eaa49;
classDef overlap stroke:#F8B229;
classDef low fill:#dec,stroke:#cdc;

linkStyle 1,4 stroke:#F8B229,stroke-width:2px;

```