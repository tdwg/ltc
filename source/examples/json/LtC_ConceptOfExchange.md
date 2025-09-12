# Introduction to Record Exchange

Latimer Core's approach to sharing FAIR, reusable information on collection institutions and their collections.


## Overview

Information about **material collection infrastructures** includes data about the hosting organization (eg. a museum, collection institution, university, governmental agency or non-governmental entity, etc.), the material collections and their organizational structure. Digital infrastructures storing digital collections of digital objects and virtual collections of distributed objects share this organizational structure.

**Collection registries** provide well-structured repositories for more or less extensive sets of collection records and the relationships among them. Such registries can store detailed information about collections and their hosting institutions that are associated with a specific project or work area, provide a comprehensive overview and management tool for all collections within an institution, or aggregate information across the institutions of a country or subnational entity (eg. iDigBio, Flemish DiSSCo), geographic region (eg. DiSSCo in Europe, ALA in Australia) or globally (eg. GRSciColl).

Generally, a registrie's data and structural information is stored in a data management system, often as relational database. 

For the sharing of new collection records or for updates to their data, registries exchange records (or more granular data) with other registries (eg. an institution sends its newest update to GBIF's GRSciColl as global aggregator and registry), or with users (eg. an individual researcher, a project consortium or an agency) who want to reuse those records and their information on collections and hosting organizations.

## Data sharing

### 1. Collection records

Individual collection records or sets of stand-alone collection records can be shared  

1. in table format, eg. as csv files
2. in a serialized format, using for example JSON, YAML, LinkML formats.

### 2. Hierarchically structured records 

Users often require information about the organizational structures in which collection records are embedded. This can be information about the hosting organization, or relationships between collections and subcollections. Two approaches can be taken to share structural information:

3. Completely denormalized and resolved (see identifiers) records are shared in the above table or serialized formats. Thereby, each record is a stand-alone information entity.

    3.1 table format, eg. as csv files  
    3.2 serial formats, eg. JSON, YAML  
  
5. A more or less normalized set of records is shared in which relationships and links are made possible through the use of identifiers and links, which characteristics are described though properties.

    4.1 table format, eg. as csv files - values in cells can be identifiers (extra tables might be needed to share link-specific data)  
    4.2 serial formats designed for the exchange of linked data are JSON-LD and LinkML  

## FAIR data exchange

For shared data to be fully reusable, a full record of **provenance** and comprehensive **data governance** information need to accompany a collection record and set of (structured) records. In addition, such metadata also needs to accompany all operations, for example, including the agents associated with the transaction, that is who is the provider of the data and who downloaded the data; or alternatively, who is the provider of the data who uploaded the data to which registry; etc. 

Only collection records that are associated with and accompanied by such comprehensive metadata will be fully and with legal certainty reusable by providing the foundation for **transparency, attribution and accountability**.

Thus, the FAIR exchange of FAIR data involves comprehensive information about a collection's structural and governmental context, the digital repository (registry) that provides or receives data, and the operations involved in the exchange. 

Links to quality-assured records in moderated and well-governed repositories for (registered) registries, organizations, agents, license and similar legal information seem indispensable. Hence, for fully valid interactions, **data exchange formats for linked data seem needed**, eg. JSON-LD or LinkML.


## Data and Record validation

To ensure that well-formed and quality-assured as well as quality-controlled data and relationships/links governed by a suitable set of policies are exchanged between partners, **schemata for exchanged data** need to be defined. This is especially of interest to registries evaluating data upload. Yet, registries and data providers might also want to ensure that the data that they offer for download are of high quality and adhere to a set of selected standards on which users can rely during reuse.

Different registries or repositories storing collection records and their associated information and structure might have distinct specifications/profiles in use to which their records adhere. Yet, if all infrastructures involved in an exchange event base their specifications on the same foundation, the same standard or ontology, the exchange partners should still enable an interoperable exchange of data, or only require a limited, standardized set of transformations/modifications.

The **JSON Schema format** was designed with data validation in the context of data sharing in mind. Up- or downloaded JSON/JSON-LD records are checked for adhering to a given set of rules and structures. 


