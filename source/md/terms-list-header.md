# Latimer Core List of Terms 

**Title**
: Latimer Core List of Terms

**Date version issued**
: yyyy-mm-dd

**Date created**
: yyyy-mm-dd

**Part of TDWG Standard**
: <http://www.tdwg.org/standards/643>

**This version**
: <http://rs.tdwg.org/ltc/doc/list/yyyy-mm-dd>

**Latest version**
: <http://rs.tdwg.org/ltc/doc/list/>

**Abstract**
: Latimer Core (LtC) is a data standard designed to support the representation, discovery and communication of natural science collections. A Latimer Core record may represent a grouping of objects at any level of granularity above the level of a single object, from an entire collection of an institution to a few objects in a single drawer. The classes within the standard aim to allow the high-level representation of any given collection by providing a framework within which the defining characteristics shared by objects in the collection can be described. Among others, these include their taxonomic, geographic, stratigraphic and temporal coverage, and a framework for adding quantative metrics and narratives to help to quantify and describe the collections.

The creation of collection-level records is intended to promote visibility and use of items in collections that are otherwise wholly or partially undigitised at a granular level. This document contains a list of attributes of each Latimer Core term, including a documentation name, a specified URI, a recommended English label for user interfaces, a definition, and some ancillary notes.

**Contributors**
: Matt Woodburn, Kate Webbink, Janeen Jones, Sharon Grant, Deborah Paul, Maarten Trekels, Quentin Groom, Sarah Vincent, Gabi Droege, William Ulate, Mike Trizna, Niels Raes, Jutta Buschbom

**Creator**
: TDWG Collection Descriptions (CD) Interest Group

**Bibliographic citation**
: Latimer Core Maintenance Group. 2022. Latimer Core List of Terms. Biodiversity Information Standards (TDWG). <http://rs.tdwg.org/ltc/doc/list/yyyy-mm-dd>

## 1 Introduction <span id="1-introduction"><span>
### 1.1 Status of the content of this document <span id="11-status-of-the-content-of-this-document"></span>
Sections 2 through 3 are normative, except for Table 1. In Section 4 and its subparts, the values of the Normative URI, Definition, Required, and Repeatable are normative. The value of Usage (if it exists for a given term) is normative in that it specifies how a borrowed term should be used as part of Latimer Core. The values of Term Name is non-normative, although one can expect that the namespace abbreviation prefix is one commonly used for the term namespace. Labels and the values of all other properties (such as notes) are non-normative.

### 1.2 RFC 2119 key words <span id="12-rfc-2119-key-words"></span>
The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [RFC 2119](https://tools.ietf.org/html/rfc2119).

### 1.3 Categories of terms <span id="13-categories-of-terms"></span>
A Latimer Core (LtC) record is a description of a grouping of collection objects using the LtC vocabularies. It is primarily focused on the description of natural science collections, but not exclusively. The terms in this document can be loosely grouped into several categories.

**Terms describing the nature and scope of the collection objects within the group.** These include a number of terms within `ltc:ObjectGroup` class, and associated classes that provide information about the scope of the collection being described such as the `ltc:GeographicOrigin`, `ltc:GeologicalContext` and `ltc:Taxon` classes. Due to the potentially heterogeneous nature of the objects within any given group, these classes and terms will often be repeatable within a LtC record.

**Terms describing the group as a whole.** These are terms that relate to the group as a single entity, mapping to the concept of a 'collection'. They include basic information terms within the `ltc:ObjectGroup` class, such as `ltc:collectionName` and `ltc:description`, but also include terms relating to the management, accessibility and tracking of the collection such as the `ltc:CollectionHistory` class and `ltc:conditionsOfAccess` property. There is also some overlap with the generic terms in the category below, in the association of people, institutions and other organisational units with the collections.  

**Generic, reusable terms that can be applied in several contexts within the standard.** Latimer Core uses a flexible approach to the representation of concepts that may be applicable in more than one concept within the class. For example, rather than specifying a separate term for each type of relevant identifier (for collections, people, organisations, taxa and so on), LtC has a generic `ltc:Identifier` class. The type of identifier is defined in each instance of the class using the `ltc:identifierType` property, and the object to which it relates (such as an instance of `ltc:Person` or `ltc:OrganisationalUnit`) is defined by the association with that class in the dataset. A similar approach applies to other classes in LtC, including `ltc:Address`, `ltc:ContactDetail` and `ltc:OrganisationalUnit`. Similarly, `ltc:Person` is reusable, but uses the `ltc:PersonRole` class in conjunction with the `ltc:Role` class to associate the person with instances of other classes in a particular role context (e.g. 'Collector', 'Record creator').

**Terms providing machine-readable metadata about the LtC record.** These terms are predominantly found in the `ltc:RecordLevel` class, and are intended to support the publication of LtC records as FAIR (Findable, Accessible, Interoperable and Reusable) data. These include support for licensing and rights (`dcterms:license`, `dcterms:rights` and `dcterms:rightsHolder`). The `ltc:LatimerCoreScheme` class also fits into this category, and is intended to provide a mechanism to group LtC records under a common scheme and profile that allows the data to be appropriately aggregated and validated.

## 2 Borrowed Vocabulary <span id="2-borrowed-vocabulary"></span>
When terms are borrowed from other vocabularies, LtC uses the URIs, common abbreviations, and namespace prefixes in use in those vocabularies. The URIs are normative, but abbreviations and namespace prefixes have no impact except as an aid to reading the documentation.

Table 1. Vocabularies from which terms have been borrowed (non-normative)

Note: URIs for terms in most of these namespaces do not dereference to anything.  The authoritative documentation can be obtained by clicking on the vocabulary names in the table.

| Vocabulary | Abbreviation | Namespaces and abbreviations |
|------------|--------------|------------------------------|
| [Darwin Core](https://dwc.tdwg.org/terms/) | DwC         | `dwc: = http://rs.tdwg.org/dwc/terms/`
| [Darwin Core Chronometric Age Vocabulary](https://tdwg.github.io/chrono/) | Chrono         | `chrono: = http://rs.tdwg.org/chrono/terms/`
| [Dublin Core](http://dublincore.org/documents/dcmi-terms/) | DC          | `dcterms: = http://purl.org/dc/terms/` |
| [Schema.org](https://schema.org/) | Schema      | `schema: =  https://schema.org/version/latest/schemaorg-current-https.rdf` |
| [Access to Biological Collection Data](https://abcd.tdwg.org/) | ABCD | `abcd: = https://abcd.tdwg.org/terms/` |

## 3 Namespaces, Prefixes and Term Names <span id="3-namespace-prefixes-term-names"></span>
The namespace of terms borrowed from other vocabularies is that of the original. The namespace of de novo LtC terms is http://rs.tdwg.org/ltc/terms/. In the table of terms, each term entry has a row with the term name. This term name is generally an “unqualified name” preceded by a widely accepted prefix designating an abbreviation for the namespace It is RECOMMENDED that implementers who need a namespace prefix for the LtC namespace use ltc. In this web document, hovering over a term in the [Index By Term Name](https://ltc.tdwg.org/termlist/#index-by-term-name) list below will reveal a complete URL that can be used in other web documents to link to this document’s treatment of that term, even if it is from a borrowed vocabulary. It is very important to note that some vocabularies, e.g those of the [Dublin Core Metadata Initiative (DCMI)](http://dublincore.org/), provide versions of the same term in two different namespaces, one providing for string values and one providing for URIs, even where that separation is simply a recommendation, not a mandate. See this [DCMI wiki entry](https://web.archive.org/web/20171126043657/https://github.com/dcmi/repository/blob/master/mediawiki_wiki/FAQ/DC_and_DCTERMS_Namespaces.md) on this topic.
