# GrSciColl - Aggregator schema example

This is an example of how to structure LtC records in JSON-format to represent collections at a museum within a larger organization.

An aggregator -- e.g. GrSciColl -- can define a preferred Latimer Core schema using the **ltc:LatimerCoreScheme** class to ensure that contributed records are parsed properly.  The [**`ltc:isDistinctObjects`**](https://ltc.tdwg.org/terms/#LatimerCoreScheme_isDistinctObjects) term will indicate to data-publishers whether Object Groups within a Latimer Core record should represent distinct or overlapping collections.

## Records with distinct Object Groups
Use this record structure for the GrSciColl example records if they use a Latimer Core Scheme where [**`ltc:isDistinctObjects`**](https://ltc.tdwg.org/terms/#LatimerCoreScheme_isDistinctObjects) is `true`.


```mermaid
---
displayMode: compact
config:
  theme: forest
  themeVariables:
    lineColor: '#aaa'
---
flowchart LR


    subgraph LtC["LtC record"]

    g1["**Latimer Core Scheme**<br /> isDistinctObjects = **true**"]

    subgraph OG1 [**Object Group** - Herbarium]
        c2("Identifiers: \[...\]<br />Organisational Units: \[...\]")
    end

    subgraph OG2 [**Object Group** - Zoology]
        c3("Identifiers: \[...\]<br />Organisational Units: \[...\]")
    end

    subgraph OG3 [**Object Group** - Fossils]
        c4("Identifiers: \[...\]<br />Organisational Units: \[...\]")
    end

    end

LtC:::top
g1:::scheme --> OG1:::main
g1 --> OG2:::main
g1 --> OG3:::main

c2:::guts
c3:::guts
c4:::guts

classDef top fill:#fff,stroke:#6eaa49;
classDef scheme fill:#5bb0d4;
classDef main fill:#c3e7b0,stroke:#6eaa49;
classDef guts fill:#feb,stroke:#bbb;

```



## Records with overlapping Object Groups
Use this record structure for the GrSciColl example records if they use a Latimer Core Scheme where [**`ltc:isDistinctObjects`**](https://ltc.tdwg.org/terms/#LatimerCoreScheme_isDistinctObjects) is `false`.

Note: 
- **ltc:ObjectGroup** classes cannot be nested within each other in a Latimer Core record. Instead, they should reference identifiers for related **ltc:ObjectGroup** using the **ltc:ResourceRelationship** class.



```mermaid
---
displayMode: compact
config:
  theme: 'base'
  themeVariables:
    primaryColor: '#5bb0d4'
    primaryTextColor: '#000'
    primaryBorderColor: '#13540c'
    lineColor: '#aaa'
    secondaryColor: '#c3e7b0'
    tertiaryColor: '#fff'
---
flowchart LR


    subgraph LtC["LtC record"]
    
    g1["**Latimer Core Scheme**<br /> isDistinctObjects = **false**"]

    subgraph OG1 [**Object Group**: Zoology]
        c2("Identifiers: \[...\]<br />Organisational Units: \[...\]")
    end

    subgraph OG2 [**Object Group**: Bird Skulls]
        c3("Identifiers: \[...\]<br />Organisational Units: \[...\]<br />Resource Relationships: \[...\]")
    end

    subgraph OG3 [**Object Group**: Amphibians]
        c4("Identifiers: \[...\]<br />Organisational Units: \[...\]<br />Resource Relationships: \[...\]")
    end

    end


g1 --> OG1:::main
OG1 <--> c3
g1 --> OG2:::overlap
g1 --> OG3:::overlap
OG1 <--> c4

c2:::guts
c3:::guts
c4:::guts

classDef top fill:#fff,stroke:#6eaa49;
classDef main fill:#c3e7b0,stroke:#6eaa49;
classDef overlap fill:#fdbf62,stroke:#F8B229;
classDef guts fill:#feb,stroke:#bbb;

linkStyle 1,4 stroke:#F8B229,stroke-width:2px;

```