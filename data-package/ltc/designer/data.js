window.DWC_DP_DESIGNER_DATA = {
  "dwcDpVersion": "0.1",
  "profileIdentifier": "0.1/ltc-dp-profile.json",
  "profile": {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "title": "Latimer Core Data Package (LtC-DP) profile",
    "version": "0.1",
    "description": "Profile for organizing biodiversity collections data as a Data Package (https://specs.frictionlessdata.io/).",
    "type": "object",
    "$defs": {
      "dwc-dp-resource-names": {
        "enum": [
          "address",
          "address-identifier",
          "chronometric-age",
          "chronometric-age-identifier",
          "chronometric-age-measurement-or-fact",
          "chronometric-age-reference",
          "collection-status-history",
          "collection-status-history-identifier",
          "collection-status-history-measurement-or-fact",
          "collection-status-history-reference",
          "collection-status-history-temporal-coverage",
          "contact-detail",
          "contact-detail-identifier",
          "ecological-context",
          "ecological-context-identifier",
          "ecological-context-measurement-or-fact",
          "ecological-context-reference",
          "event",
          "event-ecological-context",
          "event-geographic-context",
          "event-identifier",
          "event-measurement-or-fact",
          "event-person-role",
          "event-reference",
          "event-temporal-coverage",
          "geographic-context",
          "geographic-context-identifier",
          "geographic-context-measurement-or-fact",
          "geographic-context-reference",
          "geological-context",
          "geological-context-identifier",
          "geological-context-measurement-or-fact",
          "geological-context-reference",
          "identifier",
          "identifier-reference",
          "latimer-core-scheme",
          "latimer-core-scheme-identifier",
          "latimer-core-scheme-object-group",
          "latimer-core-scheme-reference",
          "measurement-or-fact",
          "measurement-or-fact-identifier",
          "measurement-or-fact-reference",
          "object-classification",
          "object-classification-identifier",
          "object-classification-measurement-or-fact",
          "object-classification-reference",
          "object-group",
          "object-group-ecological-context",
          "object-group-geographic-context",
          "object-group-identifier",
          "object-group-measurement-or-fact",
          "object-group-person-role",
          "object-group-reference",
          "object-group-resource-relationship",
          "organisational-unit",
          "organisational-unit-address",
          "organisational-unit-contact-detail",
          "organisational-unit-identifier",
          "organisational-unit-measurement-or-fact",
          "organisational-unit-person-role",
          "organisational-unit-reference",
          "person",
          "person-address",
          "person-contact-detail",
          "person-identifier",
          "person-measurement-or-fact",
          "person-reference",
          "person-role",
          "person-role-address",
          "person-role-contact-detail",
          "person-role-identifier",
          "person-role-measurement-or-fact",
          "person-role-reference",
          "person-role-temporal-coverage",
          "record-level",
          "record-level-identifier",
          "record-level-object-group",
          "record-level-person-role",
          "record-level-reference",
          "record-level-resource-relationship",
          "reference",
          "reference-identifier",
          "resource-relationship",
          "resource-relationship-identifier",
          "resource-relationship-measurement-or-fact",
          "resource-relationship-reference",
          "role",
          "role-identifier",
          "scheme-measurement-or-fact",
          "scheme-measurement-or-fact-identifier",
          "scheme-measurement-or-fact-reference",
          "scheme-term",
          "scheme-term-identifier",
          "scheme-term-reference",
          "storage-location",
          "storage-location-address",
          "storage-location-identifier",
          "storage-location-measurement-or-fact",
          "storage-location-reference",
          "taxon",
          "taxon-identifier",
          "taxon-measurement-or-fact",
          "taxon-reference",
          "temporal-coverage",
          "temporal-coverage-measurement-or-fact",
          "temporal-coverage-reference"
        ]
      }
    },
    "allOf": [
      {
        "$ref": "https://specs.frictionlessdata.io/schemas/data-package.json"
      },
      {
        "required": [
          "profile"
        ],
        "properties": {
          "profile": {
            "format": "uri"
          },
          "resources": {
            "items": {
              "oneOf": [
                {
                  "properties": {
                    "name": {
                      "not": {
                        "$ref": "#/$defs/dwc-dp-resource-names"
                      }
                    }
                  }
                },
                {
                  "required": [
                    "profile"
                  ],
                  "properties": {
                    "profile": {
                      "enum": [
                        "tabular-data-resource"
                      ]
                    },
                    "name": {
                      "$ref": "#/$defs/dwc-dp-resource-names"
                    },
                    "schema": {
                      "properties": {
                        "fields": {
                          "items": {
                            "required": [
                              "name",
                              "title",
                              "description",
                              "type",
                              "dcterms:isVersionOf"
                            ],
                            "properties": {
                              "dcterms:isVersionOf": {
                                "type": "string",
                                "format": "uri",
                                "pattern": "^http.*$"
                              },
                              "dcterms:references": {
                                "type": "string",
                                "format": "uri",
                                "pattern": "^http.*$"
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              ]
            }
          }
        }
      }
    ]
  },
  "schemas": {
    "address": {
      "identifier": "0.1/address",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/address.json",
      "name": "address",
      "title": "Address",
      "description": "A physical address for an organisational unit or person.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/Address",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/Address-2024-02-28",
      "rdfs:comment": "A physical address for an organisational unit or person.",
      "fields": [
        {
          "name": "address_pk",
          "title": "Address (Primary Key)",
          "description": "A unique identifier for an ltc:Address.",
          "notes": "The value in this field MAY be changed in aggregation to guarantee uniqueness.",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/addressID",
          "rdfs:comment": "A unique identifier for an ltc:Address.",
          "constraints": {
            "required": true,
            "unique": true
          }
        },
        {
          "name": "addressCountry",
          "title": "Address Country",
          "description": "The country. For example, USA. You can also provide the two-letter ISO 3166-1 alpha-2 country code.",
          "notes": "Recommended best practice is to use a controlled vocabulary -- e.g. current ISO 3166 Country Codes.",
          "examples": "`Denmark`, `DK`, `Colombia`, `CO`, `España`, `ES`",
          "type": "string",
          "format": "default",
          "namespace": "schema",
          "dcterms:isVersionOf": "https://schema.org/addressCountry",
          "rdfs:comment": "The country. For example, USA. You can also provide the two-letter ISO 3166-1 alpha-2 country code.",
          "constraints": {
            "required": true
          }
        },
        {
          "name": "addressLocality",
          "title": "Address Locality",
          "description": "The locality in which the street address is, and which is in the region. For example, Mountain View.",
          "notes": "The locality in which the address is located. AddressLocality is a more specific geographic area than addressRegion.",
          "examples": "`Holzminden`, `Araçatuba`, `Ga-Segonyana`, `Mountain View`, `Coventry`, `Tokyo`",
          "type": "string",
          "format": "default",
          "namespace": "schema",
          "dcterms:isVersionOf": "https://schema.org/addressLocality",
          "rdfs:comment": "The locality in which the street address is, and which is in the region. For example, Mountain View."
        },
        {
          "name": "addressRegion",
          "title": "Address Region",
          "description": "The region in which the locality is, and which is in the country. For example, California or another appropriate first-level Administrative division.",
          "notes": "",
          "examples": "`Missoula`, `Los Lagos`, `Mataró`, `Guangdong`",
          "type": "string",
          "format": "default",
          "namespace": "schema",
          "dcterms:isVersionOf": "https://schema.org/addressRegion",
          "rdfs:comment": "The region in which the locality is, and which is in the country. For example, California or another appropriate first-level Administrative division."
        },
        {
          "name": "addressType",
          "title": "Address Type",
          "description": "A person or organization can have different addresses, for different purposes. For example, a postal address, a loan address, an address for visits and so on. This property is used to specify the kind of address.",
          "notes": "",
          "examples": "`Physical`, `Postal`, `Loans`, `Visits`, `Home`, `Work`, `Main`",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/addressType",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/addressType-2024-02-28",
          "rdfs:comment": "A person or organization can have different addresses, for different purposes. For example, a postal address, a loan address, an address for visits and so on. This property is used to specify the kind of address."
        },
        {
          "name": "postOfficeBoxNumber",
          "title": "Post Office Box Number",
          "description": "The post office box number for PO box addresses.",
          "notes": "",
          "examples": "`PO Box 7169`",
          "type": "string",
          "format": "default",
          "namespace": "schema",
          "dcterms:isVersionOf": "https://schema.org/postOfficeBoxNumber",
          "rdfs:comment": "The post office box number for PO box addresses."
        },
        {
          "name": "postalCode",
          "title": "Postal Code",
          "description": "The postal code. For example, 94043.",
          "notes": "",
          "examples": "`32308`, `SW7 5HD`, `10115`, `3080`",
          "type": "string",
          "format": "default",
          "namespace": "schema",
          "dcterms:isVersionOf": "https://schema.org/postalCode",
          "rdfs:comment": "The postal code. For example, 94043."
        },
        {
          "name": "streetAddress",
          "title": "Street Address",
          "description": "The street address. For example, 1600 Amphitheatre Pkwy.",
          "notes": "",
          "examples": "`Invalidenstraße 43`, `1400 S. Du Sable Lake Shore Dr`, `960 Carling Avenue`",
          "type": "string",
          "format": "default",
          "namespace": "schema",
          "dcterms:isVersionOf": "https://schema.org/streetAddress",
          "rdfs:comment": "The street address. For example, 1600 Amphitheatre Pkwy.",
          "constraints": {
            "required": true
          }
        }
      ],
      "primaryKey": "address_pk"
    },
    "address-identifier": {
      "identifier": "0.1/address-identifier",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/address-identifier.json",
      "name": "address-identifier",
      "title": "Address Identifier",
      "description": "An ltc:Identifier related to an ltc:Address.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasIdentifier",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasIdentifier-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the Identifier class.",
      "fields": [
        {
          "name": "address_fk",
          "title": "Address (Foreign Key)",
          "description": "An identifier for an ltc:Address.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/addressID",
          "rdfs:comment": "A unique identifier for an ltc:Address.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "identifier_fk",
          "title": "Identifier (Foreign Key)",
          "description": "An identifier for an ltc:Identifier.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasIdentifier",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasIdentifier-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the Identifier class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "address_fk",
          "predicate": "for",
          "reference": {
            "resource": "address",
            "fields": "address_pk"
          }
        },
        {
          "fields": "identifier_fk",
          "predicate": "has",
          "reference": {
            "resource": "identifier",
            "fields": "identifier_pk"
          }
        }
      ]
    },
    "chronometric-age": {
      "identifier": "0.1/chronometric-age",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/chronometric-age.json",
      "name": "chronometric-age",
      "title": "Chronometric Age",
      "description": "The age of a specimen or related materials that is generated from a dating assay.",
      "notes": "To represent a single age, enter the same value in both earliestChronometricAge and latestChronometricAge. Leaving one or both of these fields blank indicates that the value is unknown, has yet to be recorded or is not applicable to the material being described. We recommend that you do not use this class to indicate chronostratigraphy: it is intended to be used to reflect a chronometric age or range of ages determined via one or more named analytical protocols, methods or techniques.",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/ChronometricAge",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/ChronometricAge-2024-02-28",
      "rdfs:comment": "The age of a specimen or related materials that is generated from a dating assay.",
      "fields": [
        {
          "name": "chronometricAge_pk",
          "title": "Chronometric Age (Primary Key)",
          "description": "A unique identifier for an ltc:ChronometricAge.",
          "notes": "The value in this field MAY be changed in aggregation to guarantee uniqueness.",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/chronometricAgeID",
          "rdfs:comment": "A unique identifier for an ltc:ChronometricAge.",
          "constraints": {
            "required": true,
            "unique": true
          }
        },
        {
          "name": "objectGroup_fk",
          "title": "Object Group (Foreign Key)",
          "description": "An identifier for an ltc:ObjectGroup.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasChronometricAge",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasChronometricAge-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the ChronometricAge class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "chronometricAgeProtocol",
          "title": "Chronometric Age Protocol",
          "description": "A description of or reference to the methods used to determine the chronometric age.",
          "notes": "",
          "examples": "`Radiocarbon dating using an Accelerator Mass Spectrometry`, `Pb-Pb Dating`, `41Ca - 41K Chronometer`, `U-Pb Dating using a Thermal Ionization Mass Spectrometer`, `U-Pb Radiometric Dating`, `Thermoluminescence`, `Paleomagnetism`, `Pb-Pb Chronometer as described in Amelin et al. (2002) Science 297, 1678-1683`",
          "type": "string",
          "format": "default",
          "namespace": "chrono",
          "dcterms:isVersionOf": "http://rs.tdwg.org/chrono/terms/chronometricAgeProtocol",
          "dcterms:references": "http://rs.tdwg.org/chrono/terms/version/chronometricAgeProtocol-2025-06-12",
          "rdfs:comment": "A description of or reference to the methods used to determine the chrono:ChronometricAge."
        },
        {
          "name": "chronometricAgeRemarks",
          "title": "Chronometric Age Remarks",
          "description": "Notes or comments about the ChronometricAge.",
          "notes": "",
          "examples": "`Beta Analytic number: 323913` `One of the Crassostrea virginica right valve specimens from North Midden Feature 17 was chosen for AMS dating, but it is unclear exactly which specimen it was.`",
          "type": "string",
          "format": "default",
          "namespace": "chrono",
          "dcterms:isVersionOf": "http://rs.tdwg.org/chrono/terms/chronometricAgeRemarks",
          "dcterms:references": "http://rs.tdwg.org/chrono/terms/version/chronometricAgeRemarks-2025-06-12",
          "rdfs:comment": "Notes or comments about the chrono:ChronometricAge."
        },
        {
          "name": "chronometricAgeUncertaintyInYears",
          "title": "Chronometric Age Uncertainty In Years",
          "description": "The temporal uncertainty of the earliestChronometricAge and latestChronometicAge in years.",
          "notes": "The expected unit for this field is years. The value in this field is number of years before and after the values given in the earliest and latest chronometric age fields within which the actual values are estimated to be.",
          "examples": "`100`",
          "type": "number",
          "format": "default",
          "namespace": "chrono",
          "dcterms:isVersionOf": "http://rs.tdwg.org/chrono/terms/chronometricAgeUncertaintyInYears",
          "dcterms:references": "http://rs.tdwg.org/chrono/terms/version/chronometricAgeUncertaintyInYears-2026-05-26",
          "rdfs:comment": "The temporal uncertainty of the chrono:earliestChronometricAge and chrono:latestChronometricAge in years."
        },
        {
          "name": "earliestChronometricAge",
          "title": "Earliest Chronometric Age",
          "description": "The maximum/earliest/oldest possible age of a specimen as determined by a dating method.",
          "notes": "The expected unit for this field is years. This field, if populated, must have an associated earliestChronometricAgeReferenceSystem.",
          "examples": "`100`",
          "type": "number",
          "format": "default",
          "namespace": "chrono",
          "dcterms:isVersionOf": "http://rs.tdwg.org/chrono/terms/earliestChronometricAge",
          "dcterms:references": "http://rs.tdwg.org/chrono/terms/version/earliestChronometricAge-2025-06-12",
          "rdfs:comment": "The maximum/earliest/oldest possible age of a specimen as determined by a dating method."
        },
        {
          "name": "earliestChronometricAgeReferenceSystem",
          "title": "Earliest Chronometric Age Reference System",
          "description": "The reference system associated with the earliestChronometricAge.",
          "notes": "",
          "examples": "`kya`, `mya`, `BP`, `AD`, `BCE`",
          "type": "string",
          "format": "default",
          "namespace": "chrono",
          "dcterms:isVersionOf": "http://rs.tdwg.org/chrono/terms/earliestChronometricAgeReferenceSystem",
          "dcterms:references": "http://rs.tdwg.org/chrono/terms/version/earliestChronometricAgeReferenceSystem-2025-06-12",
          "rdfs:comment": "The reference system associated with the chrono:earliestChronometricAge."
        },
        {
          "name": "latestChronometricAge",
          "title": "Latest Chronometric Age",
          "description": "The minimum/latest/youngest possible age of a specimen as determined by a dating method.",
          "notes": "The minimum/latest/youngest possible age of an object in the collection as determined by a dating method. The expected unit for this field is years. This field, if populated, must have an associated latestChronometricAgeReferenceSystem.",
          "examples": "`27`",
          "type": "number",
          "format": "default",
          "namespace": "chrono",
          "dcterms:isVersionOf": "http://rs.tdwg.org/chrono/terms/latestChronometricAge",
          "dcterms:references": "http://rs.tdwg.org/chrono/terms/version/latestChronometricAge-2025-06-12",
          "rdfs:comment": "The minimum/latest/youngest possible age of a specimen as determined by a dating method."
        },
        {
          "name": "latestChronometricAgeReferenceSystem",
          "title": "Latest Chronometric Age Reference System",
          "description": "The reference system associated with the latestChronometricAge.",
          "notes": "Recommended best practice is to use a controlled vocabulary.",
          "examples": "`kya`, `mya`, `BP`, `AD`, `BCE`",
          "type": "string",
          "format": "default",
          "namespace": "chrono",
          "dcterms:isVersionOf": "http://rs.tdwg.org/chrono/terms/latestChronometricAgeReferenceSystem",
          "dcterms:references": "http://rs.tdwg.org/chrono/terms/version/latestChronometricAgeReferenceSystem-2025-06-12",
          "rdfs:comment": "The reference system associated with the chrono:latestChronometricAge."
        },
        {
          "name": "verbatimChronometricAge",
          "title": "Verbatim Chronometric Age",
          "description": "The verbatim age for a specimen, whether reported by a dating assay, associated references, or legacy information.",
          "notes": "The verbatim age for the objects in the collection, whether reported by a dating assay, associated references, or legacy information. For example, this could be the radiocarbon age as given in an AMS dating report. This could also be simply what is reported as the age of a specimen in legacy collections data.",
          "examples": "`27 BC to 14 AD`",
          "type": "string",
          "format": "default",
          "namespace": "chrono",
          "dcterms:isVersionOf": "http://rs.tdwg.org/chrono/terms/verbatimChronometricAge",
          "dcterms:references": "http://rs.tdwg.org/chrono/terms/version/verbatimChronometricAge-2020-09-14",
          "rdfs:comment": "The verbatim age for a specimen, whether reported by a dating assay, associated references, or legacy information."
        }
      ],
      "primaryKey": "chronometricAge_pk",
      "foreignKeys": [
        {
          "fields": "objectGroup_fk",
          "predicate": "for",
          "reference": {
            "resource": "object-group",
            "fields": "objectGroup_pk"
          }
        }
      ]
    },
    "chronometric-age-identifier": {
      "identifier": "0.1/chronometric-age-identifier",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/chronometric-age-identifier.json",
      "name": "chronometric-age-identifier",
      "title": "Chronometric Age Identifier",
      "description": "An ltc:Identifier related to an ltc:ChronometricAge.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasIdentifier",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasIdentifier-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the Identifier class.",
      "fields": [
        {
          "name": "chronometricAge_fk",
          "title": "Chronometric Age (Foreign Key)",
          "description": "An identifier for an ltc:ChronometricAge.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/chronometricAgeID",
          "rdfs:comment": "A unique identifier for an ltc:ChronometricAge.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "identifier_fk",
          "title": "Identifier (Foreign Key)",
          "description": "An identifier for an ltc:Identifier.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasIdentifier",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasIdentifier-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the Identifier class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "chronometricAge_fk",
          "predicate": "for",
          "reference": {
            "resource": "chronometric-age",
            "fields": "chronometricAge_pk"
          }
        },
        {
          "fields": "identifier_fk",
          "predicate": "has",
          "reference": {
            "resource": "identifier",
            "fields": "identifier_pk"
          }
        }
      ]
    },
    "chronometric-age-measurement-or-fact": {
      "identifier": "0.1/chronometric-age-measurement-or-fact",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/chronometric-age-measurement-or-fact.json",
      "name": "chronometric-age-measurement-or-fact",
      "title": "Chronometric Age Measurement or Fact",
      "description": "An ltc:MeasurementOrFact related to an ltc:ChronometricAge.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasMeasurementOrFact",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasMeasurementOrFact-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the MeasurementOrFact class.",
      "fields": [
        {
          "name": "chronometricAge_fk",
          "title": "Chronometric Age (Foreign Key)",
          "description": "An identifier for an ltc:ChronometricAge.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/chronometricAgeID",
          "rdfs:comment": "A unique identifier for an ltc:ChronometricAge.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "measurementOrFact_fk",
          "title": "Measurement or Fact (Foreign Key)",
          "description": "An identifier for an ltc:MeasurementOrFact.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasMeasurementOrFact",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasMeasurementOrFact-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the MeasurementOrFact class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "chronometricAge_fk",
          "predicate": "for",
          "reference": {
            "resource": "chronometric-age",
            "fields": "chronometricAge_pk"
          }
        },
        {
          "fields": "measurementOrFact_fk",
          "predicate": "has",
          "reference": {
            "resource": "measurement-or-fact",
            "fields": "measurementOrFact_pk"
          }
        }
      ]
    },
    "chronometric-age-reference": {
      "identifier": "0.1/chronometric-age-reference",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/chronometric-age-reference.json",
      "name": "chronometric-age-reference",
      "title": "Chronometric Age Reference",
      "description": "An ltc:Reference related to an ltc:ChronometricAge.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasReference",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasReference-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the Reference class.",
      "fields": [
        {
          "name": "chronometricAge_fk",
          "title": "Chronometric Age (Foreign Key)",
          "description": "An identifier for an ltc:ChronometricAge.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/chronometricAgeID",
          "rdfs:comment": "A unique identifier for an ltc:ChronometricAge.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "reference_fk",
          "title": "Reference (Foreign Key)",
          "description": "An identifier for an ltc:Reference.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasReference",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasReference-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the Reference class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "chronometricAge_fk",
          "predicate": "for",
          "reference": {
            "resource": "chronometric-age",
            "fields": "chronometricAge_pk"
          }
        },
        {
          "fields": "reference_fk",
          "predicate": "has",
          "reference": {
            "resource": "reference",
            "fields": "reference_pk"
          }
        }
      ]
    },
    "collection-status-history": {
      "identifier": "0.1/collection-status-history",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/collection-status-history.json",
      "name": "collection-status-history",
      "title": "Collection Status History",
      "description": "A record of current and past statuses of the object group and the reason for status changes.",
      "notes": "Use this class to record the history of and reason for changes in the status of the described collection. Types of status described by this class may, for example, include ownership, management, accessibility or accrual policy over time. Dates reflecting the start and end of the status described by this class should be recorded using an instance of TemporalCoverage. If temporalCoverageEndDateTime is empty, the status should be inferred to be the current status of the collection.",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/CollectionStatusHistory",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/CollectionStatusHistory-2024-02-28",
      "rdfs:comment": "A record of current and past statuses of the object group and the reason for status changes.",
      "fields": [
        {
          "name": "collectionStatusHistory_pk",
          "title": "Collection Status History (Primary Key)",
          "description": "A unique identifier for an ltc:CollectionStatusHistory.",
          "notes": "The value in this field MAY be changed in aggregation to guarantee uniqueness.",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/collectionStatusHistoryID",
          "rdfs:comment": "A unique identifier for an ltc:CollectionStatusHistory.",
          "constraints": {
            "required": true,
            "unique": true
          }
        },
        {
          "name": "objectGroup_fk",
          "title": "Object Group (Foreign Key)",
          "description": "An identifier for an ltc:ObjectGroup.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasCollectionStatusHistory",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasCollectionStatusHistory-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the CollectionStatusHistory class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "status",
          "title": "Status",
          "description": "The development status of the collection during a specified period.",
          "notes": "The values/vocabularies for a status are predicated by the statusType. The in the examples mentioned terms are a cumulative list of terms associated with several different statusTypes.",
          "examples": "`Complete`, `In part`, `Developing`, `Closed`, `Active growth`, `Consumable`, `Decreasing`, `Lost`, `Missing`, `Passive growth`, `Static`",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/status",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/status-2024-02-28",
          "rdfs:comment": "The development status of the collection during a specified period.",
          "constraints": {
            "required": true
          }
        },
        {
          "name": "statusChangeReason",
          "title": "Status Change Reason",
          "description": "An explanation of why the collection transitioned to the value set in the status property.",
          "notes": "statusChangeReason should be aligned with the value of statusType.",
          "examples": "`Pest infestation`, `Exchange`, `Transfer`, `Return to country of origin`, `Worldwide pandemic`, `moved to secure off-site storage`, `reorganisation, no access from 2020-2023`",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/statusChangeReason",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/statusChangeReason-2024-02-28",
          "rdfs:comment": "An explanation of why the collection transitioned to the value set in the status property."
        },
        {
          "name": "statusType",
          "title": "Status Type",
          "description": "A top-level classification of the different categories of status that can be applied to the collection.",
          "notes": "statusType forms the top level of a two-level hierarchy with the status property. Recommended best practice is to use a controlled vocabulary.",
          "examples": "`Stewardship`, `Accessibility`, `Completeness`, `Growth Status`, `Organisational`",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/statusType",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/statusType-2024-02-28",
          "rdfs:comment": "A top-level classification of the different categories of status that can be applied to the collection.",
          "constraints": {
            "required": true
          }
        }
      ],
      "primaryKey": "collectionStatusHistory_pk",
      "foreignKeys": [
        {
          "fields": "objectGroup_fk",
          "predicate": "for",
          "reference": {
            "resource": "object-group",
            "fields": "objectGroup_pk"
          }
        }
      ]
    },
    "collection-status-history-identifier": {
      "identifier": "0.1/collection-status-history-identifier",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/collection-status-history-identifier.json",
      "name": "collection-status-history-identifier",
      "title": "Collection Status History Identifier",
      "description": "An ltc:Identifier related to an ltc:CollectionStatusHistory.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasIdentifier",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasIdentifier-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the Identifier class.",
      "fields": [
        {
          "name": "collectionStatusHistory_fk",
          "title": "Collection Status History (Foreign Key)",
          "description": "An identifier for an ltc:CollectionStatusHistory.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/collectionStatusHistoryID",
          "rdfs:comment": "A unique identifier for an ltc:CollectionStatusHistory.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "identifier_fk",
          "title": "Identifier (Foreign Key)",
          "description": "An identifier for an ltc:Identifier.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasIdentifier",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasIdentifier-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the Identifier class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "collectionStatusHistory_fk",
          "predicate": "for",
          "reference": {
            "resource": "collection-status-history",
            "fields": "collectionStatusHistory_pk"
          }
        },
        {
          "fields": "identifier_fk",
          "predicate": "has",
          "reference": {
            "resource": "identifier",
            "fields": "identifier_pk"
          }
        }
      ]
    },
    "collection-status-history-measurement-or-fact": {
      "identifier": "0.1/collection-status-history-measurement-or-fact",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/collection-status-history-measurement-or-fact.json",
      "name": "collection-status-history-measurement-or-fact",
      "title": "Collection Status History Measurement or Fact",
      "description": "An ltc:MeasurementOrFact related to an ltc:CollectionStatusHistory.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasMeasurementOrFact",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasMeasurementOrFact-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the MeasurementOrFact class.",
      "fields": [
        {
          "name": "collectionStatusHistory_fk",
          "title": "Collection Status History (Foreign Key)",
          "description": "An identifier for an ltc:CollectionStatusHistory.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/collectionStatusHistoryID",
          "rdfs:comment": "A unique identifier for an ltc:CollectionStatusHistory.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "measurementOrFact_fk",
          "title": "Measurement or Fact (Foreign Key)",
          "description": "An identifier for an ltc:MeasurementOrFact.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasMeasurementOrFact",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasMeasurementOrFact-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the MeasurementOrFact class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "collectionStatusHistory_fk",
          "predicate": "for",
          "reference": {
            "resource": "collection-status-history",
            "fields": "collectionStatusHistory_pk"
          }
        },
        {
          "fields": "measurementOrFact_fk",
          "predicate": "has",
          "reference": {
            "resource": "measurement-or-fact",
            "fields": "measurementOrFact_pk"
          }
        }
      ]
    },
    "collection-status-history-reference": {
      "identifier": "0.1/collection-status-history-reference",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/collection-status-history-reference.json",
      "name": "collection-status-history-reference",
      "title": "Collection Status History Reference",
      "description": "An ltc:Reference related to an ltc:CollectionStatusHistory.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasReference",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasReference-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the Reference class.",
      "fields": [
        {
          "name": "collectionStatusHistory_fk",
          "title": "Collection Status History (Foreign Key)",
          "description": "An identifier for an ltc:CollectionStatusHistory.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/collectionStatusHistoryID",
          "rdfs:comment": "A unique identifier for an ltc:CollectionStatusHistory.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "reference_fk",
          "title": "Reference (Foreign Key)",
          "description": "An identifier for an ltc:Reference.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasReference",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasReference-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the Reference class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "collectionStatusHistory_fk",
          "predicate": "for",
          "reference": {
            "resource": "collection-status-history",
            "fields": "collectionStatusHistory_pk"
          }
        },
        {
          "fields": "reference_fk",
          "predicate": "has",
          "reference": {
            "resource": "reference",
            "fields": "reference_pk"
          }
        }
      ]
    },
    "collection-status-history-temporal-coverage": {
      "identifier": "0.1/collection-status-history-temporal-coverage",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/collection-status-history-temporal-coverage.json",
      "name": "collection-status-history-temporal-coverage",
      "title": "Collection Status History Temporal Coverage",
      "description": "An ltc:TemporalCoverage related to an ltc:CollectionStatusHistory.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasTemporalCoverage",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasTemporalCoverage-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the TemporalCoverage class.",
      "fields": [
        {
          "name": "collectionStatusHistory_fk",
          "title": "Collection Status History (Foreign Key)",
          "description": "An identifier for an ltc:CollectionStatusHistory.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/collectionStatusHistoryID",
          "rdfs:comment": "A unique identifier for an ltc:CollectionStatusHistory.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "temporalCoverage_fk",
          "title": "Temporal Coverage (Foreign Key)",
          "description": "An identifier for an ltc:TemporalCoverage.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasTemporalCoverage",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasTemporalCoverage-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the TemporalCoverage class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "collectionStatusHistory_fk",
          "predicate": "for",
          "reference": {
            "resource": "collection-status-history",
            "fields": "collectionStatusHistory_pk"
          }
        },
        {
          "fields": "temporalCoverage_fk",
          "predicate": "has",
          "reference": {
            "resource": "temporal-coverage",
            "fields": "temporalCoverage_pk"
          }
        }
      ]
    },
    "contact-detail": {
      "identifier": "0.1/contact-detail",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/contact-detail.json",
      "name": "contact-detail",
      "title": "Contact Detail",
      "description": "Details of a method by which an entity such as a Person or OrganisationalUnit may be contacted.",
      "notes": "The Address class should be used to store physical or postal addresses. For all other types of contact details, this class should be used.",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/ContactDetail",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/ContactDetail-2024-02-28",
      "rdfs:comment": "Details of a method by which an entity such as a Person or OrganisationalUnit may be contacted.",
      "fields": [
        {
          "name": "contactDetail_pk",
          "title": "Contact Detail (Primary Key)",
          "description": "A unique identifier for an ltc:ContactDetail.",
          "notes": "The value in this field MAY be changed in aggregation to guarantee uniqueness.",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/contactDetailID",
          "rdfs:comment": "A unique identifier for an ltc:ContactDetail.",
          "constraints": {
            "required": true,
            "unique": true
          }
        },
        {
          "name": "contactDetailCategory",
          "title": "Contact Detail Category",
          "description": "The method of contact to which the contact detail applies.",
          "notes": "Recommended practice is to use a controlled vocabulary.",
          "examples": "`Email`, `Phone (mobile)`, `Phone (home)`, `Twitter handle`, `GitHub handle`",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/contactDetailCategory",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/contactDetailCategory-2024-02-28",
          "rdfs:comment": "The method of contact to which the contact detail applies.",
          "constraints": {
            "required": true
          }
        },
        {
          "name": "contactDetailFunction",
          "title": "Contact Detail Function",
          "description": "A brief label describing the nature of the enquiry or enquiries that are appropriate to direct to the contact detail.",
          "notes": "",
          "examples": "`Loan requests`, `General enquiries`, `Data issues`",
          "type": "array",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/contactDetailFunction",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/contactDetailFunction-2024-02-28",
          "rdfs:comment": "A brief label describing the nature of the enquiry or enquiries that are appropriate to direct to the contact detail."
        },
        {
          "name": "contactDetailValue",
          "title": "Contact Detail Value",
          "description": "The value of the contact detail, such as the phone number or email address.",
          "notes": "",
          "examples": "`01234 567891`, `someone@example.org`, `@github_user`",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/contactDetailValue",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/contactDetailValue-2024-02-28",
          "rdfs:comment": "The value of the contact detail, such as the phone number or email address.",
          "constraints": {
            "required": true
          }
        }
      ],
      "primaryKey": "contactDetail_pk"
    },
    "contact-detail-identifier": {
      "identifier": "0.1/contact-detail-identifier",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/contact-detail-identifier.json",
      "name": "contact-detail-identifier",
      "title": "Contact Detail Identifier",
      "description": "An ltc:Identifier related to an ltc:ContactDetail.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasIdentifier",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasIdentifier-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the Identifier class.",
      "fields": [
        {
          "name": "contactDetail_fk",
          "title": "Contact Detail (Foreign Key)",
          "description": "An identifier for an ltc:ContactDetail.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/contactDetailID",
          "rdfs:comment": "A unique identifier for an ltc:ContactDetail.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "identifier_fk",
          "title": "Identifier (Foreign Key)",
          "description": "An identifier for an ltc:Identifier.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasIdentifier",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasIdentifier-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the Identifier class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "contactDetail_fk",
          "predicate": "for",
          "reference": {
            "resource": "contact-detail",
            "fields": "contactDetail_pk"
          }
        },
        {
          "fields": "identifier_fk",
          "predicate": "has",
          "reference": {
            "resource": "identifier",
            "fields": "identifier_pk"
          }
        }
      ]
    },
    "ecological-context": {
      "identifier": "0.1/ecological-context",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/ecological-context.json",
      "name": "ecological-context",
      "title": "Ecological Context",
      "description": "The ecological and/or biogeographic classification of the region from which objects associated with the ObjectGroup were collected, or where an Event took place.",
      "notes": "There is some conceptual overlap with the GeographicContext class with respect to geographic locations. This class should be used for biogeographic and ecological concepts, whereas for physical, political and administrative geographic locations, the GeographicContext class is more appropriate. Specific information about the habitat and ecological conditions that applied at the time that an event took place should be recorded in the `habitat` property of the Event class.",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/EcologicalContext",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/EcologicalContext-2024-02-28",
      "rdfs:comment": "The ecological and/or biogeographic classification of the region from which objects associated with the ObjectGroup were collected, or where an Event took place.",
      "fields": [
        {
          "name": "ecologicalContext_pk",
          "title": "Ecological Context (Primary Key)",
          "description": "A unique identifier for an ltc:EcologicalContext.",
          "notes": "The value in this field MAY be changed in aggregation to guarantee uniqueness.",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/ecologicalContextID",
          "rdfs:comment": "A unique identifier for an ltc:EcologicalContext.",
          "constraints": {
            "required": true,
            "unique": true
          }
        },
        {
          "name": "biogeographicRealm",
          "title": "Biogeographic Realm",
          "description": "The broadest biogeographic division of Earth's land and marine surface, based on distributional patterns of terrestrial and marine organisms.",
          "notes": "This term may commonly be used in a biogeographic hierarchy above marineProvince (marine only), ecoregion and ecosystem. It is recommended to use controlled vocabularies such as those adopted by the World Wildlife Fund (WWF) / Global 200 (Olson et at. 1998).",
          "examples": "`Afrotropical`, `Australasian`, `Indomalayan`, `Nearctic`, `Arctic`, `Temperate Northern Atlantic`, `Temperate Northern Pacific`",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/biogeographicRealm",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/biogeographicRealm-2024-02-28",
          "rdfs:comment": "The broadest biogeographic division of Earth's land and marine surface, based on distributional patterns of terrestrial and marine organisms."
        },
        {
          "name": "biome",
          "title": "Biome",
          "description": "A biogeographical unit consisting of a biological community that has formed in response to the physical environment in which they are found and a shared regional climate.",
          "notes": "This property can be used to record terrestrial, freshwater and marine biomes. It is recommended to use controlled vocabularies such as those adopted by the World Wildlife Fund (WWF) / Global 200 (Olson et at. 1998).",
          "examples": "`Deserts and xeric shrublands`, `Tropical and subtropical moist broadleaf forests`, `Open sea`, `Deep sea`, `Littoral/Intertidal zone`, `Salt marsh`, `Estuaries`, `Large lakes`, `Large river deltas`, `Polar freshwaters`, `Tropical and subtropical coastal rivers`, `Tropical and subtropical floodplain rivers and wetlands`",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/biome",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/biome-2024-02-28",
          "rdfs:comment": "A biogeographical unit consisting of a biological community that has formed in response to the physical environment in which they are found and a shared regional climate."
        },
        {
          "name": "biomeType",
          "title": "Biome Type",
          "description": "A top level classification of the type of biome from which objects were collected or where an event took place.",
          "notes": "The biomeType is positioned at a level between the biosphere (the global sum of all ecosystems on Earth) and the more detailed terrestrial, marine and freshwater biomes. The latter should be recorded using the EcologicalContext.biome property. Use of a controlled vocabulary is recommended, e.g. The GBIF BioType vocabulary https://registry.gbif.org/vocabulary/BiomeType",
          "examples": "`Terrestrial`, `Marine`, `Freshwater`",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/biomeType",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/biomeType-2024-02-28",
          "rdfs:comment": "A top level classification of the type of biome from which objects were collected or where an event took place."
        },
        {
          "name": "bioregion",
          "title": "Bioregion",
          "description": "An ecologically and geographically defined area that is smaller than a biogeographic realm, but larger than an ecoregion or an ecosystem.",
          "notes": "This is analagous with the marine province concept for marine regions. It is recommended to use controlled vocabularies such as those adopted by the World Wildlife Fund (WWF) / Global 200 (Olson et at. 1998), from which this concept originated.",
          "examples": "`Western Africa and Sahel`, `New Guinea and Melanesia`, `Indian subcontinent`, `South China Sea`, `Mediterranean Sea`, `Central Indian Ocean Islands`",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/bioregion",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/bioregion-2024-02-28",
          "rdfs:comment": "An ecologically and geographically defined area that is smaller than a biogeographic realm, but larger than an ecoregion or an ecosystem."
        },
        {
          "name": "ecoregion",
          "title": "Ecoregion",
          "description": "An ecologically and geographically defined area that is smaller than a bioregion, which in turn is smaller than a biogeographic realm. Ecoregions cover relatively large areas of land or water, and contain characteristic, geographically distinct assemblages of natural communities and species.",
          "notes": "It is recommended to use controlled vocabularies such as those adopted by the World Wildlife Fund (WWF) / Global 200 (Olson et at. 1998).",
          "examples": "`Albertine Rift montane forests`, `Atlantic Equatorial coastal forests`, `Irrawaddy freshwater swamp forests`, `Adriatic Sea`, `Cortezian`, `Ningaloo`, `Ross Sea`",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/ecoregion",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/ecoregion-2024-02-28",
          "rdfs:comment": "An ecologically and geographically defined area that is smaller than a bioregion, which in turn is smaller than a biogeographic realm. Ecoregions cover relatively large areas of land or water, and contain characteristic, geographically distinct assemblages of natural communities and species."
        },
        {
          "name": "ecosystem",
          "title": "Ecosystem",
          "description": "A specific kind of ecological classification that considers all four elements of the definition of ecosystems: a biotic component, an abiotic complex, the interactions between and within them, and the physical space that they occupy.",
          "notes": "",
          "examples": "`Orjen, vegetation belt between 1,100 and 1,450 m, Oromediterranean zone, nemoral zone (temperate zone)`",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/ecosystem",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/ecosystem-2024-02-28",
          "rdfs:comment": "A specific kind of ecological classification that considers all four elements of the definition of ecosystems: a biotic component, an abiotic complex, the interactions between and within them, and the physical space that they occupy."
        },
        {
          "name": "habitat",
          "title": "Habitat",
          "description": "A description of the type of environment in which an organism lives.",
          "notes": "",
          "examples": "`oak savanna`, `pre-cordilleran steppe`",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/habitat",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/habitat-2024-02-28",
          "rdfs:comment": "A description of the type of environment in which an organism lives."
        }
      ],
      "primaryKey": "ecologicalContext_pk"
    },
    "ecological-context-identifier": {
      "identifier": "0.1/ecological-context-identifier",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/ecological-context-identifier.json",
      "name": "ecological-context-identifier",
      "title": "Ecological Context Identifier",
      "description": "An ltc:Identifier related to an ltc:EcologicalContext.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasIdentifier",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasIdentifier-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the Identifier class.",
      "fields": [
        {
          "name": "ecologicalContext_fk",
          "title": "Ecological Context (Foreign Key)",
          "description": "An identifier for an ltc:EcologicalContext.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/ecologicalContextID",
          "rdfs:comment": "A unique identifier for an ltc:EcologicalContext.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "identifier_fk",
          "title": "Identifier (Foreign Key)",
          "description": "An identifier for an ltc:Identifier.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasIdentifier",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasIdentifier-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the Identifier class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "ecologicalContext_fk",
          "predicate": "for",
          "reference": {
            "resource": "ecological-context",
            "fields": "ecologicalContext_pk"
          }
        },
        {
          "fields": "identifier_fk",
          "predicate": "has",
          "reference": {
            "resource": "identifier",
            "fields": "identifier_pk"
          }
        }
      ]
    },
    "ecological-context-measurement-or-fact": {
      "identifier": "0.1/ecological-context-measurement-or-fact",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/ecological-context-measurement-or-fact.json",
      "name": "ecological-context-measurement-or-fact",
      "title": "Ecological Context Measurement or Fact",
      "description": "An ltc:MeasurementOrFact related to an ltc:EcologicalContext.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasMeasurementOrFact",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasMeasurementOrFact-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the MeasurementOrFact class.",
      "fields": [
        {
          "name": "ecologicalContext_fk",
          "title": "Ecological Context (Foreign Key)",
          "description": "An identifier for an ltc:EcologicalContext.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/ecologicalContextID",
          "rdfs:comment": "A unique identifier for an ltc:EcologicalContext.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "measurementOrFact_fk",
          "title": "Measurement or Fact (Foreign Key)",
          "description": "An identifier for an ltc:MeasurementOrFact.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasMeasurementOrFact",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasMeasurementOrFact-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the MeasurementOrFact class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "ecologicalContext_fk",
          "predicate": "for",
          "reference": {
            "resource": "ecological-context",
            "fields": "ecologicalContext_pk"
          }
        },
        {
          "fields": "measurementOrFact_fk",
          "predicate": "has",
          "reference": {
            "resource": "measurement-or-fact",
            "fields": "measurementOrFact_pk"
          }
        }
      ]
    },
    "ecological-context-reference": {
      "identifier": "0.1/ecological-context-reference",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/ecological-context-reference.json",
      "name": "ecological-context-reference",
      "title": "Ecological Context Reference",
      "description": "An ltc:Reference related to an ltc:EcologicalContext.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasReference",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasReference-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the Reference class.",
      "fields": [
        {
          "name": "ecologicalContext_fk",
          "title": "Ecological Context (Foreign Key)",
          "description": "An identifier for an ltc:EcologicalContext.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/ecologicalContextID",
          "rdfs:comment": "A unique identifier for an ltc:EcologicalContext.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "reference_fk",
          "title": "Reference (Foreign Key)",
          "description": "An identifier for an ltc:Reference.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasReference",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasReference-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the Reference class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "ecologicalContext_fk",
          "predicate": "for",
          "reference": {
            "resource": "ecological-context",
            "fields": "ecologicalContext_pk"
          }
        },
        {
          "fields": "reference_fk",
          "predicate": "has",
          "reference": {
            "resource": "reference",
            "fields": "reference_pk"
          }
        }
      ]
    },
    "event": {
      "identifier": "0.1/event",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/event.json",
      "name": "event",
      "title": "Event",
      "description": "An action that occurs at some location during some time.",
      "notes": "Derived from dwc Class event (http://rs.tdwg.org/dwc/terms/version/Event-2018-09-06). This class has been defined under the ltc namespace because it only has a subset of the properties of DwC:Event. All ltc:Event properties are borrowed from and reference the dwc namespace. Examples of an Event include: A specimen collection process. A camera trap image capture. A marine trawl.",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/Event",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/Event-2024-02-28",
      "rdfs:comment": "An action that occurs at some location during some time.",
      "fields": [
        {
          "name": "event_pk",
          "title": "Event (Primary Key)",
          "description": "A unique identifier for an ltc:Event.",
          "notes": "The value in this field MAY be changed in aggregation to guarantee uniqueness.",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/eventID",
          "rdfs:comment": "A unique identifier for an ltc:Event.",
          "constraints": {
            "required": true,
            "unique": true
          }
        },
        {
          "name": "objectGroup_fk",
          "title": "Object Group (Foreign Key)",
          "description": "An identifier for an ltc:ObjectGroup.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasEvent",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasEvent-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the Event class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "parentEvent_fk",
          "title": "Event (Foreign Key)",
          "description": "An identifier for an ltc:Event.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasParentEvent",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasParentEvent-2024-02-28",
          "rdfs:comment": "This property refers to one or more related parent instances of the Event class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "eventName",
          "title": "Event Name",
          "description": "The name commonly used to identify or refer to the event.",
          "notes": "",
          "examples": "`Trawl 3.42`, ` Voyage of the Rattlesnake 1846-1850`, `Donner-Reed Party`",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/eventName",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/eventName-2024-02-28",
          "rdfs:comment": "The name commonly used to identify or refer to the event."
        },
        {
          "name": "samplingProtocol",
          "title": "Sampling Protocol",
          "description": "The names of, references to, or descriptions of the methods or protocols used during an Event.",
          "notes": "The primary use of this property is to describe the methods or protocols used to gather objects in the collection.",
          "examples": "`UV light trap`, `mist net`, `bottom trawl`, `ad hoc observation`, `Penguins from space: faecal stains reveal the location of emperor penguin colonies, https://doi.org/10.1111/j.1466-8238.2009.00467.x`, `Takats et al. 2001. Guidelines for Nocturnal Owl Monitoring in North America. Beaverhill Bird Observatory and Bird Studies Canada, Edmonton, Alberta. 32 pp., http://www.bsc-eoc.org/download/Owl.pdf`",
          "type": "array",
          "format": "default",
          "namespace": "dwc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/dwc/terms/samplingProtocol",
          "dcterms:references": "http://rs.tdwg.org/dwc/terms/version/samplingProtocol-2026-05-26",
          "rdfs:comment": "The names of, references to, or descriptions of the methods or protocols used during a dwc:Event."
        },
        {
          "name": "verbatimEventDate",
          "title": "Verbatim Event Date",
          "description": "The verbatim original representation of the date and time information for an Event.",
          "notes": "",
          "examples": "`spring 1910`, `Marzo 2002`, `1999-03-XX`, `17IV1934`",
          "type": "string",
          "format": "default",
          "namespace": "dwc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/dwc/terms/verbatimEventDate",
          "dcterms:references": "http://rs.tdwg.org/dwc/terms/version/verbatimEventDate-2026-05-26",
          "rdfs:comment": "The verbatim original representation of the date and time information for a dwc:Event."
        }
      ],
      "primaryKey": "event_pk",
      "foreignKeys": [
        {
          "fields": "objectGroup_fk",
          "predicate": "for",
          "reference": {
            "resource": "object-group",
            "fields": "objectGroup_pk"
          }
        },
        {
          "fields": "parentEvent_fk",
          "predicate": "part of",
          "reference": {
            "resource": "",
            "fields": "event_pk"
          }
        }
      ]
    },
    "event-ecological-context": {
      "identifier": "0.1/event-ecological-context",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/event-ecological-context.json",
      "name": "event-ecological-context",
      "title": "Event Ecological Context",
      "description": "An ltc:EcologicalContext related to an ltc:Event.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasEcologicalContext",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasEcologicalContext-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the EcologicalContext class.",
      "fields": [
        {
          "name": "event_fk",
          "title": "Event (Foreign Key)",
          "description": "An identifier for an ltc:Event.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/eventID",
          "rdfs:comment": "A unique identifier for an ltc:Event.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "ecologicalContext_fk",
          "title": "Ecological Context (Foreign Key)",
          "description": "An identifier for an ltc:EcologicalContext.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasEcologicalContext",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasEcologicalContext-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the EcologicalContext class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "event_fk",
          "predicate": "for",
          "reference": {
            "resource": "event",
            "fields": "event_pk"
          }
        },
        {
          "fields": "ecologicalContext_fk",
          "predicate": "has",
          "reference": {
            "resource": "ecological-context",
            "fields": "ecologicalContext_pk"
          }
        }
      ]
    },
    "event-geographic-context": {
      "identifier": "0.1/event-geographic-context",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/event-geographic-context.json",
      "name": "event-geographic-context",
      "title": "Event Geographic Context",
      "description": "An ltc:GeographicContext related to an ltc:Event.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasGeographicContext",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasGeographicContext-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the GeographicContext class.",
      "fields": [
        {
          "name": "event_fk",
          "title": "Event (Foreign Key)",
          "description": "An identifier for an ltc:Event.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/eventID",
          "rdfs:comment": "A unique identifier for an ltc:Event.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "geographicContext_fk",
          "title": "Geographic Context (Foreign Key)",
          "description": "An identifier for an ltc:GeographicContext.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasGeographicContext",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasGeographicContext-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the GeographicContext class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "event_fk",
          "predicate": "for",
          "reference": {
            "resource": "event",
            "fields": "event_pk"
          }
        },
        {
          "fields": "geographicContext_fk",
          "predicate": "has",
          "reference": {
            "resource": "geographic-context",
            "fields": "geographicContext_pk"
          }
        }
      ]
    },
    "event-identifier": {
      "identifier": "0.1/event-identifier",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/event-identifier.json",
      "name": "event-identifier",
      "title": "Event Identifier",
      "description": "An ltc:Identifier related to an ltc:Event.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasIdentifier",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasIdentifier-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the Identifier class.",
      "fields": [
        {
          "name": "event_fk",
          "title": "Event (Foreign Key)",
          "description": "An identifier for an ltc:Event.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/eventID",
          "rdfs:comment": "A unique identifier for an ltc:Event.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "identifier_fk",
          "title": "Identifier (Foreign Key)",
          "description": "An identifier for an ltc:Identifier.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasIdentifier",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasIdentifier-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the Identifier class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "event_fk",
          "predicate": "for",
          "reference": {
            "resource": "event",
            "fields": "event_pk"
          }
        },
        {
          "fields": "identifier_fk",
          "predicate": "has",
          "reference": {
            "resource": "identifier",
            "fields": "identifier_pk"
          }
        }
      ]
    },
    "event-measurement-or-fact": {
      "identifier": "0.1/event-measurement-or-fact",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/event-measurement-or-fact.json",
      "name": "event-measurement-or-fact",
      "title": "Event Measurement or Fact",
      "description": "An ltc:MeasurementOrFact related to an ltc:Event.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasMeasurementOrFact",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasMeasurementOrFact-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the MeasurementOrFact class.",
      "fields": [
        {
          "name": "event_fk",
          "title": "Event (Foreign Key)",
          "description": "An identifier for an ltc:Event.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/eventID",
          "rdfs:comment": "A unique identifier for an ltc:Event.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "measurementOrFact_fk",
          "title": "Measurement or Fact (Foreign Key)",
          "description": "An identifier for an ltc:MeasurementOrFact.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasMeasurementOrFact",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasMeasurementOrFact-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the MeasurementOrFact class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "event_fk",
          "predicate": "for",
          "reference": {
            "resource": "event",
            "fields": "event_pk"
          }
        },
        {
          "fields": "measurementOrFact_fk",
          "predicate": "has",
          "reference": {
            "resource": "measurement-or-fact",
            "fields": "measurementOrFact_pk"
          }
        }
      ]
    },
    "event-person-role": {
      "identifier": "0.1/event-person-role",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/event-person-role.json",
      "name": "event-person-role",
      "title": "Event Person Role",
      "description": "An ltc:PersonRole related to an ltc:Event.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasPersonRole",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasPersonRole-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the PersonRole class.",
      "fields": [
        {
          "name": "event_fk",
          "title": "Event (Foreign Key)",
          "description": "An identifier for an ltc:Event.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/eventID",
          "rdfs:comment": "A unique identifier for an ltc:Event.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "personRole_fk",
          "title": "Person Role (Foreign Key)",
          "description": "An identifier for an ltc:PersonRole.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasPersonRole",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasPersonRole-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the PersonRole class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "event_fk",
          "predicate": "for",
          "reference": {
            "resource": "event",
            "fields": "event_pk"
          }
        },
        {
          "fields": "personRole_fk",
          "predicate": "has",
          "reference": {
            "resource": "person-role",
            "fields": "personRole_pk"
          }
        }
      ]
    },
    "event-reference": {
      "identifier": "0.1/event-reference",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/event-reference.json",
      "name": "event-reference",
      "title": "Event Reference",
      "description": "An ltc:Reference related to an ltc:Event.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasReference",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasReference-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the Reference class.",
      "fields": [
        {
          "name": "event_fk",
          "title": "Event (Foreign Key)",
          "description": "An identifier for an ltc:Event.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/eventID",
          "rdfs:comment": "A unique identifier for an ltc:Event.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "reference_fk",
          "title": "Reference (Foreign Key)",
          "description": "An identifier for an ltc:Reference.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasReference",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasReference-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the Reference class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "event_fk",
          "predicate": "for",
          "reference": {
            "resource": "event",
            "fields": "event_pk"
          }
        },
        {
          "fields": "reference_fk",
          "predicate": "has",
          "reference": {
            "resource": "reference",
            "fields": "reference_pk"
          }
        }
      ]
    },
    "event-temporal-coverage": {
      "identifier": "0.1/event-temporal-coverage",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/event-temporal-coverage.json",
      "name": "event-temporal-coverage",
      "title": "Event Temporal Coverage",
      "description": "An ltc:TemporalCoverage related to an ltc:Event.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasTemporalCoverage",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasTemporalCoverage-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the TemporalCoverage class.",
      "fields": [
        {
          "name": "event_fk",
          "title": "Event (Foreign Key)",
          "description": "An identifier for an ltc:Event.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/eventID",
          "rdfs:comment": "A unique identifier for an ltc:Event.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "temporalCoverage_fk",
          "title": "Temporal Coverage (Foreign Key)",
          "description": "An identifier for an ltc:TemporalCoverage.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasTemporalCoverage",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasTemporalCoverage-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the TemporalCoverage class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "event_fk",
          "predicate": "for",
          "reference": {
            "resource": "event",
            "fields": "event_pk"
          }
        },
        {
          "fields": "temporalCoverage_fk",
          "predicate": "has",
          "reference": {
            "resource": "temporal-coverage",
            "fields": "temporalCoverage_pk"
          }
        }
      ]
    },
    "geographic-context": {
      "identifier": "0.1/geographic-context",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/geographic-context.json",
      "name": "geographic-context",
      "title": "Geographic Context",
      "description": "The geographic location from which objects associated with the ObjectGroup were collected, or where an Event took place.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/GeographicContext",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/GeographicContext-2024-02-28",
      "rdfs:comment": "The geographic location from which objects associated with the ObjectGroup were collected, or where an Event took place.",
      "fields": [
        {
          "name": "geographicContext_pk",
          "title": "Geographic Context (Primary Key)",
          "description": "A unique identifier for an ltc:GeographicContext.",
          "notes": "The value in this field MAY be changed in aggregation to guarantee uniqueness.",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/geographicContextID",
          "rdfs:comment": "A unique identifier for an ltc:GeographicContext.",
          "constraints": {
            "required": true,
            "unique": true
          }
        },
        {
          "name": "continent",
          "title": "Continent",
          "description": "The name of the continent in which the Location occurs.",
          "notes": "The name of the continent in which the GeographicContext is located. Based on best practice Getty Thesaurus of Geographic Names. --> http://www.getty.edu/vow/TGNHierarchy?find=&place=&nation=&english=Y&subjectid=7029392. For cultural collections such as economic botany use the Region field to record things like Pacific to replace Oceania.",
          "examples": "`Africa`, `Antarctica`, `Asia`, `Europe`, `North America`, `Oceania`, `South America`",
          "type": "string",
          "format": "default",
          "namespace": "dwc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/dwc/terms/continent",
          "dcterms:references": "http://rs.tdwg.org/dwc/terms/version/continent-2023-06-28",
          "rdfs:comment": "The name of the continent in which the dcterms:Location occurs."
        },
        {
          "name": "country",
          "title": "Country",
          "description": "The name of the country or major administrative unit in which the Location occurs.",
          "notes": "The name of the country or major administrative unit in which the GeographicContext is located. Recommended best practice is to use a controlled vocabulary such as the Getty Thesaurus of Geographic Names",
          "examples": "`Angola`, `Denmark`, `Colombia`, `Españax`",
          "type": "string",
          "format": "default",
          "namespace": "dwc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/dwc/terms/country",
          "dcterms:references": "http://rs.tdwg.org/dwc/terms/version/country-2023-06-28",
          "rdfs:comment": "The name of the country or major administrative unit in which the dcterms:Location occurs."
        },
        {
          "name": "countryCode",
          "title": "Country Code",
          "description": "The standard code for the country in which the Location occurs.",
          "notes": "The standard code for the country in which the GeographicContext is located. Recommended best practice is to use an ISO 3166-1-alpha-2 country code.",
          "examples": "`AR`, `SV`",
          "type": "string",
          "format": "default",
          "namespace": "dwc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/dwc/terms/countryCode",
          "dcterms:references": "http://rs.tdwg.org/dwc/terms/version/countryCode-2026-05-26",
          "rdfs:comment": "The standard code for the country in which the dcterms:Location occurs."
        },
        {
          "name": "county",
          "title": "Second Order Division",
          "description": "The full, unabbreviated name of the next smaller administrative region than stateProvince (county, shire, department, etc.) in which the Location occurs.",
          "notes": "The full, unabbreviated name of the next smaller administrative region than stateProvince (county, shire, department, etc.) in which the GeographicContext is located. Recommended best practice is to use a controlled vocabulary such as the Getty Thesaurus of Geographic Names and to leave this field blank if the Location spans multiple entities at this administrative level or is uncertain.",
          "examples": "`Missoula`, `Los Lagos`, `Mataró`",
          "type": "string",
          "format": "default",
          "namespace": "dwc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/dwc/terms/county",
          "dcterms:references": "http://rs.tdwg.org/dwc/terms/version/county-2023-06-28",
          "rdfs:comment": "The full, unabbreviated name of the next smaller administrative region than stateProvince (county, shire, department, etc.) in which the dcterms:Location occurs."
        },
        {
          "name": "island",
          "title": "Island",
          "description": "The name of the island on or near which the Location occurs.",
          "notes": "The name of the island on or near which the GeographicContext is located. Recommended best practice is to use a controlled vocabulary such as the Getty Thesaurus of Geographic Names.",
          "examples": "`Nosy Be`, `Bikini Atoll`, `Vancouver`, `Viti Levu`, `Zanzibar`",
          "type": "string",
          "format": "default",
          "namespace": "dwc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/dwc/terms/island",
          "dcterms:references": "http://rs.tdwg.org/dwc/terms/version/island-2023-06-28",
          "rdfs:comment": "The name of the island on or near which the dcterms:Location occurs."
        },
        {
          "name": "islandGroup",
          "title": "Island Group",
          "description": "The name of the island group in which the Location occurs.",
          "notes": "The name of the island group in which the location occurs. Recommended best practice is to use a controlled vocabulary such as the Getty Thesaurus of Geographic Names.",
          "examples": "`Alexander Archipelago`, `Archipiélago Diego Ramírez`, `Seychelles`",
          "type": "string",
          "format": "default",
          "namespace": "dwc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/dwc/terms/islandGroup",
          "dcterms:references": "http://rs.tdwg.org/dwc/terms/version/islandGroup-2023-06-28",
          "rdfs:comment": "The name of the island group in which the dcterms:Location occurs."
        },
        {
          "name": "locality",
          "title": "Locality",
          "description": "The specific description of the place.",
          "notes": "Less specific geographic information can be provided in other geographic terms (continent, waterBody). This term may contain information modified from the original to correct perceived errors or standardize the description.",
          "examples": "`Bariloche, 25 km NNE via Ruta Nacional 40 (=Ruta 237).`",
          "type": "string",
          "format": "default",
          "namespace": "dwc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/dwc/terms/locality",
          "dcterms:references": "http://rs.tdwg.org/dwc/terms/version/locality-2023-06-28",
          "rdfs:comment": "The specific description of the place."
        },
        {
          "name": "municipality",
          "title": "Municipality",
          "description": "The full, unabbreviated name of the next smaller administrative region than county (city, municipality, etc.) in which the Location occurs. Do not use this term for a nearby named place that does not contain the actual location.",
          "notes": "The full, unabbreviated name of the next smaller administrative region than county (city, municipality, etc.) in which the GeographicContext is located. Do not use this term for a nearby named place that does not contain the actual location. Recommended best practice is to use a controlled vocabulary such as the Getty Thesaurus of Geographic Names.",
          "examples": "`Holzminden`, `Araçatuba`, `Ga-Segonyana`",
          "type": "string",
          "format": "default",
          "namespace": "dwc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/dwc/terms/municipality",
          "dcterms:references": "http://rs.tdwg.org/dwc/terms/version/municipality-2023-06-28",
          "rdfs:comment": "The full, unabbreviated name of the next smaller administrative region than county (city, municipality, etc.) in which the dcterms:Location occurs. Do not use this term for a nearby named place that does not contain the actual dcterms:Location."
        },
        {
          "name": "region",
          "title": "Region",
          "description": "The name of a spatial region or named place of any size within an individual or multiple administrative areas.",
          "notes": "Recommended best practice is to use this field in situations where the administrative location fields (country, stateProvince, county, etc.) provide insufficient description. For geological collections examples include basins, provinces, and fossil deposits.",
          "examples": "Multi-country: `North European Plain`, Multi-state/Province: `Pacific Northwest`, Waterbody: `Southern`, Geological basins and provinces: `Michigan Basin`, `Mazon Creek`, `Bundenbach`",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/region",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/region-2024-02-28",
          "rdfs:comment": "The name of a spatial region or named place of any size within an individual or multiple administrative areas."
        },
        {
          "name": "stateProvince",
          "title": "First Order Division",
          "description": "The name of the next smaller administrative region than country (state, province, canton, department, region, etc.) in which the Location occurs.",
          "notes": "The name of the next smaller administrative region than country (state, province, canton, department, region, etc.) in which the GeographicContext is located. Recommended best practice is to use a controlled vocabulary such as the Getty Thesaurus of Geographic Names and to leave this field blank if the Location spans multiple entities at this administrative level or is uncertain.",
          "examples": "`Montana`, `Minas Gerais`, `Córdoba`",
          "type": "string",
          "format": "default",
          "namespace": "dwc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/dwc/terms/stateProvince",
          "dcterms:references": "http://rs.tdwg.org/dwc/terms/version/stateProvince-2023-06-28",
          "rdfs:comment": "The name of the next smaller administrative region than country (state, province, canton, department, region, etc.) in which the dcterms:Location occurs."
        },
        {
          "name": "waterBody",
          "title": "Water Body",
          "description": "The name of the water body in which the Location occurs.",
          "notes": "The name of the water body in which the GeographicContext is located. This is intended to define the lowest water body or aquatic feature that defines the geographical constraints of aquatic collections below ocean. Suggestions for appropriate vocabularies include: HydroLAKES (https://www.hydrosheds.org/page/hydrolakes), a database aiming to provide the shoreline polygons of all global lakes with a surface area of at least 10 ha, the 'water body' term in the OBO ontology (http://purl.obolibrary.org/obo/ENVO_00000063) and, for marine water bodies, IHO Sea Areas (http://www.vliz.be/en/imis?dasid=5444&doiid=323).",
          "examples": "`Baltic Sea`, `Hudson River`, `Lago Nahuel Huapi`",
          "type": "string",
          "format": "default",
          "namespace": "dwc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/dwc/terms/waterBody",
          "dcterms:references": "http://rs.tdwg.org/dwc/terms/version/waterBody-2023-06-28",
          "rdfs:comment": "The name of the water body in which the dcterms:Location occurs."
        },
        {
          "name": "waterBodyType",
          "title": "Waterbody Type",
          "description": "A term that indicates the aquatic order of a waterbody.",
          "notes": "Recommendation is to use a controlled vocabulary, such as those fuind at https://www.usgs.gov/mission-areas/water-resources/science/types-water and https://sciencetrends.com/types-bodies-water-complete-list/.",
          "examples": "`Ocean`, `Sea`, `Lake`, `Pond`, `River`",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/waterBodyType",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/waterBodyType-2024-02-28",
          "rdfs:comment": "A term that indicates the aquatic order of a waterbody."
        }
      ],
      "primaryKey": "geographicContext_pk"
    },
    "geographic-context-identifier": {
      "identifier": "0.1/geographic-context-identifier",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/geographic-context-identifier.json",
      "name": "geographic-context-identifier",
      "title": "Geographic Context Identifier",
      "description": "An ltc:Identifier related to an ltc:GeographicContext.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasIdentifier",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasIdentifier-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the Identifier class.",
      "fields": [
        {
          "name": "geographicContext_fk",
          "title": "Geographic Context (Foreign Key)",
          "description": "An identifier for an ltc:GeographicContext.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/geographicContextID",
          "rdfs:comment": "A unique identifier for an ltc:GeographicContext.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "identifier_fk",
          "title": "Identifier (Foreign Key)",
          "description": "An identifier for an ltc:Identifier.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasIdentifier",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasIdentifier-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the Identifier class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "geographicContext_fk",
          "predicate": "for",
          "reference": {
            "resource": "geographic-context",
            "fields": "geographicContext_pk"
          }
        },
        {
          "fields": "identifier_fk",
          "predicate": "has",
          "reference": {
            "resource": "identifier",
            "fields": "identifier_pk"
          }
        }
      ]
    },
    "geographic-context-measurement-or-fact": {
      "identifier": "0.1/geographic-context-measurement-or-fact",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/geographic-context-measurement-or-fact.json",
      "name": "geographic-context-measurement-or-fact",
      "title": "Geographic Context Measurement or Fact",
      "description": "An ltc:MeasurementOrFact related to an ltc:GeographicContext.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasMeasurementOrFact",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasMeasurementOrFact-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the MeasurementOrFact class.",
      "fields": [
        {
          "name": "geographicContext_fk",
          "title": "Geographic Context (Foreign Key)",
          "description": "An identifier for an ltc:GeographicContext.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/geographicContextID",
          "rdfs:comment": "A unique identifier for an ltc:GeographicContext.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "measurementOrFact_fk",
          "title": "Measurement or Fact (Foreign Key)",
          "description": "An identifier for an ltc:MeasurementOrFact.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasMeasurementOrFact",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasMeasurementOrFact-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the MeasurementOrFact class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "geographicContext_fk",
          "predicate": "for",
          "reference": {
            "resource": "geographic-context",
            "fields": "geographicContext_pk"
          }
        },
        {
          "fields": "measurementOrFact_fk",
          "predicate": "has",
          "reference": {
            "resource": "measurement-or-fact",
            "fields": "measurementOrFact_pk"
          }
        }
      ]
    },
    "geographic-context-reference": {
      "identifier": "0.1/geographic-context-reference",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/geographic-context-reference.json",
      "name": "geographic-context-reference",
      "title": "Geographic Context Reference",
      "description": "An ltc:Reference related to an ltc:GeographicContext.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasReference",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasReference-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the Reference class.",
      "fields": [
        {
          "name": "geographicContext_fk",
          "title": "Geographic Context (Foreign Key)",
          "description": "An identifier for an ltc:GeographicContext.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/geographicContextID",
          "rdfs:comment": "A unique identifier for an ltc:GeographicContext.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "reference_fk",
          "title": "Reference (Foreign Key)",
          "description": "An identifier for an ltc:Reference.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasReference",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasReference-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the Reference class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "geographicContext_fk",
          "predicate": "for",
          "reference": {
            "resource": "geographic-context",
            "fields": "geographicContext_pk"
          }
        },
        {
          "fields": "reference_fk",
          "predicate": "has",
          "reference": {
            "resource": "reference",
            "fields": "reference_pk"
          }
        }
      ]
    },
    "geological-context": {
      "identifier": "0.1/geological-context",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/geological-context.json",
      "name": "geological-context",
      "title": "Geological Context",
      "description": "Geological information, such as stratigraphy, that qualifies a region or place.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/GeologicalContext",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/GeologicalContext-2024-02-28",
      "rdfs:comment": "Geological information, such as stratigraphy, that qualifies a region or place.",
      "fields": [
        {
          "name": "geologicalContext_pk",
          "title": "Geological Context (Primary Key)",
          "description": "A unique identifier for an ltc:GeologicalContext.",
          "notes": "The value in this field MAY be changed in aggregation to guarantee uniqueness.",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/geologicalContextID",
          "rdfs:comment": "A unique identifier for an ltc:GeologicalContext.",
          "constraints": {
            "required": true,
            "unique": true
          }
        },
        {
          "name": "objectGroup_fk",
          "title": "Object Group (Foreign Key)",
          "description": "An identifier for an ltc:ObjectGroup.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasGeologicalContext",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasGeologicalContext-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the GeologicalContext class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "bed",
          "title": "Bed",
          "description": "The full name of the lithostratigraphic bed from which the cataloged item was collected.",
          "notes": "The full name of the lithostratigraphic bed from which the objects in the collection originated. Recommended vocabulary: https://ngmdb.usgs.gov/Geolex/search",
          "examples": "`Beecher Trilobite Bed`, `McAbee Fossil Beds`, `Ashfall Fossil Beds`, `Nut Beds`",
          "type": "string",
          "format": "default",
          "namespace": "dwc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/dwc/terms/bed",
          "dcterms:references": "http://rs.tdwg.org/dwc/terms/version/bed-2023-09-13",
          "rdfs:comment": "The full name of the lithostratigraphic bed from which the dwc:MaterialEntity was collected."
        },
        {
          "name": "earliestAgeOrLowestStage",
          "title": "Earliest Age Or Lowest Stage",
          "description": "The full name of the earliest possible geochronologic age or lowest chronostratigraphic stage attributable to the stratigraphic horizon from which the cataloged item was collected.",
          "notes": "The full name of the earliest possible geochronologic age or lowest chronostratigraphic stage attributable to the stratigraphic horizon from which objects in the collection originated. Recommended vocabularies: https://stratigraphy.org/chart, https://timescalefoundation.org/resources/geowhen/index.html",
          "examples": "`Atlantic`, `Boreal`, `Frasnian`, `Hirnantian`, `Maastrichtian`, `Bridgerian`",
          "type": "string",
          "format": "default",
          "namespace": "dwc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/dwc/terms/earliestAgeOrLowestStage",
          "dcterms:references": "http://rs.tdwg.org/dwc/terms/version/earliestAgeOrLowestStage-2023-09-13",
          "rdfs:comment": "The full name of the earliest possible geochronologic age or lowest chronostratigraphic stage attributable to the stratigraphic horizon from which the dwc:MaterialEntity was collected."
        },
        {
          "name": "earliestEonOrLowestEonothem",
          "title": "Earliest Eon Or Lowest Eonothem",
          "description": "The full name of the earliest possible geochronologic eon or lowest chrono-stratigraphic eonothem or the informal name (Precambrian) attributable to the stratigraphic horizon from which the cataloged item was collected.",
          "notes": "The full name of the earliest possible geochronologic eon or lowest chrono-stratigraphic eonothem or the informal name (Precambrian) attributable to the stratigraphic horizon from which the objects in the collection originated. Recommended vocabularies: https://stratigraphy.org/chart, https://timescalefoundation.org/resources/geowhen/index.html",
          "examples": "`Phanerozoic`, `Proterozoic`, `Arechean`, `Hadean`",
          "type": "string",
          "format": "default",
          "namespace": "dwc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/dwc/terms/earliestEonOrLowestEonothem",
          "dcterms:references": "http://rs.tdwg.org/dwc/terms/version/earliestEonOrLowestEonothem-2026-05-26",
          "rdfs:comment": "The full name of the earliest possible geochronologic eon or lowest chronostratigraphic eonothem or the informal name attributable to the stratigraphic horizon from which the dwc:MaterialEntity was collected."
        },
        {
          "name": "earliestEpochOrLowestSeries",
          "title": "Earliest Epoch Or Lowest Series",
          "description": "The full name of the earliest possible geochronologic epoch or lowest chronostratigraphic series attributable to the stratigraphic horizon from which the cataloged item was collected.",
          "notes": "The full name of the earliest possible geochronologic epoch or lowest chronostratigraphic series attributable to the stratigraphic horizon from which objects in the collection originated. Recommended vocabularies: https://stratigraphy.org/chart, https://timescalefoundation.org/resources/geowhen/index.html",
          "examples": "`Holocene`, `Pleistocene`, `Ibexian`, `Late Devonian`",
          "type": "string",
          "format": "default",
          "namespace": "dwc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/dwc/terms/earliestEpochOrLowestSeries",
          "dcterms:references": "http://rs.tdwg.org/dwc/terms/version/earliestEpochOrLowestSeries-2023-09-13",
          "rdfs:comment": "The full name of the earliest possible geochronologic epoch or lowest chronostratigraphic series attributable to the stratigraphic horizon from which the dwc:MaterialEntity was collected."
        },
        {
          "name": "earliestEraOrLowestErathem",
          "title": "Earliest Era Or Lowest Erathem",
          "description": "The full name of the earliest possible geochronologic era or lowest chronostratigraphic erathem attributable to the stratigraphic horizon from which the cataloged item was collected.",
          "notes": "The full name of the earliest possible geochronologic era or lowest chronostratigraphic erathem attributable to the stratigraphic horizon from which the objects in the collection originated. Recommended vocabularies: https://stratigraphy.org/chart, https://timescalefoundation.org/resources/geowhen/index.html",
          "examples": "`Cenozoic`, `Mesozoic`, `Paleozoic`, `Neoproterozoic`",
          "type": "string",
          "format": "default",
          "namespace": "dwc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/dwc/terms/earliestEraOrLowestErathem",
          "dcterms:references": "http://rs.tdwg.org/dwc/terms/version/earliestEraOrLowestErathem-2023-09-13",
          "rdfs:comment": "The full name of the earliest possible geochronologic era or lowest chronostratigraphic erathem attributable to the stratigraphic horizon from which the dwc:MaterialEntity was collected."
        },
        {
          "name": "earliestPeriodOrLowestSystem",
          "title": "Earliest Period Or Lowest System",
          "description": "The full name of the earliest possible geochronologic period or lowest chronostratigraphic system attributable to the stratigraphic horizon from which the cataloged item was collected.",
          "notes": "The full name of the earliest possible geochronologic period or lowest chronostratigraphic system attributable to the stratigraphic horizon from which objects in the collection originated. Recommended vocabularies: https://stratigraphy.org/chart, https://timescalefoundation.org/resources/geowhen/index.html",
          "examples": "`Neogene`, `Quaternary`, `Jurassic`, `Devonian`",
          "type": "string",
          "format": "default",
          "namespace": "dwc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/dwc/terms/earliestPeriodOrLowestSystem",
          "dcterms:references": "http://rs.tdwg.org/dwc/terms/version/earliestPeriodOrLowestSystem-2023-09-13",
          "rdfs:comment": "The full name of the earliest possible geochronologic period or lowest chronostratigraphic system attributable to the stratigraphic horizon from which the dwc:MaterialEntity was collected."
        },
        {
          "name": "formation",
          "title": "Formation",
          "description": "The full name of the lithostratigraphic formation from which the cataloged item was collected.",
          "notes": "The full name of the lithostratigraphic formation from which objects in the collection originated. Recommended vocabulary: https://ngmdb.usgs.gov/Geolex/search",
          "examples": "`Notch Peak Formation`, ` House Limestone`, `Fillmore Formation`, `Redwall Limestone`",
          "type": "string",
          "format": "default",
          "namespace": "dwc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/dwc/terms/formation",
          "dcterms:references": "http://rs.tdwg.org/dwc/terms/version/formation-2023-09-13",
          "rdfs:comment": "The full name of the lithostratigraphic formation from which the dwc:MaterialEntity was collected."
        },
        {
          "name": "group",
          "title": "Group",
          "description": "The full name of the lithostratigraphic group from which the cataloged item was collected.",
          "notes": "The full name of the lithostratigraphic group from which the objects in the collection originated. Recommended vocabulary: https://ngmdb.usgs.gov/Geolex/search",
          "examples": "`Bathurst`, `Wealden`, `Elk Mound`, `Supai`",
          "type": "string",
          "format": "default",
          "namespace": "dwc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/dwc/terms/group",
          "dcterms:references": "http://rs.tdwg.org/dwc/terms/version/group-2023-09-13",
          "rdfs:comment": "The full name of the lithostratigraphic group from which the dwc:MaterialEntity was collected."
        },
        {
          "name": "latestAgeOrHighestStage",
          "title": "Latest Age Or Highest Stage",
          "description": "The full name of the latest possible geochronologic age or highest chronostratigraphic stage attributable to the stratigraphic horizon from which the cataloged item was collected.",
          "notes": "The full name of the latest possible geochronologic age or highest chronostratigraphic stage attributable to the stratigraphic horizon from which objects in the collection originated. Recommended vocabularies: https://stratigraphy.org/chart, https://timescalefoundation.org/resources/geowhen/index.html",
          "examples": "`Atlantic`, `Boreal`",
          "type": "string",
          "format": "default",
          "namespace": "dwc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/dwc/terms/latestAgeOrHighestStage",
          "dcterms:references": "http://rs.tdwg.org/dwc/terms/version/latestAgeOrHighestStage-2023-09-13",
          "rdfs:comment": "The full name of the latest possible geochronologic age or highest chronostratigraphic stage attributable to the stratigraphic horizon from which the dwc:MaterialEntity was collected."
        },
        {
          "name": "latestEonOrHighestEonothem",
          "title": "Latest Eon Or Highest Eonothem",
          "description": "The full name of the latest possible geochronologic eon or highest chrono-stratigraphic eonothem or the informal name (Precambrian) attributable to the stratigraphic horizon from which the cataloged item was collected.",
          "notes": "The full name of the latest possible geochronologic eon or highest chrono-stratigraphic eonothem or the informal name (Precambrian) attributable to the stratigraphic horizon from which the objects in the collection originated. Recommended vocabularies: https://stratigraphy.org/chart, https://timescalefoundation.org/resources/geowhen/index.html",
          "examples": "`Phanerozoic`, `Proterozoic`",
          "type": "string",
          "format": "default",
          "namespace": "dwc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/dwc/terms/latestEonOrHighestEonothem",
          "dcterms:references": "http://rs.tdwg.org/dwc/terms/version/latestEonOrHighestEonothem-2026-05-26",
          "rdfs:comment": "The full name of the latest possible geochronologic eon or highest chronostratigraphic eonothem or the informal name attributable to the stratigraphic horizon from which the dwc:MaterialEntity was collected."
        },
        {
          "name": "latestEpochOrHighestSeries",
          "title": "Latest Epoch Or Highest Series",
          "description": "The full name of the latest possible geochronologic epoch or highest chronostratigraphic series attributable to the stratigraphic horizon from which the cataloged item was collected.",
          "notes": "The full name of the latest possible geochronologic epoch or highest chronostratigraphic series attributable to the stratigraphic horizon from which objects in the collection originated. Recommended vocabularies: https://stratigraphy.org/chart, https://timescalefoundation.org/resources/geowhen/index.html",
          "examples": "`Holocene`, `Pleistocene`",
          "type": "string",
          "format": "default",
          "namespace": "dwc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/dwc/terms/latestEpochOrHighestSeries",
          "dcterms:references": "http://rs.tdwg.org/dwc/terms/version/latestEpochOrHighestSeries-2023-09-13",
          "rdfs:comment": "The full name of the latest possible geochronologic epoch or highest chronostratigraphic series attributable to the stratigraphic horizon from which the dwc:MaterialEntity was collected."
        },
        {
          "name": "latestEraOrHighestErathem",
          "title": "Latest Era Or Highest Erathem",
          "description": "The full name of the latest possible geochronologic era or highest chronostratigraphic erathem attributable to the stratigraphic horizon from which the cataloged item was collected.",
          "notes": "The full name of the latest possible geochronologic era or highest chronostratigraphic erathem attributable to the stratigraphic horizon from which objects in the collection originated. Recommended vocabularies: https://stratigraphy.org/chart, https://timescalefoundation.org/resources/geowhen/index.html",
          "examples": "`Cenozoic`, `Mesozoic`",
          "type": "string",
          "format": "default",
          "namespace": "dwc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/dwc/terms/latestEraOrHighestErathem",
          "dcterms:references": "http://rs.tdwg.org/dwc/terms/version/latestEraOrHighestErathem-2023-09-13",
          "rdfs:comment": "The full name of the latest possible geochronologic era or highest chronostratigraphic erathem attributable to the stratigraphic horizon from which the dwc:MaterialEntity was collected."
        },
        {
          "name": "latestPeriodOrHighestSystem",
          "title": "Latest Period Or Highest System",
          "description": "The full name of the latest possible geochronologic period or highest chronostratigraphic system attributable to the stratigraphic horizon from which the cataloged item was collected.",
          "notes": "The full name of the latest possible geochronologic period or highest chronostratigraphic system attributable to the stratigraphic horizon from which objects in the collection originated. Recommended vocabularies: https://stratigraphy.org/chart, https://timescalefoundation.org/resources/geowhen/index.html",
          "examples": "`Neogene`, `Tertiary`, `Quaternary`",
          "type": "string",
          "format": "default",
          "namespace": "dwc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/dwc/terms/latestPeriodOrHighestSystem",
          "dcterms:references": "http://rs.tdwg.org/dwc/terms/version/latestPeriodOrHighestSystem-2023-09-13",
          "rdfs:comment": "The full name of the latest possible geochronologic period or highest chronostratigraphic system attributable to the stratigraphic horizon from which the dwc:MaterialEntity was collected."
        },
        {
          "name": "member",
          "title": "Member",
          "description": "The full name of the lithostratigraphic member from which the cataloged item was collected.",
          "notes": "The full name of the lithostratigraphic member from which objects in the collection originated. Recommend vocabulary: https://ngmdb.usgs.gov/Geolex/search",
          "examples": "`Lava Dam Member`, `Hellnmaria Member`, `Francis Creek Shale`",
          "type": "string",
          "format": "default",
          "namespace": "dwc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/dwc/terms/member",
          "dcterms:references": "http://rs.tdwg.org/dwc/terms/version/member-2023-09-13",
          "rdfs:comment": "The full name of the lithostratigraphic member from which the dwc:MaterialEntity was collected."
        },
        {
          "name": "supergroup",
          "title": "Supergroup",
          "description": "The full name of the lithostratigraphic supergroup from which the cataloged item was collected.",
          "notes": "A supergroup is a formal assemblage of related or superposed groups or of groups and formations. Such units have proved useful in regional and provincial syntheses. Supergroups should be named only where their recognition serves a clear purpose. Recommended vocabulary. At time of inclusion this term is in progress of being included as part of dwc tdwg/dwc#234",
          "examples": "`Karoe`, `Cape`",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/supergroup",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/supergroup-2024-02-28",
          "rdfs:comment": "The full name of the lithostratigraphic supergroup from which the cataloged item was collected."
        }
      ],
      "primaryKey": "geologicalContext_pk",
      "foreignKeys": [
        {
          "fields": "objectGroup_fk",
          "predicate": "for",
          "reference": {
            "resource": "object-group",
            "fields": "objectGroup_pk"
          }
        }
      ]
    },
    "geological-context-identifier": {
      "identifier": "0.1/geological-context-identifier",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/geological-context-identifier.json",
      "name": "geological-context-identifier",
      "title": "Geological Context Identifier",
      "description": "An ltc:Identifier related to an ltc:GeologicalContext.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasIdentifier",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasIdentifier-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the Identifier class.",
      "fields": [
        {
          "name": "geologicalContext_fk",
          "title": "Geological Context (Foreign Key)",
          "description": "An identifier for an ltc:GeologicalContext.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/geologicalContextID",
          "rdfs:comment": "A unique identifier for an ltc:GeologicalContext.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "identifier_fk",
          "title": "Identifier (Foreign Key)",
          "description": "An identifier for an ltc:Identifier.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasIdentifier",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasIdentifier-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the Identifier class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "geologicalContext_fk",
          "predicate": "for",
          "reference": {
            "resource": "geological-context",
            "fields": "geologicalContext_pk"
          }
        },
        {
          "fields": "identifier_fk",
          "predicate": "has",
          "reference": {
            "resource": "identifier",
            "fields": "identifier_pk"
          }
        }
      ]
    },
    "geological-context-measurement-or-fact": {
      "identifier": "0.1/geological-context-measurement-or-fact",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/geological-context-measurement-or-fact.json",
      "name": "geological-context-measurement-or-fact",
      "title": "Geological Context Measurement or Fact",
      "description": "An ltc:MeasurementOrFact related to an ltc:GeologicalContext.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasMeasurementOrFact",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasMeasurementOrFact-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the MeasurementOrFact class.",
      "fields": [
        {
          "name": "geologicalContext_fk",
          "title": "Geological Context (Foreign Key)",
          "description": "An identifier for an ltc:GeologicalContext.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/geologicalContextID",
          "rdfs:comment": "A unique identifier for an ltc:GeologicalContext.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "measurementOrFact_fk",
          "title": "Measurement or Fact (Foreign Key)",
          "description": "An identifier for an ltc:MeasurementOrFact.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasMeasurementOrFact",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasMeasurementOrFact-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the MeasurementOrFact class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "geologicalContext_fk",
          "predicate": "for",
          "reference": {
            "resource": "geological-context",
            "fields": "geologicalContext_pk"
          }
        },
        {
          "fields": "measurementOrFact_fk",
          "predicate": "has",
          "reference": {
            "resource": "measurement-or-fact",
            "fields": "measurementOrFact_pk"
          }
        }
      ]
    },
    "geological-context-reference": {
      "identifier": "0.1/geological-context-reference",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/geological-context-reference.json",
      "name": "geological-context-reference",
      "title": "Geological Context Reference",
      "description": "An ltc:Reference related to an ltc:GeologicalContext.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasReference",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasReference-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the Reference class.",
      "fields": [
        {
          "name": "geologicalContext_fk",
          "title": "Geological Context (Foreign Key)",
          "description": "An identifier for an ltc:GeologicalContext.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/geologicalContextID",
          "rdfs:comment": "A unique identifier for an ltc:GeologicalContext.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "reference_fk",
          "title": "Reference (Foreign Key)",
          "description": "An identifier for an ltc:Reference.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasReference",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasReference-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the Reference class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "geologicalContext_fk",
          "predicate": "for",
          "reference": {
            "resource": "geological-context",
            "fields": "geologicalContext_pk"
          }
        },
        {
          "fields": "reference_fk",
          "predicate": "has",
          "reference": {
            "resource": "reference",
            "fields": "reference_pk"
          }
        }
      ]
    },
    "identifier": {
      "identifier": "0.1/identifier",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/identifier.json",
      "name": "identifier",
      "title": "Identifier",
      "description": "A numeric, textual value, or reference such as an IRI, that can be used to uniquely identify the object to which it is attached.",
      "notes": "Use this class to document stable identifiers that describe the collections and associated entities being represented in the collection description. For example, person identifiers, taxon identifiers, institution identifiers, organisational unit identifiers, gazetteer identifiers. Identifiers represented by this class may be globally unique, or unique within a given context.",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/Identifier",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/Identifier-2024-02-28",
      "rdfs:comment": "A numeric, textual value, or reference such as an IRI, that can be used to uniquely identify the object to which it is attached.",
      "fields": [
        {
          "name": "identifier_pk",
          "title": "Identifier (Primary Key)",
          "description": "A unique identifier for an ltc:Identifier.",
          "notes": "The value in this field MAY be changed in aggregation to guarantee uniqueness.",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/identifierID",
          "rdfs:comment": "A unique identifier for an ltc:Identifier.",
          "constraints": {
            "required": true,
            "unique": true
          }
        },
        {
          "name": "identifierSource",
          "title": "Identifier Source",
          "description": "The source or creator of the identifier.",
          "notes": "This term refers to the organisation, framework, software or database that minted the identifier represented in the identifier property.",
          "examples": "`Index Herbariorum`, `GBIF Registry of Scientific Collections (GRSciColl)`, `CITES`, `IPEN`, `NHM UK 'Join the Dots' framework`",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/identifierSource",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/identifierSource-2024-02-28",
          "rdfs:comment": "The source or creator of the identifier."
        },
        {
          "name": "identifierType",
          "title": "Identifier Type",
          "description": "The type and format of the value in the identifier field.",
          "notes": "This property should be used to help people and software understand how the identifier can be used (e.g. whether it's a resolvable IRI) and validate the identifier based on format and composition (e.g. a valid UUID).",
          "examples": "`Acronym`, `IRI`, `UUID v4`",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/identifierType",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/identifierType-2024-02-28",
          "rdfs:comment": "The type and format of the value in the identifier field.",
          "constraints": {
            "required": true
          }
        },
        {
          "name": "identifierValue",
          "title": "Identifier",
          "description": "A textual or numeric identifier, acronym or IRI that provides an unambiguous reference for an entity within a given context.",
          "notes": "This may be a simple value or resolvable IRI, and can reflect any identifier used to identify an entity (such as a collection, taxon, institution or person) included in the Collection Description.",
          "examples": "`http://grscicoll.org/institutional-collection/osteology`, `https://www.gbif.org/grscicoll/collection/64232ca4-fd5a-4a3d-a1d5-ef812107472c`, `https://www.gbif.org/grscicoll/institution/52827361-5e82-43b7-b92a-f6ad98367fa5`, `http://sweetgum.nybg.org/science/ih/herbarium-details/?irn=126969`, `10.5072/example-full`, `NHMUK-Verts`, `BGBM`",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/identifierValue",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/identifierValue-2024-02-28",
          "rdfs:comment": "A textual or numeric identifier, acronym or IRI that provides an unambiguous reference for an entity within a given context.",
          "constraints": {
            "required": true
          }
        }
      ],
      "primaryKey": "identifier_pk"
    },
    "identifier-reference": {
      "identifier": "0.1/identifier-reference",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/identifier-reference.json",
      "name": "identifier-reference",
      "title": "Identifier Reference",
      "description": "An ltc:Reference related to an ltc:Identifier.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasReference",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasReference-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the Reference class.",
      "fields": [
        {
          "name": "identifier_fk",
          "title": "Identifier (Foreign Key)",
          "description": "An identifier for an ltc:Identifier.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/identifierID",
          "rdfs:comment": "A unique identifier for an ltc:Identifier.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "reference_fk",
          "title": "Reference (Foreign Key)",
          "description": "An identifier for an ltc:Reference.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasReference",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasReference-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the Reference class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "identifier_fk",
          "predicate": "for",
          "reference": {
            "resource": "identifier",
            "fields": "identifier_pk"
          }
        },
        {
          "fields": "reference_fk",
          "predicate": "has",
          "reference": {
            "resource": "reference",
            "fields": "reference_pk"
          }
        }
      ]
    },
    "latimer-core-scheme": {
      "identifier": "0.1/latimer-core-scheme",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/latimer-core-scheme.json",
      "name": "latimer-core-scheme",
      "title": "Latimer Core Scheme",
      "description": "A grouping of multiple ObjectGroups for a particular use case, purpose or implementation.",
      "notes": "Where the same objects within the same collection might be described by more than one ObjectGroup for different purposes (for examples, a 'Darwin Fossil Mammals' collection description might overlap with a 'Offsite Palaeontology' collection description), this class can be used to distinguish between them and avoid double-counting of metrics in queries against the data.",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/LatimerCoreScheme",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/LatimerCoreScheme-2024-02-28",
      "rdfs:comment": "A grouping of multiple ObjectGroups for a particular use case, purpose or implementation.",
      "fields": [
        {
          "name": "latimerCoreScheme_pk",
          "title": "Latimer Core Scheme (Primary Key)",
          "description": "A unique identifier for an ltc:LatimerCoreScheme.",
          "notes": "The value in this field MAY be changed in aggregation to guarantee uniqueness.",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/latimerCoreSchemeID",
          "rdfs:comment": "A unique identifier for an ltc:LatimerCoreScheme.",
          "constraints": {
            "required": true,
            "unique": true
          }
        },
        {
          "name": "basisOfScheme",
          "title": "Basis Of Scheme",
          "description": "A summary of the basis or purpose for the LatimerCoreScheme.",
          "notes": "This property is intended to summarise the reason for grouping a number of ObjectGroups within the LatimerCoreScheme, and the purpose for which the data is intended to be used. This may also be reflected in the terms and metrics defined using the SchemeTerm and SchemeMeasurementOrFact classes respectively. Using this approach, standard and reusable profiles within the wider Latimer Core standard may be constructed for common collection descriptions use cases.",
          "examples": "`Accession`, `Inventory`, `Expedition`, `Digitisation planning`, `Collections assessment`, `Institution`, `Collections registry`",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/basisOfScheme",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/basisOfScheme-2024-02-28",
          "rdfs:comment": "A summary of the basis or purpose for the LatimerCoreScheme."
        },
        {
          "name": "isDistinctObjects",
          "title": "Is Distinct Objects",
          "description": "A flag to designate whether a physical object may be described by more than one ObjectGroup within the LatimerCoreScheme.",
          "notes": "If isDistinctObjects is set to 'true', then no collection object should be covered by more than one object group within the LatimerCoreScheme. This is important for aggregating and reporting on metrics such as object counts, as it prevents any physical object from being counted more than once.",
          "examples": "`true`, `false`",
          "type": "boolean",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/isDistinctObjects",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/isDistinctObjects-2024-02-28",
          "rdfs:comment": "A flag to designate whether a physical object may be described by more than one ObjectGroup within the LatimerCoreScheme.",
          "constraints": {
            "required": true
          }
        },
        {
          "name": "schemeName",
          "title": "Scheme Name",
          "description": "A short descriptive name given to the LatimerCoreScheme.",
          "notes": "",
          "examples": "`NHM Collections Inventory`, `Index Herbariorum`, `European Darwin Collections`",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/schemeName",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/schemeName-2024-02-28",
          "rdfs:comment": "A short descriptive name given to the LatimerCoreScheme.",
          "constraints": {
            "required": true
          }
        }
      ],
      "primaryKey": "latimerCoreScheme_pk"
    },
    "latimer-core-scheme-identifier": {
      "identifier": "0.1/latimer-core-scheme-identifier",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/latimer-core-scheme-identifier.json",
      "name": "latimer-core-scheme-identifier",
      "title": "Latimer Core Scheme Identifier",
      "description": "An ltc:Identifier related to an ltc:LatimerCoreScheme.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasIdentifier",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasIdentifier-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the Identifier class.",
      "fields": [
        {
          "name": "latimerCoreScheme_fk",
          "title": "Latimer Core Scheme (Foreign Key)",
          "description": "An identifier for an ltc:LatimerCoreScheme.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/latimerCoreSchemeID",
          "rdfs:comment": "A unique identifier for an ltc:LatimerCoreScheme.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "identifier_fk",
          "title": "Identifier (Foreign Key)",
          "description": "An identifier for an ltc:Identifier.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasIdentifier",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasIdentifier-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the Identifier class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "latimerCoreScheme_fk",
          "predicate": "for",
          "reference": {
            "resource": "latimer-core-scheme",
            "fields": "latimerCoreScheme_pk"
          }
        },
        {
          "fields": "identifier_fk",
          "predicate": "has",
          "reference": {
            "resource": "identifier",
            "fields": "identifier_pk"
          }
        }
      ]
    },
    "latimer-core-scheme-object-group": {
      "identifier": "0.1/latimer-core-scheme-object-group",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/latimer-core-scheme-object-group.json",
      "name": "latimer-core-scheme-object-group",
      "title": "Latimer Core Scheme Object Group",
      "description": "An ltc:ObjectGroup related to an ltc:LatimerCoreScheme.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasObjectGroup",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasObjectGroup-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the ObjectGroup class.",
      "fields": [
        {
          "name": "latimerCoreScheme_fk",
          "title": "Latimer Core Scheme (Foreign Key)",
          "description": "An identifier for an ltc:LatimerCoreScheme.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/latimerCoreSchemeID",
          "rdfs:comment": "A unique identifier for an ltc:LatimerCoreScheme.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "objectGroup_fk",
          "title": "Object Group (Foreign Key)",
          "description": "An identifier for an ltc:ObjectGroup.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasObjectGroup",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasObjectGroup-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the ObjectGroup class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "latimerCoreScheme_fk",
          "predicate": "for",
          "reference": {
            "resource": "latimer-core-scheme",
            "fields": "latimerCoreScheme_pk"
          }
        },
        {
          "fields": "objectGroup_fk",
          "predicate": "has",
          "reference": {
            "resource": "object-group",
            "fields": "objectGroup_pk"
          }
        }
      ]
    },
    "latimer-core-scheme-reference": {
      "identifier": "0.1/latimer-core-scheme-reference",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/latimer-core-scheme-reference.json",
      "name": "latimer-core-scheme-reference",
      "title": "Latimer Core Scheme Reference",
      "description": "An ltc:Reference related to an ltc:LatimerCoreScheme.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasReference",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasReference-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the Reference class.",
      "fields": [
        {
          "name": "latimerCoreScheme_fk",
          "title": "Latimer Core Scheme (Foreign Key)",
          "description": "An identifier for an ltc:LatimerCoreScheme.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/latimerCoreSchemeID",
          "rdfs:comment": "A unique identifier for an ltc:LatimerCoreScheme.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "reference_fk",
          "title": "Reference (Foreign Key)",
          "description": "An identifier for an ltc:Reference.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasReference",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasReference-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the Reference class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "latimerCoreScheme_fk",
          "predicate": "for",
          "reference": {
            "resource": "latimer-core-scheme",
            "fields": "latimerCoreScheme_pk"
          }
        },
        {
          "fields": "reference_fk",
          "predicate": "has",
          "reference": {
            "resource": "reference",
            "fields": "reference_pk"
          }
        }
      ]
    },
    "measurement-or-fact": {
      "identifier": "0.1/measurement-or-fact",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/measurement-or-fact.json",
      "name": "measurement-or-fact",
      "title": "Measurement or Fact",
      "description": "A measurement of or fact about a class within the standard, or a relationship between the ObjectGroup and an associated class.",
      "notes": "This class can be used to apply measurements, facts or narratives to the ObjectGroup as a whole, or used to qualify the relationship between the ObjectGroup and an associated attribute. For example, an ObjectGroup may contain 100 objects, of which 40 are from Europe and 60 from Africa. In this example, one MeasurementOrFact (count of 100) would be attached to the ObjectGroup, and one to each of the two relationships between the ObjectGroup and GeographicContext (Europe: count of 40, Africa: count of 60).",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/MeasurementOrFact",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/MeasurementOrFact-2024-02-28",
      "rdfs:comment": "A measurement of or fact about a class within the standard, or a relationship between the ObjectGroup and an associated class.",
      "fields": [
        {
          "name": "measurementOrFact_pk",
          "title": "Measurement or Fact (Primary Key)",
          "description": "A unique identifier for an ltc:MeasurementOrFact.",
          "notes": "The value in this field MAY be changed in aggregation to guarantee uniqueness.",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/measurementOrFactID",
          "rdfs:comment": "A unique identifier for an ltc:MeasurementOrFact.",
          "constraints": {
            "required": true,
            "unique": true
          }
        },
        {
          "name": "measurementAccuracy",
          "title": "Measurement Accuracy",
          "description": "The description of the potential error associated with the measurementValue.",
          "notes": "The description of the potential error associated with the measurementValue applied to the collection.",
          "examples": "`0.01`, `Normal distribution with variation of 2 m`, `Reported`, `Estimated`",
          "type": "string",
          "format": "default",
          "namespace": "dwc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/dwc/terms/measurementAccuracy",
          "rdfs:comment": "The description of the potential error associated with the measurementValue."
        },
        {
          "name": "measurementDerivation",
          "title": "Measurement Derivation",
          "description": "An indicator as to whether the measurement, fact, characteristic, or assertion being applied to the collection was derived from reported figures or aggregated/calculated from underlying data.",
          "notes": "If there is more detailed information about the method by which a measurement or fact was derived, this should be captured using the measurementMethod property.",
          "examples": "`Reported`, `Calculated`",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/measurementDerivation",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/measurementDerivation-2024-02-28",
          "rdfs:comment": "An indicator as to whether the measurement, fact, characteristic, or assertion being applied to the collection was derived from reported figures or aggregated/calculated from underlying data."
        },
        {
          "name": "measurementFactText",
          "title": "Fact or Narrative Text",
          "description": "The value of the qualitative fact, characteristic, or assertion being made about the collection.",
          "notes": "This property should also be used for storing textual information about the collection within a particular context, such as narratives or comments about digitisation readiness.",
          "examples": "`UV-light`, `Extra large`, `Level 1`, `Re-curation of this collection would be required prior to digitisation, requiring an estimated two weeks of curator time.`",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/measurementFactText",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/measurementFactText-2024-02-28",
          "rdfs:comment": "The value of the qualitative fact, characteristic, or assertion being made about the collection."
        },
        {
          "name": "measurementMethod",
          "title": "Measurement Method",
          "description": "A description of or reference to (publication, IRI) the method or protocol used to determine the measurement, fact, characteristic, or assertion.",
          "notes": "",
          "examples": "`DiSSCo MIDS level`, `LtC Standard Metric`, `https://doi.org/10.5281/zenodo.3465285`",
          "type": "string",
          "format": "default",
          "namespace": "dwc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/dwc/terms/measurementMethod",
          "rdfs:comment": "A description of or reference to (publication, IRI) the method or protocol used to determine the measurement, fact, characteristic, or assertion."
        },
        {
          "name": "measurementRemarks",
          "title": "Measurement Remarks",
          "description": "Comments or notes accompanying the MeasurementOrFact.",
          "notes": "",
          "examples": "`Does not include on-loan material`, `Footprint includes housing`",
          "type": "string",
          "format": "default",
          "namespace": "dwc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/dwc/terms/measurementRemarks",
          "rdfs:comment": "Comments or notes accompanying the MeasurementOrFact."
        },
        {
          "name": "measurementType",
          "title": "Measurement Type",
          "description": "The nature of the measurement, fact, characteristic, or assertion.",
          "notes": "Recommended best practice is to use a controlled vocabulary.",
          "examples": "`Imaged Level Percentage`, `Storage Volume`, `Object Count`, `MIDS-0 Object Count`, `Historical narrative`",
          "type": "string",
          "format": "default",
          "namespace": "dwc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/dwc/terms/measurementType",
          "rdfs:comment": "The nature of the measurement, fact, characteristic, or assertion."
        },
        {
          "name": "measurementUnit",
          "title": "Measurement Unit",
          "description": "The units associated with the measurementValue.",
          "notes": "For some use cases, this property can also be used to reflect the type of value being stored (e.g. a count, or a percentage).",
          "examples": "`mm`, `C`, `km`, `ha`, `count`, `percentage`, `category`",
          "type": "string",
          "format": "default",
          "namespace": "dwc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/dwc/terms/measurementUnit",
          "rdfs:comment": "The units associated with the measurementValue."
        },
        {
          "name": "measurementValue",
          "title": "Measurement Value",
          "description": "The value of the measurement, fact, characteristic, or assertion.",
          "notes": "The numeric value of the quantitative measurement being made about the collection. In the Collection Description standard, this field is constrained to only accept numeric values in order to better support the aggregation of quantitative metrics. For any non-numeric values, and metrics where the scale is a numeral that cannot be used in any calculations the measurementFactText property should be used instead.",
          "examples": "`45`, `20000`, `1`, `14.5`",
          "type": "number",
          "format": "default",
          "namespace": "dwc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/dwc/terms/measurementValue",
          "rdfs:comment": "The value of the measurement, fact, characteristic, or assertion."
        }
      ],
      "primaryKey": "measurementOrFact_pk"
    },
    "measurement-or-fact-identifier": {
      "identifier": "0.1/measurement-or-fact-identifier",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/measurement-or-fact-identifier.json",
      "name": "measurement-or-fact-identifier",
      "title": "Measurement or Fact Identifier",
      "description": "An ltc:Identifier related to an ltc:MeasurementOrFact.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasIdentifier",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasIdentifier-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the Identifier class.",
      "fields": [
        {
          "name": "measurementOrFact_fk",
          "title": "Measurement or Fact (Foreign Key)",
          "description": "An identifier for an ltc:MeasurementOrFact.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/measurementOrFactID",
          "rdfs:comment": "A unique identifier for an ltc:MeasurementOrFact.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "identifier_fk",
          "title": "Identifier (Foreign Key)",
          "description": "An identifier for an ltc:Identifier.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasIdentifier",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasIdentifier-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the Identifier class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "measurementOrFact_fk",
          "predicate": "for",
          "reference": {
            "resource": "measurement-or-fact",
            "fields": "measurementOrFact_pk"
          }
        },
        {
          "fields": "identifier_fk",
          "predicate": "has",
          "reference": {
            "resource": "identifier",
            "fields": "identifier_pk"
          }
        }
      ]
    },
    "measurement-or-fact-reference": {
      "identifier": "0.1/measurement-or-fact-reference",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/measurement-or-fact-reference.json",
      "name": "measurement-or-fact-reference",
      "title": "Measurement or Fact Reference",
      "description": "An ltc:Reference related to an ltc:MeasurementOrFact.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasReference",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasReference-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the Reference class.",
      "fields": [
        {
          "name": "measurementOrFact_fk",
          "title": "Measurement or Fact (Foreign Key)",
          "description": "An identifier for an ltc:MeasurementOrFact.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/measurementOrFactID",
          "rdfs:comment": "A unique identifier for an ltc:MeasurementOrFact.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "reference_fk",
          "title": "Reference (Foreign Key)",
          "description": "An identifier for an ltc:Reference.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasReference",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasReference-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the Reference class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "measurementOrFact_fk",
          "predicate": "for",
          "reference": {
            "resource": "measurement-or-fact",
            "fields": "measurementOrFact_pk"
          }
        },
        {
          "fields": "reference_fk",
          "predicate": "has",
          "reference": {
            "resource": "reference",
            "fields": "reference_pk"
          }
        }
      ]
    },
    "object-classification": {
      "identifier": "0.1/object-classification",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/object-classification.json",
      "name": "object-classification",
      "title": "Object Classification",
      "description": "An informal classification of the type of objects within the ObjectGroup, using a hierarchical structure.",
      "notes": "This class is used to categorise the ObjectGroup according to an informal, self-referential hierarchy. For example, this can be used to create a hierarchy encompassing biological, geological and anthropological collections, where a single formal taxonomy isn't appropriate.",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/ObjectClassification",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/ObjectClassification-2024-02-28",
      "rdfs:comment": "An informal classification of the type of objects within the ObjectGroup, using a hierarchical structure.",
      "fields": [
        {
          "name": "objectClassification_pk",
          "title": "Object Classification (Primary Key)",
          "description": "A unique identifier for an ltc:ObjectClassification.",
          "notes": "The value in this field MAY be changed in aggregation to guarantee uniqueness.",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/objectClassificationID",
          "rdfs:comment": "A unique identifier for an ltc:ObjectClassification.",
          "constraints": {
            "required": true,
            "unique": true
          }
        },
        {
          "name": "objectGroup_fk",
          "title": "Object Group (Foreign Key)",
          "description": "An identifier for an ltc:ObjectGroup.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasObjectClassification",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasObjectClassification-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the ObjectClassification class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "parentObjectClassification_fk",
          "title": "Object Classification (Foreign Key)",
          "description": "An identifier for an ltc:ObjectClassification.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/hasParentObjectClassification",
          "rdfs:comment": "This property refers to one or more related parent instances of the ObjectClassification class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "isTopParent",
          "title": "Is Top Parent",
          "description": "A flag to indicate that the current instance of ObjectClassification is at the top of the hierarchy represented by multiple nested instances of the class.",
          "notes": "If this term is used, it should be set to `true` in the instance of ObjectClassification which represents the highest level of a hierarchy and `false` in the rest. If the direction of the hierarchy is self-evident or otherwise not notable, this term should not be populated.",
          "examples": "`true`, `false`",
          "type": "boolean",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/isTopParent",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/isTopParent-2024-02-28",
          "rdfs:comment": "A flag to indicate that the current instance of ObjectClassification is at the top of the hierarchy represented by multiple nested instances of the class."
        },
        {
          "name": "objectClassificationLevel",
          "title": "Object Classification Level",
          "description": "The level of the ObjectClassification in the hierarchy.",
          "notes": "It is up to the user to name the levels to be relevant to the hierarchical classification scheme that they are defining.",
          "examples": "`Domain`, `Discipline`, `Category`",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/objectClassificationLevel",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/objectClassificationLevel-2024-02-28",
          "rdfs:comment": "The level of the ObjectClassification in the hierarchy."
        },
        {
          "name": "objectClassificationName",
          "title": "Object Classification Name",
          "description": "A short title describing this ObjectClassification as a class, unit or grouping.",
          "notes": "This is a user-determined name given for classifying their collection. This name, expressing an assigned classification, can be part of a self-referential hierarchy. Use of a controlled vocabulary is recommended, e.g. The GBIF ObjectClassification vocabulary https://registry.gbif.org/vocabulary/ObjectClassificationName",
          "examples": "`Zoology invertebrates`, `Palaeontology`, `Extra-terrestrial`, `Archaeology`, `Seed plants`, `Birds`, `Agriculture`, `Veterinary`, `Viruses`",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/objectClassificationName",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/objectClassificationName-2024-02-28",
          "rdfs:comment": "A short title describing this ObjectClassification as a class, unit or grouping.",
          "constraints": {
            "required": true
          }
        }
      ],
      "primaryKey": "objectClassification_pk",
      "foreignKeys": [
        {
          "fields": "objectGroup_fk",
          "predicate": "for",
          "reference": {
            "resource": "object-group",
            "fields": "objectGroup_pk"
          }
        },
        {
          "fields": "parentObjectClassification_fk",
          "predicate": "part of",
          "reference": {
            "resource": "",
            "fields": "objectClassification_pk"
          }
        }
      ]
    },
    "object-classification-identifier": {
      "identifier": "0.1/object-classification-identifier",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/object-classification-identifier.json",
      "name": "object-classification-identifier",
      "title": "Object Classification Identifier",
      "description": "An ltc:Identifier related to an ltc:ObjectClassification.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasIdentifier",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasIdentifier-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the Identifier class.",
      "fields": [
        {
          "name": "objectClassification_fk",
          "title": "Object Classification (Foreign Key)",
          "description": "An identifier for an ltc:ObjectClassification.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/objectClassificationID",
          "rdfs:comment": "A unique identifier for an ltc:ObjectClassification.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "identifier_fk",
          "title": "Identifier (Foreign Key)",
          "description": "An identifier for an ltc:Identifier.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasIdentifier",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasIdentifier-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the Identifier class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "objectClassification_fk",
          "predicate": "for",
          "reference": {
            "resource": "object-classification",
            "fields": "objectClassification_pk"
          }
        },
        {
          "fields": "identifier_fk",
          "predicate": "has",
          "reference": {
            "resource": "identifier",
            "fields": "identifier_pk"
          }
        }
      ]
    },
    "object-classification-measurement-or-fact": {
      "identifier": "0.1/object-classification-measurement-or-fact",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/object-classification-measurement-or-fact.json",
      "name": "object-classification-measurement-or-fact",
      "title": "Object Classification Measurement or Fact",
      "description": "An ltc:MeasurementOrFact related to an ltc:ObjectClassification.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasMeasurementOrFact",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasMeasurementOrFact-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the MeasurementOrFact class.",
      "fields": [
        {
          "name": "objectClassification_fk",
          "title": "Object Classification (Foreign Key)",
          "description": "An identifier for an ltc:ObjectClassification.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/objectClassificationID",
          "rdfs:comment": "A unique identifier for an ltc:ObjectClassification.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "measurementOrFact_fk",
          "title": "Measurement or Fact (Foreign Key)",
          "description": "An identifier for an ltc:MeasurementOrFact.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasMeasurementOrFact",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasMeasurementOrFact-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the MeasurementOrFact class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "objectClassification_fk",
          "predicate": "for",
          "reference": {
            "resource": "object-classification",
            "fields": "objectClassification_pk"
          }
        },
        {
          "fields": "measurementOrFact_fk",
          "predicate": "has",
          "reference": {
            "resource": "measurement-or-fact",
            "fields": "measurementOrFact_pk"
          }
        }
      ]
    },
    "object-classification-reference": {
      "identifier": "0.1/object-classification-reference",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/object-classification-reference.json",
      "name": "object-classification-reference",
      "title": "Object Classification Reference",
      "description": "An ltc:Reference related to an ltc:ObjectClassification.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasReference",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasReference-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the Reference class.",
      "fields": [
        {
          "name": "objectClassification_fk",
          "title": "Object Classification (Foreign Key)",
          "description": "An identifier for an ltc:ObjectClassification.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/objectClassificationID",
          "rdfs:comment": "A unique identifier for an ltc:ObjectClassification.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "reference_fk",
          "title": "Reference (Foreign Key)",
          "description": "An identifier for an ltc:Reference.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasReference",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasReference-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the Reference class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "objectClassification_fk",
          "predicate": "for",
          "reference": {
            "resource": "object-classification",
            "fields": "objectClassification_pk"
          }
        },
        {
          "fields": "reference_fk",
          "predicate": "has",
          "reference": {
            "resource": "reference",
            "fields": "reference_pk"
          }
        }
      ]
    },
    "object-group": {
      "identifier": "0.1/object-group",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/object-group.json",
      "name": "object-group",
      "title": "Object Group",
      "description": "An intentionally grouped set of objects with one or more common characteristics.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/ObjectGroup",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/ObjectGroup-2024-02-28",
      "rdfs:comment": "An intentionally grouped set of objects with one or more common characteristics.",
      "fields": [
        {
          "name": "objectGroup_pk",
          "title": "Object Group (Primary Key)",
          "description": "A unique identifier for an ltc:ObjectGroup.",
          "notes": "The value in this field MAY be changed in aggregation to guarantee uniqueness.",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/objectGroupID",
          "rdfs:comment": "A unique identifier for an ltc:ObjectGroup.",
          "constraints": {
            "required": true,
            "unique": true
          }
        },
        {
          "name": "alternativeCollectionName",
          "title": "Alternative Collection Name",
          "description": "One or more short titles different to the one given in ObjectGroup.collectionName used to summarise the collection objects contained within the ObjectGroup.",
          "notes": "",
          "examples": "`Darwin's fossil mammal collection`, `The Hubricht Molluscan Collection`",
          "type": "array",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/alternativeCollectionName",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/alternativeCollectionName-2024-02-28",
          "rdfs:comment": "One or more short titles different to the one given in ObjectGroup.collectionName used to summarise the collection objects contained within the ObjectGroup."
        },
        {
          "name": "baseTypeOfObjectGroup",
          "title": "Base Type Of Object Group",
          "description": "High-level terms describing the fundamental nature of objects in the ObjectGroup.",
          "notes": "For natural history collections baseTypeOfObjectGroup describes types of material entities and may constrain the values available in objectType. Notes for ObjectGroups where baseTypeOfObjectGroup is 'InformationArtefact': subsequent ‘type’ properties could include hierarchical Audubon Core/Dublin Core terms – e.g. dc:type (http://purl.org/dc/elements/1.1/type), ac:subtype / ac:subtypeLiteral (http://rs.tdwg.org/ac/terms/subtypeLiteral), or (proposed) ac:3DResourceType.",
          "examples": "`MaterialEntity`, `InformationArtefact`, `AbstractConcept`",
          "type": "array",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/baseTypeOfObjectGroup",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/baseTypeOfObjectGroup-2024-02-28",
          "rdfs:comment": "High-level terms describing the fundamental nature of objects in the ObjectGroup.",
          "constraints": {
            "required": true
          }
        },
        {
          "name": "collectionManagementSystem",
          "title": "Collection Management System",
          "description": "The collection management system which is used to hold and manage the primary data for the objects contained within the ObjectGroup.",
          "notes": "This should reflect the system or database in which the object-level records reside, rather than the source of the Collection Description data.",
          "examples": "`Specify 7`, `DINA`, `Axiell EMu`, `Arctos`, `EarthCape`, `BRAHMS`",
          "type": "array",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/collectionManagementSystem",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/collectionManagementSystem-2024-02-28",
          "rdfs:comment": "The collection management system which is used to hold and manage the primary data for the objects contained within the ObjectGroup."
        },
        {
          "name": "collectionName",
          "title": "Collection Name",
          "description": "A short title that summarises the collection objects contained within the ObjectGroup.",
          "notes": "",
          "examples": "`The Leslie Hubricht Molluscan Collection`, `NHM Algae, Fungi and Plants collection`, `Crustacea – Cirripedes, Decapoda`, `Global Mesozoic and Paleozoic mollusc faunas/samples`",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/collectionName",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/collectionName-2024-02-28",
          "rdfs:comment": "A short title that summarises the collection objects contained within the ObjectGroup."
        },
        {
          "name": "conditionsOfAccess",
          "title": "Conditions of Access",
          "description": "Information about who can access the collection being described or an indication of its security status.",
          "notes": "If available, this should be a URL to a stable policy page. For example, https://www.fieldmuseum.org/science/research/area/fossils-meteorites/fossils-meteorites-policies.",
          "examples": "`Open to the public`",
          "type": "array",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/conditionsOfAccess",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/conditionsOfAccess-2024-02-28",
          "rdfs:comment": "Information about who can access the collection being described or an indication of its security status."
        },
        {
          "name": "degreeOfEstablishment",
          "title": "Degree of Establishment",
          "description": "The degree to which an Organism survives, reproduces, and expands its range at the given place and time.",
          "notes": "Some preserved collections are specifically created from cultivated or captive organisms, or perhaps from rare vagrants. Recommended best practice is to use controlled value strings from the controlled vocabulary designated for use with this term, listed at http://rs.tdwg.org/dwc/doc/doe/. For details, refer to https://doi.org/10.3897/biss.3.38084.",
          "examples": "`native`, `captive`, `cultivated`, `released`, `failing`, `casual`, `reproducing`, `established`, `colonising`, `invasive`, `widespreadInvasive`",
          "type": "array",
          "format": "default",
          "namespace": "dwc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/dwc/terms/degreeOfEstablishment",
          "dcterms:references": "http://rs.tdwg.org/dwc/terms/version/degreeOfEstablishment-2023-06-28",
          "rdfs:comment": "The degree to which a dwc:Organism survives, reproduces, and expands its range at the given place and time."
        },
        {
          "name": "description",
          "title": "Description",
          "description": "A free text description or narrative about the collection.",
          "notes": "Use this field to record information about the collection in a human-readable, narrative style to introduce the main characteristics of the collection to someone unfamiliar to it. It may include additional information or re-state information held elsewhere in the collection description record - for example, for more atomic, categorised textual descriptions and narratives the MeasurementOrFact class should be used.",
          "examples": "`The Chicago Academy of Sciences holds material documenting the biodiversity of Midwest / Western Great Lakes region from the 1830s to the present, and includes comparative and historic material collected across North America. These collections include zoology, botany, earth sciences, cultural, audiovisual, and archives. The institutional collection code CHAS was used historically to reference vertebrate and malacology collections at the Academy and was designated as the primary collection code for all the collections.`",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/description",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/description-2024-02-28",
          "rdfs:comment": "A free text description or narrative about the collection."
        },
        {
          "name": "discipline",
          "title": "Discipline",
          "description": "A high level classification of the scientific discipline to which the objects within the collection belong or are related.",
          "notes": "The recommendation is to use a controlled vocabulary that is also common across other community collections, object and occurrence standards. Suggested list https://confluence.egi.eu/display/EGIG/Scientific+Disciplines",
          "examples": "`Anthropology`, `Botany`, `Extraterrestrial`, `Geology`, `Microorganisms`, `Other geo/biodiversity`, `Palaeontology`, `Virology`, `Zoology invertebrates`, `Zoology vertebrates`, `Unspecified`",
          "type": "array",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/discipline",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/discipline-2024-02-28",
          "rdfs:comment": "A high level classification of the scientific discipline to which the objects within the collection belong or are related."
        },
        {
          "name": "isCurrentCollection",
          "title": "Is Current Collection",
          "description": "A flag to indicate whether the collection still exists as a single entity.",
          "notes": "Use this to indicate if the record describes the entirety of a known historical collection. If only part of the collection is present the value is 'false'.",
          "examples": "`true` `false`",
          "type": "boolean",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/isCurrentCollection",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/isCurrentCollection-2024-02-28",
          "rdfs:comment": "A flag to indicate whether the collection still exists as a single entity."
        },
        {
          "name": "isKnownToContainTypes",
          "title": "Is Known To Contain Types",
          "description": "Flag property to indicate that the collection is known to include type specimens.",
          "notes": "`true` - this collection contains types; `false` - this collections does not contain types",
          "examples": "`true` `false`",
          "type": "boolean",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/isKnownToContainTypes",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/isKnownToContainTypes-2024-02-28",
          "rdfs:comment": "Flag property to indicate that the collection is known to include type specimens."
        },
        {
          "name": "material",
          "title": "Material",
          "description": "Material denotes the raw substance(s) from which the object is formed, in whole or in part.",
          "notes": "This definition maps roughly to the concept of E57 'material' from the CIDOC CRM: https://cidoc-crm.org/Entity/E57-Material/version-7.1.1. The object, or artefact could contain biological parts, for example jewellery made of amber with insects in, or cloaks made of bird feathers. It should not be used for taxonomic identifications.",
          "examples": "`Biological body`, `Organism material (cp. objectType = `Organism product`)`, `Viable cells`, `Protein`, `RNA`, `DNA`, etc.",
          "type": "array",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/material",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/material-2024-02-28",
          "rdfs:comment": "Material denotes the raw substance(s) from which the object is formed, in whole or in part."
        },
        {
          "name": "objectType",
          "title": "Object Type",
          "description": "High-level terms for the classification of curated objects.",
          "notes": "A more generic classification of items in the collection than described in preparationType. Hands-on, practical attributes classifying the stored curated objects. You will expect to find these kinds and types of objects when you go to and access their storage location. This should not be used for classifying objects by taxon. The best way to do that is to use the Taxon class (formal taxonomy and vernacular names) or ObjectClassification class (informal classification).",
          "examples": "if baseTypeOfObjectGroup = `MaterialEntity`: `Specimen`, `Tissue`, `Culture`, `HTS Library`, `Lysate`, `Environmental sample`, `Extracted/Preserved DNA/RNA`, `Microscope slide`, `Spore print`, `Macrofossil`, `Mesofossil`, `Microfossil`, `Oversized fossil`; if typeOfObjectGroup = `Non-biological`: `Macro-object`, `Micro-object`, `Oversized object`, `Cut/polished gemstone`, `Core`, `Fluid`, `Hazardous material/object`, `Mixed`; if baseTypeOfObjectGroup = `InformationArtefact`: `Text`, `Audio`, `Visual`",
          "type": "array",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/objectType",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/objectType-2024-02-28",
          "rdfs:comment": "High-level terms for the classification of curated objects."
        },
        {
          "name": "period",
          "title": "Period",
          "description": "Used to describe prehistoric or historic periods.",
          "notes": "Used to describe the prehistoric or historic period from which objects in the collection originated. Often used to describe prehistoric or historic periods, but also geopolitical units and activities of settlements are regarded as special cases of Period. However, there are no assumptions about the scale of the associated phenomena. In particular all events are seen as synthetic processes consisting of coherent phenomena. This property maps to the Period class of the CIDOC-CRM conceptual reference model (http://www.cidoc-crm.org/Entity/e4-period/version-7.1.1).",
          "examples": "`Neolithic Period`, `Ming Dynasty`, `McCarthy Era`",
          "type": "array",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/period",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/period-2024-02-28",
          "rdfs:comment": "Used to describe prehistoric or historic periods."
        },
        {
          "name": "preparationType",
          "title": "Preparation Type",
          "description": "A term used to classify or describe an object that indicates the actions that have been taken upon it and/or the processes it has been put through to prepare it for scientific use or study.",
          "notes": "A more specific classification of items in the collection than described in objectType. These attributes commonly identify the parts or states that are the outcome of the preparation process, which produced the curated object. This can be the same as PreservationMethod (e.g. Bone), but is not always. For cultural collections terms such as 'bowl', 'textile' are appropriate at this level. This should not be used for classifying objects by taxon. The best way to do that is to use the Taxon class (formal taxonomy and vernacular names) or ObjectClassification class (informal classification).",
          "examples": "if objectType = `Specimen` or `Part of entity`: `Bones`, `Eggs`, `Pollen`, `Muscle`, `Leaf`, `Blood`, `Skins`, `Shells`, `Wood`, ... ; if typeOfObjectGroup = `human-made`: `Bowl`, `Textile`, ...; if typeOfObjectGroup = `digital`: `txt`, `jpg`, `mp4`, ...; etc",
          "type": "array",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/preparationType",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/preparationType-2024-02-28",
          "rdfs:comment": "A term used to classify or describe an object that indicates the actions that have been taken upon it and/or the processes it has been put through to prepare it for scientific use or study."
        },
        {
          "name": "preservationMethod",
          "title": "Preservation Method",
          "description": "A term used to classify or describe an object that indicates the primary or most recent action, measure or process that has been used in order to preserve the objects in the collection for long-term storage.",
          "notes": "For the purposes of a collection description preservationType should be used to describe the larger collection Preservation method generally describes the final storage state. Not intended to be used as the fossilization method. Use preservationMode for that. This field is intended to be use where a collection has a single or prominent preservationMethod. We recommend the Arctos PART_PRESERVATION vocabulary (https://arctos.database.museum/info/ctDocumentation.cfm?table=CTPART_PRESERVATION). For herbarium sheets use 'dried_pressed'. If an alcohol collection uses mixed percentages use 'alcohol'.",
          "examples": "`dried`, `dried_pressed`, `dried_pinned`, `Dried assemblage`, `Dried - not assembled`, `Dry preserved`, `papered/packaged`, `slide box`, `Skeletonized`, `Tanned`, `mounted`, `Slide mount`, `Embedded`, `gum_arabic`, `Blood sampling cards (biomedical)`, `Fluid preserved`, `Alcohol, formaledhyde`, `glycerin`, `EDTA`, `frozen / cryopreserved`, `Cryopreserved / frozen - 80C`, `refrigerated`, `freeze_dried`, `Surface coating`, `SEM stub`, `Stasis`, `cell culture`, `axenic culture`, `viable cells`, `Controlled atmosphere`, `Climate controlled conditions`, `Non climate controlled conditions`, `no_treatment`, etc.",
          "type": "array",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/preservationMethod",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/preservationMethod-2024-02-28",
          "rdfs:comment": "A term used to classify or describe an object that indicates the primary or most recent action, measure or process that has been used in order to preserve the objects in the collection for long-term storage."
        },
        {
          "name": "preservationMode",
          "title": "Preservation Mode",
          "description": "The means by which a palaeontological specimen was preserved or created e.g. body, cast, mold, trace fossil, soft parts mineralised etc.",
          "notes": "Use to describe the preservation mode of a collection as a whole (e.g. Amber collection). This property should be only used in association with ObjectGroups that contain paleontological material. It is aligned with the concept of preservationMode in ABCD(EFG) (https://efg.geocase.eu/documentation/html/efg.html#element_PreservationMode_Link03032878).",
          "examples": "`adpression/compression`, `body`, `cast`, `charcoalification`, `coalified`, `concretion`, `dissolution traces`, `mold/impression`, `permineralised`, `recrystallised`, `soft parts`, `trace`",
          "type": "array",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/preservationMode",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/preservationMode-2024-02-28",
          "rdfs:comment": "The means by which a palaeontological specimen was preserved or created e.g. body, cast, mold, trace fossil, soft parts mineralised etc."
        },
        {
          "name": "typeOfObjectGroup",
          "title": "Type Of Object Group",
          "description": "Additional information that describes the object(s) in the collection.",
          "notes": "High-level information that enables the finding of the group and/or its object(s) in searches by users on the web using attributes commonly of interest. Recommended best practice is to use a controlled vocabulary. Terms such as soil, pollen, faeces, muscle, genomic DNA are currently put in preparationType.",
          "examples": "if baseTypeOfObjectGroup = `MaterialEntity`: `Living`, `Preserved`, `Fossilized`, `Non-biological`, `Human-made`; if baseTypeOfObjectGroup = `InformationArtefact`: `Digital`, `Physical`",
          "type": "array",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/typeOfObjectGroup",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/typeOfObjectGroup-2024-02-28",
          "rdfs:comment": "Additional information that describes the object(s) in the collection."
        }
      ],
      "primaryKey": "objectGroup_pk"
    },
    "object-group-ecological-context": {
      "identifier": "0.1/object-group-ecological-context",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/object-group-ecological-context.json",
      "name": "object-group-ecological-context",
      "title": "Object Group Ecological Context",
      "description": "An ltc:EcologicalContext related to an ltc:ObjectGroup.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasEcologicalContext",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasEcologicalContext-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the EcologicalContext class.",
      "fields": [
        {
          "name": "objectGroup_fk",
          "title": "Object Group (Foreign Key)",
          "description": "An identifier for an ltc:ObjectGroup.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/objectGroupID",
          "rdfs:comment": "A unique identifier for an ltc:ObjectGroup.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "ecologicalContext_fk",
          "title": "Ecological Context (Foreign Key)",
          "description": "An identifier for an ltc:EcologicalContext.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasEcologicalContext",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasEcologicalContext-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the EcologicalContext class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "objectGroup_fk",
          "predicate": "for",
          "reference": {
            "resource": "object-group",
            "fields": "objectGroup_pk"
          }
        },
        {
          "fields": "ecologicalContext_fk",
          "predicate": "has",
          "reference": {
            "resource": "ecological-context",
            "fields": "ecologicalContext_pk"
          }
        }
      ]
    },
    "object-group-geographic-context": {
      "identifier": "0.1/object-group-geographic-context",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/object-group-geographic-context.json",
      "name": "object-group-geographic-context",
      "title": "Object Group Geographic Context",
      "description": "An ltc:GeographicContext related to an ltc:ObjectGroup.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasGeographicContext",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasGeographicContext-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the GeographicContext class.",
      "fields": [
        {
          "name": "objectGroup_fk",
          "title": "Object Group (Foreign Key)",
          "description": "An identifier for an ltc:ObjectGroup.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/objectGroupID",
          "rdfs:comment": "A unique identifier for an ltc:ObjectGroup.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "geographicContext_fk",
          "title": "Geographic Context (Foreign Key)",
          "description": "An identifier for an ltc:GeographicContext.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasGeographicContext",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasGeographicContext-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the GeographicContext class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "objectGroup_fk",
          "predicate": "for",
          "reference": {
            "resource": "object-group",
            "fields": "objectGroup_pk"
          }
        },
        {
          "fields": "geographicContext_fk",
          "predicate": "has",
          "reference": {
            "resource": "geographic-context",
            "fields": "geographicContext_pk"
          }
        }
      ]
    },
    "object-group-identifier": {
      "identifier": "0.1/object-group-identifier",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/object-group-identifier.json",
      "name": "object-group-identifier",
      "title": "Object Group Identifier",
      "description": "An ltc:Identifier related to an ltc:ObjectGroup.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasIdentifier",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasIdentifier-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the Identifier class.",
      "fields": [
        {
          "name": "objectGroup_fk",
          "title": "Object Group (Foreign Key)",
          "description": "An identifier for an ltc:ObjectGroup.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/objectGroupID",
          "rdfs:comment": "A unique identifier for an ltc:ObjectGroup.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "identifier_fk",
          "title": "Identifier (Foreign Key)",
          "description": "An identifier for an ltc:Identifier.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasIdentifier",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasIdentifier-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the Identifier class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "objectGroup_fk",
          "predicate": "for",
          "reference": {
            "resource": "object-group",
            "fields": "objectGroup_pk"
          }
        },
        {
          "fields": "identifier_fk",
          "predicate": "has",
          "reference": {
            "resource": "identifier",
            "fields": "identifier_pk"
          }
        }
      ]
    },
    "object-group-measurement-or-fact": {
      "identifier": "0.1/object-group-measurement-or-fact",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/object-group-measurement-or-fact.json",
      "name": "object-group-measurement-or-fact",
      "title": "Object Group Measurement or Fact",
      "description": "An ltc:MeasurementOrFact related to an ltc:ObjectGroup.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasMeasurementOrFact",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasMeasurementOrFact-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the MeasurementOrFact class.",
      "fields": [
        {
          "name": "objectGroup_fk",
          "title": "Object Group (Foreign Key)",
          "description": "An identifier for an ltc:ObjectGroup.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/objectGroupID",
          "rdfs:comment": "A unique identifier for an ltc:ObjectGroup.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "measurementOrFact_fk",
          "title": "Measurement or Fact (Foreign Key)",
          "description": "An identifier for an ltc:MeasurementOrFact.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasMeasurementOrFact",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasMeasurementOrFact-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the MeasurementOrFact class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "objectGroup_fk",
          "predicate": "for",
          "reference": {
            "resource": "object-group",
            "fields": "objectGroup_pk"
          }
        },
        {
          "fields": "measurementOrFact_fk",
          "predicate": "has",
          "reference": {
            "resource": "measurement-or-fact",
            "fields": "measurementOrFact_pk"
          }
        }
      ]
    },
    "object-group-person-role": {
      "identifier": "0.1/object-group-person-role",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/object-group-person-role.json",
      "name": "object-group-person-role",
      "title": "Object Group Person Role",
      "description": "An ltc:PersonRole related to an ltc:ObjectGroup.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasPersonRole",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasPersonRole-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the PersonRole class.",
      "fields": [
        {
          "name": "objectGroup_fk",
          "title": "Object Group (Foreign Key)",
          "description": "An identifier for an ltc:ObjectGroup.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/objectGroupID",
          "rdfs:comment": "A unique identifier for an ltc:ObjectGroup.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "personRole_fk",
          "title": "Person Role (Foreign Key)",
          "description": "An identifier for an ltc:PersonRole.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasPersonRole",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasPersonRole-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the PersonRole class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "objectGroup_fk",
          "predicate": "for",
          "reference": {
            "resource": "object-group",
            "fields": "objectGroup_pk"
          }
        },
        {
          "fields": "personRole_fk",
          "predicate": "has",
          "reference": {
            "resource": "person-role",
            "fields": "personRole_pk"
          }
        }
      ]
    },
    "object-group-reference": {
      "identifier": "0.1/object-group-reference",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/object-group-reference.json",
      "name": "object-group-reference",
      "title": "Object Group Reference",
      "description": "An ltc:Reference related to an ltc:ObjectGroup.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasReference",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasReference-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the Reference class.",
      "fields": [
        {
          "name": "objectGroup_fk",
          "title": "Object Group (Foreign Key)",
          "description": "An identifier for an ltc:ObjectGroup.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/objectGroupID",
          "rdfs:comment": "A unique identifier for an ltc:ObjectGroup.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "reference_fk",
          "title": "Reference (Foreign Key)",
          "description": "An identifier for an ltc:Reference.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasReference",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasReference-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the Reference class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "objectGroup_fk",
          "predicate": "for",
          "reference": {
            "resource": "object-group",
            "fields": "objectGroup_pk"
          }
        },
        {
          "fields": "reference_fk",
          "predicate": "has",
          "reference": {
            "resource": "reference",
            "fields": "reference_pk"
          }
        }
      ]
    },
    "object-group-resource-relationship": {
      "identifier": "0.1/object-group-resource-relationship",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/object-group-resource-relationship.json",
      "name": "object-group-resource-relationship",
      "title": "Object Group Resource Relationship",
      "description": "An ltc:ResourceRelationship related to an ltc:ObjectGroup.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasResourceRelationship",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasResourceRelationship-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the ResourceRelationship class.",
      "fields": [
        {
          "name": "objectGroup_fk",
          "title": "Object Group (Foreign Key)",
          "description": "An identifier for an ltc:ObjectGroup.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/objectGroupID",
          "rdfs:comment": "A unique identifier for an ltc:ObjectGroup.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "resourceRelationship_fk",
          "title": "Resource Relationship (Foreign Key)",
          "description": "An identifier for an ltc:ResourceRelationship.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasResourceRelationship",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasResourceRelationship-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the ResourceRelationship class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "objectGroup_fk",
          "predicate": "for",
          "reference": {
            "resource": "object-group",
            "fields": "objectGroup_pk"
          }
        },
        {
          "fields": "resourceRelationship_fk",
          "predicate": "has",
          "reference": {
            "resource": "resource-relationship",
            "fields": "resourceRelationship_pk"
          }
        }
      ]
    },
    "organisational-unit": {
      "identifier": "0.1/organisational-unit",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/organisational-unit.json",
      "name": "organisational-unit",
      "title": "Organisational Unit",
      "description": "A unit within an organisational hierarchy which may be at, above or below the institutional level.",
      "notes": "This class can represent any level of organisational unit, incorporating institutions (e.g. a museum), higher units (e.g. a university to which a museum belongs) and more detailed structures (e.g the departments and divisions within a museum). It can be used to arrange these different units at different levels into a hierarchical structure. This class combines aspects of both class org:Organization (https://www.w3.org/TR/2014/REC-vocab-org-20140116/#org:Organization) and class org:OrganizationalUnit (https://www.w3.org/TR/2014/REC-vocab-org-20140116/#org:OrganizationalUnit) from the W3C Organization Ontology ORG (https://www.w3.org/TR/2014/REC-vocab-org-20140116/#overview-of-ontology). Recommended best practice is to associate a unique, persistent organisational identifier (PID) with each created organisational unit. This will allow an unambiguous and continual identification of the unit, as well as the creation of organisational hierarchies. Existing providers of PIDs for organisations are, e.g. https://grid.ac/ and https://ror.org/. The provision of organisational PIDs might be extended to intra-organisational units in the future. Properties of Class: Identifier can be used to add identifier information for organisational units.",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/OrganisationalUnit",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/OrganisationalUnit-2024-02-28",
      "rdfs:comment": "A unit within an organisational hierarchy which may be at, above or below the institutional level.",
      "fields": [
        {
          "name": "organisationalUnit_pk",
          "title": "Organisational Unit (Primary Key)",
          "description": "A unique identifier for an ltc:OrganisationalUnit.",
          "notes": "The value in this field MAY be changed in aggregation to guarantee uniqueness.",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/organisationalUnitID",
          "rdfs:comment": "A unique identifier for an ltc:OrganisationalUnit.",
          "constraints": {
            "required": true,
            "unique": true
          }
        },
        {
          "name": "objectGroup_fk",
          "title": "Object Group (Foreign Key)",
          "description": "An identifier for an ltc:ObjectGroup.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasOrganisationalUnit",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasOrganisationalUnit-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the OrganisationalUnit class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "parentOrganisationalUnit_fk",
          "title": "Organisational Unit (Foreign Key)",
          "description": "An identifier for an ltc:OrganisationalUnit.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasParentOrganisationalUnit",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasParentOrganisationalUnit-2024-02-28",
          "rdfs:comment": "This property refers to one or more related parent instances of the OrganisationalUnit class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "organisationalUnitName",
          "title": "Organisational Unit Name",
          "description": "An official name of the organisational unit in the local language.",
          "notes": "Repeatable where there are more than one official local language required for example Belgian Institutions where an official name exists in French, Dutch, German and English. See 'A Collection of Crosswalks from Fifteen Research Data Schemas to Schema.org' (https://www.rd-alliance.org/group/research-metadata-schemas-wg/outcomes/collection-crosswalks-fifteen-research-data-schemas) from RDA for crosswalks for properties with the function of Name, Title, etc. Take into account the note at the class level (Class:OrganisationalUnit) about associating an identifier in addition to a name with the organisational unit.",
          "examples": "`Muséum national d'Histoire naturelle`, `The Field Museum of Natural History`, `Division of Fishes`",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/organisationalUnitName",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/organisationalUnitName-2024-02-28",
          "rdfs:comment": "An official name of the organisational unit in the local language.",
          "constraints": {
            "required": true
          }
        },
        {
          "name": "organisationalUnitType",
          "title": "Organisational Unit Type",
          "description": "The type or level of organisational unit within a hierarchy responsible for the management of the collection being described.",
          "notes": "Example vocabulary list: https://vocab.org/aiiso/ . This property is likely related to the W3C class org:Role (https://www.w3.org/TR/2014/REC-vocab-org-20140116/#class-role).",
          "examples": "`Department` (A group of people recognised by an organization as forming a cohesive group referred to by the organization as a department), `Division` (A group of people recognised by an organization as forming a cohesive group referred to by the organization as a division)",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/organisationalUnitType",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/organisationalUnitType-2024-02-28",
          "rdfs:comment": "The type or level of organisational unit within a hierarchy responsible for the management of the collection being described.",
          "constraints": {
            "required": true
          }
        }
      ],
      "primaryKey": "organisationalUnit_pk",
      "foreignKeys": [
        {
          "fields": "objectGroup_fk",
          "predicate": "for",
          "reference": {
            "resource": "object-group",
            "fields": "objectGroup_pk"
          }
        },
        {
          "fields": "parentOrganisationalUnit_fk",
          "predicate": "part of",
          "reference": {
            "resource": "",
            "fields": "organisationalUnit_pk"
          }
        }
      ]
    },
    "organisational-unit-address": {
      "identifier": "0.1/organisational-unit-address",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/organisational-unit-address.json",
      "name": "organisational-unit-address",
      "title": "Organisational Unit Address",
      "description": "An ltc:Address related to an ltc:OrganisationalUnit.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasAddress",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasAddress-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the Address class.",
      "fields": [
        {
          "name": "organisationalUnit_fk",
          "title": "Organisational Unit (Foreign Key)",
          "description": "An identifier for an ltc:OrganisationalUnit.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/organisationalUnitID",
          "rdfs:comment": "A unique identifier for an ltc:OrganisationalUnit.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "address_fk",
          "title": "Address (Foreign Key)",
          "description": "An identifier for an ltc:Address.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasAddress",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasAddress-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the Address class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "organisationalUnit_fk",
          "predicate": "for",
          "reference": {
            "resource": "organisational-unit",
            "fields": "organisationalUnit_pk"
          }
        },
        {
          "fields": "address_fk",
          "predicate": "has",
          "reference": {
            "resource": "address",
            "fields": "address_pk"
          }
        }
      ]
    },
    "organisational-unit-contact-detail": {
      "identifier": "0.1/organisational-unit-contact-detail",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/organisational-unit-contact-detail.json",
      "name": "organisational-unit-contact-detail",
      "title": "Organisational Unit Contact Detail",
      "description": "An ltc:ContactDetail related to an ltc:OrganisationalUnit.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasContactDetail",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasContactDetail-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the ContactDetail class.",
      "fields": [
        {
          "name": "organisationalUnit_fk",
          "title": "Organisational Unit (Foreign Key)",
          "description": "An identifier for an ltc:OrganisationalUnit.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/organisationalUnitID",
          "rdfs:comment": "A unique identifier for an ltc:OrganisationalUnit.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "contactDetail_fk",
          "title": "Contact Detail (Foreign Key)",
          "description": "An identifier for an ltc:ContactDetail.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasContactDetail",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasContactDetail-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the ContactDetail class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "organisationalUnit_fk",
          "predicate": "for",
          "reference": {
            "resource": "organisational-unit",
            "fields": "organisationalUnit_pk"
          }
        },
        {
          "fields": "contactDetail_fk",
          "predicate": "has",
          "reference": {
            "resource": "contact-detail",
            "fields": "contactDetail_pk"
          }
        }
      ]
    },
    "organisational-unit-identifier": {
      "identifier": "0.1/organisational-unit-identifier",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/organisational-unit-identifier.json",
      "name": "organisational-unit-identifier",
      "title": "Organisational Unit Identifier",
      "description": "An ltc:Identifier related to an ltc:OrganisationalUnit.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasIdentifier",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasIdentifier-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the Identifier class.",
      "fields": [
        {
          "name": "organisationalUnit_fk",
          "title": "Organisational Unit (Foreign Key)",
          "description": "An identifier for an ltc:OrganisationalUnit.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/organisationalUnitID",
          "rdfs:comment": "A unique identifier for an ltc:OrganisationalUnit.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "identifier_fk",
          "title": "Identifier (Foreign Key)",
          "description": "An identifier for an ltc:Identifier.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasIdentifier",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasIdentifier-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the Identifier class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "organisationalUnit_fk",
          "predicate": "for",
          "reference": {
            "resource": "organisational-unit",
            "fields": "organisationalUnit_pk"
          }
        },
        {
          "fields": "identifier_fk",
          "predicate": "has",
          "reference": {
            "resource": "identifier",
            "fields": "identifier_pk"
          }
        }
      ]
    },
    "organisational-unit-measurement-or-fact": {
      "identifier": "0.1/organisational-unit-measurement-or-fact",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/organisational-unit-measurement-or-fact.json",
      "name": "organisational-unit-measurement-or-fact",
      "title": "Organisational Unit Measurement or Fact",
      "description": "An ltc:MeasurementOrFact related to an ltc:OrganisationalUnit.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasMeasurementOrFact",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasMeasurementOrFact-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the MeasurementOrFact class.",
      "fields": [
        {
          "name": "organisationalUnit_fk",
          "title": "Organisational Unit (Foreign Key)",
          "description": "An identifier for an ltc:OrganisationalUnit.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/organisationalUnitID",
          "rdfs:comment": "A unique identifier for an ltc:OrganisationalUnit.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "measurementOrFact_fk",
          "title": "Measurement or Fact (Foreign Key)",
          "description": "An identifier for an ltc:MeasurementOrFact.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasMeasurementOrFact",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasMeasurementOrFact-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the MeasurementOrFact class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "organisationalUnit_fk",
          "predicate": "for",
          "reference": {
            "resource": "organisational-unit",
            "fields": "organisationalUnit_pk"
          }
        },
        {
          "fields": "measurementOrFact_fk",
          "predicate": "has",
          "reference": {
            "resource": "measurement-or-fact",
            "fields": "measurementOrFact_pk"
          }
        }
      ]
    },
    "organisational-unit-person-role": {
      "identifier": "0.1/organisational-unit-person-role",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/organisational-unit-person-role.json",
      "name": "organisational-unit-person-role",
      "title": "Organisational Unit Person Role",
      "description": "An ltc:PersonRole related to an ltc:OrganisationalUnit.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasPersonRole",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasPersonRole-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the PersonRole class.",
      "fields": [
        {
          "name": "organisationalUnit_fk",
          "title": "Organisational Unit (Foreign Key)",
          "description": "An identifier for an ltc:OrganisationalUnit.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/organisationalUnitID",
          "rdfs:comment": "A unique identifier for an ltc:OrganisationalUnit.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "personRole_fk",
          "title": "Person Role (Foreign Key)",
          "description": "An identifier for an ltc:PersonRole.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasPersonRole",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasPersonRole-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the PersonRole class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "organisationalUnit_fk",
          "predicate": "for",
          "reference": {
            "resource": "organisational-unit",
            "fields": "organisationalUnit_pk"
          }
        },
        {
          "fields": "personRole_fk",
          "predicate": "has",
          "reference": {
            "resource": "person-role",
            "fields": "personRole_pk"
          }
        }
      ]
    },
    "organisational-unit-reference": {
      "identifier": "0.1/organisational-unit-reference",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/organisational-unit-reference.json",
      "name": "organisational-unit-reference",
      "title": "Organisational Unit Reference",
      "description": "An ltc:Reference related to an ltc:OrganisationalUnit.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasReference",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasReference-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the Reference class.",
      "fields": [
        {
          "name": "organisationalUnit_fk",
          "title": "Organisational Unit (Foreign Key)",
          "description": "An identifier for an ltc:OrganisationalUnit.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/organisationalUnitID",
          "rdfs:comment": "A unique identifier for an ltc:OrganisationalUnit.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "reference_fk",
          "title": "Reference (Foreign Key)",
          "description": "An identifier for an ltc:Reference.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasReference",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasReference-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the Reference class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "organisationalUnit_fk",
          "predicate": "for",
          "reference": {
            "resource": "organisational-unit",
            "fields": "organisationalUnit_pk"
          }
        },
        {
          "fields": "reference_fk",
          "predicate": "has",
          "reference": {
            "resource": "reference",
            "fields": "reference_pk"
          }
        }
      ]
    },
    "person": {
      "identifier": "0.1/person",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/person.json",
      "name": "person",
      "title": "Person",
      "description": "A person (alive, dead, undead, or fictional).",
      "notes": "A person (alive or dead). This concept should map to the Schema.org Person class (https://schema.org/Person), and the prov:Person class (http://www.w3.org/ns/prov#Person) in the PROV ontology. In the latter, it is a subclass of prov:Agent, which through which it can map to the RDA recommendations on attribution (http://dx.doi.org/10.15497/RDA00029). The definition is appropriated from the Schema.org class.",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/Person",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/Person-2024-02-28",
      "rdfs:comment": "A person (alive, dead, undead, or fictional).",
      "fields": [
        {
          "name": "person_pk",
          "title": "Person (Primary Key)",
          "description": "A unique identifier for an ltc:Person.",
          "notes": "The value in this field MAY be changed in aggregation to guarantee uniqueness.",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/personID",
          "rdfs:comment": "A unique identifier for an ltc:Person.",
          "constraints": {
            "required": true,
            "unique": true
          }
        },
        {
          "name": "additionalName",
          "title": "Additional Name",
          "description": "An additional name for a Person, can be used for a middle name.",
          "notes": "",
          "examples": "`Stewart`, `Grace`, `Manthey`, `Kwame`",
          "type": "string",
          "format": "default",
          "namespace": "schema",
          "dcterms:isVersionOf": "https://schema.org/additionalName",
          "rdfs:comment": "An additional name for a Person, can be used for a middle name."
        },
        {
          "name": "familyName",
          "title": "Family Name",
          "description": "Family name. In the U.S., the last name of a Person.",
          "notes": "",
          "examples": "`Jones`, `Keita`, `O'Rourke`, `Carreño Quiñones`",
          "type": "string",
          "format": "default",
          "namespace": "schema",
          "dcterms:isVersionOf": "https://schema.org/familyName",
          "rdfs:comment": "Family name. In the U.S., the last name of a Person."
        },
        {
          "name": "fullName",
          "title": "Full Name",
          "description": "String of the preferred form of personal name for displaying.",
          "notes": "",
          "examples": "`James Ewert Bradshaw`, `T. van Hooijdonk`",
          "type": "string",
          "format": "default",
          "namespace": "abcd",
          "dcterms:isVersionOf": "http://rs.tdwg.org/abcd/terms/fullName",
          "rdfs:comment": "String of the preferred form of personal name for displaying."
        },
        {
          "name": "givenName",
          "title": "Given Name",
          "description": "Given name. In the U.S., the first name of a Person.",
          "notes": "",
          "examples": "`Beth`, `John`, `María José`, `Björn`",
          "type": "string",
          "format": "default",
          "namespace": "schema",
          "dcterms:isVersionOf": "https://schema.org/givenName",
          "rdfs:comment": "Given name. In the U.S., the first name of a Person."
        }
      ],
      "primaryKey": "person_pk"
    },
    "person-address": {
      "identifier": "0.1/person-address",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/person-address.json",
      "name": "person-address",
      "title": "Person Address",
      "description": "An ltc:Address related to an ltc:Person.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasAddress",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasAddress-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the Address class.",
      "fields": [
        {
          "name": "person_fk",
          "title": "Person (Foreign Key)",
          "description": "An identifier for an ltc:Person.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/personID",
          "rdfs:comment": "A unique identifier for an ltc:Person.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "address_fk",
          "title": "Address (Foreign Key)",
          "description": "An identifier for an ltc:Address.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasAddress",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasAddress-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the Address class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "person_fk",
          "predicate": "for",
          "reference": {
            "resource": "person",
            "fields": "person_pk"
          }
        },
        {
          "fields": "address_fk",
          "predicate": "has",
          "reference": {
            "resource": "address",
            "fields": "address_pk"
          }
        }
      ]
    },
    "person-contact-detail": {
      "identifier": "0.1/person-contact-detail",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/person-contact-detail.json",
      "name": "person-contact-detail",
      "title": "Person Contact Detail",
      "description": "An ltc:ContactDetail related to an ltc:Person.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasContactDetail",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasContactDetail-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the ContactDetail class.",
      "fields": [
        {
          "name": "person_fk",
          "title": "Person (Foreign Key)",
          "description": "An identifier for an ltc:Person.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/personID",
          "rdfs:comment": "A unique identifier for an ltc:Person.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "contactDetail_fk",
          "title": "Contact Detail (Foreign Key)",
          "description": "An identifier for an ltc:ContactDetail.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasContactDetail",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasContactDetail-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the ContactDetail class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "person_fk",
          "predicate": "for",
          "reference": {
            "resource": "person",
            "fields": "person_pk"
          }
        },
        {
          "fields": "contactDetail_fk",
          "predicate": "has",
          "reference": {
            "resource": "contact-detail",
            "fields": "contactDetail_pk"
          }
        }
      ]
    },
    "person-identifier": {
      "identifier": "0.1/person-identifier",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/person-identifier.json",
      "name": "person-identifier",
      "title": "Person Identifier",
      "description": "An ltc:Identifier related to an ltc:Person.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasIdentifier",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasIdentifier-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the Identifier class.",
      "fields": [
        {
          "name": "person_fk",
          "title": "Person (Foreign Key)",
          "description": "An identifier for an ltc:Person.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/personID",
          "rdfs:comment": "A unique identifier for an ltc:Person.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "identifier_fk",
          "title": "Identifier (Foreign Key)",
          "description": "An identifier for an ltc:Identifier.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasIdentifier",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasIdentifier-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the Identifier class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "person_fk",
          "predicate": "for",
          "reference": {
            "resource": "person",
            "fields": "person_pk"
          }
        },
        {
          "fields": "identifier_fk",
          "predicate": "has",
          "reference": {
            "resource": "identifier",
            "fields": "identifier_pk"
          }
        }
      ]
    },
    "person-measurement-or-fact": {
      "identifier": "0.1/person-measurement-or-fact",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/person-measurement-or-fact.json",
      "name": "person-measurement-or-fact",
      "title": "Person Measurement or Fact",
      "description": "An ltc:MeasurementOrFact related to an ltc:Person.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasMeasurementOrFact",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasMeasurementOrFact-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the MeasurementOrFact class.",
      "fields": [
        {
          "name": "person_fk",
          "title": "Person (Foreign Key)",
          "description": "An identifier for an ltc:Person.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/personID",
          "rdfs:comment": "A unique identifier for an ltc:Person.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "measurementOrFact_fk",
          "title": "Measurement or Fact (Foreign Key)",
          "description": "An identifier for an ltc:MeasurementOrFact.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasMeasurementOrFact",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasMeasurementOrFact-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the MeasurementOrFact class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "person_fk",
          "predicate": "for",
          "reference": {
            "resource": "person",
            "fields": "person_pk"
          }
        },
        {
          "fields": "measurementOrFact_fk",
          "predicate": "has",
          "reference": {
            "resource": "measurement-or-fact",
            "fields": "measurementOrFact_pk"
          }
        }
      ]
    },
    "person-reference": {
      "identifier": "0.1/person-reference",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/person-reference.json",
      "name": "person-reference",
      "title": "Person Reference",
      "description": "An ltc:Reference related to an ltc:Person.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasReference",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasReference-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the Reference class.",
      "fields": [
        {
          "name": "person_fk",
          "title": "Person (Foreign Key)",
          "description": "An identifier for an ltc:Person.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/personID",
          "rdfs:comment": "A unique identifier for an ltc:Person.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "reference_fk",
          "title": "Reference (Foreign Key)",
          "description": "An identifier for an ltc:Reference.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasReference",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasReference-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the Reference class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "person_fk",
          "predicate": "for",
          "reference": {
            "resource": "person",
            "fields": "person_pk"
          }
        },
        {
          "fields": "reference_fk",
          "predicate": "has",
          "reference": {
            "resource": "reference",
            "fields": "reference_pk"
          }
        }
      ]
    },
    "person-role": {
      "identifier": "0.1/person-role",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/person-role.json",
      "name": "person-role",
      "title": "Person Role",
      "description": "A qualified association between a Person or OrganisationalUnit and an entity such as an ObjectGroup or MeasurementOrFact that enables the relationship to be contextualised with a specific role and time period.",
      "notes": "This class is aligned with the prov:qualifiedAttribution property (http://www.w3.org/ns/prov#qualifiedAttribution). It should be used instead of the Activity and PersonActivity classes to link a Person or OrganisationalUnit to an entity in situations where an activity is not know or is irrelevant, for example for describing a person's role within an organisation. It is not mandatory to link to either a Person or a Role in this class, to support use cases where a role is known but the person who fulfilled it is not, and where a person is known to have been involved but the context is not. However, it's expected that at least one of the hasPerson and hasRole properties is populated.",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/PersonRole",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/PersonRole-2024-02-28",
      "rdfs:comment": "A qualified association between a Person or OrganisationalUnit and an entity such as an ObjectGroup or MeasurementOrFact that enables the relationship to be contextualised with a specific role and time period.",
      "fields": [
        {
          "name": "personRole_pk",
          "title": "Person Role (Primary Key)",
          "description": "A unique identifier for an ltc:PersonRole.",
          "notes": "The value in this field MAY be changed in aggregation to guarantee uniqueness.",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/personRoleID",
          "rdfs:comment": "A unique identifier for an ltc:PersonRole.",
          "constraints": {
            "required": true,
            "unique": true
          }
        },
        {
          "name": "person_fk",
          "title": "Person (Foreign Key)",
          "description": "An identifier for an ltc:Person.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasPerson",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasPerson-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the Person class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "role_fk",
          "title": "Role (Foreign Key)",
          "description": "An identifier for an ltc:Role.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasRole",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasRole-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the Role class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "primaryKey": "personRole_pk",
      "foreignKeys": [
        {
          "fields": "person_fk",
          "predicate": "role holder",
          "reference": {
            "resource": "person",
            "fields": "person_pk"
          }
        },
        {
          "fields": "role_fk",
          "predicate": "has",
          "reference": {
            "resource": "role",
            "fields": "role_pk"
          }
        }
      ]
    },
    "person-role-address": {
      "identifier": "0.1/person-role-address",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/person-role-address.json",
      "name": "person-role-address",
      "title": "Person Role Address",
      "description": "An ltc:Address related to an ltc:PersonRole.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasAddress",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasAddress-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the Address class.",
      "fields": [
        {
          "name": "personRole_fk",
          "title": "Person Role (Foreign Key)",
          "description": "An identifier for an ltc:PersonRole.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/personRoleID",
          "rdfs:comment": "A unique identifier for an ltc:PersonRole.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "address_fk",
          "title": "Address (Foreign Key)",
          "description": "An identifier for an ltc:Address.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasAddress",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasAddress-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the Address class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "personRole_fk",
          "predicate": "for",
          "reference": {
            "resource": "person-role",
            "fields": "personRole_pk"
          }
        },
        {
          "fields": "address_fk",
          "predicate": "has",
          "reference": {
            "resource": "address",
            "fields": "address_pk"
          }
        }
      ]
    },
    "person-role-contact-detail": {
      "identifier": "0.1/person-role-contact-detail",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/person-role-contact-detail.json",
      "name": "person-role-contact-detail",
      "title": "Person Role Contact Detail",
      "description": "An ltc:ContactDetail related to an ltc:PersonRole.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasContactDetail",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasContactDetail-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the ContactDetail class.",
      "fields": [
        {
          "name": "personRole_fk",
          "title": "Person Role (Foreign Key)",
          "description": "An identifier for an ltc:PersonRole.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/personRoleID",
          "rdfs:comment": "A unique identifier for an ltc:PersonRole.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "contactDetail_fk",
          "title": "Contact Detail (Foreign Key)",
          "description": "An identifier for an ltc:ContactDetail.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasContactDetail",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasContactDetail-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the ContactDetail class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "personRole_fk",
          "predicate": "for",
          "reference": {
            "resource": "person-role",
            "fields": "personRole_pk"
          }
        },
        {
          "fields": "contactDetail_fk",
          "predicate": "has",
          "reference": {
            "resource": "contact-detail",
            "fields": "contactDetail_pk"
          }
        }
      ]
    },
    "person-role-identifier": {
      "identifier": "0.1/person-role-identifier",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/person-role-identifier.json",
      "name": "person-role-identifier",
      "title": "Person Role Identifier",
      "description": "An ltc:Identifier related to an ltc:PersonRole.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasIdentifier",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasIdentifier-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the Identifier class.",
      "fields": [
        {
          "name": "personRole_fk",
          "title": "Person Role (Foreign Key)",
          "description": "An identifier for an ltc:PersonRole.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/personRoleID",
          "rdfs:comment": "A unique identifier for an ltc:PersonRole.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "identifier_fk",
          "title": "Identifier (Foreign Key)",
          "description": "An identifier for an ltc:Identifier.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasIdentifier",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasIdentifier-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the Identifier class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "personRole_fk",
          "predicate": "for",
          "reference": {
            "resource": "person-role",
            "fields": "personRole_pk"
          }
        },
        {
          "fields": "identifier_fk",
          "predicate": "has",
          "reference": {
            "resource": "identifier",
            "fields": "identifier_pk"
          }
        }
      ]
    },
    "person-role-measurement-or-fact": {
      "identifier": "0.1/person-role-measurement-or-fact",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/person-role-measurement-or-fact.json",
      "name": "person-role-measurement-or-fact",
      "title": "Person Role Measurement or Fact",
      "description": "An ltc:MeasurementOrFact related to an ltc:PersonRole.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasMeasurementOrFact",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasMeasurementOrFact-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the MeasurementOrFact class.",
      "fields": [
        {
          "name": "personRole_fk",
          "title": "Person Role (Foreign Key)",
          "description": "An identifier for an ltc:PersonRole.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/personRoleID",
          "rdfs:comment": "A unique identifier for an ltc:PersonRole.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "measurementOrFact_fk",
          "title": "Measurement or Fact (Foreign Key)",
          "description": "An identifier for an ltc:MeasurementOrFact.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasMeasurementOrFact",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasMeasurementOrFact-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the MeasurementOrFact class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "personRole_fk",
          "predicate": "for",
          "reference": {
            "resource": "person-role",
            "fields": "personRole_pk"
          }
        },
        {
          "fields": "measurementOrFact_fk",
          "predicate": "has",
          "reference": {
            "resource": "measurement-or-fact",
            "fields": "measurementOrFact_pk"
          }
        }
      ]
    },
    "person-role-reference": {
      "identifier": "0.1/person-role-reference",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/person-role-reference.json",
      "name": "person-role-reference",
      "title": "Person Role Reference",
      "description": "An ltc:Reference related to an ltc:PersonRole.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasReference",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasReference-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the Reference class.",
      "fields": [
        {
          "name": "personRole_fk",
          "title": "Person Role (Foreign Key)",
          "description": "An identifier for an ltc:PersonRole.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/personRoleID",
          "rdfs:comment": "A unique identifier for an ltc:PersonRole.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "reference_fk",
          "title": "Reference (Foreign Key)",
          "description": "An identifier for an ltc:Reference.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasReference",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasReference-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the Reference class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "personRole_fk",
          "predicate": "for",
          "reference": {
            "resource": "person-role",
            "fields": "personRole_pk"
          }
        },
        {
          "fields": "reference_fk",
          "predicate": "has",
          "reference": {
            "resource": "reference",
            "fields": "reference_pk"
          }
        }
      ]
    },
    "person-role-temporal-coverage": {
      "identifier": "0.1/person-role-temporal-coverage",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/person-role-temporal-coverage.json",
      "name": "person-role-temporal-coverage",
      "title": "Person Role Temporal Coverage",
      "description": "An ltc:TemporalCoverage related to an ltc:PersonRole.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasTemporalCoverage",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasTemporalCoverage-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the TemporalCoverage class.",
      "fields": [
        {
          "name": "personRole_fk",
          "title": "Person Role (Foreign Key)",
          "description": "An identifier for an ltc:PersonRole.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/personRoleID",
          "rdfs:comment": "A unique identifier for an ltc:PersonRole.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "temporalCoverage_fk",
          "title": "Temporal Coverage (Foreign Key)",
          "description": "An identifier for an ltc:TemporalCoverage.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasTemporalCoverage",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasTemporalCoverage-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the TemporalCoverage class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "personRole_fk",
          "predicate": "for",
          "reference": {
            "resource": "person-role",
            "fields": "personRole_pk"
          }
        },
        {
          "fields": "temporalCoverage_fk",
          "predicate": "has",
          "reference": {
            "resource": "temporal-coverage",
            "fields": "temporalCoverage_pk"
          }
        }
      ]
    },
    "record-level": {
      "identifier": "0.1/record-level",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/record-level.json",
      "name": "record-level",
      "title": "Record Level",
      "description": "The machine-actionable information profile for the collection description digital object.",
      "notes": "Linked to the RDA PID Kernel recommendation (https://www.rd-alliance.org/system/files/RDA%20Recommendation%20on%20PID%20Kernel%20Information_final.pdf)",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/RecordLevel",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/RecordLevel-2024-02-28",
      "rdfs:comment": "The machine-actionable information profile for the collection description digital object.",
      "fields": [
        {
          "name": "recordLevel_pk",
          "title": "Record Level (Primary Key)",
          "description": "A unique identifier for an ltc:RecordLevel.",
          "notes": "The value in this field MAY be changed in aggregation to guarantee uniqueness.",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/recordLevelID",
          "rdfs:comment": "A unique identifier for an ltc:RecordLevel.",
          "constraints": {
            "required": true,
            "unique": true
          }
        },
        {
          "name": "isDerivedCollection",
          "title": "Is Derived Collection",
          "description": "A flag to indicate that the collection description has been generated by aggregating data from one or more underlying datasets of its individual objects.",
          "notes": "If `true`, the LtC record has been wholly generated through the synthesis of existing digital records, such as by a programmatic aggregation of specimen records. If `false`, the LtC record is known to have been generated through some other method, such as in response to an institutional survey. Leaving this field blank indicates that the method used to construct the record is unknown or has yet to be recorded.",
          "examples": "`true`, `false`",
          "type": "boolean",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/isDerivedCollection",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/isDerivedCollection-2024-02-28",
          "rdfs:comment": "A flag to indicate that the collection description has been generated by aggregating data from one or more underlying datasets of its individual objects."
        },
        {
          "name": "license",
          "title": "License",
          "description": "A legal document giving official permission to do something with the resource.",
          "notes": "A legal document giving official permission to do something with the collection description record. Recommended practice is to identify the license document with a IRI. If this is not possible or feasible, a literal value that identifies the license may be provided.",
          "examples": "`https://creativecommons.org/licenses/by/4.0/`, `https://creativecommons.org/publicdomain/zero/1.0/`, `https://creativecommons.org/licenses/by/4.0/legalcode`, `https://opendatacommons.org/licenses/by/1.0/`, `http://unlicense.org/`",
          "type": "string",
          "format": "default",
          "namespace": "dcterms",
          "dcterms:isVersionOf": "http://purl.org/dc/terms/license",
          "rdfs:comment": "A legal document giving official permission to do something with the resource.",
          "constraints": {
            "required": true
          }
        },
        {
          "name": "rights",
          "title": "Rights",
          "description": "Information about rights held in and over the resource.",
          "notes": "A statement of any rights held in/over the collection description record. Typically, rights information includes a statement about various property rights associated with the resource, including intellectual property rights. Recommended practice is to refer to a rights statement with a IRI. If this is not possible or feasible, a literal value (name, label, or short text) may be provided.",
          "examples": "`http://scratchpads.eu/about/policies/termsandconditions`, `All rights reserved by DataOwner Ltd.`",
          "type": "string",
          "format": "default",
          "namespace": "dc",
          "dcterms:isVersionOf": "http://purl.org/dc/elements/1.1/rights",
          "rdfs:comment": "Information about rights held in and over the resource. A full-text, readable copyright statement, as required by the national legislation of the copyright holder. On collections, this applies to all contained objects, unless the object itself has a different statement. Examples: “Copyright XY 2008, all rights reserved”, “© 2008 XY Museum” , `Public Domain.`; `Copyright unknown.` Do not place just the name of the copyright holder(s) here! That belongs in a list in the xmpRights:Owner field, which should be supplied if dc:rights is not 'Public Domain', which is appropriate only if the resource is known to be not under copyright. See also the entry for dcterms:rights in this document and see the DCMI FAQ on DC and DCTERMS Namespaces for discussion of the rationale for terms in two namespaces. Normal practice is to use the same Label if both are provided. Labels have no effect on information discovery and are only suggestions."
        },
        {
          "name": "rightsHolder",
          "title": "Rights Holder",
          "description": "A person or organization owning or managing rights over the resource.",
          "notes": "A person or organization owning or managing rights held in/over the collection description record. Recommended practice is to refer to the rights holder with a IRI. If this is not possible or feasible, a literal value that identifies the rights holder may be provided.",
          "examples": "`Smith, Clare`, `Natural History Museum, London`, `https://orcid.org/XXXX-XXXX-XXXX-XXXX`, `https://ror.org/XXaaaXXXX`",
          "type": "string",
          "format": "default",
          "namespace": "dcterms",
          "dcterms:isVersionOf": "http://purl.org/dc/terms/rightsHolder",
          "rdfs:comment": "A person or organization owning or managing rights over the resource."
        }
      ],
      "primaryKey": "recordLevel_pk"
    },
    "record-level-identifier": {
      "identifier": "0.1/record-level-identifier",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/record-level-identifier.json",
      "name": "record-level-identifier",
      "title": "Record Level Identifier",
      "description": "An ltc:Identifier related to an ltc:RecordLevel.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasIdentifier",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasIdentifier-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the Identifier class. Every RecordLevel class must contain at least one Identifier, preferably a PID.",
      "fields": [
        {
          "name": "recordLevel_fk",
          "title": "Record Level (Foreign Key)",
          "description": "An identifier for an ltc:RecordLevel.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/recordLevelID",
          "rdfs:comment": "A unique identifier for an ltc:RecordLevel.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "identifier_fk",
          "title": "Identifier (Foreign Key)",
          "description": "An identifier for an ltc:Identifier.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasIdentifier",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasIdentifier-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the Identifier class. Every RecordLevel class must contain at least one Identifier, preferably a PID.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "recordLevel_fk",
          "predicate": "for",
          "reference": {
            "resource": "record-level",
            "fields": "recordLevel_pk"
          }
        },
        {
          "fields": "identifier_fk",
          "predicate": "has",
          "reference": {
            "resource": "identifier",
            "fields": "identifier_pk"
          }
        }
      ]
    },
    "record-level-object-group": {
      "identifier": "0.1/record-level-object-group",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/record-level-object-group.json",
      "name": "record-level-object-group",
      "title": "Record Level Object Group",
      "description": "An ltc:ObjectGroup related to an ltc:RecordLevel.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasObjectGroup",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasObjectGroup-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the ObjectGroup class.",
      "fields": [
        {
          "name": "recordLevel_fk",
          "title": "Record Level (Foreign Key)",
          "description": "An identifier for an ltc:RecordLevel.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/recordLevelID",
          "rdfs:comment": "A unique identifier for an ltc:RecordLevel.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "objectGroup_fk",
          "title": "Object Group (Foreign Key)",
          "description": "An identifier for an ltc:ObjectGroup.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasObjectGroup",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasObjectGroup-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the ObjectGroup class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "recordLevel_fk",
          "predicate": "for",
          "reference": {
            "resource": "record-level",
            "fields": "recordLevel_pk"
          }
        },
        {
          "fields": "objectGroup_fk",
          "predicate": "has",
          "reference": {
            "resource": "object-group",
            "fields": "objectGroup_pk"
          }
        }
      ]
    },
    "record-level-person-role": {
      "identifier": "0.1/record-level-person-role",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/record-level-person-role.json",
      "name": "record-level-person-role",
      "title": "Record Level Person Role",
      "description": "An ltc:PersonRole related to an ltc:RecordLevel.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasPersonRole",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasPersonRole-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the PersonRole class.",
      "fields": [
        {
          "name": "recordLevel_fk",
          "title": "Record Level (Foreign Key)",
          "description": "An identifier for an ltc:RecordLevel.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/recordLevelID",
          "rdfs:comment": "A unique identifier for an ltc:RecordLevel.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "personRole_fk",
          "title": "Person Role (Foreign Key)",
          "description": "An identifier for an ltc:PersonRole.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasPersonRole",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasPersonRole-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the PersonRole class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "recordLevel_fk",
          "predicate": "for",
          "reference": {
            "resource": "record-level",
            "fields": "recordLevel_pk"
          }
        },
        {
          "fields": "personRole_fk",
          "predicate": "has",
          "reference": {
            "resource": "person-role",
            "fields": "personRole_pk"
          }
        }
      ]
    },
    "record-level-reference": {
      "identifier": "0.1/record-level-reference",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/record-level-reference.json",
      "name": "record-level-reference",
      "title": "Record Level Reference",
      "description": "An ltc:Reference related to an ltc:RecordLevel.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasReference",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasReference-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the Reference class.",
      "fields": [
        {
          "name": "recordLevel_fk",
          "title": "Record Level (Foreign Key)",
          "description": "An identifier for an ltc:RecordLevel.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/recordLevelID",
          "rdfs:comment": "A unique identifier for an ltc:RecordLevel.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "reference_fk",
          "title": "Reference (Foreign Key)",
          "description": "An identifier for an ltc:Reference.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasReference",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasReference-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the Reference class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "recordLevel_fk",
          "predicate": "for",
          "reference": {
            "resource": "record-level",
            "fields": "recordLevel_pk"
          }
        },
        {
          "fields": "reference_fk",
          "predicate": "has",
          "reference": {
            "resource": "reference",
            "fields": "reference_pk"
          }
        }
      ]
    },
    "record-level-resource-relationship": {
      "identifier": "0.1/record-level-resource-relationship",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/record-level-resource-relationship.json",
      "name": "record-level-resource-relationship",
      "title": "Record Level Resource Relationship",
      "description": "An ltc:ResourceRelationship related to an ltc:RecordLevel.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasResourceRelationship",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasResourceRelationship-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the ResourceRelationship class.",
      "fields": [
        {
          "name": "recordLevel_fk",
          "title": "Record Level (Foreign Key)",
          "description": "An identifier for an ltc:RecordLevel.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/recordLevelID",
          "rdfs:comment": "A unique identifier for an ltc:RecordLevel.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "resourceRelationship_fk",
          "title": "Resource Relationship (Foreign Key)",
          "description": "An identifier for an ltc:ResourceRelationship.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasResourceRelationship",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasResourceRelationship-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the ResourceRelationship class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "recordLevel_fk",
          "predicate": "for",
          "reference": {
            "resource": "record-level",
            "fields": "recordLevel_pk"
          }
        },
        {
          "fields": "resourceRelationship_fk",
          "predicate": "has",
          "reference": {
            "resource": "resource-relationship",
            "fields": "resourceRelationship_pk"
          }
        }
      ]
    },
    "reference": {
      "identifier": "0.1/reference",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/reference.json",
      "name": "reference",
      "title": "Reference",
      "description": "A reference to external resources and information related to the class.",
      "notes": "In Latimer Core, this class can be used to store references to publications, policies, datasets and other online resources such as websites, related to classes within the standard.",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/Reference",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/Reference-2024-02-28",
      "rdfs:comment": "A reference to external resources and information related to the class.",
      "fields": [
        {
          "name": "reference_pk",
          "title": "Reference (Primary Key)",
          "description": "A unique identifier for an ltc:Reference.",
          "notes": "The value in this field MAY be changed in aggregation to guarantee uniqueness.",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/referenceID",
          "rdfs:comment": "A unique identifier for an ltc:Reference.",
          "constraints": {
            "required": true,
            "unique": true
          }
        },
        {
          "name": "referenceDetails",
          "title": "Reference Details",
          "description": "Detailed information about the resource being referenced.",
          "notes": "",
          "examples": "`This dataset includes a Darwin Core Archive of the ~8000 specimens digitised to date, of which ~80% also have an associated label image.`, `de Mestier A, Mulcahy D, Harris DJ, et al. (2023) Policies Handbook on Using Molecular Collections. Research Ideas and Outcomes 9: e102908. https://doi.org/10.3897/rio.9.e102908`, `Suggested citation: USDA-ARS US National Fungus Collection (2023). USDA United States National Fungus Collections. Occurrence dataset https://doi.org/10.15468/w78rwb accessed via GBIF.org on 2023-04-27.`",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/referenceDetails",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/referenceDetails-2024-02-28",
          "rdfs:comment": "Detailed information about the resource being referenced."
        },
        {
          "name": "referenceName",
          "title": "Reference Name",
          "description": "A name given to a reference.",
          "notes": "If the reference is to a publication, this field should hold the publication title; otherwise any appropriate, short, text label relevant to the resource being referenced may be used.",
          "examples": "`Digitised specimen records on the NHM Data Portal`, `Using a Collection Health Index to prioritise access and activities in the New Zealand Arthropod Collection`, `BGBM loans policy`, `Herbarium Wikipedia page`, `NMNH website`, `Related sequences in GenBank`",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/referenceName",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/referenceName-2024-02-28",
          "rdfs:comment": "A name given to a reference."
        },
        {
          "name": "referenceType",
          "title": "Reference Type",
          "description": "The type of resource being referenced.",
          "notes": "This property is intended to be used for a high level categorisation of resource types.",
          "examples": "`Policy`, `Document`, `Website`, `Dataset`",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/referenceType",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/referenceType-2024-02-28",
          "rdfs:comment": "The type of resource being referenced."
        },
        {
          "name": "resourceIRI",
          "title": "Resource IRI",
          "description": "A preferably resolvable IRI providing access to the resource defined in the reference.",
          "notes": "",
          "examples": "`10.5072/example-full`, `https://examplemuseum.org/policies/loans-policy.pdf`",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/resourceIRI",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/resourceIRI-2024-02-28",
          "rdfs:comment": "A preferably resolvable IRI providing access to the resource defined in the reference."
        }
      ],
      "primaryKey": "reference_pk"
    },
    "reference-identifier": {
      "identifier": "0.1/reference-identifier",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/reference-identifier.json",
      "name": "reference-identifier",
      "title": "Reference Identifier",
      "description": "An ltc:Identifier related to an ltc:Reference.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasIdentifier",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasIdentifier-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the Identifier class.",
      "fields": [
        {
          "name": "reference_fk",
          "title": "Reference (Foreign Key)",
          "description": "An identifier for an ltc:Reference.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/referenceID",
          "rdfs:comment": "A unique identifier for an ltc:Reference.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "identifier_fk",
          "title": "Identifier (Foreign Key)",
          "description": "An identifier for an ltc:Identifier.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasIdentifier",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasIdentifier-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the Identifier class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "reference_fk",
          "predicate": "for",
          "reference": {
            "resource": "reference",
            "fields": "reference_pk"
          }
        },
        {
          "fields": "identifier_fk",
          "predicate": "has",
          "reference": {
            "resource": "identifier",
            "fields": "identifier_pk"
          }
        }
      ]
    },
    "resource-relationship": {
      "identifier": "0.1/resource-relationship",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/resource-relationship.json",
      "name": "resource-relationship",
      "title": "Resource Relationship",
      "description": "A relationship of one rdfs:Resource (http://www.w3.org/2000/01/rdf-schema#Resource) to another, or to a simple named concept.",
      "notes": "Resources can be thought of as identifiable records or instances of classes and may include, but need not be limited to instances of ltc:ObjectGroup, ltc:OrganisationalUnit, ltc:Taxon, ltc:Event, ltc:GeographicContext, ltc:GeologicalContext, ltc:EcologicalContext, or ltc:ObjectClassification. In the context of Latimer Core, the main purposes of this class are 1. to define different semantic and hierarchical relationships between ObjectGroups, and 2. to support quantified and annotated relationships between ObjectGroups and other LtC classes (such as ltc:Taxon and ltc:GeographicContext) and properties (such as ltc:discipline and ltc:objectType) that describe the contents of the ObjectGroup, using the hasMeasurementOrFact property.",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/ResourceRelationship",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/ResourceRelationship-2024-02-28",
      "rdfs:comment": "A relationship of one rdfs:Resource (http://www.w3.org/2000/01/rdf-schema#Resource) to another, or to a simple named concept.",
      "fields": [
        {
          "name": "resourceRelationship_pk",
          "title": "Resource Relationship (Primary Key)",
          "description": "A unique identifier for an ltc:ResourceRelationship.",
          "notes": "The value in this field MAY be changed in aggregation to guarantee uniqueness.",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/resourceRelationshipID",
          "rdfs:comment": "A unique identifier for an ltc:ResourceRelationship.",
          "constraints": {
            "required": true,
            "unique": true
          }
        },
        {
          "name": "relatedResourceID",
          "title": "Related Resource ID",
          "description": "An identifier for a related resource (the object, rather than the subject of the relationship).",
          "notes": "",
          "examples": "`dc609808-b09b-11e8-96f8-529269fb1459`",
          "type": "string",
          "format": "default",
          "namespace": "dwc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/dwc/terms/relatedResourceID",
          "dcterms:references": "http://rs.tdwg.org/dwc/terms/version/relatedResourceID-2026-05-26",
          "rdfs:comment": "An identifier for the related resource (the object) of a dwc:ResourceRelationship."
        },
        {
          "name": "relatedResourceName",
          "title": "Related Resource Name",
          "description": "A short textual name for the related resource.",
          "notes": "This property can be used to list resources related to the source entity which lack an identifier, for example if a separate record for that resource doesn't yet exist. In the Collection Description standard, a use of this is to list named subcollections of a larger collections at a time when the resources might not be available to create a full Collection Description for each of them. If at a later point a Collection Description record is created for the subcollection, an identifier can be added to the relatedResourceID property to maintain the same relationship.",
          "examples": "`FMNH Mammals`, `TNHC Vertebrates`, `Sloane Herbarium`, `Grant Southwest Ceramics Collection`",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/relatedResourceName",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/relatedResourceName-2024-02-28",
          "rdfs:comment": "A short textual name for the related resource."
        },
        {
          "name": "relatedResourceType",
          "title": "Related Resource Type",
          "description": "The class or property within Latimer Core, or class, property or less formal concept outside of the Latimer Core standard, that is represented by the related resource.",
          "notes": "This property can be used to explicitly define the type of resource that the ID stored in the relatedResourceID property references, either to support IDs that don’t fully resolve and provide contextual metadata, or just for information purposes. It can also provide context for use cases where the relatedResourceName is used rather than the relatedResourceID to define the target, for example to attach a simple list of the names of related collections to an ObjectGroup.",
          "examples": "`http://rs.tdwg.org/ltc/terms/ObjectGroup`, `http://rs.tdwg.org/ltc/terms/Taxon`, `http://rs.tdwg.org/ltc/terms/objectType`, `http://rs.tdwg.org/dwc/terms/Occurrence`,  `Collection`",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/relatedResourceType",
          "rdfs:comment": "The class or property within Latimer Core, or class, property or less formal concept outside of the Latimer Core standard, that is represented by the related resource."
        },
        {
          "name": "relationshipAccordingTo",
          "title": "Relationship According To",
          "description": "The source (person, organization, publication, reference) establishing the relationship between the two resources.",
          "notes": "",
          "examples": "`Julie Woodruff`",
          "type": "array",
          "format": "default",
          "namespace": "dwc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/dwc/terms/relationshipAccordingTo",
          "dcterms:references": "http://rs.tdwg.org/dwc/terms/version/relationshipAccordingTo-2018-09-06",
          "rdfs:comment": "The source (person, organization, publication, reference) establishing the relationship between the two resources."
        },
        {
          "name": "relationshipEstablishedDate",
          "title": "Relationship Established Date",
          "description": "The date-time on which the relationship between the two resources was established.",
          "notes": "Recommended best practice is to use a date that conforms to ISO 8601-1:2019.",
          "examples": "`1963-03-08T14:07-0600`, `2009-02-20T08:40Z`, `2018-08-29T15:19`, `1809-02-12`, `1906-06`, `1971`, `2007-03-01T13:00:00Z/2008-05-11T15:30:00Z`, `1900/1909`, `2007-11-13/15`",
          "type": "string",
          "format": "default",
          "namespace": "dwc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/dwc/terms/relationshipEstablishedDate",
          "dcterms:references": "http://rs.tdwg.org/dwc/terms/version/relationshipEstablishedDate-2025-06-12",
          "rdfs:comment": "The date-time on which the relationship between the two resources was established."
        },
        {
          "name": "relationshipOfResource",
          "title": "Relationship Of Resource",
          "description": "The relationship of the resource identified by relatedResourceID to the subject (optionally identified by the resourceID).",
          "notes": "Recommended best practice is to use a controlled vocabulary. https://schema.org/Property",
          "examples": "`part of`, `contains`, `same as`",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/relationshipOfResource",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/relationshipOfResource-2024-02-28",
          "rdfs:comment": "The relationship of the resource identified by relatedResourceID to the subject (optionally identified by the resourceID).",
          "constraints": {
            "required": true
          }
        },
        {
          "name": "relationshipRemarks",
          "title": "Relationship Remarks",
          "description": "Comments or notes about the relationship between the two resources.",
          "notes": "",
          "examples": "`The Darwin fossil collection makes up part of the museum's palaeontology collection.`, `Some of the same Madagascan bryophytes are included in both of these collections.`",
          "type": "string",
          "format": "default",
          "namespace": "dwc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/dwc/terms/relationshipRemarks",
          "dcterms:references": "http://rs.tdwg.org/dwc/terms/version/relationshipRemarks-2023-06-28",
          "rdfs:comment": "Comments or notes about the relationship between the two resources."
        },
        {
          "name": "resourceID",
          "title": "Resource ID",
          "description": "An identifier for the resource that is the subject of the relationship.",
          "notes": "",
          "examples": "`f809b9e0-b09b-11e8-96f8-529269fb1459`",
          "type": "string",
          "format": "default",
          "namespace": "dwc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/dwc/terms/resourceID",
          "rdfs:comment": "An identifier for the resource that is the subject of the relationship.",
          "constraints": {
            "required": true
          }
        }
      ],
      "primaryKey": "resourceRelationship_pk"
    },
    "resource-relationship-identifier": {
      "identifier": "0.1/resource-relationship-identifier",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/resource-relationship-identifier.json",
      "name": "resource-relationship-identifier",
      "title": "Resource Relationship Identifier",
      "description": "An ltc:Identifier related to an ltc:ResourceRelationship.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasIdentifier",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasIdentifier-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the Identifier class.",
      "fields": [
        {
          "name": "resourceRelationship_fk",
          "title": "Resource Relationship (Foreign Key)",
          "description": "An identifier for an ltc:ResourceRelationship.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/resourceRelationshipID",
          "rdfs:comment": "A unique identifier for an ltc:ResourceRelationship.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "identifier_fk",
          "title": "Identifier (Foreign Key)",
          "description": "An identifier for an ltc:Identifier.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasIdentifier",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasIdentifier-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the Identifier class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "resourceRelationship_fk",
          "predicate": "for",
          "reference": {
            "resource": "resource-relationship",
            "fields": "resourceRelationship_pk"
          }
        },
        {
          "fields": "identifier_fk",
          "predicate": "has",
          "reference": {
            "resource": "identifier",
            "fields": "identifier_pk"
          }
        }
      ]
    },
    "resource-relationship-measurement-or-fact": {
      "identifier": "0.1/resource-relationship-measurement-or-fact",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/resource-relationship-measurement-or-fact.json",
      "name": "resource-relationship-measurement-or-fact",
      "title": "Resource Relationship Measurement or Fact",
      "description": "An ltc:MeasurementOrFact related to an ltc:ResourceRelationship.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasMeasurementOrFact",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasMeasurementOrFact-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the MeasurementOrFact class.",
      "fields": [
        {
          "name": "resourceRelationship_fk",
          "title": "Resource Relationship (Foreign Key)",
          "description": "An identifier for an ltc:ResourceRelationship.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/resourceRelationshipID",
          "rdfs:comment": "A unique identifier for an ltc:ResourceRelationship.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "measurementOrFact_fk",
          "title": "Measurement or Fact (Foreign Key)",
          "description": "An identifier for an ltc:MeasurementOrFact.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasMeasurementOrFact",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasMeasurementOrFact-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the MeasurementOrFact class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "resourceRelationship_fk",
          "predicate": "for",
          "reference": {
            "resource": "resource-relationship",
            "fields": "resourceRelationship_pk"
          }
        },
        {
          "fields": "measurementOrFact_fk",
          "predicate": "has",
          "reference": {
            "resource": "measurement-or-fact",
            "fields": "measurementOrFact_pk"
          }
        }
      ]
    },
    "resource-relationship-reference": {
      "identifier": "0.1/resource-relationship-reference",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/resource-relationship-reference.json",
      "name": "resource-relationship-reference",
      "title": "Resource Relationship Reference",
      "description": "An ltc:Reference related to an ltc:ResourceRelationship.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasReference",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasReference-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the Reference class.",
      "fields": [
        {
          "name": "resourceRelationship_fk",
          "title": "Resource Relationship (Foreign Key)",
          "description": "An identifier for an ltc:ResourceRelationship.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/resourceRelationshipID",
          "rdfs:comment": "A unique identifier for an ltc:ResourceRelationship.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "reference_fk",
          "title": "Reference (Foreign Key)",
          "description": "An identifier for an ltc:Reference.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasReference",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasReference-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the Reference class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "resourceRelationship_fk",
          "predicate": "for",
          "reference": {
            "resource": "resource-relationship",
            "fields": "resourceRelationship_pk"
          }
        },
        {
          "fields": "reference_fk",
          "predicate": "has",
          "reference": {
            "resource": "reference",
            "fields": "reference_pk"
          }
        }
      ]
    },
    "role": {
      "identifier": "0.1/role",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/role.json",
      "name": "role",
      "title": "Role",
      "description": "The function of a Person with respect to an activity or entity.",
      "notes": "While this class contains no mandatory properties, it's recommended that at least one of the roleName and hasIdentifier properties are used to specify the intended role. Where appropriate, the use of controlled vocabularies such as the CRediT contributor roles taxonomy (https://credit.niso.org) is encouraged.",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/Role",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/Role-2024-02-28",
      "rdfs:comment": "The function of a Person with respect to an activity or entity.",
      "fields": [
        {
          "name": "role_pk",
          "title": "Role (Primary Key)",
          "description": "A unique identifier for an ltc:Role.",
          "notes": "The value in this field MAY be changed in aggregation to guarantee uniqueness.",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/roleID",
          "rdfs:comment": "A unique identifier for an ltc:Role.",
          "constraints": {
            "required": true,
            "unique": true
          }
        },
        {
          "name": "roleName",
          "title": "Role Name",
          "description": "A short descriptive name for the role.",
          "notes": "",
          "examples": "`Director`, `Chair`, `Record owner`, `Primary Latimer Core record contact`, `Primary collection contact`, `Owner`, `Curator`, `Collection manager`, `Head of department`, `Registrar`, `Data curation`, `Supervision`, `Collecting`, `Curation`, `Conservation`, `Funding`, `Imaging`",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/roleName",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/roleName-2024-02-28",
          "rdfs:comment": "A short descriptive name for the role."
        }
      ],
      "primaryKey": "role_pk"
    },
    "role-identifier": {
      "identifier": "0.1/role-identifier",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/role-identifier.json",
      "name": "role-identifier",
      "title": "Role Identifier",
      "description": "An ltc:Identifier related to an ltc:Role.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasIdentifier",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasIdentifier-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the Identifier class.",
      "fields": [
        {
          "name": "role_fk",
          "title": "Role (Foreign Key)",
          "description": "An identifier for an ltc:Role.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/roleID",
          "rdfs:comment": "A unique identifier for an ltc:Role.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "identifier_fk",
          "title": "Identifier (Foreign Key)",
          "description": "An identifier for an ltc:Identifier.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasIdentifier",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasIdentifier-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the Identifier class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "role_fk",
          "predicate": "for",
          "reference": {
            "resource": "role",
            "fields": "role_pk"
          }
        },
        {
          "fields": "identifier_fk",
          "predicate": "has",
          "reference": {
            "resource": "identifier",
            "fields": "identifier_pk"
          }
        }
      ]
    },
    "scheme-measurement-or-fact": {
      "identifier": "0.1/scheme-measurement-or-fact",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/scheme-measurement-or-fact.json",
      "name": "scheme-measurement-or-fact",
      "title": "Scheme Measurement Or Fact",
      "description": "A type of measurement or fact used by the LatimerCoreScheme, and the rules relating to its application.",
      "notes": "This class can be used to specify the qualitative and quantitative metrics that will be included in the LatimerCoreScheme using the MeasurementOrFact class, and dictate whether each will be mandatory and/or repeatable. This information can be used by software and queries to constrain and validate the Latimer Core dataset, and determine how and whether metrics can be aggregated and reported. The schemeMeasurementType property should correspond to the measurementType property of the MeasurementOrFact class in order to make the relevant association between the scheme definition and the stored data.",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/SchemeMeasurementOrFact",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/SchemeMeasurementOrFact-2024-02-28",
      "rdfs:comment": "A type of measurement or fact used by the LatimerCoreScheme, and the rules relating to its application.",
      "fields": [
        {
          "name": "schemeMeasurementOrFact_pk",
          "title": "Scheme Measurement Or Fact (Primary Key)",
          "description": "A unique identifier for an ltc:SchemeMeasurementOrFact.",
          "notes": "The value in this field MAY be changed in aggregation to guarantee uniqueness.",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/schemeMeasurementOrFactID",
          "rdfs:comment": "A unique identifier for an ltc:SchemeMeasurementOrFact.",
          "constraints": {
            "required": true,
            "unique": true
          }
        },
        {
          "name": "latimerCoreScheme_fk",
          "title": "Latimer Core Scheme (Foreign Key)",
          "description": "An identifier for an ltc:LatimerCoreScheme.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasSchemeMeasurementOrFact",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasSchemeMeasurementOrFact-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the SchemeMeasurementOrFact class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "isMandatoryMetric",
          "title": "Is Mandatory Metric",
          "description": "A flag to designate whether it is mandatory or optional for every collection description within the LatimerCoreScheme to include the measurement or fact defined by the schemeMeasurementType property.",
          "notes": "This flag can be used for software automation and data validation.",
          "examples": "`true`, `false`",
          "type": "boolean",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/isMandatoryMetric",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/isMandatoryMetric-2024-02-28",
          "rdfs:comment": "A flag to designate whether it is mandatory or optional for every collection description within the LatimerCoreScheme to include the measurement or fact defined by the schemeMeasurementType property.",
          "constraints": {
            "required": true
          }
        },
        {
          "name": "isRepeatableMetric",
          "title": "Is Repeatable Metric",
          "description": "A flag to designate whether multiple instances of the same schemeMeasurementType may be attached to a single entity.",
          "notes": "For example, this property can be used to stipulate that, using the MeasurementOrFact class, only one 'Object count' may be attached to an ObjectGroup, but multiple 'Curator notes' may be attached to the same ObjectGroup.",
          "examples": "`true`, `false`",
          "type": "boolean",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/isRepeatableMetric",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/isRepeatableMetric-2024-02-28",
          "rdfs:comment": "A flag to designate whether multiple instances of the same schemeMeasurementType may be attached to a single entity.",
          "constraints": {
            "required": true
          }
        },
        {
          "name": "schemeMeasurementType",
          "title": "Scheme Measurement Type",
          "description": "A category of quantitative metric or qualitative fact that can be included in the LatimerCoreScheme.",
          "notes": "The schemeMeasurementType should correspond to, and be used to catalogue and/or constrain, the values that can be used in the measurementType property of the MeasurementOrFact class.",
          "examples": "`Imaged Level Percentage`, `Storage Volume`, `Object Count`, `MIDS-0 Object Count`, `Historical Narrative`",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/schemeMeasurementType",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/schemeMeasurementType-2024-02-28",
          "rdfs:comment": "A category of quantitative metric or qualitative fact that can be included in the LatimerCoreScheme.",
          "constraints": {
            "required": true
          }
        }
      ],
      "primaryKey": "schemeMeasurementOrFact_pk",
      "foreignKeys": [
        {
          "fields": "latimerCoreScheme_fk",
          "predicate": "for",
          "reference": {
            "resource": "latimer-core-scheme",
            "fields": "latimerCoreScheme_pk"
          }
        }
      ]
    },
    "scheme-measurement-or-fact-identifier": {
      "identifier": "0.1/scheme-measurement-or-fact-identifier",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/scheme-measurement-or-fact-identifier.json",
      "name": "scheme-measurement-or-fact-identifier",
      "title": "Scheme Measurement Or Fact Identifier",
      "description": "An ltc:Identifier related to an ltc:SchemeMeasurementOrFact.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasIdentifier",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasIdentifier-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the Identifier class.",
      "fields": [
        {
          "name": "schemeMeasurementOrFact_fk",
          "title": "Scheme Measurement Or Fact (Foreign Key)",
          "description": "An identifier for an ltc:SchemeMeasurementOrFact.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/schemeMeasurementOrFactID",
          "rdfs:comment": "A unique identifier for an ltc:SchemeMeasurementOrFact.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "identifier_fk",
          "title": "Identifier (Foreign Key)",
          "description": "An identifier for an ltc:Identifier.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasIdentifier",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasIdentifier-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the Identifier class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "schemeMeasurementOrFact_fk",
          "predicate": "for",
          "reference": {
            "resource": "scheme-measurement-or-fact",
            "fields": "schemeMeasurementOrFact_pk"
          }
        },
        {
          "fields": "identifier_fk",
          "predicate": "has",
          "reference": {
            "resource": "identifier",
            "fields": "identifier_pk"
          }
        }
      ]
    },
    "scheme-measurement-or-fact-reference": {
      "identifier": "0.1/scheme-measurement-or-fact-reference",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/scheme-measurement-or-fact-reference.json",
      "name": "scheme-measurement-or-fact-reference",
      "title": "Scheme Measurement Or Fact Reference",
      "description": "An ltc:Reference related to an ltc:SchemeMeasurementOrFact.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasReference",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasReference-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the Reference class.",
      "fields": [
        {
          "name": "schemeMeasurementOrFact_fk",
          "title": "Scheme Measurement Or Fact (Foreign Key)",
          "description": "An identifier for an ltc:SchemeMeasurementOrFact.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/schemeMeasurementOrFactID",
          "rdfs:comment": "A unique identifier for an ltc:SchemeMeasurementOrFact.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "reference_fk",
          "title": "Reference (Foreign Key)",
          "description": "An identifier for an ltc:Reference.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasReference",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasReference-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the Reference class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "schemeMeasurementOrFact_fk",
          "predicate": "for",
          "reference": {
            "resource": "scheme-measurement-or-fact",
            "fields": "schemeMeasurementOrFact_pk"
          }
        },
        {
          "fields": "reference_fk",
          "predicate": "has",
          "reference": {
            "resource": "reference",
            "fields": "reference_pk"
          }
        }
      ]
    },
    "scheme-term": {
      "identifier": "0.1/scheme-term",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/scheme-term.json",
      "name": "scheme-term",
      "title": "Scheme Term",
      "description": "A Latimer Core term used by the LatimerCoreScheme and the rules relating to its application.",
      "notes": "This class can be used to define which of the terms (classes and/or properties) within the standard (e.g. GeographicContext, Taxon, preservationMethod) are expected to be used within the scheme, and specify whether they're mandatory and/or repeatable. This information can be used by software and queries to validate the data and understand the rules by which metrics can be reported against the specified term.",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/SchemeTerm",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/SchemeTerm-2024-02-28",
      "rdfs:comment": "A Latimer Core term used by the LatimerCoreScheme and the rules relating to its application.",
      "fields": [
        {
          "name": "schemeTerm_pk",
          "title": "Scheme Term (Primary Key)",
          "description": "A unique identifier for an ltc:SchemeTerm.",
          "notes": "The value in this field MAY be changed in aggregation to guarantee uniqueness.",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/schemeTermID",
          "rdfs:comment": "A unique identifier for an ltc:SchemeTerm.",
          "constraints": {
            "required": true,
            "unique": true
          }
        },
        {
          "name": "latimerCoreScheme_fk",
          "title": "Latimer Core Scheme (Foreign Key)",
          "description": "An identifier for an ltc:LatimerCoreScheme.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasSchemeTerm",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasSchemeTerm-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the SchemeTerm class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "isMandatoryTerm",
          "title": "Is Mandatory Term",
          "description": "A flag to designate whether it is mandatory or optional for all ObjectGroups in the LatimerCoreScheme to include or be linked to valid data for the class or property defined in the termName property.",
          "notes": "This flag can be used for software automation and data validation. For example, if the termName is 'preservationMethod' (a property) and isMandatoryTerm is 'true', then an interface or query should always expect a value for that property, and can validate against that expectation. If the termName is Taxon (a class) and isMandatoryTerm is 'true', then similarly the expectation will be that at least one populated Taxon object is linked to every ObjectGroup. If the isRepeatableTerm property is set to 'false', then the expectation will be that exactly one populated Taxon object is linked to every ObjectGroup and no more.",
          "examples": "`true`, `false`",
          "type": "boolean",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/isMandatoryTerm",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/isMandatoryTerm-2024-02-28",
          "rdfs:comment": "A flag to designate whether it is mandatory or optional for all ObjectGroups in the LatimerCoreScheme to include or be linked to valid data for the class or property defined in the termName property.",
          "constraints": {
            "required": true
          }
        },
        {
          "name": "isRepeatableTerm",
          "title": "Is Repeatable Term",
          "description": "A flag to designate whether multiple instances of the Latimer Core class or property defined in the termName property may be attached to a single ObjectGroup.",
          "notes": "This property essentially defines whether the property or class is used for a 'tagging' approach (e.g. attaching multiple Taxon records to the same ObjectGroup to reflect the taxonomic scope, or a 'dimensional' approach (e.g. attaching a single GeologicalContext to an ObjectGroup, to show that it represents only objects from the Mesozoic). This has implications on how metrics may be handled, and more information is available in the non-normative guidance.",
          "examples": "`true`, `false`",
          "type": "boolean",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/isRepeatableTerm",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/isRepeatableTerm-2024-02-28",
          "rdfs:comment": "A flag to designate whether multiple instances of the Latimer Core class or property defined in the termName property may be attached to a single ObjectGroup.",
          "constraints": {
            "required": true
          }
        },
        {
          "name": "termName",
          "title": "Term Name",
          "description": "The name of a class or property within the Latimer Core standard that is included in the LatimerCoreScheme.",
          "notes": "The values of this property are constrained to the names of terms (classes or properties) within the Latimer Core standard.",
          "examples": "`GeographicContext`, `Taxon`, `preservationMethod`, `discipline`",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/termName",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/termName-2024-02-28",
          "rdfs:comment": "The name of a class or property within the Latimer Core standard that is included in the LatimerCoreScheme.",
          "constraints": {
            "required": true
          }
        }
      ],
      "primaryKey": "schemeTerm_pk",
      "foreignKeys": [
        {
          "fields": "latimerCoreScheme_fk",
          "predicate": "for",
          "reference": {
            "resource": "latimer-core-scheme",
            "fields": "latimerCoreScheme_pk"
          }
        }
      ]
    },
    "scheme-term-identifier": {
      "identifier": "0.1/scheme-term-identifier",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/scheme-term-identifier.json",
      "name": "scheme-term-identifier",
      "title": "Scheme Term Identifier",
      "description": "An ltc:Identifier related to an ltc:SchemeTerm.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasIdentifier",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasIdentifier-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the Identifier class.",
      "fields": [
        {
          "name": "schemeTerm_fk",
          "title": "Scheme Term (Foreign Key)",
          "description": "An identifier for an ltc:SchemeTerm.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/schemeTermID",
          "rdfs:comment": "A unique identifier for an ltc:SchemeTerm.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "identifier_fk",
          "title": "Identifier (Foreign Key)",
          "description": "An identifier for an ltc:Identifier.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasIdentifier",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasIdentifier-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the Identifier class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "schemeTerm_fk",
          "predicate": "for",
          "reference": {
            "resource": "scheme-term",
            "fields": "schemeTerm_pk"
          }
        },
        {
          "fields": "identifier_fk",
          "predicate": "has",
          "reference": {
            "resource": "identifier",
            "fields": "identifier_pk"
          }
        }
      ]
    },
    "scheme-term-reference": {
      "identifier": "0.1/scheme-term-reference",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/scheme-term-reference.json",
      "name": "scheme-term-reference",
      "title": "Scheme Term Reference",
      "description": "An ltc:Reference related to an ltc:SchemeTerm.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasReference",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasReference-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the Reference class.",
      "fields": [
        {
          "name": "schemeTerm_fk",
          "title": "Scheme Term (Foreign Key)",
          "description": "An identifier for an ltc:SchemeTerm.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/schemeTermID",
          "rdfs:comment": "A unique identifier for an ltc:SchemeTerm.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "reference_fk",
          "title": "Reference (Foreign Key)",
          "description": "An identifier for an ltc:Reference.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasReference",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasReference-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the Reference class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "schemeTerm_fk",
          "predicate": "for",
          "reference": {
            "resource": "scheme-term",
            "fields": "schemeTerm_pk"
          }
        },
        {
          "fields": "reference_fk",
          "predicate": "has",
          "reference": {
            "resource": "reference",
            "fields": "reference_pk"
          }
        }
      ]
    },
    "storage-location": {
      "identifier": "0.1/storage-location",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/storage-location.json",
      "name": "storage-location",
      "title": "Storage Location",
      "description": "A physical location (such as a building, room, cabinet or drawer) within the holding institution where objects associated with the collection description are stored or exhibited.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/StorageLocation",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/StorageLocation-2024-02-28",
      "rdfs:comment": "A physical location (such as a building, room, cabinet or drawer) within the holding institution where objects associated with the collection description are stored or exhibited.",
      "fields": [
        {
          "name": "storageLocation_pk",
          "title": "Storage Location (Primary Key)",
          "description": "A unique identifier for an ltc:StorageLocation.",
          "notes": "The value in this field MAY be changed in aggregation to guarantee uniqueness.",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/storageLocationID",
          "rdfs:comment": "A unique identifier for an ltc:StorageLocation.",
          "constraints": {
            "required": true,
            "unique": true
          }
        },
        {
          "name": "objectGroup_fk",
          "title": "Object Group (Foreign Key)",
          "description": "An identifier for an ltc:ObjectGroup.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasStorageLocation",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasStorageLocation-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the StorageLocation class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "parentStorageLocation_fk",
          "title": "Storage Location (Foreign Key)",
          "description": "An identifier for an ltc:StorageLocation.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasParentStorageLocation",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasParentStorageLocation-2024-02-28",
          "rdfs:comment": "This property refers to one or more related parent instances of the StorageLocation class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "locationDescription",
          "title": "Location Description",
          "description": "Short textual description of the storage location of the group of items",
          "notes": "",
          "examples": "`Backlog on top of Rosaceae cupboards`",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/locationDescription",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/locationDescription-2024-02-28",
          "rdfs:comment": "Short textual description of the storage location of the group of items"
        },
        {
          "name": "locationName",
          "title": "Location Name",
          "description": "A label used to identify a place where the collection is stored.",
          "notes": "This is the lowest level of storage location for the object group (collection or sub-collection).",
          "examples": "`Building A`, `Cryptogamic herbarium`, `Cupboard C1`",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/locationName",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/locationName-2024-02-28",
          "rdfs:comment": "A label used to identify a place where the collection is stored.",
          "constraints": {
            "required": true
          }
        },
        {
          "name": "locationType",
          "title": "Location Type",
          "description": "The nature of the location where the collection is stored.",
          "notes": "This defines the type of storage location named in locationName, and may refer to static locations or moveable containers.",
          "examples": "`Site`, `Building`, `Floor`, `Room`, `Cabinet`, `Drawer`",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/locationType",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/locationType-2024-02-28",
          "rdfs:comment": "The nature of the location where the collection is stored."
        }
      ],
      "primaryKey": "storageLocation_pk",
      "foreignKeys": [
        {
          "fields": "objectGroup_fk",
          "predicate": "for",
          "reference": {
            "resource": "object-group",
            "fields": "objectGroup_pk"
          }
        },
        {
          "fields": "parentStorageLocation_fk",
          "predicate": "part of",
          "reference": {
            "resource": "",
            "fields": "storageLocation_pk"
          }
        }
      ]
    },
    "storage-location-address": {
      "identifier": "0.1/storage-location-address",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/storage-location-address.json",
      "name": "storage-location-address",
      "title": "Storage Location Address",
      "description": "An ltc:Address related to an ltc:StorageLocation.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasAddress",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasAddress-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the Address class.",
      "fields": [
        {
          "name": "storageLocation_fk",
          "title": "Storage Location (Foreign Key)",
          "description": "An identifier for an ltc:StorageLocation.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/storageLocationID",
          "rdfs:comment": "A unique identifier for an ltc:StorageLocation.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "address_fk",
          "title": "Address (Foreign Key)",
          "description": "An identifier for an ltc:Address.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasAddress",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasAddress-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the Address class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "storageLocation_fk",
          "predicate": "for",
          "reference": {
            "resource": "storage-location",
            "fields": "storageLocation_pk"
          }
        },
        {
          "fields": "address_fk",
          "predicate": "has",
          "reference": {
            "resource": "address",
            "fields": "address_pk"
          }
        }
      ]
    },
    "storage-location-identifier": {
      "identifier": "0.1/storage-location-identifier",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/storage-location-identifier.json",
      "name": "storage-location-identifier",
      "title": "Storage Location Identifier",
      "description": "An ltc:Identifier related to an ltc:StorageLocation.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasIdentifier",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasIdentifier-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the Identifier class.",
      "fields": [
        {
          "name": "storageLocation_fk",
          "title": "Storage Location (Foreign Key)",
          "description": "An identifier for an ltc:StorageLocation.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/storageLocationID",
          "rdfs:comment": "A unique identifier for an ltc:StorageLocation.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "identifier_fk",
          "title": "Identifier (Foreign Key)",
          "description": "An identifier for an ltc:Identifier.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasIdentifier",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasIdentifier-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the Identifier class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "storageLocation_fk",
          "predicate": "for",
          "reference": {
            "resource": "storage-location",
            "fields": "storageLocation_pk"
          }
        },
        {
          "fields": "identifier_fk",
          "predicate": "has",
          "reference": {
            "resource": "identifier",
            "fields": "identifier_pk"
          }
        }
      ]
    },
    "storage-location-measurement-or-fact": {
      "identifier": "0.1/storage-location-measurement-or-fact",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/storage-location-measurement-or-fact.json",
      "name": "storage-location-measurement-or-fact",
      "title": "Storage Location Measurement or Fact",
      "description": "An ltc:MeasurementOrFact related to an ltc:StorageLocation.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasMeasurementOrFact",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasMeasurementOrFact-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the MeasurementOrFact class.",
      "fields": [
        {
          "name": "storageLocation_fk",
          "title": "Storage Location (Foreign Key)",
          "description": "An identifier for an ltc:StorageLocation.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/storageLocationID",
          "rdfs:comment": "A unique identifier for an ltc:StorageLocation.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "measurementOrFact_fk",
          "title": "Measurement or Fact (Foreign Key)",
          "description": "An identifier for an ltc:MeasurementOrFact.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasMeasurementOrFact",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasMeasurementOrFact-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the MeasurementOrFact class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "storageLocation_fk",
          "predicate": "for",
          "reference": {
            "resource": "storage-location",
            "fields": "storageLocation_pk"
          }
        },
        {
          "fields": "measurementOrFact_fk",
          "predicate": "has",
          "reference": {
            "resource": "measurement-or-fact",
            "fields": "measurementOrFact_pk"
          }
        }
      ]
    },
    "storage-location-reference": {
      "identifier": "0.1/storage-location-reference",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/storage-location-reference.json",
      "name": "storage-location-reference",
      "title": "Storage Location Reference",
      "description": "An ltc:Reference related to an ltc:StorageLocation.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasReference",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasReference-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the Reference class.",
      "fields": [
        {
          "name": "storageLocation_fk",
          "title": "Storage Location (Foreign Key)",
          "description": "An identifier for an ltc:StorageLocation.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/storageLocationID",
          "rdfs:comment": "A unique identifier for an ltc:StorageLocation.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "reference_fk",
          "title": "Reference (Foreign Key)",
          "description": "An identifier for an ltc:Reference.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasReference",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasReference-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the Reference class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "storageLocation_fk",
          "predicate": "for",
          "reference": {
            "resource": "storage-location",
            "fields": "storageLocation_pk"
          }
        },
        {
          "fields": "reference_fk",
          "predicate": "has",
          "reference": {
            "resource": "reference",
            "fields": "reference_pk"
          }
        }
      ]
    },
    "taxon": {
      "identifier": "0.1/taxon",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/taxon.json",
      "name": "taxon",
      "title": "Taxon",
      "description": "A group of organisms (sensu http://purl.obolibrary.org/obo/OBI_0100026) considered by taxonomists to form a homogeneous unit.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/Taxon",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/Taxon-2024-02-28",
      "rdfs:comment": "A group of organisms (sensu http://purl.obolibrary.org/obo/OBI_0100026) considered by taxonomists to form a homogeneous unit.",
      "fields": [
        {
          "name": "taxon_pk",
          "title": "Taxon (Primary Key)",
          "description": "A unique identifier for an ltc:Taxon.",
          "notes": "The value in this field MAY be changed in aggregation to guarantee uniqueness.",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/taxonID",
          "rdfs:comment": "A unique identifier for an ltc:Taxon.",
          "constraints": {
            "required": true,
            "unique": true
          }
        },
        {
          "name": "objectGroup_fk",
          "title": "Object Group (Foreign Key)",
          "description": "An identifier for an ltc:ObjectGroup.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasTaxon",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasTaxon-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the Taxon class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "genus",
          "title": "Genus",
          "description": "The full scientific name of the genus in which the taxon is classified.",
          "notes": "The full scientific name of the genus in which the collection's taxa are classified.",
          "examples": "`Puma`, `Monoclea`",
          "type": "string",
          "format": "default",
          "namespace": "dwc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/dwc/terms/genus",
          "dcterms:references": "http://rs.tdwg.org/dwc/terms/version/genus-2023-06-28",
          "rdfs:comment": "The full scientific name of the genus in which the dwc:Taxon is classified."
        },
        {
          "name": "kingdom",
          "title": "Kingdom",
          "description": "The full scientific name of the kingdom in which the taxon is classified.",
          "notes": "The full scientific name of the kingdom in which the taxa in the collection are classified. Examples of controlled vocabularies include http://tdwg.github.io/ontology/ontology/voc/Collection.rdf and https://doi.org/10.1371/journal.pone.0130114 https://en.wikipedia.org/wiki/Two-empire_system.",
          "examples": "`Animalia`, `Archaea`, `Bacteria`, `Chromista`, `Fungi`, `Plantae`, `Protozoa`, `Viruses`",
          "type": "string",
          "format": "default",
          "namespace": "dwc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/dwc/terms/kingdom",
          "dcterms:references": "http://rs.tdwg.org/dwc/terms/version/kingdom-2023-06-28",
          "rdfs:comment": "The full scientific name of the kingdom in which the dwc:Taxon is classified."
        },
        {
          "name": "scientificName",
          "title": "Scientific Name",
          "description": "The full scientific name, with authorship and date information if known. When forming part of an Identification, this should be the name in lowest level taxonomic rank that can be determined. This term should not contain identification qualifications, which should instead be supplied in the IdentificationQualifier term.",
          "notes": "The full scientific name. This should be the name in lowest level taxonomic rank that applies across the collection. If this field is used, then recommended to also complete the taxonRank. This term should not contain identification qualifications.",
          "examples": "`Coleoptera` (order), `Vespertilionidae` (family), `Manis` (genus), `Ctenomys sociabilis` (genus + specificEpithet), `Ambystoma tigrinum diaboli` (genus + specificEpithet + infraspecificEpithet)",
          "type": "string",
          "format": "default",
          "namespace": "dwc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/dwc/terms/scientificName",
          "dcterms:references": "http://rs.tdwg.org/dwc/terms/version/scientificName-2026-05-26",
          "rdfs:comment": "The full scientific name, with authorship and date information if known. When forming part of a dwc:Identification, this should be the name in lowest level taxonomic rank that can be determined."
        },
        {
          "name": "taxonRank",
          "title": "Taxon Rank",
          "description": "The taxonomic rank of the most specific name in the scientificName.",
          "notes": "Recommended best practice is to use a controlled vocabulary. For example: https://bioportal.bioontology.org/ontologies/TAXRANK?p=summary",
          "examples": "`subspecies`, `varietas`, `forma`, `species`, `genus`",
          "type": "string",
          "format": "default",
          "namespace": "dwc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/dwc/terms/taxonRank",
          "dcterms:references": "http://rs.tdwg.org/dwc/terms/version/taxonRank-2026-05-26",
          "rdfs:comment": "The taxonomic rank of the most specific name in the dwc:scientificName."
        }
      ],
      "primaryKey": "taxon_pk",
      "foreignKeys": [
        {
          "fields": "objectGroup_fk",
          "predicate": "for",
          "reference": {
            "resource": "object-group",
            "fields": "objectGroup_pk"
          }
        }
      ]
    },
    "taxon-identifier": {
      "identifier": "0.1/taxon-identifier",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/taxon-identifier.json",
      "name": "taxon-identifier",
      "title": "Taxon Identifier",
      "description": "An ltc:Identifier related to an ltc:Taxon.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasIdentifier",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasIdentifier-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the Identifier class.",
      "fields": [
        {
          "name": "taxon_fk",
          "title": "Taxon (Foreign Key)",
          "description": "An identifier for an ltc:Taxon.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/taxonID",
          "rdfs:comment": "A unique identifier for an ltc:Taxon.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "identifier_fk",
          "title": "Identifier (Foreign Key)",
          "description": "An identifier for an ltc:Identifier.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasIdentifier",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasIdentifier-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the Identifier class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "taxon_fk",
          "predicate": "for",
          "reference": {
            "resource": "taxon",
            "fields": "taxon_pk"
          }
        },
        {
          "fields": "identifier_fk",
          "predicate": "has",
          "reference": {
            "resource": "identifier",
            "fields": "identifier_pk"
          }
        }
      ]
    },
    "taxon-measurement-or-fact": {
      "identifier": "0.1/taxon-measurement-or-fact",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/taxon-measurement-or-fact.json",
      "name": "taxon-measurement-or-fact",
      "title": "Taxon Measurement or Fact",
      "description": "An ltc:MeasurementOrFact related to an ltc:Taxon.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasMeasurementOrFact",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasMeasurementOrFact-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the MeasurementOrFact class.",
      "fields": [
        {
          "name": "taxon_fk",
          "title": "Taxon (Foreign Key)",
          "description": "An identifier for an ltc:Taxon.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/taxonID",
          "rdfs:comment": "A unique identifier for an ltc:Taxon.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "measurementOrFact_fk",
          "title": "Measurement or Fact (Foreign Key)",
          "description": "An identifier for an ltc:MeasurementOrFact.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasMeasurementOrFact",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasMeasurementOrFact-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the MeasurementOrFact class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "taxon_fk",
          "predicate": "for",
          "reference": {
            "resource": "taxon",
            "fields": "taxon_pk"
          }
        },
        {
          "fields": "measurementOrFact_fk",
          "predicate": "has",
          "reference": {
            "resource": "measurement-or-fact",
            "fields": "measurementOrFact_pk"
          }
        }
      ]
    },
    "taxon-reference": {
      "identifier": "0.1/taxon-reference",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/taxon-reference.json",
      "name": "taxon-reference",
      "title": "Taxon Reference",
      "description": "An ltc:Reference related to an ltc:Taxon.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasReference",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasReference-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the Reference class.",
      "fields": [
        {
          "name": "taxon_fk",
          "title": "Taxon (Foreign Key)",
          "description": "An identifier for an ltc:Taxon.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/taxonID",
          "rdfs:comment": "A unique identifier for an ltc:Taxon.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "reference_fk",
          "title": "Reference (Foreign Key)",
          "description": "An identifier for an ltc:Reference.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasReference",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasReference-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the Reference class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "taxon_fk",
          "predicate": "for",
          "reference": {
            "resource": "taxon",
            "fields": "taxon_pk"
          }
        },
        {
          "fields": "reference_fk",
          "predicate": "has",
          "reference": {
            "resource": "reference",
            "fields": "reference_pk"
          }
        }
      ]
    },
    "temporal-coverage": {
      "identifier": "0.1/temporal-coverage",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/temporal-coverage.json",
      "name": "temporal-coverage",
      "title": "Temporal Coverage",
      "description": "The time period during which the related event, activity or status was occurring.",
      "notes": "To represent an ongoing period of time, temporalCoverageStartDateTime should be populated and temporalCoverageEndDateTime left blank. To represent a single period in time, temporalCoverageStartDateTime and temporalCoverageEndDateTime should hold the same value. This class can be used to reflect the period of time in which specified activities, events and states occurred. Examples might include the time range of the `Event` in which the objects were collected, the period during a `CollectionStatusHistory` over which the collection was actively growing, or the span of time someone was working in a particular `PersonRole`. If the time period you are trying to describe is better described by a categorical label rather than a date, `GeologicalContext`, `ChronometricAge` or `ObjectGroup.period` may be more suitable.",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/TemporalCoverage",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/TemporalCoverage-2024-02-28",
      "rdfs:comment": "The time period during which the related event, activity or status was occurring.",
      "fields": [
        {
          "name": "temporalCoverage_pk",
          "title": "Temporal Coverage (Primary Key)",
          "description": "A unique identifier for an ltc:TemporalCoverage.",
          "notes": "The value in this field MAY be changed in aggregation to guarantee uniqueness.",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/temporalCoverageID",
          "rdfs:comment": "A unique identifier for an ltc:TemporalCoverage.",
          "constraints": {
            "required": true,
            "unique": true
          }
        },
        {
          "name": "temporalCoverageEndDateTime",
          "title": "Temporal Coverage End Date",
          "description": "Datetime at which the TemporalCoverage finished.",
          "notes": "If temporalCoverageEndDateTime is populated, temporalCoverageType is strongly recommended.",
          "examples": "`1886`, `1984-09`, `2001-10-22`, `1997-07-16T19:20+01:00`",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/temporalCoverageEndDateTime",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/temporalCoverageEndDateTime-2024-02-28",
          "rdfs:comment": "Datetime at which the TemporalCoverage finished."
        },
        {
          "name": "temporalCoverageStartDateTime",
          "title": "Temporal Coverage Start Date",
          "description": "Datetime at which the TemporalCoverage began.",
          "notes": "If temporalCoverageStartDateTime is populated, temporalCoverageType is recommended.",
          "examples": "`1886`, `1984-09`, `2001-10-22`, `1997-07-16T19:20+01:00`",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/temporalCoverageStartDateTime",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/temporalCoverageStartDateTime-2024-02-28",
          "rdfs:comment": "Datetime at which the TemporalCoverage began."
        },
        {
          "name": "temporalCoverageType",
          "title": "Temporal Coverage Type",
          "description": "The type or context of the described TemporalCoverage.",
          "notes": "If temporalCoverageStartDateTime is populated, temporalCoverageType is recommended. Recommendation is to use a controlled vocabulary.",
          "examples": "`Collecting time range`, `Establishment time range`, `Time in post`",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/temporalCoverageType",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/temporalCoverageType-2024-02-28",
          "rdfs:comment": "The type or context of the described TemporalCoverage."
        }
      ],
      "primaryKey": "temporalCoverage_pk"
    },
    "temporal-coverage-measurement-or-fact": {
      "identifier": "0.1/temporal-coverage-measurement-or-fact",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/temporal-coverage-measurement-or-fact.json",
      "name": "temporal-coverage-measurement-or-fact",
      "title": "Temporal Coverage Measurement or Fact",
      "description": "An ltc:MeasurementOrFact related to an ltc:TemporalCoverage.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasMeasurementOrFact",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasMeasurementOrFact-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the MeasurementOrFact class.",
      "fields": [
        {
          "name": "temporalCoverage_fk",
          "title": "Temporal Coverage (Foreign Key)",
          "description": "An identifier for an ltc:TemporalCoverage.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/temporalCoverageID",
          "rdfs:comment": "A unique identifier for an ltc:TemporalCoverage.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "measurementOrFact_fk",
          "title": "Measurement or Fact (Foreign Key)",
          "description": "An identifier for an ltc:MeasurementOrFact.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasMeasurementOrFact",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasMeasurementOrFact-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the MeasurementOrFact class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "temporalCoverage_fk",
          "predicate": "for",
          "reference": {
            "resource": "temporal-coverage",
            "fields": "temporalCoverage_pk"
          }
        },
        {
          "fields": "measurementOrFact_fk",
          "predicate": "has",
          "reference": {
            "resource": "measurement-or-fact",
            "fields": "measurementOrFact_pk"
          }
        }
      ]
    },
    "temporal-coverage-reference": {
      "identifier": "0.1/temporal-coverage-reference",
      "dcterms:isPartOf": "http://www.tdwg.org/standards/450",
      "url": "table-schemas/temporal-coverage-reference.json",
      "name": "temporal-coverage-reference",
      "title": "Temporal Coverage Reference",
      "description": "An ltc:Reference related to an ltc:TemporalCoverage.",
      "notes": "",
      "examples": "",
      "namespace": "ltc",
      "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasReference",
      "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasReference-2024-02-28",
      "rdfs:comment": "This property refers to one or more related instances of the Reference class.",
      "fields": [
        {
          "name": "temporalCoverage_fk",
          "title": "Temporal Coverage (Foreign Key)",
          "description": "An identifier for an ltc:TemporalCoverage.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://example.com/term-pending/temporalCoverageID",
          "rdfs:comment": "A unique identifier for an ltc:TemporalCoverage.",
          "constraints": {
            "required": true,
            "unique": false
          }
        },
        {
          "name": "reference_fk",
          "title": "Reference (Foreign Key)",
          "description": "An identifier for an ltc:Reference.",
          "notes": "The value in this field MAY be changed in aggregation to preserve the relationship to the (Primary Key).",
          "examples": "",
          "type": "string",
          "format": "default",
          "namespace": "ltc",
          "dcterms:isVersionOf": "http://rs.tdwg.org/ltc/terms/hasReference",
          "dcterms:references": "http://rs.tdwg.org/ltc/terms/version/hasReference-2024-02-28",
          "rdfs:comment": "This property refers to one or more related instances of the Reference class.",
          "constraints": {
            "required": true,
            "unique": false
          }
        }
      ],
      "foreignKeys": [
        {
          "fields": "temporalCoverage_fk",
          "predicate": "for",
          "reference": {
            "resource": "temporal-coverage",
            "fields": "temporalCoverage_pk"
          }
        },
        {
          "fields": "reference_fk",
          "predicate": "has",
          "reference": {
            "resource": "reference",
            "fields": "reference_pk"
          }
        }
      ]
    }
  }
};
