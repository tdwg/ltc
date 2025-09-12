# Concept of Exchange

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

1. Completely denormalized and resolved (see identifiers) records are shared in the above table or serialized formats. Thereby, each record is a stand-alone information entity.

  a) table format, eg. as csv files
  b) serial formats, eg. JSON, YAML
  
3. A more or less normalized set of records is shared in which relationships and links are made possible through the use of identifiers and links, which characteristics are described though properties.

  a) table format, eg. as csv files - values in cells can be identifiers (extra tables might be needed to share link-specific data)
  b) serial formats designed for linked data are JSON-LD and LinkML

## FAIR data exchange



Provenance, operations: registry, agent information


## Data and Record validation

JSON Schema designed to check for correctly assembled/well-designed status of exchanged records, during download and upload.


