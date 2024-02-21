﻿--
-- Create Latimer Core MySQL Schema
-- MySQL Server version: 8.0.34
-- Script date 1/12/2024 12:45:03 PM
-- Server version: 8.0.34
-- Created By: Ben Norton
-- Created On: 20240112
--
-- Notes
-- The database schema retains naming conventions used in the data standard. Future usage should
-- strongly consider altering the TDWG naming conventions for conventions better suited to SQL databases.
-- All foreign keys are nullable and use the standard syntax prefix has.
--
-- Set character set the client will use to send SQL statements to the server
--
SET NAMES 'utf8';

--
-- Set default database
--
USE latimer_core_schema;

--
-- Drop table `ltc_termlist`
--
DROP TABLE IF EXISTS ltc_termlist;

--
-- Drop table `objectgroup`
--
DROP TABLE IF EXISTS objectgroup;

--
-- Drop table `chronometricage`
--
DROP TABLE IF EXISTS chronometricage;

--
-- Drop table `geologicalcontext`
--
DROP TABLE IF EXISTS geologicalcontext;

--
-- Drop table `objectclassification`
--
DROP TABLE IF EXISTS objectclassification;

--
-- Drop table `ecologicalcontext`
--
DROP TABLE IF EXISTS ecologicalcontext;

--
-- Drop table `geographiccontext`
--
DROP TABLE IF EXISTS geographiccontext;

--
-- Drop table `event`
--
DROP TABLE IF EXISTS event;

--
-- Drop table `recordlevel`
--
DROP TABLE IF EXISTS recordlevel;

--
-- Drop table `role`
--
DROP TABLE IF EXISTS role;

--
-- Drop table `personrole`
--
DROP TABLE IF EXISTS personrole;

--
-- Drop table `organisationalunit`
--
DROP TABLE IF EXISTS organisationalunit;

--
-- Drop table `person`
--
DROP TABLE IF EXISTS person;

--
-- Drop table `address`
--
DROP TABLE IF EXISTS address;

--
-- Drop table `storagelocation`
--
DROP TABLE IF EXISTS storagelocation;

--
-- Drop table `taxon`
--
DROP TABLE IF EXISTS taxon;

--
-- Drop table `collectionstatushistory`
--
DROP TABLE IF EXISTS collectionstatushistory;

--
-- Drop table `temporalcoverage`
--
DROP TABLE IF EXISTS temporalcoverage;

--
-- Drop table `measurementorfact`
--
DROP TABLE IF EXISTS measurementorfact;

--
-- Drop table `resourcerelationship`
--
DROP TABLE IF EXISTS resourcerelationship;

--
-- Drop table `latimercorescheme`
--
DROP TABLE IF EXISTS latimercorescheme;

--
-- Drop table `schememeasurementorfact`
--
DROP TABLE IF EXISTS schememeasurementorfact;

--
-- Drop table `schemeterm`
--
DROP TABLE IF EXISTS schemeterm;

--
-- Drop table `reference`
--
DROP TABLE IF EXISTS reference;

--
-- Drop table `contactdetail`
--
DROP TABLE IF EXISTS contactdetail;

--
-- Drop table `identifier`
--
DROP TABLE IF EXISTS identifier;

--
-- Set default database
--
USE latimer_core_schema;

--
-- Create table `identifier`
--
CREATE TABLE identifier (
  id int NOT NULL AUTO_INCREMENT,
  identifierSource varchar(255) DEFAULT NULL COMMENT 'The source or creator of the identifier.',
  hasreference int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the Reference class.',
  identifierType varchar(255) NOT NULL COMMENT 'The type and format of the value in the identifier field.',
  identifierValue varchar(255) NOT NULL COMMENT 'A textual or numeric identifier, acronym or IRI that provides an unambiguous reference for an entity within a given context.',
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
ROW_FORMAT = DYNAMIC;

--
-- Create table `contactdetail`
--
CREATE TABLE contactdetail (
  id int NOT NULL AUTO_INCREMENT,
  contactDetailCategory varchar(255) NOT NULL COMMENT 'The method of contact to which the contact detail applies.',
  contactDetailFunction json DEFAULT NULL COMMENT 'A brief label describing the nature of the enquiry or enquiries that are appropriate to direct to the contact detail.',
  contactDetailValue varchar(255) NOT NULL COMMENT 'The value of the contact detail, such as the phone number or email address.',
  hasIdentifier int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the Identifier class.',
  PRIMARY KEY (id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 2,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
ROW_FORMAT = DYNAMIC;

--
-- Create foreign key
--
ALTER TABLE contactdetail
ADD CONSTRAINT fk_contactdetail_indentifier FOREIGN KEY (hasIdentifier)
REFERENCES identifier (id);

--
-- Create table `reference`
--
CREATE TABLE reference (
  id int NOT NULL AUTO_INCREMENT,
  hasIdentifier int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the Identifier class.',
  referenceDetails varchar(255) DEFAULT NULL COMMENT 'Detailed information about the resource being referenced.',
  referenceName varchar(255) DEFAULT NULL COMMENT 'A name given to a reference.',
  referenceType varchar(255) DEFAULT NULL COMMENT 'The type of resource being referenced.',
  resourceIRI varchar(255) DEFAULT NULL COMMENT 'A preferably resolvable IRI providing access to the resource defined in the reference.',
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
ROW_FORMAT = DYNAMIC;

--
-- Create foreign key
--
ALTER TABLE reference
ADD CONSTRAINT fk_reference_identifier FOREIGN KEY (hasIdentifier)
REFERENCES identifier (id);

--
-- Create foreign key
--
ALTER TABLE identifier
ADD CONSTRAINT fk_identifier_reference FOREIGN KEY (hasreference)
REFERENCES reference (id);

--
-- Create table `schemeterm`
--
CREATE TABLE schemeterm (
  id int NOT NULL AUTO_INCREMENT,
  hasIdentifier int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the Identifier class.',
  hasReference int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the Reference class.',
  isMandatoryTerm tinyint(1) NOT NULL COMMENT 'A flag to designate whether it is mandatory or optional for all ObjectGroups in the CollectionDescriptionScheme to include or be linked to valid data for the class or property defined in the termName property.',
  isRepeatableTerm tinyint(1) NOT NULL COMMENT 'A flag to designate whether multiple instances of the Latimer Core class or property defined in the termName property may be attached to a single ObjectGroup.',
  termName varchar(255) NOT NULL COMMENT 'The name of a class or property within the Latimer Core standard that is included in the CollectionDescriptionScheme.',
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
ROW_FORMAT = DYNAMIC;

--
-- Create index `unq_schemeterm_hasreference` on table `schemeterm`
--
ALTER TABLE schemeterm
ADD UNIQUE INDEX unq_schemeterm_hasreference (hasReference);

--
-- Create foreign key
--
ALTER TABLE schemeterm
ADD CONSTRAINT fk_schemeterm_indentifier FOREIGN KEY (hasIdentifier)
REFERENCES identifier (id);

--
-- Create foreign key
--
ALTER TABLE schemeterm
ADD CONSTRAINT fk_schemeterm_reference FOREIGN KEY (hasReference)
REFERENCES reference (id);

--
-- Create table `schememeasurementorfact`
--
CREATE TABLE schememeasurementorfact (
  id int NOT NULL AUTO_INCREMENT,
  hasIdentifier int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the Identifier class.',
  hasReference int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the Reference class.',
  isMandatoryMetric tinyint(1) NOT NULL COMMENT 'A flag to designate whether it is mandatory or optional for every collection description within the CollectionDescriptionScheme to include the measurement or fact defined by the schemeMeasurementType property.',
  isRepeatableMetric tinyint(1) NOT NULL COMMENT 'A flag to designate whether multiple instances of the same schemeMeasurementType may be attached to a single entity.',
  schemeMeasurementType varchar(255) NOT NULL COMMENT 'A category of quantitative metric or qualitative fact that can be included in the CollectionDescriptionScheme.',
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
ROW_FORMAT = DYNAMIC;

--
-- Create index `unq_schememeasurementorfact_hasreference` on table `schememeasurementorfact`
--
ALTER TABLE schememeasurementorfact
ADD UNIQUE INDEX unq_schememeasurementorfact_hasreference (hasReference);

--
-- Create foreign key
--
ALTER TABLE schememeasurementorfact
ADD CONSTRAINT fk_schememeasurementorfact_indentifier FOREIGN KEY (hasIdentifier)
REFERENCES identifier (id);

--
-- Create foreign key
--
ALTER TABLE schememeasurementorfact
ADD CONSTRAINT fk_schememeasurementorfact_reference FOREIGN KEY (hasReference)
REFERENCES reference (id);

--
-- Create table `latimercorescheme`
--
CREATE TABLE latimercorescheme (
  id int NOT NULL AUTO_INCREMENT,
  basisOfScheme varchar(255) DEFAULT NULL COMMENT 'A summary of the basis or purpose for the LatimerCoreScheme.',
  hasIdentifier int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the Identifier class.',
  hasObjectGroup int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the ObjectGroup class.',
  hasReference int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the Reference class.',
  hasSchemeMeasurementOrFact int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the SchemeMeasurementOrFact class.',
  hasSchemeTerm int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the SchemeTerm class.',
  isDistinctObjects tinyint(1) NOT NULL COMMENT 'A flag to designate whether a physical object may be described by more than one ObjectGroup within the LatimerCoreScheme.',
  schemeName varchar(255) NOT NULL COMMENT 'A short descriptive name given to the LatimerCoreScheme.',
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
ROW_FORMAT = DYNAMIC;

--
-- Create index `unq_latimercorescheme_hasobjectgroup` on table `latimercorescheme`
--
ALTER TABLE latimercorescheme
ADD UNIQUE INDEX unq_latimercorescheme_hasobjectgroup (hasObjectGroup);

--
-- Create index `unq_latimercorescheme_hasreference` on table `latimercorescheme`
--
ALTER TABLE latimercorescheme
ADD UNIQUE INDEX unq_latimercorescheme_hasreference (hasReference);

--
-- Create foreign key
--
ALTER TABLE latimercorescheme
ADD CONSTRAINT fk_latimercorescheme_indentifier FOREIGN KEY (hasIdentifier)
REFERENCES identifier (id);

--
-- Create foreign key
--
ALTER TABLE latimercorescheme
ADD CONSTRAINT fk_latimercorescheme_reference FOREIGN KEY (hasReference)
REFERENCES reference (id);

--
-- Create foreign key
--
ALTER TABLE latimercorescheme
ADD CONSTRAINT fk_latimercorescheme_schememeasurementorfact FOREIGN KEY (hasSchemeMeasurementOrFact)
REFERENCES schememeasurementorfact (id);

--
-- Create foreign key
--
ALTER TABLE latimercorescheme
ADD CONSTRAINT fk_latimercorescheme_schemeterm FOREIGN KEY (hasSchemeTerm)
REFERENCES schemeterm (id);

--
-- Create table `resourcerelationship`
--
CREATE TABLE resourcerelationship (
  id int NOT NULL AUTO_INCREMENT,
  hasIdentifier int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the Identifier class.',
  hasReference int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the Reference class.',
  relatedResourceID varchar(255) DEFAULT NULL COMMENT 'An identifier for a related resource (the object, rather than the subject of the relationship).',
  relatedResourceName varchar(255) DEFAULT NULL COMMENT 'A short textual name for the related resource.',
  relationshipAccordingTo json DEFAULT NULL COMMENT 'The source (person, organization, publication, reference) establishing the relationship between the two resources.',
  relationshipEstablishedDate varchar(255) DEFAULT NULL COMMENT 'The date-time on which the relationship between the two resources was established.',
  relationshipOfResource varchar(255) NOT NULL COMMENT 'The relationship of the resource identified by relatedResourceID to the subject (optionally identified by the resourceID).',
  relationshipRemarks varchar(255) DEFAULT NULL COMMENT 'Comments or notes about the relationship between the two resources.',
  resourceID varchar(255) NOT NULL COMMENT 'An identifier for the resource that is the subject of the relationship.',
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
ROW_FORMAT = DYNAMIC;

--
-- Create index `unq_resourcerelationship_hasreference` on table `resourcerelationship`
--
ALTER TABLE resourcerelationship
ADD UNIQUE INDEX unq_resourcerelationship_hasreference (hasReference);

--
-- Create foreign key
--
ALTER TABLE resourcerelationship
ADD CONSTRAINT fk_resourcerelationship_indentifier FOREIGN KEY (hasIdentifier)
REFERENCES identifier (id);

--
-- Create foreign key
--
ALTER TABLE resourcerelationship
ADD CONSTRAINT fk_resourcerelationship_reference FOREIGN KEY (hasReference)
REFERENCES reference (id);

--
-- Create table `measurementorfact`
--
CREATE TABLE measurementorfact (
  id int NOT NULL AUTO_INCREMENT,
  hasIdentifier int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the Identifier class.',
  hasReference int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the Reference class.',
  measurementAccuracy varchar(255) DEFAULT NULL COMMENT 'The description of the potential error associated with the measurementValue.',
  measurementDerivation varchar(255) DEFAULT NULL COMMENT 'An indicator as to whether the measurement, fact, characteristic, or assertion being applied to the collection was derived from reported figures or aggregated/calculated from underlying data.',
  measurementFactText varchar(255) DEFAULT NULL COMMENT 'The value of the qualitative fact, characteristic, or assertion being made about the collection.',
  measurementMethod varchar(255) DEFAULT NULL COMMENT 'A description of or reference to (publication, IRI) the method or protocol used to determine the measurement, fact, characteristic, or assertion.',
  measurementRemarks varchar(255) DEFAULT NULL COMMENT 'Comments or notes accompanying the MeasurementOrFact.',
  measurementType varchar(255) DEFAULT NULL COMMENT 'The nature of the measurement, fact, characteristic, or assertion.',
  measurementUnit varchar(255) DEFAULT NULL COMMENT 'The units associated with the measurementValue.',
  measurementValue decimal(10, 0) DEFAULT NULL COMMENT 'The value of the measurement, fact, characteristic, or assertion.',
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
ROW_FORMAT = DYNAMIC;

--
-- Create index `unq_measurementorfact_hasreference` on table `measurementorfact`
--
ALTER TABLE measurementorfact
ADD UNIQUE INDEX unq_measurementorfact_hasreference (hasReference);

--
-- Create foreign key
--
ALTER TABLE measurementorfact
ADD CONSTRAINT fk_measurementorfact_indentifier FOREIGN KEY (hasIdentifier)
REFERENCES identifier (id);

--
-- Create foreign key
--
ALTER TABLE measurementorfact
ADD CONSTRAINT fk_measurementorfact_reference FOREIGN KEY (hasReference)
REFERENCES reference (id);

--
-- Create table `temporalcoverage`
--
CREATE TABLE temporalcoverage (
  id int NOT NULL AUTO_INCREMENT,
  hasMeasurementOrFact int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the MeasurementOrFact class.',
  hasReference int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the Reference class.',
  temporalCoverageEndDateTime varchar(255) DEFAULT NULL COMMENT 'Datetime at which the TemporalCoverage finished.',
  temporalCoverageStartDateTime varchar(255) DEFAULT NULL COMMENT 'Datetime at which the TemporalCoverage began.',
  temporalCoverageType varchar(255) DEFAULT NULL COMMENT 'The type or context of the described TemporalCoverage.',
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
ROW_FORMAT = DYNAMIC;

--
-- Create foreign key
--
ALTER TABLE temporalcoverage
ADD CONSTRAINT fk_temporalcoverage_measurementorfact FOREIGN KEY (hasMeasurementOrFact)
REFERENCES measurementorfact (id);

--
-- Create foreign key
--
ALTER TABLE temporalcoverage
ADD CONSTRAINT fk_temporalcoverage_reference FOREIGN KEY (hasReference)
REFERENCES reference (id);

--
-- Create table `collectionstatushistory`
--
CREATE TABLE collectionstatushistory (
  id int NOT NULL AUTO_INCREMENT,
  hasIdentifier int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the Identifier class.',
  hasMeasurementOrFact int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the MeasurementOrFact class.',
  hasReference int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the Reference class.',
  hasTemporalCoverage int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the TemporalCoverage class.',
  status varchar(255) NOT NULL COMMENT 'The development status of the collection during a specified period.',
  statusChangeReason varchar(255) DEFAULT NULL COMMENT 'An explanation of why the collection transitioned to the value set in the status property.',
  statusType varchar(255) NOT NULL COMMENT 'A top-level classification of the different categories of status that can be applied to the collection.',
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
ROW_FORMAT = DYNAMIC;

--
-- Create index `unq_collectionstatushistory_hasmeasurementorfact` on table `collectionstatushistory`
--
ALTER TABLE collectionstatushistory
ADD UNIQUE INDEX unq_collectionstatushistory_hasmeasurementorfact (hasMeasurementOrFact);

--
-- Create foreign key
--
ALTER TABLE collectionstatushistory
ADD CONSTRAINT fk_collectionstatushistory_indentifier FOREIGN KEY (hasIdentifier)
REFERENCES identifier (id);

--
-- Create foreign key
--
ALTER TABLE collectionstatushistory
ADD CONSTRAINT fk_collectionstatushistory_measurementorfact FOREIGN KEY (hasMeasurementOrFact)
REFERENCES measurementorfact (id);

--
-- Create foreign key
--
ALTER TABLE collectionstatushistory
ADD CONSTRAINT fk_collectionstatushistory_reference FOREIGN KEY (hasReference)
REFERENCES reference (id);

--
-- Create foreign key
--
ALTER TABLE collectionstatushistory
ADD CONSTRAINT fk_collectionstatushistory_temporalcoverage FOREIGN KEY (hasTemporalCoverage)
REFERENCES temporalcoverage (id);

--
-- Create table `taxon`
--
CREATE TABLE taxon (
  id int NOT NULL AUTO_INCREMENT,
  genus varchar(255) DEFAULT NULL COMMENT 'The full scientific name of the genus in which the taxon is classified.',
  hasIdentifier int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the Identifier class.',
  hasMeasurementOrFact int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the MeasurementOrFact class.',
  hasReference int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the Reference class.',
  kingdom varchar(255) DEFAULT NULL COMMENT 'The full scientific name of the kingdom in which the taxon is classified.',
  scientificName varchar(255) DEFAULT NULL COMMENT 'The full scientific name, with authorship and date information if known. When forming part of an Identification, this should be the name in lowest level taxonomic rank that can be determined. This term should not contain identification qualifications, which should instead be supplied in the IdentificationQualifier term.',
  taxonRank varchar(255) DEFAULT NULL COMMENT 'The taxonomic rank of the most specific name in the scientificName.',
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
ROW_FORMAT = DYNAMIC;

--
-- Create foreign key
--
ALTER TABLE taxon
ADD CONSTRAINT fk_taxon_identifier FOREIGN KEY (hasIdentifier)
REFERENCES identifier (id);

--
-- Create foreign key
--
ALTER TABLE taxon
ADD CONSTRAINT fk_taxon_measurementorfact FOREIGN KEY (hasMeasurementOrFact)
REFERENCES measurementorfact (id);

--
-- Create foreign key
--
ALTER TABLE taxon
ADD CONSTRAINT fk_taxon_reference FOREIGN KEY (hasReference)
REFERENCES reference (id);

--
-- Create table `storagelocation`
--
CREATE TABLE storagelocation (
  id int NOT NULL AUTO_INCREMENT,
  hasAddress int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the Address class.',
  hasIdentifier int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the Identifier class.',
  hasMeasurementOrFact int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the MeasurementOrFact class.',
  hasParentStorageLocation int DEFAULT NULL COMMENT 'This property refers to one or more related parent instances of the StorageLocation class.',
  hasReference int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the Reference class.',
  locationDescription varchar(255) DEFAULT NULL COMMENT 'Short textual description of the storage location of the group of items',
  locationName varchar(255) NOT NULL COMMENT 'A label used to identify a place where the collection is stored.',
  locationType varchar(255) DEFAULT NULL COMMENT 'The nature of the location where the collection is stored.',
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
ROW_FORMAT = DYNAMIC;

--
-- Create index `unq_storagelocation_hasaddress` on table `storagelocation`
--
ALTER TABLE storagelocation
ADD UNIQUE INDEX unq_storagelocation_hasaddress (hasAddress);

--
-- Create index `unq_storagelocation_hasparentstoragelocation` on table `storagelocation`
--
ALTER TABLE storagelocation
ADD UNIQUE INDEX unq_storagelocation_hasparentstoragelocation (hasParentStorageLocation);

--
-- Create foreign key
--
ALTER TABLE storagelocation
ADD CONSTRAINT fk_storagelocation_indentifier FOREIGN KEY (hasIdentifier)
REFERENCES identifier (id);

--
-- Create foreign key
--
ALTER TABLE storagelocation
ADD CONSTRAINT fk_storagelocation_measurementorfact FOREIGN KEY (hasMeasurementOrFact)
REFERENCES measurementorfact (id);

--
-- Create foreign key
--
ALTER TABLE storagelocation
ADD CONSTRAINT fk_storagelocation_reference FOREIGN KEY (hasReference)
REFERENCES reference (id);

--
-- Create foreign key
--
ALTER TABLE storagelocation
ADD CONSTRAINT fk_storagelocation_storagelocation FOREIGN KEY (id)
REFERENCES storagelocation (hasParentStorageLocation);

--
-- Create table `address`
--
CREATE TABLE address (
  id int NOT NULL,
  addressCountry varchar(255) NOT NULL COMMENT 'The country. For example, USA. You can also provide the two-letter ISO 3166-1 alpha-2 country code.',
  addressLocality varchar(255) DEFAULT NULL COMMENT 'The locality in which the street address is, and which is in the region. For example, Mountain View.',
  streetAddress varchar(255) NOT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
ROW_FORMAT = DYNAMIC;

--
-- Create foreign key
--
ALTER TABLE address
ADD CONSTRAINT fk_address_storagelocation FOREIGN KEY (id)
REFERENCES storagelocation (hasAddress);

--
-- Create table `person`
--
CREATE TABLE person (
  id int NOT NULL AUTO_INCREMENT,
  fullName varchar(255) DEFAULT NULL COMMENT 'String of the preferred form of personal name for displaying.',
  givenName varchar(255) DEFAULT NULL COMMENT 'Given name. In the U.S., the first name of a Person.',
  familyName varchar(255) DEFAULT NULL COMMENT 'Family name. In the U.S., the last name of a Person.',
  additionalName varchar(255) DEFAULT NULL COMMENT 'An additional name for a Person, can be used for a middle name.',
  hasAddress int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the Address class.',
  hasContactDetail int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the ContactDetail class.',
  hasIdentifier int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the Identifier class.',
  hasMeasurementOrFact int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the MeasurementOrFact class.',
  hasReference int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the Reference class.',
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
ROW_FORMAT = DYNAMIC;

--
-- Create foreign key
--
ALTER TABLE person
ADD CONSTRAINT fk_person_address FOREIGN KEY (hasAddress)
REFERENCES address (id);

--
-- Create foreign key
--
ALTER TABLE person
ADD CONSTRAINT fk_person_contactdetail FOREIGN KEY (hasContactDetail)
REFERENCES contactdetail (id);

--
-- Create foreign key
--
ALTER TABLE person
ADD CONSTRAINT fk_person_indentifier FOREIGN KEY (hasIdentifier)
REFERENCES identifier (id);

--
-- Create foreign key
--
ALTER TABLE person
ADD CONSTRAINT fk_person_measurementorfact FOREIGN KEY (hasMeasurementOrFact)
REFERENCES measurementorfact (id);

--
-- Create foreign key
--
ALTER TABLE person
ADD CONSTRAINT fk_person_reference FOREIGN KEY (hasReference)
REFERENCES reference (id);

--
-- Create table `organisationalunit`
--
CREATE TABLE organisationalunit (
  id int NOT NULL AUTO_INCREMENT,
  hasAddress int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the Address class.',
  hasContactDetail int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the ContactDetail class.',
  hasIdentifier int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the Identifier class.',
  hasMeasurementOrFact int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the MeasurementOrFact class.',
  hasParentOrganisationalUnit int DEFAULT NULL COMMENT 'This property refers to one or more related parent instances of the OrganisationalUnit class.',
  hasPersonRole int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the PersonRole class.',
  hasReference int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the Reference class.',
  organisationalUnitName varchar(255) NOT NULL COMMENT 'An official name of the organisational unit in the local language.',
  organisationalUnitType varchar(255) NOT NULL COMMENT 'The type or level of organisational unit within a hierarchy responsible for the management of the collection being described.',
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
ROW_FORMAT = DYNAMIC;

--
-- Create index `unq_organisationalunit_haspersonrole` on table `organisationalunit`
--
ALTER TABLE organisationalunit
ADD UNIQUE INDEX unq_organisationalunit_haspersonrole (hasPersonRole);

--
-- Create foreign key
--
ALTER TABLE organisationalunit
ADD CONSTRAINT fk_organisationalunit_address FOREIGN KEY (hasAddress)
REFERENCES address (id);

--
-- Create foreign key
--
ALTER TABLE organisationalunit
ADD CONSTRAINT fk_organisationalunit_contactdetail FOREIGN KEY (hasContactDetail)
REFERENCES contactdetail (id);

--
-- Create foreign key
--
ALTER TABLE organisationalunit
ADD CONSTRAINT fk_organisationalunit_identifier FOREIGN KEY (hasIdentifier)
REFERENCES identifier (id);

--
-- Create foreign key
--
ALTER TABLE organisationalunit
ADD CONSTRAINT fk_organisationalunit_measurementorfact FOREIGN KEY (hasMeasurementOrFact)
REFERENCES measurementorfact (id);

--
-- Create foreign key
--
ALTER TABLE organisationalunit
ADD CONSTRAINT fk_organisationalunit_organisationalunit FOREIGN KEY (hasParentOrganisationalUnit)
REFERENCES organisationalunit (id);

--
-- Create foreign key
--
ALTER TABLE organisationalunit
ADD CONSTRAINT fk_organisationalunit_reference FOREIGN KEY (hasReference)
REFERENCES reference (id);

--
-- Create table `personrole`
--
CREATE TABLE personrole (
  id int NOT NULL AUTO_INCREMENT,
  hasAddress int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the Address class.',
  hasContactDetail int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the ContactDetail class.',
  hasIdentifier int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the Identifier class.',
  hasMeasurementOrFact int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the MeasurementOrFact class.',
  hasPerson int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the Person class.',
  hasReference int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the Reference class.',
  hasRole int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the Role class.',
  hasTemporalCoverage int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the TemporalCoverage class.',
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
ROW_FORMAT = DYNAMIC;

--
-- Create index `unq_personrole_hasperson` on table `personrole`
--
ALTER TABLE personrole
ADD UNIQUE INDEX unq_personrole_hasperson (hasPerson);

--
-- Create index `unq_personrole_hasrole` on table `personrole`
--
ALTER TABLE personrole
ADD UNIQUE INDEX unq_personrole_hasrole (hasRole);

--
-- Create foreign key
--
ALTER TABLE personrole
ADD CONSTRAINT fk_personrole_address FOREIGN KEY (hasAddress)
REFERENCES address (id);

--
-- Create foreign key
--
ALTER TABLE personrole
ADD CONSTRAINT fk_personrole_contactdetail FOREIGN KEY (hasContactDetail)
REFERENCES contactdetail (id);

--
-- Create foreign key
--
ALTER TABLE personrole
ADD CONSTRAINT fk_personrole_indentifier FOREIGN KEY (hasIdentifier)
REFERENCES identifier (id);

--
-- Create foreign key
--
ALTER TABLE personrole
ADD CONSTRAINT fk_personrole_measurementorfact FOREIGN KEY (hasMeasurementOrFact)
REFERENCES measurementorfact (id);

--
-- Create foreign key
--
ALTER TABLE personrole
ADD CONSTRAINT fk_personrole_organisationalunit FOREIGN KEY (id)
REFERENCES organisationalunit (hasPersonRole);

--
-- Create foreign key
--
ALTER TABLE personrole
ADD CONSTRAINT fk_personrole_person FOREIGN KEY (hasPerson)
REFERENCES person (id);

--
-- Create foreign key
--
ALTER TABLE personrole
ADD CONSTRAINT fk_personrole_reference FOREIGN KEY (hasReference)
REFERENCES reference (id);

--
-- Create foreign key
--
ALTER TABLE personrole
ADD CONSTRAINT fk_personrole_temporalcoverage FOREIGN KEY (hasTemporalCoverage)
REFERENCES temporalcoverage (id);

--
-- Create table `role`
--
CREATE TABLE role (
  id int NOT NULL AUTO_INCREMENT,
  hasIdentifier int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the Identifier class.',
  roleName varchar(255) DEFAULT NULL COMMENT 'A short descriptive name for the role.',
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
ROW_FORMAT = DYNAMIC;

--
-- Create foreign key
--
ALTER TABLE role
ADD CONSTRAINT fk_role_indentifier FOREIGN KEY (hasIdentifier)
REFERENCES identifier (id);

--
-- Create foreign key
--
ALTER TABLE role
ADD CONSTRAINT fk_role_personrole FOREIGN KEY (id)
REFERENCES personrole (hasRole);

--
-- Create table `recordlevel`
--
CREATE TABLE recordlevel (
  id int NOT NULL AUTO_INCREMENT,
  hasIdentifier int NOT NULL COMMENT 'This property refers to one or more related instances of the Identifier class. Every RecordLevel class must contain at least one Identifier, preferably a PID. ',
  hasObjectGroup int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the ObjectGroup class.',
  hasPersonRole int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the PersonRole class.',
  hasReference int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the Reference class.',
  hasResourceRelationship int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the ResourceRelationship class.',
  isDerivedCollection tinyint(1) DEFAULT NULL COMMENT 'A flag to indicate that the collection description has been generated by aggregating data from one or more underlying datasets of its individual objects.',
  license varchar(255) NOT NULL COMMENT 'A legal document giving official permission to do something with the resource.',
  rights varchar(255) DEFAULT NULL COMMENT 'Information about rights held in and over the resource.',
  rightsHolder varchar(255) DEFAULT NULL COMMENT 'A person or organization owning or managing rights over the resource.',
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
ROW_FORMAT = DYNAMIC;

--
-- Create index `unq_recordlevel_haspersonrole` on table `recordlevel`
--
ALTER TABLE recordlevel
ADD UNIQUE INDEX unq_recordlevel_haspersonrole (hasPersonRole);

--
-- Create foreign key
--
ALTER TABLE recordlevel
ADD CONSTRAINT fk_recordlevel_indentifier FOREIGN KEY (hasIdentifier)
REFERENCES identifier (id);

--
-- Create foreign key
--
ALTER TABLE recordlevel
ADD CONSTRAINT fk_recordlevel_personrole FOREIGN KEY (hasPersonRole)
REFERENCES personrole (id);

--
-- Create foreign key
--
ALTER TABLE recordlevel
ADD CONSTRAINT fk_recordlevel_reference FOREIGN KEY (hasReference)
REFERENCES reference (id);

--
-- Create foreign key
--
ALTER TABLE recordlevel
ADD CONSTRAINT fk_recordlevel_resourcerelationship FOREIGN KEY (hasResourceRelationship)
REFERENCES resourcerelationship (id);

--
-- Create table `event`
--
CREATE TABLE event (
  id int NOT NULL AUTO_INCREMENT,
  eventName varchar(255) DEFAULT NULL COMMENT 'The name commonly used to identify or refer to the event.',
  hasEcologicalContext int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the EcologicalContext class.',
  hasGeographicContext int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the GeographicContext class.',
  hasIdentifier int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the Identifier class.',
  hasMeasurementOrFact int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the MeasurementOrFact class.',
  hasParentEvent int DEFAULT NULL COMMENT 'This property refers to one or more related parent instances of the Event class.',
  hasPersonRole int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the PersonRole class.',
  hasReference int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the Reference class.',
  hasTemporalCoverage int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the TemporalCoverage class.',
  samplingProtocol json DEFAULT NULL COMMENT 'The names of, references to, or descriptions of the methods or protocols used during an Event.',
  verbatimEventDate varchar(255) DEFAULT NULL COMMENT 'The verbatim original representation of the date and time information for an Event.',
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
ROW_FORMAT = DYNAMIC;

--
-- Create index `unq_event_hasgeographiccontext` on table `event`
--
ALTER TABLE event
ADD UNIQUE INDEX unq_event_hasgeographiccontext (hasGeographicContext);

--
-- Create index `unq_event_haspersonrole` on table `event`
--
ALTER TABLE event
ADD UNIQUE INDEX unq_event_haspersonrole (hasPersonRole);

--
-- Create index `unq_event_hasparentevent` on table `event`
--
ALTER TABLE event
ADD UNIQUE INDEX unq_event_hasparentevent (hasParentEvent);

--
-- Create index `unq_event_hasecologicalcontext` on table `event`
--
ALTER TABLE event
ADD UNIQUE INDEX unq_event_hasecologicalcontext (hasEcologicalContext);

--
-- Create index `unq_event_hasreference` on table `event`
--
ALTER TABLE event
ADD UNIQUE INDEX unq_event_hasreference (hasReference);

--
-- Create foreign key
--
ALTER TABLE event
ADD CONSTRAINT fk_event_event FOREIGN KEY (id)
REFERENCES event (hasParentEvent);

--
-- Create foreign key
--
ALTER TABLE event
ADD CONSTRAINT fk_event_indentifier FOREIGN KEY (hasIdentifier)
REFERENCES identifier (id);

--
-- Create foreign key
--
ALTER TABLE event
ADD CONSTRAINT fk_event_measurementorfact FOREIGN KEY (hasMeasurementOrFact)
REFERENCES measurementorfact (id);

--
-- Create foreign key
--
ALTER TABLE event
ADD CONSTRAINT fk_event_personrole FOREIGN KEY (hasPersonRole)
REFERENCES personrole (id);

--
-- Create foreign key
--
ALTER TABLE event
ADD CONSTRAINT fk_event_reference FOREIGN KEY (hasReference)
REFERENCES reference (id);

--
-- Create foreign key
--
ALTER TABLE event
ADD CONSTRAINT fk_event_temporalcoverage FOREIGN KEY (hasTemporalCoverage)
REFERENCES temporalcoverage (id);

--
-- Create table `geographiccontext`
--
CREATE TABLE geographiccontext (
  id int NOT NULL AUTO_INCREMENT,
  continent varchar(255) DEFAULT NULL COMMENT 'The name of the continent in which the Location occurs.',
  country varchar(255) DEFAULT NULL COMMENT 'The name of the country or major administrative unit in which the Location occurs.',
  countryCode varchar(255) DEFAULT NULL COMMENT 'The standard code for the country in which the Location occurs.',
  county varchar(255) DEFAULT NULL COMMENT 'The full, unabbreviated name of the next smaller administrative region than stateProvince (county, shire, department, etc.) in which the Location occurs.',
  hasIdentifier int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the Identifier class.',
  hasMeasurementOrFact int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the MeasurementOrFact class.',
  hasReference int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the Reference class.',
  island varchar(255) DEFAULT NULL COMMENT 'The name of the island on or near which the Location occurs.',
  islandGroup varchar(255) DEFAULT NULL COMMENT 'The name of the island group in which the Location occurs.',
  locality varchar(255) DEFAULT NULL COMMENT 'The specific description of the place.',
  municipality varchar(255) DEFAULT NULL COMMENT 'The full, unabbreviated name of the next smaller administrative region than county (city, municipality, etc.) in which the Location occurs. Do not use this term for a nearby named place that does not contain the actual location.',
  region varchar(255) DEFAULT NULL COMMENT 'The name of a spatial region or named place of any size within an individual or multiple administrative areas.',
  stateProvince varchar(255) DEFAULT NULL COMMENT 'The name of the next smaller administrative region than country (state, province, canton, department, region, etc.) in which the Location occurs.',
  waterBody varchar(255) DEFAULT NULL COMMENT 'The name of the water body in which the Location occurs.',
  waterBodyType varchar(255) DEFAULT NULL COMMENT 'A term that indicates the aquatic order of a waterbody.',
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
ROW_FORMAT = DYNAMIC;

--
-- Create foreign key
--
ALTER TABLE geographiccontext
ADD CONSTRAINT fk_geographiccontext_event FOREIGN KEY (id)
REFERENCES event (hasGeographicContext);

--
-- Create foreign key
--
ALTER TABLE geographiccontext
ADD CONSTRAINT fk_geographiccontext_indentifier FOREIGN KEY (hasIdentifier)
REFERENCES identifier (id);

--
-- Create foreign key
--
ALTER TABLE geographiccontext
ADD CONSTRAINT fk_geographiccontext_measurementorfact FOREIGN KEY (hasMeasurementOrFact)
REFERENCES measurementorfact (id);

--
-- Create foreign key
--
ALTER TABLE geographiccontext
ADD CONSTRAINT fk_geographiccontext_reference FOREIGN KEY (hasReference)
REFERENCES reference (id);

--
-- Create table `ecologicalcontext`
--
CREATE TABLE ecologicalcontext (
  id int NOT NULL AUTO_INCREMENT,
  biogeographicRealm varchar(255) DEFAULT NULL COMMENT 'The broadest biogeographic division of Earth''s land and marine surface, based on distributional patterns of terrestrial and marine organisms.',
  biome varchar(255) DEFAULT NULL COMMENT 'A biogeographical unit consisting of a biological community that has formed in response to the physical environment in which they are found and a shared regional climate.',
  biomeType varchar(255) DEFAULT NULL COMMENT 'A top level classification of the type of biome from which objects were collected or where an event took place.',
  bioregion varchar(255) DEFAULT NULL COMMENT 'An ecologically and geographically defined area that is smaller than a biogeographic realm, but larger than an ecoregion or an ecosystem.',
  ecoregion varchar(255) DEFAULT NULL COMMENT 'An ecologically and geographically defined area that is smaller than a bioregion, which in turn is smaller than a biogeographic realm. Ecoregions cover relatively large areas of land or water, and contain characteristic, geographically distinct assemblages of natural communities and species.',
  ecosystem varchar(255) DEFAULT NULL COMMENT 'A specific kind of ecological classification that considers all four elements of the definition of ecosystems: a biotic component, an abiotic complex, the interactions between and within them, and the physical space that they occupy.',
  habitat varchar(255) DEFAULT NULL COMMENT 'A description of the type of environment in which an organism lives.',
  hasIdentifier int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the Identifier class.',
  hasMeasurementOrFact int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the MeasurementOrFact class.',
  hasReference int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the Reference class.',
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
ROW_FORMAT = DYNAMIC;

--
-- Create foreign key
--
ALTER TABLE ecologicalcontext
ADD CONSTRAINT fk_ecologicalcontext_event FOREIGN KEY (id)
REFERENCES event (hasEcologicalContext);

--
-- Create foreign key
--
ALTER TABLE ecologicalcontext
ADD CONSTRAINT fk_ecologicalcontext_indentifier FOREIGN KEY (hasIdentifier)
REFERENCES identifier (id);

--
-- Create foreign key
--
ALTER TABLE ecologicalcontext
ADD CONSTRAINT fk_ecologicalcontext_measurementorfact FOREIGN KEY (hasMeasurementOrFact)
REFERENCES measurementorfact (id);

--
-- Create foreign key
--
ALTER TABLE ecologicalcontext
ADD CONSTRAINT fk_ecologicalcontext_reference FOREIGN KEY (hasReference)
REFERENCES reference (id);

--
-- Create table `objectclassification`
--
CREATE TABLE objectclassification (
  id int NOT NULL AUTO_INCREMENT,
  hasIdentifier int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the Identifier class.',
  hasMeasurementOrFact int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the MeasurementOrFact class.',
  hasObjectClassification int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the ObjectClassification class.',
  hasReference int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the Reference class.',
  isTopParent tinyint(1) DEFAULT NULL COMMENT 'A flag to indicate that the current instance of ObjectClassification is at the top of the hierarchy represented by multiple nested instances of the class.',
  objectClassificationLevel varchar(255) DEFAULT NULL COMMENT 'The level of the ObjectClassification in the hierarchy.',
  objectClassificationName varchar(255) NOT NULL COMMENT 'A short title describing this ObjectClassification as a class, unit or grouping.',
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
ROW_FORMAT = DYNAMIC;

--
-- Create index `unq_objectclassification_hasreference` on table `objectclassification`
--
ALTER TABLE objectclassification
ADD UNIQUE INDEX unq_objectclassification_hasreference (hasReference);

--
-- Create foreign key
--
ALTER TABLE objectclassification
ADD CONSTRAINT fk_objectclassification_indentifier FOREIGN KEY (hasIdentifier)
REFERENCES identifier (id);

--
-- Create foreign key
--
ALTER TABLE objectclassification
ADD CONSTRAINT fk_objectclassification_measurementorfact FOREIGN KEY (hasMeasurementOrFact)
REFERENCES measurementorfact (id);

--
-- Create foreign key
--
ALTER TABLE objectclassification
ADD CONSTRAINT fk_objectclassification_reference FOREIGN KEY (hasReference)
REFERENCES reference (id);

--
-- Create table `geologicalcontext`
--
CREATE TABLE geologicalcontext (
  id int NOT NULL AUTO_INCREMENT,
  bed varchar(255) DEFAULT NULL COMMENT 'The full name of the lithostratigraphic bed from which the cataloged item was collected.',
  earliestAgeOrLowestStage varchar(255) DEFAULT NULL COMMENT 'The full name of the earliest possible geochronologic age or lowest chronostratigraphic stage attributable to the stratigraphic horizon from which the cataloged item was collected.',
  earliestEonOrLowestEonothem varchar(255) DEFAULT NULL COMMENT 'The full name of the earliest possible geochronologic eon or lowest chrono-stratigraphic eonothem or the informal name (Precambrian) attributable to the stratigraphic horizon from which the cataloged item was collected.',
  earliestEpochOrLowestSeries varchar(255) DEFAULT NULL COMMENT 'The full name of the earliest possible geochronologic epoch or lowest chronostratigraphic series attributable to the stratigraphic horizon from which the cataloged item was collected.',
  earliestEraOrLowestErathem varchar(255) DEFAULT NULL COMMENT 'The full name of the earliest possible geochronologic era or lowest chronostratigraphic erathem attributable to the stratigraphic horizon from which the cataloged item was collected.',
  earliestPeriodOrLowestSystem varchar(255) DEFAULT NULL COMMENT 'The full name of the earliest possible geochronologic period or lowest chronostratigraphic system attributable to the stratigraphic horizon from which the cataloged item was collected.',
  formation varchar(255) DEFAULT NULL COMMENT 'The full name of the lithostratigraphic formation from which the cataloged item was collected.',
  _group varchar(255) DEFAULT NULL,
  hasIdentifier int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the Identifier class.',
  hasMeasurementOrFact int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the MeasurementOrFact class.',
  hasReference int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the Reference class.',
  latestAgeOrHighestStage varchar(255) DEFAULT NULL COMMENT 'The full name of the latest possible geochronologic age or highest chronostratigraphic stage attributable to the stratigraphic horizon from which the cataloged item was collected.',
  latestEonOrHighestEonothem varchar(255) DEFAULT NULL COMMENT 'The full name of the latest possible geochronologic eon or highest chrono-stratigraphic eonothem or the informal name (Precambrian) attributable to the stratigraphic horizon from which the cataloged item was collected.',
  latestEpochOrHighestSeries varchar(255) DEFAULT NULL COMMENT 'The full name of the latest possible geochronologic epoch or highest chronostratigraphic series attributable to the stratigraphic horizon from which the cataloged item was collected.',
  latestEraOrHighestErathem varchar(255) DEFAULT NULL COMMENT 'The full name of the latest possible geochronologic era or highest chronostratigraphic erathem attributable to the stratigraphic horizon from which the cataloged item was collected.',
  latestPeriodOrHighestSystem varchar(255) DEFAULT NULL COMMENT 'The full name of the latest possible geochronologic period or highest chronostratigraphic system attributable to the stratigraphic horizon from which the cataloged item was collected.',
  member varchar(255) DEFAULT NULL COMMENT 'The full name of the lithostratigraphic member from which the cataloged item was collected.',
  supergroup varchar(255) DEFAULT NULL COMMENT 'The full name of the lithostratigraphic supergroup from which the cataloged item was collected.',
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
ROW_FORMAT = DYNAMIC;

--
-- Create index `unq_geologicalcontext_hasreference` on table `geologicalcontext`
--
ALTER TABLE geologicalcontext
ADD UNIQUE INDEX unq_geologicalcontext_hasreference (hasReference);

--
-- Create foreign key
--
ALTER TABLE geologicalcontext
ADD CONSTRAINT fk_geologicalcontext_indentifier FOREIGN KEY (hasIdentifier)
REFERENCES identifier (id);

--
-- Create foreign key
--
ALTER TABLE geologicalcontext
ADD CONSTRAINT fk_geologicalcontext_measurementorfact FOREIGN KEY (hasMeasurementOrFact)
REFERENCES measurementorfact (id);

--
-- Create foreign key
--
ALTER TABLE geologicalcontext
ADD CONSTRAINT fk_geologicalcontext_reference FOREIGN KEY (hasReference)
REFERENCES reference (id);

--
-- Create table `chronometricage`
--
CREATE TABLE chronometricage (
  id int NOT NULL AUTO_INCREMENT,
  chronometricAgeProtocol varchar(255) DEFAULT NULL COMMENT 'A description of or reference to the methods used to determine the chronometric age.',
  chronometricAgeRemarks varchar(255) DEFAULT NULL COMMENT 'Notes or comments about the ChronometricAge.',
  chronometricAgeUncertaintyInYears decimal(10, 0) DEFAULT NULL COMMENT 'The temporal uncertainty of the earliestChronometricAge and latestChronometicAge in years.',
  earliestChronometricAge decimal(10, 0) DEFAULT NULL COMMENT 'The maximum/earliest/oldest possible age of a specimen as determined by a dating method.',
  earliestChronometricAgeReferenceSystem varchar(255) DEFAULT NULL COMMENT 'The reference system associated with the earliestChronometricAge.',
  hasIdentifier int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the Identifier class.',
  hasMeasurementOrFact int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the MeasurementOrFact class.',
  hasReference int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the Reference class.',
  latestChronometricAge decimal(10, 0) DEFAULT NULL COMMENT 'The minimum/latest/youngest possible age of a specimen as determined by a dating method.',
  latestChronometricAgeReferenceSystem varchar(255) DEFAULT NULL COMMENT 'The reference system associated with the latestChronometricAge.',
  verbatimChronometricAge varchar(255) DEFAULT NULL COMMENT 'The verbatim age for a specimen, whether reported by a dating assay, associated references, or legacy information.',
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
ROW_FORMAT = DYNAMIC;

--
-- Create index `unq_chronometricage_hasreference` on table `chronometricage`
--
ALTER TABLE chronometricage
ADD UNIQUE INDEX unq_chronometricage_hasreference (hasReference);

--
-- Create foreign key
--
ALTER TABLE chronometricage
ADD CONSTRAINT fk_chronometricage_indentifier FOREIGN KEY (hasIdentifier)
REFERENCES identifier (id);

--
-- Create foreign key
--
ALTER TABLE chronometricage
ADD CONSTRAINT fk_chronometricage_measurementorfact FOREIGN KEY (hasMeasurementOrFact)
REFERENCES measurementorfact (id);

--
-- Create foreign key
--
ALTER TABLE chronometricage
ADD CONSTRAINT fk_chronometricage_reference FOREIGN KEY (hasReference)
REFERENCES reference (id);

--
-- Create table `objectgroup`
--
CREATE TABLE objectgroup (
  id int NOT NULL AUTO_INCREMENT,
  alternativeCollectionName json DEFAULT NULL COMMENT 'One or more short titles different to the one given in ObjectGroup.collectionName used to summarise the collection objects contained within the ObjectGroup.',
  baseTypeOfObjectGroup json NOT NULL COMMENT 'High-level terms describing the fundamental nature of objects in the ObjectGroup.',
  collectionManagementSystem json DEFAULT NULL COMMENT 'The collection management system which is used to hold and manage the primary data for the objects contained within the ObjectGroup.',
  collectionName varchar(255) DEFAULT NULL COMMENT 'A short title that summarises the collection objects contained within the ObjectGroup.',
  conditionsOfAccess json DEFAULT NULL COMMENT 'Information about who can access the collection being described or an indication of its security status.',
  degreeOfEstablishment json DEFAULT NULL COMMENT 'The degree to which an Organism survives, reproduces, and expands its range at the given place and time.',
  description varchar(255) DEFAULT NULL COMMENT 'A free text description or narrative about the collection.',
  discipline json DEFAULT NULL COMMENT 'A high level classification of the scientific discipline to which the objects within the collection belong or are related.',
  hasChronometricAge int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the ChronometricAge class.',
  hasCollectionStatusHistory int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the CollectionStatusHistory class.',
  hasEcologicalContext int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the EcologicalContext class.',
  hasEvent int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the Event class.',
  hasGeographicContext int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the GeographicContext class.',
  hasGeologicalContext int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the GeologicalContext class.',
  hasIdentifier int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the Identifier class.',
  hasMeasurementOrFact int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the MeasurementOrFact class.',
  hasObjectClassification int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the ObjectClassification class.',
  hasOrganisationalUnit int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the OrganisationalUnit class.',
  hasPersonRole int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the PersonRole class.',
  hasReference int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the Reference class.',
  hasResourceRelationship int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the ResourceRelationship class.',
  hasStorageLocation int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the StorageLocation class.',
  hasTaxon int DEFAULT NULL COMMENT 'This property refers to one or more related instances of the Taxon class.',
  isCurrentCollection tinyint(1) DEFAULT NULL COMMENT 'A flag to indicate whether the collection still exists as a single entity.',
  isKnownToContainTypes tinyint(1) DEFAULT NULL COMMENT 'Flag property to indicate that the collection is known to include type specimens.',
  material json DEFAULT NULL COMMENT 'Material denotes the raw substance(s) from which the object is formed, in whole or in part.',
  objectType json DEFAULT NULL COMMENT 'High-level terms for the classification of curated objects.',
  period json DEFAULT NULL COMMENT 'Used to describe prehistoric or historic periods.',
  preparationType json DEFAULT NULL COMMENT 'A term used to classify or describe an object that indicates the actions that have been taken upon it and/or the processes it has been put through to prepare it for scientific use or study.',
  preservationMethod json DEFAULT NULL COMMENT 'A term used to classify or describe an object that indicates the primary or most recent action, measure or process that has been used in order to preserve the objects in the collection for long-term storage.',
  preservationMode json DEFAULT NULL COMMENT 'The means by which a palaeontological specimen was preserved or created e.g. body, cast, mold, trace fossil, soft parts mineralised etc.',
  typeOfObjectGroup json DEFAULT NULL COMMENT 'Additional information that describes the object(s) in the collection.',
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
ROW_FORMAT = DYNAMIC;

--
-- Create index `unq_objectgroup_hascollectionstatushistory` on table `objectgroup`
--
ALTER TABLE objectgroup
ADD UNIQUE INDEX unq_objectgroup_hascollectionstatushistory (hasCollectionStatusHistory);

--
-- Create foreign key
--
ALTER TABLE objectgroup
ADD CONSTRAINT fk_objectgroup_chronometricage FOREIGN KEY (hasChronometricAge)
REFERENCES chronometricage (id);

--
-- Create foreign key
--
ALTER TABLE objectgroup
ADD CONSTRAINT fk_objectgroup_collectionstatushistory FOREIGN KEY (hasCollectionStatusHistory)
REFERENCES collectionstatushistory (id);

--
-- Create foreign key
--
ALTER TABLE objectgroup
ADD CONSTRAINT fk_objectgroup_ecologicalcontext FOREIGN KEY (hasEcologicalContext)
REFERENCES ecologicalcontext (id);

--
-- Create foreign key
--
ALTER TABLE objectgroup
ADD CONSTRAINT fk_objectgroup_event FOREIGN KEY (hasEvent)
REFERENCES event (id);

--
-- Create foreign key
--
ALTER TABLE objectgroup
ADD CONSTRAINT fk_objectgroup_geographiccontext FOREIGN KEY (hasGeographicContext)
REFERENCES geographiccontext (id);

--
-- Create foreign key
--
ALTER TABLE objectgroup
ADD CONSTRAINT fk_objectgroup_geologicalcontext FOREIGN KEY (hasGeologicalContext)
REFERENCES geologicalcontext (id);

--
-- Create foreign key
--
ALTER TABLE objectgroup
ADD CONSTRAINT fk_objectgroup_indentifier FOREIGN KEY (hasIdentifier)
REFERENCES identifier (id);

--
-- Create foreign key
--
ALTER TABLE objectgroup
ADD CONSTRAINT fk_objectgroup_latimercorescheme FOREIGN KEY (id)
REFERENCES latimercorescheme (hasObjectGroup);

--
-- Create foreign key
--
ALTER TABLE objectgroup
ADD CONSTRAINT fk_objectgroup_measurementorfact FOREIGN KEY (hasMeasurementOrFact)
REFERENCES measurementorfact (id);

--
-- Create foreign key
--
ALTER TABLE objectgroup
ADD CONSTRAINT fk_objectgroup_objectclassification FOREIGN KEY (hasObjectClassification)
REFERENCES objectclassification (id);

--
-- Create foreign key
--
ALTER TABLE objectgroup
ADD CONSTRAINT fk_objectgroup_organisationalunit FOREIGN KEY (hasOrganisationalUnit)
REFERENCES organisationalunit (id);

--
-- Create foreign key
--
ALTER TABLE objectgroup
ADD CONSTRAINT fk_objectgroup_personrole FOREIGN KEY (hasPersonRole)
REFERENCES personrole (id);

--
-- Create foreign key
--
ALTER TABLE objectgroup
ADD CONSTRAINT fk_objectgroup_reference FOREIGN KEY (hasReference)
REFERENCES reference (id);

--
-- Create foreign key
--
ALTER TABLE objectgroup
ADD CONSTRAINT fk_objectgroup_resourcerelationship FOREIGN KEY (hasResourceRelationship)
REFERENCES resourcerelationship (id);

--
-- Create foreign key
--
ALTER TABLE objectgroup
ADD CONSTRAINT fk_objectgroup_storagelocation FOREIGN KEY (hasStorageLocation)
REFERENCES storagelocation (id);

--
-- Create foreign key
--
ALTER TABLE objectgroup
ADD CONSTRAINT fk_objectgroup_taxon FOREIGN KEY (hasTaxon)
REFERENCES taxon (id);

--
-- Create table `ltc_termlist`
--
CREATE TABLE ltc_termlist (
  namespace varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  term_local_name varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  label varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  definition text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `usage` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  notes text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  examples text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  rdf_type varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  class_name varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  is_required tinyint(1) DEFAULT NULL,
  is_repeatable tinyint(1) DEFAULT NULL,
  compound_name varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  namespace_iri varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  term_iri varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  term_ns_name varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  datatype varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL
)
ENGINE = INNODB,
AVG_ROW_LENGTH = 718,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
ROW_FORMAT = DYNAMIC;

--
-- Dumping data for table identifier
--
-- Table latimer_core_schema.identifier does not contain any data (it is empty)

--
-- Dumping data for table reference
--
-- Table latimer_core_schema.reference does not contain any data (it is empty)

--
-- Dumping data for table measurementorfact
--
-- Table latimer_core_schema.measurementorfact does not contain any data (it is empty)

--
-- Dumping data for table storagelocation
--
-- Table latimer_core_schema.storagelocation does not contain any data (it is empty)

--
-- Dumping data for table contactdetail
--
-- Table latimer_core_schema.contactdetail does not contain any data (it is empty)

--
-- Dumping data for table address
--
-- Table latimer_core_schema.address does not contain any data (it is empty)

--
-- Dumping data for table person
--
-- Table latimer_core_schema.person does not contain any data (it is empty)

--
-- Dumping data for table organisationalunit
--
-- Table latimer_core_schema.organisationalunit does not contain any data (it is empty)

--
-- Dumping data for table temporalcoverage
--
-- Table latimer_core_schema.temporalcoverage does not contain any data (it is empty)

--
-- Dumping data for table personrole
--
-- Table latimer_core_schema.personrole does not contain any data (it is empty)

--
-- Dumping data for table schemeterm
--
-- Table latimer_core_schema.schemeterm does not contain any data (it is empty)

--
-- Dumping data for table schememeasurementorfact
--
-- Table latimer_core_schema.schememeasurementorfact does not contain any data (it is empty)

--
-- Dumping data for table event
--
-- Table latimer_core_schema.event does not contain any data (it is empty)

--
-- Dumping data for table taxon
--
-- Table latimer_core_schema.taxon does not contain any data (it is empty)

--
-- Dumping data for table resourcerelationship
--
-- Table latimer_core_schema.resourcerelationship does not contain any data (it is empty)

--
-- Dumping data for table objectclassification
--
-- Table latimer_core_schema.objectclassification does not contain any data (it is empty)

--
-- Dumping data for table latimercorescheme
--
-- Table latimer_core_schema.latimercorescheme does not contain any data (it is empty)

--
-- Dumping data for table geologicalcontext
--
-- Table latimer_core_schema.geologicalcontext does not contain any data (it is empty)

--
-- Dumping data for table geographiccontext
--
-- Table latimer_core_schema.geographiccontext does not contain any data (it is empty)

--
-- Dumping data for table ecologicalcontext
--
-- Table latimer_core_schema.ecologicalcontext does not contain any data (it is empty)

--
-- Dumping data for table collectionstatushistory
--
-- Table latimer_core_schema.collectionstatushistory does not contain any data (it is empty)

--
-- Dumping data for table chronometricage
--
-- Table latimer_core_schema.chronometricage does not contain any data (it is empty)

--
-- Dumping data for table role
--
-- Table latimer_core_schema.role does not contain any data (it is empty)

--
-- Dumping data for table recordlevel
--
-- Table latimer_core_schema.recordlevel does not contain any data (it is empty)

--
-- Dumping data for table objectgroup
--
-- Table latimer_core_schema.objectgroup does not contain any data (it is empty)

--
-- Dumping data for table ltc_termlist
--
INSERT INTO ltc_termlist VALUES
('ltc:', 'Address', 'Address', 'A physical address for an organisational unit or person.', '', '', '', 'http://www.w3.org/2000/01/rdf-schema#Class', 'Address', 0, 1, 'Address.Address', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/Address', 'ltc:Address', ''),
('ltc:', 'addressType', 'Address Type', 'A person or organization can have different addresses, for different purposes. For example, a postal address, a loan address, an address for visits and so on. This property is used to specify the kind of address.', '', '', '`Physical`, `Postal`, `Loans`, `Visits`, `Home`, `Work`, `Main`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'Address', 0, 0, 'Address.addressType', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/addressType', 'ltc:addressType', 'string'),
('ltc:', 'hasIdentifier', 'Has Identifier', 'This property refers to one or more related instances of the Identifier class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'Address', 0, 0, 'Address.hasIdentifier', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasIdentifier', 'ltc:hasIdentifier', 'array<ltc:Identifier>'),
('ltc:', 'ChronometricAge', 'Chronometric Age', 'The age of a specimen or related materials that is generated from a dating assay.', '', 'To represent a single age, enter the same value in both earliestChronometricAge and latestChronometricAge. Leaving one or both of these fields blank indicates that the value is unknown, has yet to be recorded or is not applicable to the material being described. We recommend that you do not use this class to indicate chronostratigraphy: it is intended to be used to reflect a chronometric age or range of ages determined via one or more named analytical protocols, methods or techniques.', '', 'http://www.w3.org/2000/01/rdf-schema#Class', 'ChronometricAge', 0, 1, 'ChronometricAge.ChronometricAge', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/ChronometricAge', 'ltc:ChronometricAge', ''),
('ltc:', 'hasIdentifier', 'Has Identifier', 'This property refers to one or more related instances of the Identifier class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'ChronometricAge', 0, 0, 'ChronometricAge.hasIdentifier', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasIdentifier', 'ltc:hasIdentifier', 'array<ltc:Identifier>'),
('ltc:', 'hasMeasurementOrFact', 'Has Measurement Or Fact', 'This property refers to one or more related instances of the MeasurementOrFact class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'ChronometricAge', 0, 0, 'ChronometricAge.hasMeasurementOrFact', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasMeasurementOrFact', 'ltc:hasMeasurementOrFact', 'array<ltc:MeasurementOrFact>'),
('ltc:', 'hasReference', 'Has Reference', 'This property refers to one or more related instances of the Reference class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'ChronometricAge', 0, 0, 'ChronometricAge.hasReference', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasReference', 'ltc:hasReference', 'array<ltc:Reference>'),
('ltc:', 'CollectionStatusHistory', 'Collection Status History', 'A record of current and past statuses of the object group and the reason for status changes.', '', 'Use this class to record the history of and reason for changes in the status of the described collection. Types of status described by this class may, for example, include ownership, management, accessibility or accrual policy over time. Dates reflecting the start and end of the status described by this class should be recorded using an instance of TemporalCoverage. If temporalCoverageEndDateTime is empty, the status should be inferred to be the current status of the collection.', '', 'http://www.w3.org/2000/01/rdf-schema#Class', 'CollectionStatusHistory', 0, 1, 'CollectionStatusHistory.CollectionStatusHistory', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/CollectionStatusHistory', 'ltc:CollectionStatusHistory', ''),
('ltc:', 'hasIdentifier', 'Has Identifier', 'This property refers to one or more related instances of the Identifier class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'CollectionStatusHistory', 0, 0, 'CollectionStatusHistory.hasIdentifier', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasIdentifier', 'ltc:hasIdentifier', 'array<ltc:Identifier>'),
('ltc:', 'hasMeasurementOrFact', 'Has Measurement Or Fact', 'This property refers to one or more related instances of the MeasurementOrFact class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'CollectionStatusHistory', 0, 0, 'CollectionStatusHistory.hasMeasurementOrFact', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasMeasurementOrFact', 'ltc:hasMeasurementOrFact', 'array<ltc:MeasurementOrFact>'),
('ltc:', 'hasReference', 'Has Reference', 'This property refers to one or more related instances of the Reference class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'CollectionStatusHistory', 0, 0, 'CollectionStatusHistory.hasReference', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasReference', 'ltc:hasReference', 'array<ltc:Reference>'),
('ltc:', 'hasTemporalCoverage', 'Has Temporal Coverage', 'This property refers to one or more related instances of the TemporalCoverage class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'CollectionStatusHistory', 0, 0, 'CollectionStatusHistory.hasTemporalCoverage', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasTemporalCoverage', 'ltc:hasTemporalCoverage', 'array<ltc:TemporalCoverage>'),
('ltc:', 'status', 'Status', 'The development status of the collection during a specified period.', '', 'The values/vocabularies for a status are predicated by the statusType. The in the examples mentioned terms are a cumulative list of terms associated with several different statusTypes.', '`Complete`, `In part`, `Developing`, `Closed`, `Active growth`, `Consumable`, `Decreasing`, `Lost`, `Missing`, `Passive growth`, `Static`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'CollectionStatusHistory', 1, 0, 'CollectionStatusHistory.status', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/status', 'ltc:status', 'string'),
('ltc:', 'statusChangeReason', 'Status Change Reason', 'An explanation of why the collection transitioned to the value set in the status property.', '', 'statusChangeReason should be aligned with the value of statusType.', '`Pest infestation`, `Exchange`, `Transfer`, `Return to country of origin`, `Worldwide pandemic`, `moved to secure off-site storage`, `reorganisation, no access from 2020-2023`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'CollectionStatusHistory', 0, 0, 'CollectionStatusHistory.statusChangeReason', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/statusChangeReason', 'ltc:statusChangeReason', 'string'),
('ltc:', 'statusType', 'Status Type', 'A top-level classification of the different categories of status that can be applied to the collection.', '', 'statusType forms the top level of a two-level hierarchy with the status property. Recommended best practice is to use a controlled vocabulary.', '`Stewardship`, `Accessibility`, `Completeness`, `Growth Status`, `Organisational`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'CollectionStatusHistory', 1, 0, 'CollectionStatusHistory.statusType', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/statusType', 'ltc:statusType', 'string'),
('ltc:', 'ContactDetail', 'Contact Detail', 'Details of a method by which an entity such as a Person or OrganisationalUnit may be contacted.', '', 'The Address class should be used to store physical or postal addresses. For all other types of contact details, this class should be used.', '', 'http://www.w3.org/2000/01/rdf-schema#Class', 'ContactDetail', 0, 1, 'ContactDetail.ContactDetail', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/ContactDetail', 'ltc:ContactDetail', ''),
('ltc:', 'contactDetailCategory', 'Contact Detail Category', 'The method of contact to which the contact detail applies.', '', 'Recommended practice is to use a controlled vocabulary.', '`Email`, `Phone (mobile)`, `Phone (home)`, `Twitter handle`, `GitHub handle`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'ContactDetail', 1, 0, 'ContactDetail.contactDetailCategory', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/contactDetailCategory', 'ltc:contactDetailCategory', 'string'),
('ltc:', 'contactDetailFunction', 'Contact Detail Function', 'A brief label describing the nature of the enquiry or enquiries that are appropriate to direct to the contact detail.', '', '', '`Loan requests`, `General enquiries`, `Data issues`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'ContactDetail', 0, 1, 'ContactDetail.contactDetailFunction', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/contactDetailFunction', 'ltc:contactDetailFunction', 'list'),
('ltc:', 'contactDetailValue', 'Contact Detail Value', 'The value of the contact detail, such as the phone number or email address.', '', '', '`01234 567891`, `someone@example.org`, `@github_user`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'ContactDetail', 1, 0, 'ContactDetail.contactDetailValue', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/contactDetailValue', 'ltc:contactDetailValue', 'string'),
('ltc:', 'hasIdentifier', 'Has Identifier', 'This property refers to one or more related instances of the Identifier class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'ContactDetail', 0, 0, 'ContactDetail.hasIdentifier', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasIdentifier', 'ltc:hasIdentifier', 'array<ltc:Identifier>'),
('ltc:', 'EcologicalContext', 'Ecological Context', 'The ecological and/or biogeographic classification of the region from which objects associated with the ObjectGroup were collected, or where an Event took place.', '', 'There is some conceptual overlap with the GeographicContext class with respect to geographic locations. This class should be used for biogeographic and ecological concepts, whereas for physical, political and administrative geographic locations, the GeographicContext class is more appropriate. Specific information about the habitat and ecological conditions that applied at the time that an event took place should be recorded in the `habitat` property of the Event class.', '', 'http://www.w3.org/2000/01/rdf-schema#Class', 'EcologicalContext', 0, 1, 'EcologicalContext.EcologicalContext', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/EcologicalContext', 'ltc:EcologicalContext', ''),
('ltc:', 'biogeographicRealm', 'Biogeographic Realm', 'The broadest biogeographic division of Earth''s land and marine surface, based on distributional patterns of terrestrial and marine organisms.', '', 'This term may commonly be used in a biogeographic hierarchy above marineProvince (marine only), ecoregion and ecosystem. It is recommended to use controlled vocabularies such as those adopted by the World Wildlife Fund (WWF) / Global 200 (Olson et at. 1998). ', '`Afrotropical`, `Australasian`, `Indomalayan`, `Nearctic`, `Arctic`, `Temperate Northern Atlantic`, `Temperate Northern Pacific`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'EcologicalContext', 0, 0, 'EcologicalContext.biogeographicRealm', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/biogeographicRealm', 'ltc:biogeographicRealm', 'string'),
('ltc:', 'biome', 'Biome', 'A biogeographical unit consisting of a biological community that has formed in response to the physical environment in which they are found and a shared regional climate.', '', 'This property can be used to record terrestrial, freshwater and marine biomes. It is recommended to use controlled vocabularies such as those adopted by the World Wildlife Fund (WWF) / Global 200 (Olson et at. 1998). ', '`Deserts and xeric shrublands`, `Tropical and subtropical moist broadleaf forests`, `Open sea`, `Deep sea`, `Littoral/Intertidal zone`, `Salt marsh`, `Estuaries`, `Large lakes`, `Large river deltas`, `Polar freshwaters`, `Tropical and subtropical coastal rivers`, `Tropical and subtropical floodplain rivers and wetlands`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'EcologicalContext', 0, 0, 'EcologicalContext.biome', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/biome', 'ltc:biome', 'string'),
('ltc:', 'biomeType', 'Biome Type', 'A top level classification of the type of biome from which objects were collected or where an event took place.', '', 'The biomeType is positioned at a level between the biosphere (the global sum of all ecosystems on Earth) and the more detailed terrestrial, marine and freshwater biomes. The latter should be recorded using the EcologicalContext.biome property.', '`Terrestrial`, `Marine`, `Freshwater`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'EcologicalContext', 0, 0, 'EcologicalContext.biomeType', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/biomeType', 'ltc:biomeType', 'string'),
('ltc:', 'bioregion', 'Bioregion', 'An ecologically and geographically defined area that is smaller than a biogeographic realm, but larger than an ecoregion or an ecosystem.', '', 'This is analagous with the marine province concept for marine regions. It is recommended to use controlled vocabularies such as those adopted by the World Wildlife Fund (WWF) / Global 200 (Olson et at. 1998), from which this concept originated. ', '`Western Africa and Sahel`, `New Guinea and Melanesia`, `Indian subcontinent`, `South China Sea`, `Mediterranean Sea`, `Central Indian Ocean Islands`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'EcologicalContext', 0, 0, 'EcologicalContext.bioregion', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/bioregion', 'ltc:bioregion', 'string'),
('ltc:', 'ecoregion', 'Ecoregion', 'An ecologically and geographically defined area that is smaller than a bioregion, which in turn is smaller than a biogeographic realm. Ecoregions cover relatively large areas of land or water, and contain characteristic, geographically distinct assemblages of natural communities and species.', '', 'It is recommended to use controlled vocabularies such as those adopted by the World Wildlife Fund (WWF) / Global 200 (Olson et at. 1998).', '`Albertine Rift montane forests`, `Atlantic Equatorial coastal forests`, `Irrawaddy freshwater swamp forests`, `Adriatic Sea`, `Cortezian`, `Ningaloo`, `Ross Sea`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'EcologicalContext', 0, 0, 'EcologicalContext.ecoregion', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/ecoregion', 'ltc:ecoregion', 'string'),
('ltc:', 'ecosystem', 'Ecosystem', 'A specific kind of ecological classification that considers all four elements of the definition of ecosystems: a biotic component, an abiotic complex, the interactions between and within them, and the physical space that they occupy.', '', '', '`Orjen, vegetation belt between 1,100 and 1,450 m, Oromediterranean zone, nemoral zone (temperate zone)`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'EcologicalContext', 0, 0, 'EcologicalContext.ecosystem', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/ecosystem', 'ltc:ecosystem', 'string'),
('ltc:', 'habitat', 'Habitat', 'A description of the type of environment in which an organism lives.', '', '', '`oak savanna`, `pre-cordilleran steppe`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'EcologicalContext', 0, 0, 'EcologicalContext.habitat', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/habitat', 'ltc:habitat', 'string'),
('ltc:', 'hasIdentifier', 'Has Identifier', 'This property refers to one or more related instances of the Identifier class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'EcologicalContext', 0, 0, 'EcologicalContext.hasIdentifier', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasIdentifier', 'ltc:hasIdentifier', 'array<ltc:Identifier>'),
('ltc:', 'hasMeasurementOrFact', 'Has Measurement Or Fact', 'This property refers to one or more related instances of the MeasurementOrFact class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'EcologicalContext', 0, 0, 'EcologicalContext.hasMeasurementOrFact', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasMeasurementOrFact', 'ltc:hasMeasurementOrFact', 'array<ltc:MeasurementOrFact>'),
('ltc:', 'hasReference', 'Has Reference', 'This property refers to one or more related instances of the Reference class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'EcologicalContext', 0, 0, 'EcologicalContext.hasReference', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasReference', 'ltc:hasReference', 'array<ltc:Reference>'),
('ltc:', 'Event', 'Event', 'An action that occurs at some location during some time.', '', 'Derived from dwc Class event (http://rs.tdwg.org/dwc/terms/version/Event-2018-09-06). This class has been defined under the ltc namespace because it only has a subset of the properties of DwC:Event. All ltc:Event properties are borrowed from and reference the dwc namespace. Examples of an Event include: A specimen collection process. A camera trap image capture. A marine trawl.', '', 'http://www.w3.org/2000/01/rdf-schema#Class', 'Event', 0, 1, 'Event.Event', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/Event', 'ltc:Event', ''),
('ltc:', 'eventName', 'Event Name', 'The name commonly used to identify or refer to the event.', '', '', '`Trawl 3.42`, ` Voyage of the Rattlesnake 1846-1850`, `Donner-Reed Party`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'Event', 0, 0, 'Event.eventName', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/eventName', 'ltc:eventName', 'string'),
('ltc:', 'hasEcologicalContext', 'Has Ecological Context', 'This property refers to one or more related instances of the EcologicalContext class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'Event', 0, 0, 'Event.hasEcologicalContext', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasEcologicalContext', 'ltc:hasEcologicalContext', 'array<ltc:EcologicalContext>'),
('ltc:', 'hasGeographicContext', 'Has Geographic Context', 'This property refers to one or more related instances of the GeographicContext class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'Event', 0, 0, 'Event.hasGeographicContext', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasGeographicContext', 'ltc:hasGeographicContext', 'array<ltc:GeographicContext>'),
('ltc:', 'hasIdentifier', 'Has Identifier', 'This property refers to one or more related instances of the Identifier class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'Event', 0, 0, 'Event.hasIdentifier', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasIdentifier', 'ltc:hasIdentifier', 'array<ltc:Identifier>'),
('ltc:', 'hasMeasurementOrFact', 'Has Measurement Or Fact', 'This property refers to one or more related instances of the MeasurementOrFact class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'Event', 0, 0, 'Event.hasMeasurementOrFact', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasMeasurementOrFact', 'ltc:hasMeasurementOrFact', 'array<ltc:MeasurementOrFact>'),
('ltc:', 'hasParentEvent', 'Has Parent Event', 'This property refers to one or more related parent instances of the Event class.', 'This term should only contain Events that can be considered to be a parent of the current instance.', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'Event', 0, 0, 'Event.hasParentEvent', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasParentEvent', 'ltc:hasParentEvent', 'array<ltc:Event>'),
('ltc:', 'hasPersonRole', 'Has Person Role', 'This property refers to one or more related instances of the PersonRole class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'Event', 0, 0, 'Event.hasPersonRole', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasPersonRole', 'ltc:hasPersonRole', 'array<ltc:PersonRole>'),
('ltc:', 'hasReference', 'Has Reference', 'This property refers to one or more related instances of the Reference class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'Event', 0, 0, 'Event.hasReference', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasReference', 'ltc:hasReference', 'array<ltc:Reference>'),
('ltc:', 'hasTemporalCoverage', 'Has Temporal Coverage', 'This property refers to one or more related instances of the TemporalCoverage class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'Event', 0, 0, 'Event.hasTemporalCoverage', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasTemporalCoverage', 'ltc:hasTemporalCoverage', 'array<ltc:TemporalCoverage>'),
('ltc:', 'GeographicContext', 'Geographic Context', 'The geographic location from which objects associated with the ObjectGroup were collected, or where an Event took place.', '', '', '', 'http://www.w3.org/2000/01/rdf-schema#Class', 'GeographicContext', 0, 1, 'GeographicContext.GeographicContext', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/GeographicContext', 'ltc:GeographicContext', ''),
('ltc:', 'hasIdentifier', 'Has Identifier', 'This property refers to one or more related instances of the Identifier class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'GeographicContext', 0, 0, 'GeographicContext.hasIdentifier', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasIdentifier', 'ltc:hasIdentifier', 'array<ltc:Identifier>'),
('ltc:', 'hasMeasurementOrFact', 'Has Measurement Or Fact', 'This property refers to one or more related instances of the MeasurementOrFact class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'GeographicContext', 0, 0, 'GeographicContext.hasMeasurementOrFact', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasMeasurementOrFact', 'ltc:hasMeasurementOrFact', 'array<ltc:MeasurementOrFact>'),
('ltc:', 'hasReference', 'Has Reference', 'This property refers to one or more related instances of the Reference class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'GeographicContext', 0, 0, 'GeographicContext.hasReference', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasReference', 'ltc:hasReference', 'array<ltc:Reference>'),
('ltc:', 'region', 'Region', 'The name of a spatial region or named place of any size within an individual or multiple administrative areas.', '', 'Recommended best practice is to use this field in situations where the administrative location fields (country, stateProvince, county, etc.) provide insufficient description. For geological collections examples include basins, provinces, and fossil deposits.', 'Multi-country: `North European Plain`, Multi-state/Province: `Pacific Northwest`, Waterbody: `Southern`, Geological basins and provinces: `Michigan Basin`, `Mazon Creek`, `Bundenbach`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'GeographicContext', 0, 0, 'GeographicContext.region', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/region', 'ltc:region', 'string'),
('ltc:', 'waterBodyType', 'Waterbody Type', 'A term that indicates the aquatic order of a waterbody.', '', 'Recommendation is to use a controlled vocabulary, such as those fuind at https://www.usgs.gov/mission-areas/water-resources/science/types-water and https://sciencetrends.com/types-bodies-water-complete-list/.', '`Ocean`, `Sea`, `Lake`, `Pond`, `River`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'GeographicContext', 0, 0, 'GeographicContext.waterBodyType', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/waterBodyType', 'ltc:waterBodyType', 'string'),
('ltc:', 'GeologicalContext', 'Geological Context', 'Geological information, such as stratigraphy, that qualifies a region or place.', '', '', '', 'http://www.w3.org/2000/01/rdf-schema#Class', 'GeologicalContext', 0, 1, 'GeologicalContext.GeologicalContext', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/GeologicalContext', 'ltc:GeologicalContext', ''),
('ltc:', 'hasIdentifier', 'Has Identifier', 'This property refers to one or more related instances of the Identifier class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'GeologicalContext', 0, 0, 'GeologicalContext.hasIdentifier', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasIdentifier', 'ltc:hasIdentifier', 'array<ltc:Identifier>'),
('ltc:', 'hasMeasurementOrFact', 'Has Measurement Or Fact', 'This property refers to one or more related instances of the MeasurementOrFact class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'GeologicalContext', 0, 0, 'GeologicalContext.hasMeasurementOrFact', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasMeasurementOrFact', 'ltc:hasMeasurementOrFact', 'array<ltc:MeasurementOrFact>'),
('ltc:', 'hasReference', 'Has Reference', 'This property refers to one or more related instances of the Reference class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'GeologicalContext', 0, 0, 'GeologicalContext.hasReference', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasReference', 'ltc:hasReference', 'array<ltc:Reference>'),
('ltc:', 'supergroup', 'Supergroup', 'The full name of the lithostratigraphic supergroup from which the cataloged item was collected.', 'A supergroup is a formal assemblage of related or superposed groups or of groups and formations. Such units have proved useful in regional and provincial syntheses. Supergroups should be named only where their recognition serves a clear purpose.', 'Recommended vocabulary. At time of inclusion this term is in progress of being included as part of dwc tdwg/dwc#234', '`Karoe`, `Cape`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'GeologicalContext', 0, 0, 'GeologicalContext.supergroup', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/supergroup', 'ltc:supergroup', 'string'),
('ltc:', 'Identifier', 'Identifier', 'A numeric, textual value, or reference such as an IRI, that can be used to uniquely identify the object to which it is attached.', '', 'Use this class to document stable identifiers that describe the collections and associated entities being represented in the collection description. For example, person identifiers, taxon identifiers, institution identifiers, organisational unit identifiers, gazetteer identifiers. Identifiers represented by this class may be globally unique, or unique within a given context.', '', 'http://www.w3.org/2000/01/rdf-schema#Class', 'Identifier', 0, 1, 'Identifier.Identifier', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/Identifier', 'ltc:Identifier', ''),
('ltc:', 'hasReference', 'Has Reference', 'This property refers to one or more related instances of the Reference class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'Identifier', 0, 0, 'Identifier.hasReference', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasReference', 'ltc:hasReference', 'array<ltc:Reference>'),
('ltc:', 'identifierSource', 'Identifier Source', 'The source or creator of the identifier.', '', 'This term refers to the organisation, framework, software or database that minted the identifier represented in the identifier property.', '`Index Herbariorum`, `GBIF Registry of Scientific Collections (GRSciColl)`, `CITES`, `IPEN`, `NHM UK ''Join the Dots'' framework`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'Identifier', 0, 0, 'Identifier.identifierSource', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/identifierSource', 'ltc:identifierSource', 'string'),
('ltc:', 'identifierType', 'Identifier Type', 'The type and format of the value in the identifier field.', '', 'This property should be used to help people and software understand how the identifier can be used (e.g. whether it''s a resolvable IRI) and validate the identifier based on format and composition (e.g. a valid UUID).', '`Acronym`, `IRI`, `UUID v4`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'Identifier', 1, 0, 'Identifier.identifierType', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/identifierType', 'ltc:identifierType', 'string'),
('ltc:', 'identifierValue', 'Identifier', 'A textual or numeric identifier, acronym or IRI that provides an unambiguous reference for an entity within a given context.', '', 'This may be a simple value or resolvable IRI, and can reflect any identifier used to identify an entity (such as a collection, taxon, institution or person) included in the Collection Description.', '`http://grscicoll.org/institutional-collection/osteology`, `https://www.gbif.org/grscicoll/collection/64232ca4-fd5a-4a3d-a1d5-ef812107472c`, `https://www.gbif.org/grscicoll/institution/52827361-5e82-43b7-b92a-f6ad98367fa5`, `http://sweetgum.nybg.org/science/ih/herbarium-details/?irn=126969`, `10.5072/example-full`, `NHMUK-Verts`, `BGBM`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'Identifier', 1, 0, 'Identifier.identifierValue', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/identifierValue', 'ltc:identifierValue', 'string'),
('ltc:', 'LatimerCoreScheme', 'Latimer Core Scheme', 'A grouping of multiple ObjectGroups for a particular use case, purpose or implementation.', '', 'Where the same objects within the same collection might be described by more than one ObjectGroup for different purposes (for examples, a ''Darwin Fossil Mammals'' collection description might overlap with a ''Offsite Palaeontology'' collection description), this class can be used to distinguish between them and avoid double-counting of metrics in queries against the data.', '', 'http://www.w3.org/2000/01/rdf-schema#Class', 'LatimerCoreScheme', 1, 1, 'LatimerCoreScheme.LatimerCoreScheme', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/LatimerCoreScheme', 'ltc:LatimerCoreScheme', ''),
('ltc:', 'basisOfScheme', 'Basis Of Scheme', 'A summary of the basis or purpose for the LatimerCoreScheme.', '', 'This property is intended to summarise the reason for grouping a number of ObjectGroups within the LatimerCoreScheme, and the purpose for which the data is intended to be used. This may also be reflected in the terms and metrics defined using the SchemeTerm and SchemeMeasurementOrFact classes respectively. Using this approach, standard and reusable profiles within the wider Latimer Core standard may be constructed for common collection descriptions use cases.', '`Accession`, `Inventory`, `Expedition`, `Digitisation planning`, `Collections assessment`, `Institution`, `Collections registry`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'LatimerCoreScheme', 0, 0, 'LatimerCoreScheme.basisOfScheme', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/basisOfScheme', 'ltc:basisOfScheme', 'string'),
('ltc:', 'hasIdentifier', 'Has Identifier', 'This property refers to one or more related instances of the Identifier class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'LatimerCoreScheme', 0, 0, 'LatimerCoreScheme.hasIdentifier', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasIdentifier', 'ltc:hasIdentifier', 'array<ltc:Identifier>'),
('ltc:', 'hasObjectGroup', 'Has Object Group', 'This property refers to one or more related instances of the ObjectGroup class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'LatimerCoreScheme', 0, 0, 'LatimerCoreScheme.hasObjectGroup', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasObjectGroup', 'ltc:hasObjectGroup', 'array<ltc:ObjectGroup>'),
('ltc:', 'hasReference', 'Has Reference', 'This property refers to one or more related instances of the Reference class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'LatimerCoreScheme', 0, 0, 'LatimerCoreScheme.hasReference', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasReference', 'ltc:hasReference', 'array<ltc:Reference>'),
('ltc:', 'hasSchemeMeasurementOrFact', 'Has Scheme Measurement Or Fact', 'This property refers to one or more related instances of the SchemeMeasurementOrFact class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'LatimerCoreScheme', 0, 0, 'LatimerCoreScheme.hasSchemeMeasurementOrFact', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasSchemeMeasurementOrFact', 'ltc:hasSchemeMeasurementOrFact', 'array<ltc:SchemeMeasurementOrFact>'),
('ltc:', 'hasSchemeTerm', 'Has Scheme Term', 'This property refers to one or more related instances of the SchemeTerm class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'LatimerCoreScheme', 0, 0, 'LatimerCoreScheme.hasSchemeTerm', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasSchemeTerm', 'ltc:hasSchemeTerm', 'array<ltc:SchemeTerm>'),
('ltc:', 'isDistinctObjects', 'Is Distinct Objects', 'A flag to designate whether a physical object may be described by more than one ObjectGroup within the LatimerCoreScheme.', '', 'If isDistinctObjects is set to ''true'', then no collection object should be covered by more than one object group within the LatimerCoreScheme. This is important for aggregating and reporting on metrics such as object counts, as it prevents any physical object from being counted more than once.', '`true`, `false`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'LatimerCoreScheme', 1, 0, 'LatimerCoreScheme.isDistinctObjects', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/isDistinctObjects', 'ltc:isDistinctObjects', 'boolean'),
('ltc:', 'schemeName', 'Scheme Name', 'A short descriptive name given to the LatimerCoreScheme.', '', '', '`NHM Collections Inventory`, `Index Herbariorum`, `European Darwin Collections`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'LatimerCoreScheme', 1, 0, 'LatimerCoreScheme.schemeName', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/schemeName', 'ltc:schemeName', 'string'),
('ltc:', 'MeasurementOrFact', 'Measurement or Fact', 'A measurement of or fact about a class within the standard, or a relationship between the ObjectGroup and an associated class.', '', 'This class can be used to apply measurements, facts or narratives to the ObjectGroup as a whole, or used to qualify the relationship between the ObjectGroup and an associated attribute. For example, an ObjectGroup may contain 100 objects, of which 40 are from Europe and 60 from Africa. In this example, one MeasurementOrFact (count of 100) would be attached to the ObjectGroup, and one to each of the two relationships between the ObjectGroup and GeographicContext (Europe: count of 40, Africa: count of 60).', '', 'http://www.w3.org/2000/01/rdf-schema#Class', 'MeasurementOrFact', 0, 1, 'MeasurementOrFact.MeasurementOrFact', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/MeasurementOrFact', 'ltc:MeasurementOrFact', ''),
('ltc:', 'hasIdentifier', 'Has Identifier', 'This property refers to one or more related instances of the Identifier class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'MeasurementOrFact', 0, 0, 'MeasurementOrFact.hasIdentifier', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasIdentifier', 'ltc:hasIdentifier', 'array<ltc:Identifier>'),
('ltc:', 'hasReference', 'Has Reference', 'This property refers to one or more related instances of the Reference class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'MeasurementOrFact', 0, 0, 'MeasurementOrFact.hasReference', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasReference', 'ltc:hasReference', 'array<ltc:Reference>'),
('ltc:', 'measurementDerivation', 'Measurement Derivation', 'An indicator as to whether the measurement, fact, characteristic, or assertion being applied to the collection was derived from reported figures or aggregated/calculated from underlying data.', '', 'If there is more detailed information about the method by which a measurement or fact was derived, this should be captured using the measurementMethod property.', '`Reported`, `Calculated`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'MeasurementOrFact', 0, 0, 'MeasurementOrFact.measurementDerivation', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/measurementDerivation', 'ltc:measurementDerivation', 'string'),
('ltc:', 'measurementFactText', 'Fact or Narrative Text', 'The value of the qualitative fact, characteristic, or assertion being made about the collection.', '', 'This property should also be used for storing textual information about the collection within a particular context, such as narratives or comments about digitisation readiness.', '`UV-light`, `Extra large`, `Level 1`, `Re-curation of this collection would be required prior to digitisation, requiring an estimated two weeks of curator time.`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'MeasurementOrFact', 0, 0, 'MeasurementOrFact.measurementFactText', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/measurementFactText', 'ltc:measurementFactText', 'string'),
('ltc:', 'ObjectClassification', 'Object Classification', 'An informal classification of the type of objects within the ObjectGroup, using a hierarchical structure.', '', 'This class is used to categorise the ObjectGroup according to an informal, self-referential hierarchy. For example, this can be used to create a hierarchy encompassing biological, geological and anthropological collections, where a single formal taxonomy isn''t appropriate.', '', 'http://www.w3.org/2000/01/rdf-schema#Class', 'ObjectClassification', 0, 1, 'ObjectClassification.ObjectClassification', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/ObjectClassification', 'ltc:ObjectClassification', ''),
('ltc:', 'hasIdentifier', 'Has Identifier', 'This property refers to one or more related instances of the Identifier class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'ObjectClassification', 0, 0, 'ObjectClassification.hasIdentifier', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasIdentifier', 'ltc:hasIdentifier', 'array<ltc:Identifier>'),
('ltc:', 'hasMeasurementOrFact', 'Has Measurement Or Fact', 'This property refers to one or more related instances of the MeasurementOrFact class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'ObjectClassification', 0, 0, 'ObjectClassification.hasMeasurementOrFact', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasMeasurementOrFact', 'ltc:hasMeasurementOrFact', 'array<ltc:MeasurementOrFact>'),
('ltc:', 'hasObjectClassification', 'Has Object Classification', 'This property refers to one or more related instances of the ObjectClassification class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'ObjectClassification', 0, 0, 'ObjectClassification.hasObjectClassification', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasObjectClassification', 'ltc:hasObjectClassification', 'array<ltc:ObjectClassification>'),
('ltc:', 'hasReference', 'Has Reference', 'This property refers to one or more related instances of the Reference class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'ObjectClassification', 0, 0, 'ObjectClassification.hasReference', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasReference', 'ltc:hasReference', 'array<ltc:Reference>'),
('ltc:', 'isTopParent', 'Is Top Parent', 'A flag to indicate that the current instance of ObjectClassification is at the top of the hierarchy represented by multiple nested instances of the class.', 'If this term is used, it should be set to `true` in the instance of ObjectClassification which represents the highest level of a hierarchy and `false` in the rest. If the direction of the hierarchy is self-evident or otherwise not notable, this term should not be populated. ', '', '`true`, `false`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'ObjectClassification', 0, 0, 'ObjectClassification.isTopParent', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/isTopParent', 'ltc:isTopParent', 'boolean'),
('ltc:', 'objectClassificationLevel', 'Object Classification Level', 'The level of the ObjectClassification in the hierarchy.', '', 'It is up to the user to name the levels to be relevant to the hierarchical classification scheme that they are defining.', '`Domain`, `Discipline`, `Category`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'ObjectClassification', 0, 0, 'ObjectClassification.objectClassificationLevel', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/objectClassificationLevel', 'ltc:objectClassificationLevel', 'string'),
('ltc:', 'objectClassificationName', 'Object Classification Name', 'A short title describing this ObjectClassification as a class, unit or grouping.', '', 'This is a user-determined name given for classifying their collection. This name, expressing an assigned classification, can be part of a self-referential hierarchy.', '`Zoology invertebrates`, `Palaeontology`, `Extra-terrestrial`, `Archaeology`, `Seed plants`, `Birds`, `Agriculture`, `Veterinary`, `Viruses`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'ObjectClassification', 1, 0, 'ObjectClassification.objectClassificationName', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/objectClassificationName', 'ltc:objectClassificationName', 'string'),
('ltc:', 'ObjectGroup', 'Object Group', 'An intentionally grouped set of objects with one or more common characteristics.', '', '', '', 'http://www.w3.org/2000/01/rdf-schema#Class', 'ObjectGroup', 1, 1, 'ObjectGroup.ObjectGroup', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/ObjectGroup', 'ltc:ObjectGroup', ''),
('ltc:', 'alternativeCollectionName', 'Alternative Collection Name', 'One or more short titles different to the one given in ObjectGroup.collectionName used to summarise the collection objects contained within the ObjectGroup.', '', '', '`Darwin''s fossil mammal collection`, `The Hubricht Molluscan Collection`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'ObjectGroup', 0, 1, 'ObjectGroup.alternativeCollectionName', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/alternativeCollectionName', 'ltc:alternativeCollectionName', 'list'),
('ltc:', 'baseTypeOfObjectGroup', 'Base Type Of Object Group', 'High-level terms describing the fundamental nature of objects in the ObjectGroup.', '', 'For natural history collections baseTypeOfObjectGroup describes types of material entities and may constrain the values available in objectType. Notes for ObjectGroups where baseTypeOfObjectGroup is ''InformationArtefact'': subsequent ‘type’ properties could include hierarchical Audubon Core/Dublin Core terms – e.g. dc:type (http://purl.org/dc/elements/1.1/type), ac:subtype / ac:subtypeLiteral (http://rs.tdwg.org/ac/terms/subtypeLiteral), or (proposed) ac:3DResourceType.', '`MaterialEntity`, `InformationArtefact`, `AbstractConcept`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'ObjectGroup', 1, 1, 'ObjectGroup.baseTypeOfObjectGroup', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/baseTypeOfObjectGroup', 'ltc:baseTypeOfObjectGroup', 'list'),
('ltc:', 'collectionManagementSystem', 'Collection Management System', 'The collection management system which is used to hold and manage the primary data for the objects contained within the ObjectGroup.', '', 'This should reflect the system or database in which the object-level records reside, rather than the source of the Collection Description data.', '`Specify 7`, `DINA`, `Axiell EMu`, `Arctos`, `EarthCape`, `BRAHMS`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'ObjectGroup', 0, 1, 'ObjectGroup.collectionManagementSystem', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/collectionManagementSystem', 'ltc:collectionManagementSystem', 'list'),
('ltc:', 'collectionName', 'Collection Name', 'A short title that summarises the collection objects contained within the ObjectGroup.', '', '', '`The Leslie Hubricht Molluscan Collection`, `NHM Algae, Fungi and Plants collection`, `Crustacea – Cirripedes, Decapoda`, `Global Mesozoic and Paleozoic mollusc faunas/samples`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'ObjectGroup', 0, 0, 'ObjectGroup.collectionName', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/collectionName', 'ltc:collectionName', 'string'),
('ltc:', 'conditionsOfAccess', 'Conditions of Access', 'Information about who can access the collection being described or an indication of its security status.', '', 'If available, this should be a URL to a stable policy page. For example, https://www.fieldmuseum.org/science/research/area/fossils-meteorites/fossils-meteorites-policies.', '`Open to the public`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'ObjectGroup', 0, 1, 'ObjectGroup.conditionsOfAccess', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/conditionsOfAccess', 'ltc:conditionsOfAccess', 'list'),
('ltc:', 'description', 'Description', 'A free text description or narrative about the collection.', '', 'Use this field to record information about the collection in a human-readable, narrative style to introduce the main characteristics of the collection to someone unfamiliar to it. It may include additional information or re-state information held elsewhere in the collection description record - for example, for more atomic, categorised textual descriptions and narratives the MeasurementOrFact class should be used.', '`The Chicago Academy of Sciences holds material documenting the biodiversity of Midwest / Western Great Lakes region from the 1830s to the present, and includes comparative and historic material collected across North America. These collections include zoology, botany, earth sciences, cultural, audiovisual, and archives. The institutional collection code CHAS was used historically to reference vertebrate and malacology collections at the Academy and was designated as the primary collection code for all the collections.`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'ObjectGroup', 0, 0, 'ObjectGroup.description', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/description', 'ltc:description', 'string'),
('ltc:', 'discipline', 'Discipline', 'A high level classification of the scientific discipline to which the objects within the collection belong or are related.', '', 'The recommendation is to use a controlled vocabulary that is also common across other community collections, object and occurrence standards. Suggested list https://confluence.egi.eu/display/EGIG/Scientific+Disciplines', '`Anthropology`, `Botany`, `Extraterrestrial`, `Geology`, `Microorganisms`, `Other geo/biodiversity`, `Palaeontology`, `Virology`, `Zoology invertebrates`, `Zoology vertebrates`, `Unspecified`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'ObjectGroup', 0, 1, 'ObjectGroup.discipline', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/discipline', 'ltc:discipline', 'list'),
('ltc:', 'hasChronometricAge', 'Has Chronometric Age', 'This property refers to one or more related instances of the ChronometricAge class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'ObjectGroup', 0, 0, 'ObjectGroup.hasChronometricAge', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasChronometricAge', 'ltc:hasChronometricAge', 'array<ltc:ChronometricAge>'),
('ltc:', 'hasCollectionStatusHistory', 'Has Collection Status History', 'This property refers to one or more related instances of the CollectionStatusHistory class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'ObjectGroup', 0, 0, 'ObjectGroup.hasCollectionStatusHistory', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasCollectionStatusHistory', 'ltc:hasCollectionStatusHistory', 'array<ltc:CollectionStatusHistory>'),
('ltc:', 'hasEcologicalContext', 'Has Ecological Context', 'This property refers to one or more related instances of the EcologicalContext class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'ObjectGroup', 0, 0, 'ObjectGroup.hasEcologicalContext', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasEcologicalContext', 'ltc:hasEcologicalContext', 'array<ltc:EcologicalContext>'),
('ltc:', 'hasEvent', 'Has Event', 'This property refers to one or more related instances of the Event class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'ObjectGroup', 0, 0, 'ObjectGroup.hasEvent', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasEvent', 'ltc:hasEvent', 'array<ltc:Event>'),
('ltc:', 'hasGeographicContext', 'Has Geographic Context', 'This property refers to one or more related instances of the GeographicContext class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'ObjectGroup', 0, 0, 'ObjectGroup.hasGeographicContext', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasGeographicContext', 'ltc:hasGeographicContext', 'array<ltc:GeographicContext>'),
('ltc:', 'hasGeologicalContext', 'Has Geological Context', 'This property refers to one or more related instances of the GeologicalContext class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'ObjectGroup', 0, 0, 'ObjectGroup.hasGeologicalContext', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasGeologicalContext', 'ltc:hasGeologicalContext', 'array<ltc:GeologicalContext>'),
('ltc:', 'hasIdentifier', 'Has Identifier', 'This property refers to one or more related instances of the Identifier class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'ObjectGroup', 0, 0, 'ObjectGroup.hasIdentifier', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasIdentifier', 'ltc:hasIdentifier', 'array<ltc:Identifier>'),
('ltc:', 'hasMeasurementOrFact', 'Has Measurement Or Fact', 'This property refers to one or more related instances of the MeasurementOrFact class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'ObjectGroup', 0, 0, 'ObjectGroup.hasMeasurementOrFact', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasMeasurementOrFact', 'ltc:hasMeasurementOrFact', 'array<ltc:MeasurementOrFact>'),
('ltc:', 'hasObjectClassification', 'Has Object Classification', 'This property refers to one or more related instances of the ObjectClassification class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'ObjectGroup', 0, 0, 'ObjectGroup.hasObjectClassification', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasObjectClassification', 'ltc:hasObjectClassification', 'array<ltc:ObjectClassification>'),
('ltc:', 'hasOrganisationalUnit', 'Has Organisational Unit', 'This property refers to one or more related instances of the OrganisationalUnit class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'ObjectGroup', 0, 0, 'ObjectGroup.hasOrganisationalUnit', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasOrganisationalUnit', 'ltc:hasOrganisationalUnit', 'array<ltc:OrganisationalUnit>'),
('ltc:', 'hasPersonRole', 'Has Person Role', 'This property refers to one or more related instances of the PersonRole class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'ObjectGroup', 0, 0, 'ObjectGroup.hasPersonRole', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasPersonRole', 'ltc:hasPersonRole', 'array<ltc:PersonRole>'),
('ltc:', 'hasReference', 'Has Reference', 'This property refers to one or more related instances of the Reference class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'ObjectGroup', 0, 0, 'ObjectGroup.hasReference', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasReference', 'ltc:hasReference', 'array<ltc:Reference>'),
('ltc:', 'hasResourceRelationship', 'Has Resource Relationship', 'This property refers to one or more related instances of the ResourceRelationship class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'ObjectGroup', 0, 0, 'ObjectGroup.hasResourceRelationship', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasResourceRelationship', 'ltc:hasResourceRelationship', 'array<ltc:ResourceRelationship>'),
('ltc:', 'hasStorageLocation', 'Has Storage Location', 'This property refers to one or more related instances of the StorageLocation class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'ObjectGroup', 0, 0, 'ObjectGroup.hasStorageLocation', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasStorageLocation', 'ltc:hasStorageLocation', 'array<ltc:StorageLocation>'),
('ltc:', 'hasTaxon', 'Has Taxon', 'This property refers to one or more related instances of the Taxon class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'ObjectGroup', 0, 0, 'ObjectGroup.hasTaxon', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasTaxon', 'ltc:hasTaxon', 'array<ltc:Taxon>'),
('ltc:', 'isCurrentCollection', 'Is Current Collection', 'A flag to indicate whether the collection still exists as a single entity.', '', 'Use this to indicate if the record describes the entirety of a known historical collection. If only part of the collection is present the value is ''false''.', '`true` `false`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'ObjectGroup', 0, 0, 'ObjectGroup.isCurrentCollection', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/isCurrentCollection', 'ltc:isCurrentCollection', 'boolean'),
('ltc:', 'isKnownToContainTypes', 'Is Known To Contain Types', 'Flag property to indicate that the collection is known to include type specimens.', '', '`true` - this collection contains types; `false` - this collections does not contain types', '`true` `false`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'ObjectGroup', 0, 0, 'ObjectGroup.isKnownToContainTypes', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/isKnownToContainTypes', 'ltc:isKnownToContainTypes', 'boolean'),
('ltc:', 'material', 'Material', 'Material denotes the raw substance(s) from which the object is formed, in whole or in part.', '', 'This definition maps roughly to the concept of E57 ''material'' from the CIDOC CRM: https://cidoc-crm.org/Entity/E57-Material/version-7.1.1. The object, or artefact could contain biological parts, for example jewellery made of amber with insects in, or cloaks made of bird feathers. It should not be used for taxonomic identifications.', '`Biological body`, `Organism material (cp. objectType = `Organism product`)`, `Viable cells`, `Protein`, `RNA`, `DNA`, etc.', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'ObjectGroup', 0, 1, 'ObjectGroup.material', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/material', 'ltc:material', 'list'),
('ltc:', 'objectType', 'Object Type', 'High-level terms for the classification of curated objects.', 'A more generic classification of items in the collection than described in preparationType.', 'Hands-on, practical attributes classifying the stored curated objects. You will expect to find these kinds and types of objects when you go to and access their storage location. This should not be used for classifying objects by taxon. The best way to do that is to use the Taxon class (formal taxonomy and vernacular names) or ObjectClassification class (informal classification).', 'if baseTypeOfObjectGroup = `MaterialEntity`: `Specimen`, `Tissue`, `Culture`, `HTS Library`, `Lysate`, `Environmental sample`, `Extracted/Preserved DNA/RNA`, `Microscope slide`, `Spore print`, `Macrofossil`, `Mesofossil`, `Microfossil`, `Oversized fossil`; if typeOfObjectGroup = `Non-biological`: `Macro-object`, `Micro-object`, `Oversized object`, `Cut/polished gemstone`, `Core`, `Fluid`, `Hazardous material/object`, `Mixed`; if baseTypeOfObjectGroup = `InformationArtefact`: `Text`, `Audio`, `Visual`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'ObjectGroup', 0, 1, 'ObjectGroup.objectType', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/objectType', 'ltc:objectType', 'list'),
('ltc:', 'period', 'Period', 'Used to describe prehistoric or historic periods.', 'Used to describe the prehistoric or historic period from which objects in the collection originated.', 'Often used to describe prehistoric or historic periods, but also geopolitical units and activities of settlements are regarded as special cases of Period. However, there are no assumptions about the scale of the associated phenomena. In particular all events are seen as synthetic processes consisting of coherent phenomena. This property maps to the Period class of the CIDOC-CRM conceptual reference model (http://www.cidoc-crm.org/Entity/e4-period/version-7.1.1).', '`Neolithic Period`, `Ming Dynasty`, `McCarthy Era`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'ObjectGroup', 0, 1, 'ObjectGroup.period', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/period', 'ltc:period', 'list'),
('ltc:', 'preparationType', 'Preparation Type', 'A term used to classify or describe an object that indicates the actions that have been taken upon it and/or the processes it has been put through to prepare it for scientific use or study.', 'A more specific classification of items in the collection than described in objectType.', 'These attributes commonly identify the parts or states that are the outcome of the preparation process, which produced the curated object. This can be the same as PreservationMethod (e.g. Bone), but is not always. For cultural collections terms such as ''bowl'', ''textile'' are appropriate at this level. This should not be used for classifying objects by taxon. The best way to do that is to use the Taxon class (formal taxonomy and vernacular names) or ObjectClassification class (informal classification).', 'if objectType = `Specimen` or `Part of entity`: `Bones`, `Eggs`, `Pollen`, `Muscle`, `Leaf`, `Blood`, `Skins`, `Shells`, `Wood`, ... ; if typeOfObjectGroup = `human-made`: `Bowl`, `Textile`, ...; if typeOfObjectGroup = `digital`: `txt`, `jpg`, `mp4`, ...; etc', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'ObjectGroup', 0, 1, 'ObjectGroup.preparationType', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/preparationType', 'ltc:preparationType', 'list'),
('ltc:', 'preservationMethod', 'Preservation Method', 'A term used to classify or describe an object that indicates the primary or most recent action, measure or process that has been used in order to preserve the objects in the collection for long-term storage.', 'For the purposes of a collection description preservationType should be used to describe the larger collection', 'Preservation method generally describes the final storage state. Not intended to be used as the fossilization method. Use preservationMode for that. This field is intended to be use where a collection has a single or prominent preservationMethod. We recommend the Arctos PART_PRESERVATION vocabulary (https://arctos.database.museum/info/ctDocumentation.cfm?table=CTPART_PRESERVATION). For herbarium sheets use ''dried_pressed''. If an alcohol collection uses mixed percentages use ''alcohol''.', '`dried`, `dried_pressed`, `dried_pinned`, `Dried assemblage`, `Dried - not assembled`, `Dry preserved`, `papered/packaged`, `slide box`, `Skeletonized`, `Tanned`, `mounted`, `Slide mount`, `Embedded`, `gum_arabic`, `Blood sampling cards (biomedical)`, `Fluid preserved`, `Alcohol, formaledhyde`, `glycerin`, `EDTA`, `frozen / cryopreserved`, `Cryopreserved / frozen - 80C`, `refrigerated`, `freeze_dried`, `Surface coating`, `SEM stub`, `Stasis`, `cell culture`, `axenic culture`, `viable cells`, `Controlled atmosphere`, `Climate controlled conditions`, `Non climate controlled conditions`, `no_treatment`, etc.', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'ObjectGroup', 0, 1, 'ObjectGroup.preservationMethod', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/preservationMethod', 'ltc:preservationMethod', 'list'),
('ltc:', 'preservationMode', 'Preservation Mode', 'The means by which a palaeontological specimen was preserved or created e.g. body, cast, mold, trace fossil, soft parts mineralised etc.', 'Use to describe the preservation mode of a collection as a whole (e.g. Amber collection).', 'This property should be only used in association with ObjectGroups that contain paleontological material. It is aligned with the concept of preservationMode in ABCD(EFG) (https://efg.geocase.eu/documentation/html/efg.html#element_PreservationMode_Link03032878).', '`adpression/compression`, `body`, `cast`, `charcoalification`, `coalified`, `concretion`, `dissolution traces`, `mold/impression`, `permineralised`, `recrystallised`, `soft parts`, `trace`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'ObjectGroup', 0, 1, 'ObjectGroup.preservationMode', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/preservationMode', 'ltc:preservationMode', 'list'),
('ltc:', 'typeOfObjectGroup', 'Type Of Object Group', 'Additional information that describes the object(s) in the collection.', '', 'High-level information that enables the finding of the group and/or its object(s) in searches by users on the web using attributes commonly of interest. Recommended best practice is to use a controlled vocabulary. Terms such as soil, pollen, faeces, muscle, genomic DNA are currently put in preparationType.', 'if baseTypeOfObjectGroup = `MaterialEntity`: `Living`, `Preserved`, `Fossilized`, `Non-biological`, `Human-made`; if baseTypeOfObjectGroup = `InformationArtefact`: `Digital`, `Physical`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'ObjectGroup', 0, 1, 'ObjectGroup.typeOfObjectGroup', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/typeOfObjectGroup', 'ltc:typeOfObjectGroup', 'list'),
('ltc:', 'OrganisationalUnit', 'Organisational Unit', 'A unit within an organisational hierarchy which may be at, above or below the institutional level.', '', 'This class can represent any level of organisational unit, incorporating institutions (e.g. a museum), higher units (e.g. a university to which a museum belongs) and more detailed structures (e.g the departments and divisions within a museum). It can be used to arrange these different units at different levels into a hierarchical structure. This class combines aspects of both class org:Organization (https://www.w3.org/TR/2014/REC-vocab-org-20140116/#org:Organization) and class org:OrganizationalUnit (https://www.w3.org/TR/2014/REC-vocab-org-20140116/#org:OrganizationalUnit) from the W3C Organization Ontology ORG (https://www.w3.org/TR/2014/REC-vocab-org-20140116/#overview-of-ontology). Recommended best practice is to associate a unique, persistent organisational identifier (PID) with each created organisational unit. This will allow an unambiguous and continual identification of the unit, as well as the creation of organisational hierarchies. Existing providers of PIDs for organisations are, e.g. https://grid.ac/ and https://ror.org/. The provision of organisational PIDs might be extended to intra-organisational units in the future. Properties of Class: Identifier can be used to add identifier information for organisational units.', '', 'http://www.w3.org/2000/01/rdf-schema#Class', 'OrganisationalUnit', 0, 1, 'OrganisationalUnit.OrganisationalUnit', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/OrganisationalUnit', 'ltc:OrganisationalUnit', ''),
('ltc:', 'hasAddress', 'Has Address', 'This property refers to one or more related instances of the Address class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'OrganisationalUnit', 0, 0, 'OrganisationalUnit.hasAddress', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasAddress', 'ltc:hasAddress', 'array<ltc:Address>'),
('ltc:', 'hasContactDetail', 'Has Contact Detail', 'This property refers to one or more related instances of the ContactDetail class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'OrganisationalUnit', 0, 0, 'OrganisationalUnit.hasContactDetail', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasContactDetail', 'ltc:hasContactDetail', 'array<ltc:ContactDetail>'),
('ltc:', 'hasIdentifier', 'Has Identifier', 'This property refers to one or more related instances of the Identifier class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'OrganisationalUnit', 0, 0, 'OrganisationalUnit.hasIdentifier', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasIdentifier', 'ltc:hasIdentifier', 'array<ltc:Identifier>'),
('ltc:', 'hasMeasurementOrFact', 'Has Measurement Or Fact', 'This property refers to one or more related instances of the MeasurementOrFact class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'OrganisationalUnit', 0, 0, 'OrganisationalUnit.hasMeasurementOrFact', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasMeasurementOrFact', 'ltc:hasMeasurementOrFact', 'array<ltc:MeasurementOrFact>'),
('ltc:', 'hasParentOrganisationalUnit', 'Has Parent Organisational Unit', 'This property refers to one or more related parent instances of the OrganisationalUnit class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'OrganisationalUnit', 0, 0, 'OrganisationalUnit.hasParentOrganisationalUnit', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasParentOrganisationalUnit', 'ltc:hasParentOrganisationalUnit', 'array<ltc:OrganisationalUnit>'),
('ltc:', 'hasPersonRole', 'Has Person Role', 'This property refers to one or more related instances of the PersonRole class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'OrganisationalUnit', 0, 0, 'OrganisationalUnit.hasPersonRole', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasPersonRole', 'ltc:hasPersonRole', 'array<ltc:PersonRole>'),
('ltc:', 'hasReference', 'Has Reference', 'This property refers to one or more related instances of the Reference class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'OrganisationalUnit', 0, 0, 'OrganisationalUnit.hasReference', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasReference', 'ltc:hasReference', 'array<ltc:Reference>'),
('ltc:', 'organisationalUnitName', 'Organisational Unit Name', 'An official name of the organisational unit in the local language.', '', 'Repeatable where there are more than one official local language required for example Belgian Institutions where an official name exists in French, Dutch, German and English. See ''A Collection of Crosswalks from Fifteen Research Data Schemas to Schema.org'' (https://www.rd-alliance.org/group/research-metadata-schemas-wg/outcomes/collection-crosswalks-fifteen-research-data-schemas) from RDA for crosswalks for properties with the function of Name, Title, etc. Take into account the note at the class level (Class:OrganisationalUnit) about associating an identifier in addition to a name with the organisational unit.', '`Muséum national d''Histoire naturelle`, `The Field Museum of Natural History`, `Division of Fishes`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'OrganisationalUnit', 1, 0, 'OrganisationalUnit.organisationalUnitName', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/organisationalUnitName', 'ltc:organisationalUnitName', 'string'),
('ltc:', 'organisationalUnitType', 'Organisational Unit Type', 'The type or level of organisational unit within a hierarchy responsible for the management of the collection being described.', '', 'Example vocabulary list: https://vocab.org/aiiso/ . This property is likely related to the W3C class org:Role (https://www.w3.org/TR/2014/REC-vocab-org-20140116/#class-role).', '`Department` (A group of people recognised by an organization as forming a cohesive group referred to by the organization as a department), `Division` (A group of people recognised by an organization as forming a cohesive group referred to by the organization as a division)', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'OrganisationalUnit', 1, 0, 'OrganisationalUnit.organisationalUnitType', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/organisationalUnitType', 'ltc:organisationalUnitType', 'string'),
('ltc:', 'Person', 'Person', 'A person (alive, dead, undead, or fictional).', 'A person (alive or dead).', 'This concept should map to the Schema.org Person class (https://schema.org/Person), and the prov:Person class (http://www.w3.org/ns/prov#Person) in the PROV ontology. In the latter, it is a subclass of prov:Agent, which through which it can map to the RDA recommendations on attribution (http://dx.doi.org/10.15497/RDA00029). The definition is appropriated from the Schema.org class.', '', 'http://www.w3.org/2000/01/rdf-schema#Class', 'Person', 0, 1, 'Person.Person', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/Person', 'ltc:Person', ''),
('ltc:', 'hasAddress', 'Has Address', 'This property refers to one or more related instances of the Address class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'Person', 0, 0, 'Person.hasAddress', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasAddress', 'ltc:hasAddress', 'array<ltc:Address>'),
('ltc:', 'hasContactDetail', 'Has Contact Detail', 'This property refers to one or more related instances of the ContactDetail class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'Person', 0, 0, 'Person.hasContactDetail', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasContactDetail', 'ltc:hasContactDetail', 'array<ltc:ContactDetail>'),
('ltc:', 'hasIdentifier', 'Has Identifier', 'This property refers to one or more related instances of the Identifier class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'Person', 0, 0, 'Person.hasIdentifier', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasIdentifier', 'ltc:hasIdentifier', 'array<ltc:Identifier>'),
('ltc:', 'hasMeasurementOrFact', 'Has Measurement Or Fact', 'This property refers to one or more related instances of the MeasurementOrFact class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'Person', 0, 0, 'Person.hasMeasurementOrFact', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasMeasurementOrFact', 'ltc:hasMeasurementOrFact', 'array<ltc:MeasurementOrFact>'),
('ltc:', 'hasReference', 'Has Reference', 'This property refers to one or more related instances of the Reference class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'Person', 0, 0, 'Person.hasReference', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasReference', 'ltc:hasReference', 'array<ltc:Reference>'),
('ltc:', 'PersonRole', 'Person Role', 'A qualified association between a Person or OrganisationalUnit and an entity such as an ObjectGroup or MeasurementOrFact that enables the relationship to be contextualised with a specific role and time period.', '', 'This class is aligned with the prov:qualifiedAttribution property (http://www.w3.org/ns/prov#qualifiedAttribution). It should be used instead of the Activity and PersonActivity classes to link a Person or OrganisationalUnit to an entity in situations where an activity is not know or is irrelevant, for example for describing a person''s role within an organisation. It is not mandatory to link to either a Person or a Role in this class, to support use cases where a role is known but the person who fulfilled it is not, and where a person is known to have been involved but the context is not. However, it''s expected that at least one of the hasPerson and hasRole properties is populated.', '', 'http://www.w3.org/2000/01/rdf-schema#Class', 'PersonRole', 0, 1, 'PersonRole.PersonRole', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/PersonRole', 'ltc:PersonRole', ''),
('ltc:', 'hasAddress', 'Has Address', 'This property refers to one or more related instances of the Address class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'PersonRole', 0, 0, 'PersonRole.hasAddress', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasAddress', 'ltc:hasAddress', 'array<ltc:Address>'),
('ltc:', 'hasContactDetail', 'Has Contact Detail', 'This property refers to one or more related instances of the ContactDetail class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'PersonRole', 0, 0, 'PersonRole.hasContactDetail', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasContactDetail', 'ltc:hasContactDetail', 'array<ltc:ContactDetail>'),
('ltc:', 'hasIdentifier', 'Has Identifier', 'This property refers to one or more related instances of the Identifier class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'PersonRole', 0, 0, 'PersonRole.hasIdentifier', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasIdentifier', 'ltc:hasIdentifier', 'array<ltc:Identifier>'),
('ltc:', 'hasMeasurementOrFact', 'Has Measurement Or Fact', 'This property refers to one or more related instances of the MeasurementOrFact class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'PersonRole', 0, 0, 'PersonRole.hasMeasurementOrFact', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasMeasurementOrFact', 'ltc:hasMeasurementOrFact', 'array<ltc:MeasurementOrFact>'),
('ltc:', 'hasPerson', 'Has Person', 'This property refers to one or more related instances of the Person class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'PersonRole', 0, 0, 'PersonRole.hasPerson', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasPerson', 'ltc:hasPerson', 'array<ltc:Person>'),
('ltc:', 'hasReference', 'Has Reference', 'This property refers to one or more related instances of the Reference class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'PersonRole', 0, 0, 'PersonRole.hasReference', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasReference', 'ltc:hasReference', 'array<ltc:Reference>'),
('ltc:', 'hasRole', 'Has Role', 'This property refers to one or more related instances of the Role class.', '', 'This property maps to the PROV-O property hadRole (http://www.w3.org/ns/prov#hadRole).', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'PersonRole', 0, 1, 'PersonRole.hasRole', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasRole', 'ltc:hasRole', 'array<ltc:Role>'),
('ltc:', 'hasTemporalCoverage', 'Has Temporal Coverage', 'This property refers to one or more related instances of the TemporalCoverage class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'PersonRole', 0, 0, 'PersonRole.hasTemporalCoverage', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasTemporalCoverage', 'ltc:hasTemporalCoverage', 'array<ltc:TemporalCoverage>'),
('ltc:', 'RecordLevel', 'Record Level', 'The machine-actionable information profile for the collection description digital object.', '', 'Linked to the RDA PID Kernel recommendation (https://www.rd-alliance.org/system/files/RDA%20Recommendation%20on%20PID%20Kernel%20Information_final.pdf)', '', 'http://www.w3.org/2000/01/rdf-schema#Class', 'RecordLevel', 1, 1, 'RecordLevel.RecordLevel', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/RecordLevel', 'ltc:RecordLevel', ''),
('ltc:', 'hasIdentifier', 'Has Identifier', 'This property refers to one or more related instances of the Identifier class. Every RecordLevel class must contain at least one Identifier, preferably a PID. ', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'RecordLevel', 1, 0, 'RecordLevel.hasIdentifier', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasIdentifier', 'ltc:hasIdentifier', 'array<ltc:Identifier>'),
('ltc:', 'hasObjectGroup', 'Has Object Group', 'This property refers to one or more related instances of the ObjectGroup class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'RecordLevel', 0, 0, 'RecordLevel.hasObjectGroup', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasObjectGroup', 'ltc:hasObjectGroup', 'array<ltc:ObjectGroup>'),
('ltc:', 'hasPersonRole', 'Has Person Role', 'This property refers to one or more related instances of the PersonRole class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'RecordLevel', 0, 0, 'RecordLevel.hasPersonRole', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasPersonRole', 'ltc:hasPersonRole', 'array<ltc:PersonRole>'),
('ltc:', 'hasReference', 'Has Reference', 'This property refers to one or more related instances of the Reference class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'RecordLevel', 0, 0, 'RecordLevel.hasReference', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasReference', 'ltc:hasReference', 'array<ltc:Reference>'),
('ltc:', 'hasResourceRelationship', 'Has Resource Relationship', 'This property refers to one or more related instances of the ResourceRelationship class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'RecordLevel', 0, 0, 'RecordLevel.hasResourceRelationship', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasResourceRelationship', 'ltc:hasResourceRelationship', 'array<ltc:ResourceRelationship>'),
('ltc:', 'isDerivedCollection', 'Is Derived Collection', 'A flag to indicate that the collection description has been generated by aggregating data from one or more underlying datasets of its individual objects.', '', 'If `true`, the LtC record has been wholly generated through the synthesis of existing digital records, such as by a programmatic aggregation of specimen records. If `false`, the LtC record is known to have been generated through some other method, such as in response to an institutional survey. Leaving this field blank indicates that the method used to construct the record is unknown or has yet to be recorded.', '`true`, `false`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'RecordLevel', 0, 0, 'RecordLevel.isDerivedCollection', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/isDerivedCollection', 'ltc:isDerivedCollection', 'boolean'),
('ltc:', 'Reference', 'Reference', 'A reference to external resources and information related to the class.', '', 'In Latimer Core, this class can be used to store references to publications, policies, datasets and other online resources such as websites, related to classes within the standard.', '', 'http://www.w3.org/2000/01/rdf-schema#Class', 'Reference', 0, 1, 'Reference.Reference', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/Reference', 'ltc:Reference', ''),
('ltc:', 'hasIdentifier', 'Has Identifier', 'This property refers to one or more related instances of the Identifier class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'Reference', 0, 0, 'Reference.hasIdentifier', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasIdentifier', 'ltc:hasIdentifier', 'array<ltc:Identifier>'),
('ltc:', 'referenceDetails', 'Reference Details', 'Detailed information about the resource being referenced.', '', '', '`This dataset includes a Darwin Core Archive of the ~8000 specimens digitised to date, of which ~80% also have an associated label image.`, `de Mestier A, Mulcahy D, Harris DJ, et al. (2023) Policies Handbook on Using Molecular Collections. Research Ideas and Outcomes 9: e102908. https://doi.org/10.3897/rio.9.e102908`, `Suggested citation: USDA-ARS US National Fungus Collection (2023). USDA United States National Fungus Collections. Occurrence dataset https://doi.org/10.15468/w78rwb accessed via GBIF.org on 2023-04-27.`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'Reference', 0, 0, 'Reference.referenceDetails', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/referenceDetails', 'ltc:referenceDetails', 'string'),
('ltc:', 'referenceName', 'Reference Name', 'A name given to a reference.', '', 'If the reference is to a publication, this field should hold the publication title; otherwise any appropriate, short, text label relevant to the resource being referenced may be used.', '`Digitised specimen records on the NHM Data Portal`, `Using a Collection Health Index to prioritise access and activities in the New Zealand Arthropod Collection`, `BGBM loans policy`, `Herbarium Wikipedia page`, `NMNH website`, `Related sequences in GenBank`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'Reference', 0, 0, 'Reference.referenceName', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/referenceName', 'ltc:referenceName', 'string'),
('ltc:', 'referenceType', 'Reference Type', 'The type of resource being referenced.', '', 'This property is intended to be used for a high level categorisation of resource types.', '`Policy`, `Document`, `Website`, `Dataset`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'Reference', 0, 0, 'Reference.referenceType', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/referenceType', 'ltc:referenceType', 'string'),
('ltc:', 'resourceIRI', 'Resource IRI', 'A preferably resolvable IRI providing access to the resource defined in the reference.', '', '', '`10.5072/example-full`, `https://examplemuseum.org/policies/loans-policy.pdf`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'Reference', 0, 0, 'Reference.resourceIRI', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/resourceIRI', 'ltc:resourceIRI', ''),
('ltc:', 'ResourceRelationship', 'Resource Relationship', 'A relationship between an instance of a class in the collection description standard to another instance of the same class, or an instance of a different class in the standard.', '', 'In the context of this standard, the resources are the collections of objects represented by the ObjectGroup. This class can be used to define different semantic and hierarchical relationships between ObjectGroups.', '', 'http://www.w3.org/2000/01/rdf-schema#Class', 'ResourceRelationship', 0, 1, 'ResourceRelationship.ResourceRelationship', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/ResourceRelationship', 'ltc:ResourceRelationship', ''),
('ltc:', 'hasIdentifier', 'Has Identifier', 'This property refers to one or more related instances of the Identifier class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'ResourceRelationship', 0, 0, 'ResourceRelationship.hasIdentifier', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasIdentifier', 'ltc:hasIdentifier', 'array<ltc:Identifier>'),
('ltc:', 'hasReference', 'Has Reference', 'This property refers to one or more related instances of the Reference class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'ResourceRelationship', 0, 0, 'ResourceRelationship.hasReference', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasReference', 'ltc:hasReference', 'array<ltc:Reference>'),
('ltc:', 'relatedResourceName', 'Related Resource Name', 'A short textual name for the related resource.', '', 'This property can be used to list resources related to the source entity which lack an identifier, for example if a separate record for that resource doesn''t yet exist. In the Collection Description standard, a use of this is to list named subcollections of a larger collections at a time when the resources might not be available to create a full Collection Description for each of them. If at a later point a Collection Description record is created for the subcollection, an identifier can be added to the relatedResourceID property to maintain the same relationship.', '`FMNH Mammals`, `TNHC Vertebrates`, `Sloane Herbarium`, `Grant Southwest Ceramics Collection`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'ResourceRelationship', 0, 0, 'ResourceRelationship.relatedResourceName', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/relatedResourceName', 'ltc:relatedResourceName', 'string'),
('ltc:', 'relationshipOfResource', 'Relationship Of Resource', 'The relationship of the resource identified by relatedResourceID to the subject (optionally identified by the resourceID).', '', 'Recommended best practice is to use a controlled vocabulary. https://schema.org/Property', '`part of`, `contains`, `same as`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'ResourceRelationship', 1, 0, 'ResourceRelationship.relationshipOfResource', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/relationshipOfResource', 'ltc:relationshipOfResource', 'string'),
('ltc:', 'Role', 'Role', 'The function of a Person with respect to an activity or entity.', '', 'While this class contains no mandatory properties, it''s recommended that at least one of the roleName and hasIdentifier properties are used to specify the intended role. Where appropriate, the use of controlled vocabularies such as the CRediT contributor roles taxonomy (https://credit.niso.org) is encouraged.', '', 'http://www.w3.org/2000/01/rdf-schema#Class', 'Role', 0, 1, 'Role.Role', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/Role', 'ltc:Role', ''),
('ltc:', 'hasIdentifier', 'Has Identifier', 'This property refers to one or more related instances of the Identifier class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'Role', 0, 1, 'Role.hasIdentifier', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasIdentifier', 'ltc:hasIdentifier', 'array<ltc:Identifier>'),
('ltc:', 'roleName', 'Role Name', 'A short descriptive name for the role.', '', '', '`Director`, `Chair`, `Record owner`, `Primary Latimer Core record contact`, `Primary collection contact`, `Owner`, `Curator`, `Collection manager`, `Head of department`, `Registrar`, `Data curation`, `Supervision`, `Collecting`, `Curation`, `Conservation`, `Funding`, `Imaging`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'Role', 0, 0, 'Role.roleName', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/roleName', 'ltc:roleName', 'string'),
('ltc:', 'SchemeMeasurementOrFact', 'Scheme Measurement Or Fact', 'A type of measurement or fact used by the CollectionDescriptionScheme, and the rules relating to its application.', '', 'This class can be used to specify the qualitative and quantitative metrics that will be included in the CollectionDescriptionScheme using the MeasurementOrFact class, and dictate whether each will be mandatory and/or repeatable. This information can be used by software and queries to constrain and validate the Latimer Core dataset, and determine how and whether metrics can be aggregated and reported. The schemeMeasurementType property should correspond to the measurementType property of the MeasurementOrFact class in order to make the relevant association between the scheme definition and the stored data.', '', 'http://www.w3.org/2000/01/rdf-schema#Class', 'SchemeMeasurementOrFact', 0, 1, 'SchemeMeasurementOrFact.SchemeMeasurementOrFact', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/SchemeMeasurementOrFact', 'ltc:SchemeMeasurementOrFact', ''),
('ltc:', 'hasIdentifier', 'Has Identifier', 'This property refers to one or more related instances of the Identifier class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'SchemeMeasurementOrFact', 0, 0, 'SchemeMeasurementOrFact.hasIdentifier', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasIdentifier', 'ltc:hasIdentifier', 'array<ltc:Identifier>'),
('ltc:', 'hasReference', 'Has Reference', 'This property refers to one or more related instances of the Reference class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'SchemeMeasurementOrFact', 0, 0, 'SchemeMeasurementOrFact.hasReference', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasReference', 'ltc:hasReference', 'array<ltc:Reference>'),
('ltc:', 'isMandatoryMetric', 'Is Mandatory Metric', 'A flag to designate whether it is mandatory or optional for every collection description within the CollectionDescriptionScheme to include the measurement or fact defined by the schemeMeasurementType property.', '', 'This flag can be used for software automation and data validation.', '`true`, `false`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'SchemeMeasurementOrFact', 1, 0, 'SchemeMeasurementOrFact.isMandatoryMetric', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/isMandatoryMetric', 'ltc:isMandatoryMetric', 'boolean'),
('ltc:', 'isRepeatableMetric', 'Is Repeatable Metric', 'A flag to designate whether multiple instances of the same schemeMeasurementType may be attached to a single entity.', '', 'For example, this property can be used to stipulate that, using the MeasurementOrFact class, only one ''Object count'' may be attached to an ObjectGroup, but multiple ''Curator notes'' may be attached to the same ObjectGroup.', '`true`, `false`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'SchemeMeasurementOrFact', 1, 0, 'SchemeMeasurementOrFact.isRepeatableMetric', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/isRepeatableMetric', 'ltc:isRepeatableMetric', 'boolean'),
('ltc:', 'schemeMeasurementType', 'Scheme Measurement Type', 'A category of quantitative metric or qualitative fact that can be included in the CollectionDescriptionScheme.', '', 'The schemeMeasurementType should correspond to, and be used to catalogue and/or constrain, the values that can be used in the measurementType property of the MeasurementOrFact class.', '`Imaged Level Percentage`, `Storage Volume`, `Object Count`, `MIDS-0 Object Count`, `Historical Narrative`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'SchemeMeasurementOrFact', 1, 0, 'SchemeMeasurementOrFact.schemeMeasurementType', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/schemeMeasurementType', 'ltc:schemeMeasurementType', 'string'),
('ltc:', 'SchemeTerm', 'Scheme Term', 'A Latimer Core term used by the CollectionDescriptionScheme and the rules relating to its application.', '', 'This class can be used to define which of the terms (classes and/or properties) within the standard (e.g. GeographicContext, Taxon, preservationMethod) are expected to be used within the scheme, and specify whether they''re mandatory and/or repeatable. This information can be used by software and queries to validate the data and understand the rules by which metrics can be reported against the specified term.', '', 'http://www.w3.org/2000/01/rdf-schema#Class', 'SchemeTerm', 0, 1, 'SchemeTerm.SchemeTerm', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/SchemeTerm', 'ltc:SchemeTerm', ''),
('ltc:', 'hasIdentifier', 'Has Identifier', 'This property refers to one or more related instances of the Identifier class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'SchemeTerm', 0, 0, 'SchemeTerm.hasIdentifier', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasIdentifier', 'ltc:hasIdentifier', 'array<ltc:Identifier>'),
('ltc:', 'hasReference', 'Has Reference', 'This property refers to one or more related instances of the Reference class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'SchemeTerm', 0, 0, 'SchemeTerm.hasReference', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasReference', 'ltc:hasReference', 'array<ltc:Reference>'),
('ltc:', 'isMandatoryTerm', 'Is Mandatory Term', 'A flag to designate whether it is mandatory or optional for all ObjectGroups in the CollectionDescriptionScheme to include or be linked to valid data for the class or property defined in the termName property.', '', 'This flag can be used for software automation and data validation. For example, if the termName is ''preservationMethod'' (a property) and isMandatoryTerm is ''true'', then an interface or query should always expect a value for that property, and can validate against that expectation. If the termName is Taxon (a class) and isMandatoryTerm is ''true'', then similarly the expectation will be that at least one populated Taxon object is linked to every ObjectGroup. If the isRepeatableTerm property is set to ''false'', then the expectation will be that exactly one populated Taxon object is linked to every ObjectGroup and no more.', '`true`, `false`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'SchemeTerm', 1, 0, 'SchemeTerm.isMandatoryTerm', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/isMandatoryTerm', 'ltc:isMandatoryTerm', 'boolean'),
('ltc:', 'isRepeatableTerm', 'Is Repeatable Term', 'A flag to designate whether multiple instances of the Latimer Core class or property defined in the termName property may be attached to a single ObjectGroup.', '', 'This property essentially defines whether the property or class is used for a ''tagging'' approach (e.g. attaching multiple Taxon records to the same ObjectGroup to reflect the taxonomic scope, or a ''dimensional'' approach (e.g. attaching a single GeologicalContext to an ObjectGroup, to show that it represents only objects from the Mesozoic). This has implications on how metrics may be handled, and more information is available in the non-normative guidance.', '`true`, `false`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'SchemeTerm', 1, 0, 'SchemeTerm.isRepeatableTerm', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/isRepeatableTerm', 'ltc:isRepeatableTerm', 'boolean'),
('ltc:', 'termName', 'Term Name', 'The name of a class or property within the Latimer Core standard that is included in the CollectionDescriptionScheme.', '', 'The values of this property are constrained to the names of terms (classes or properties) within the Latimer Core standard.', '`GeographicContext`, `Taxon`, `preservationMethod`, `discipline`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'SchemeTerm', 1, 0, 'SchemeTerm.termName', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/termName', 'ltc:termName', 'string'),
('ltc:', 'StorageLocation', 'Storage Location', 'A physical location (such as a building, room, cabinet or drawer) within the holding institution where objects associated with the collection description are stored or exhibited.', '', '', '', 'http://www.w3.org/2000/01/rdf-schema#Class', 'StorageLocation', 0, 1, 'StorageLocation.StorageLocation', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/StorageLocation', 'ltc:StorageLocation', ''),
('ltc:', 'hasAddress', 'Has Address', 'This property refers to one or more related instances of the Address class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'StorageLocation', 0, 0, 'StorageLocation.hasAddress', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasAddress', 'ltc:hasAddress', 'array<ltc:Address>'),
('ltc:', 'hasIdentifier', 'Has Identifier', 'This property refers to one or more related instances of the Identifier class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'StorageLocation', 0, 0, 'StorageLocation.hasIdentifier', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasIdentifier', 'ltc:hasIdentifier', 'array<ltc:Identifier>'),
('ltc:', 'hasMeasurementOrFact', 'Has Measurement Or Fact', 'This property refers to one or more related instances of the MeasurementOrFact class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'StorageLocation', 0, 0, 'StorageLocation.hasMeasurementOrFact', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasMeasurementOrFact', 'ltc:hasMeasurementOrFact', 'array<ltc:MeasurementOrFact>'),
('ltc:', 'hasParentStorageLocation', 'Has Parent Storage Location', 'This property refers to one or more related parent instances of the StorageLocation class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'StorageLocation', 0, 0, 'StorageLocation.hasParentStorageLocation', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasParentStorageLocation', 'ltc:hasParentStorageLocation', 'array<ltc:StorageLocation>'),
('ltc:', 'hasReference', 'Has Reference', 'This property refers to one or more related instances of the Reference class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'StorageLocation', 0, 0, 'StorageLocation.hasReference', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasReference', 'ltc:hasReference', 'array<ltc:Reference>'),
('ltc:', 'locationDescription', 'Location Description', 'Short textual description of the storage location of the group of items', '', '', '`Backlog on top of Rosaceae cupboards`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'StorageLocation', 0, 0, 'StorageLocation.locationDescription', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/locationDescription', 'ltc:locationDescription', 'string'),
('ltc:', 'locationName', 'Location Name', 'A label used to identify a place where the collection is stored.', '', 'This is the lowest level of storage location for the object group (collection or sub-collection).', '`Building A`, `Cryptogamic herbarium`, `Cupboard C1`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'StorageLocation', 1, 0, 'StorageLocation.locationName', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/locationName', 'ltc:locationName', 'string'),
('ltc:', 'locationType', 'Location Type', 'The nature of the location where the collection is stored.', '', 'This defines the type of storage location named in locationName, and may refer to static locations or moveable containers.', '`Site`, `Building`, `Floor`, `Room`, `Cabinet`, `Drawer`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'StorageLocation', 0, 0, 'StorageLocation.locationType', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/locationType', 'ltc:locationType', 'string'),
('ltc:', 'Taxon', 'Taxon', 'A group of organisms (sensu http://purl.obolibrary.org/obo/OBI_0100026) considered by taxonomists to form a homogeneous unit.', '', '', '', 'http://www.w3.org/2000/01/rdf-schema#Class', 'Taxon', 0, 1, 'Taxon.Taxon', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/Taxon', 'ltc:Taxon', ''),
('ltc:', 'hasIdentifier', 'Has Identifier', 'This property refers to one or more related instances of the Identifier class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'Taxon', 0, 0, 'Taxon.hasIdentifier', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasIdentifier', 'ltc:hasIdentifier', 'array<ltc:Identifier>'),
('ltc:', 'hasMeasurementOrFact', 'Has Measurement Or Fact', 'This property refers to one or more related instances of the MeasurementOrFact class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'Taxon', 0, 0, 'Taxon.hasMeasurementOrFact', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasMeasurementOrFact', 'ltc:hasMeasurementOrFact', 'array<ltc:MeasurementOrFact>'),
('ltc:', 'hasReference', 'Has Reference', 'This property refers to one or more related instances of the Reference class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'Taxon', 0, 0, 'Taxon.hasReference', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasReference', 'ltc:hasReference', 'array<ltc:Reference>'),
('ltc:', 'TemporalCoverage', 'Temporal Coverage', 'The time period during which the related event, activity or status was occurring.', 'To represent an ongoing period of time, temporalCoverageStartDateTime should be populated and temporalCoverageEndDateTime left blank. To represent a single period in time, temporalCoverageStartDateTime and temporalCoverageEndDateTime should hold the same value.', 'This class can be used to reflect the period of time in which specified activities, events and states occurred. Examples might include the time range of the `Event` in which the objects were collected, the period during a `CollectionStatusHistory` over which the collection was actively growing, or the span of time someone was working in a particular `PersonRole`. If the time period you are trying to describe is better described by a categorical label rather than a date, `GeologicalContext`, `ChronometricAge` or `ObjectGroup.period` may be more suitable. ', '', 'http://www.w3.org/2000/01/rdf-schema#Class', 'TemporalCoverage', 0, 1, 'TemporalCoverage.TemporalCoverage', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/TemporalCoverage', 'ltc:TemporalCoverage', ''),
('ltc:', 'hasMeasurementOrFact', 'Has Measurement Or Fact', 'This property refers to one or more related instances of the MeasurementOrFact class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'TemporalCoverage', 0, 0, 'TemporalCoverage.hasMeasurementOrFact', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasMeasurementOrFact', 'ltc:hasMeasurementOrFact', 'array<ltc:MeasurementOrFact>'),
('ltc:', 'hasReference', 'Has Reference', 'This property refers to one or more related instances of the Reference class.', '', '', '', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'TemporalCoverage', 0, 0, 'TemporalCoverage.hasReference', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/hasReference', 'ltc:hasReference', 'array<ltc:Reference>'),
('ltc:', 'temporalCoverageEndDateTime', 'Temporal Coverage End Date', 'Datetime at which the TemporalCoverage finished.', 'If temporalCoverageEndDateTime is populated, temporalCoverageType is strongly recommended.', '', '`1886`, `1984-09`, `2001-10-22`, `1997-07-16T19:20+01:00`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'TemporalCoverage', 0, 0, 'TemporalCoverage.temporalCoverageEndDateTime', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/temporalCoverageEndDateTime', 'ltc:temporalCoverageEndDateTime', 'string'),
('ltc:', 'temporalCoverageStartDateTime', 'Temporal Coverage Start Date', 'Datetime at which the TemporalCoverage began.', 'If temporalCoverageStartDateTime is populated, temporalCoverageType is recommended.', '', '`1886`, `1984-09`, `2001-10-22`, `1997-07-16T19:20+01:00`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'TemporalCoverage', 0, 0, 'TemporalCoverage.temporalCoverageStartDateTime', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/temporalCoverageStartDateTime', 'ltc:temporalCoverageStartDateTime', 'string'),
('ltc:', 'temporalCoverageType', 'Temporal Coverage Type', 'The type or context of the described TemporalCoverage.', 'If temporalCoverageStartDateTime is populated, temporalCoverageType is recommended.', 'Recommendation is to use a controlled vocabulary.', '`Collecting time range`, `Establishment time range`, `Time in post`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'TemporalCoverage', 0, 0, 'TemporalCoverage.temporalCoverageType', 'http://rs.tdwg.org/ltc/terms/', 'http://rs.tdwg.org/ltc/terms/temporalCoverageType', 'ltc:temporalCoverageType', 'string'),
('schema:', 'addressCountry', 'Address Country', 'The country. For example, USA. You can also provide the two-letter ISO 3166-1 alpha-2 country code.', '', 'Recommended best practice is to use a controlled vocabulary -- e.g. current ISO 3166 Country Codes.', '`Denmark`, `DK`, `Colombia`, `CO`, `España`, `ES`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'Address', 1, 0, 'Address.addressCountry', 'https://schema.org/', 'https://schema.org/addressCountry', 'schema:addressCountry', 'string'),
('schema:', 'addressLocality', 'Address Locality', 'The locality in which the street address is, and which is in the region. For example, Mountain View.', 'The locality in which the address is located. AddressLocality is a more specific geographic area than addressRegion.', '', '`Holzminden`, `Araçatuba`, `Ga-Segonyana`, `Mountain View`, `Coventry`, `Tokyo`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'Address', 0, 0, 'Address.addressLocality', 'https://schema.org/', 'https://schema.org/addressLocality', 'schema:addressLocality', 'string'),
('schema:', 'addressRegion', 'Address Region', 'The region in which the locality is, and which is in the country. For example, California or another appropriate first-level Administrative division.', '', '', '`Missoula`, `Los Lagos`, `Mataró`, `Guangdong`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'Address', 0, 0, 'Address.addressRegion', 'https://schema.org/', 'https://schema.org/addressRegion', 'schema:addressRegion', 'string'),
('schema:', 'postalCode', 'Postal Code', 'The postal code. For example, 94043.', '', '', '`32308`, `SW7 5HD`, `10115`, `3080`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'Address', 0, 0, 'Address.postalCode', 'https://schema.org/', 'https://schema.org/postalCode', 'schema:postalCode', 'string'),
('schema:', 'postOfficeBoxNumber', 'Post Office Box Number', 'The post office box number for PO box addresses.', '', '', '`PO Box 7169`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'Address', 0, 0, 'Address.postOfficeBoxNumber', 'https://schema.org/', 'https://schema.org/postOfficeBoxNumber', 'schema:postOfficeBoxNumber', 'string'),
('schema:', 'streetAddress', 'Street Address', 'The street address. For example, 1600 Amphitheatre Pkwy.', '', '', '`Invalidenstraße 43`, `1400 S. Du Sable Lake Shore Dr`, `960 Carling Avenue`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'Address', 1, 0, 'Address.streetAddress', 'https://schema.org/', 'https://schema.org/streetAddress', 'schema:streetAddress', 'string'),
('schema:', 'additionalName', 'Additional Name', 'An additional name for a Person, can be used for a middle name.', '', '', '`Stewart`, `Grace`, `Manthey`, `Kwame`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'Person', 0, 0, 'Person.additionalName', 'https://schema.org/', 'https://schema.org/additionalName', 'schema:additionalName', 'string'),
('schema:', 'familyName', 'Family Name', 'Family name. In the U.S., the last name of a Person.', '', '', '`Jones`, `Keita`, `O''Rourke`, `Carreño Quiñones`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'Person', 0, 0, 'Person.familyName', 'https://schema.org/', 'https://schema.org/familyName', 'schema:familyName', 'string'),
('schema:', 'givenName', 'Given Name', 'Given name. In the U.S., the first name of a Person.', '', '', '`Beth`, `John`, `María José`, `Björn`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'Person', 0, 0, 'Person.givenName', 'https://schema.org/', 'https://schema.org/givenName', 'schema:givenName', 'string'),
('chrono:', 'chronometricAgeProtocol', 'Chronometric Age Protocol', 'A description of or reference to the methods used to determine the chronometric age.', '', '', '`Radiocarbon dating using an Accelerator Mass Spectrometry`, `Pb-Pb Dating`, `41Ca - 41K Chronometer`, `U-Pb Dating using a Thermal Ionization Mass Spectrometer`, `U-Pb Radiometric Dating`, `Thermoluminescence`, `Paleomagnetism`, `Pb-Pb Chronometer as described in Amelin et al. (2002) Science 297, 1678-1683`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'ChronometricAge', 0, 0, 'ChronometricAge.chronometricAgeProtocol', 'http://rs.tdwg.org/chrono/terms/', 'http://rs.tdwg.org/chrono/terms/chronometricAgeProtocol', 'chrono:chronometricAgeProtocol', 'string'),
('chrono:', 'chronometricAgeRemarks', 'Chronometric Age Remarks', 'Notes or comments about the ChronometricAge.', '', '', '`Beta Analytic number: 323913` `One of the Crassostrea virginica right valve specimens from North Midden Feature 17 was chosen for AMS dating, but it is unclear exactly which specimen it was.`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'ChronometricAge', 0, 0, 'ChronometricAge.chronometricAgeRemarks', 'http://rs.tdwg.org/chrono/terms/', 'http://rs.tdwg.org/chrono/terms/chronometricAgeRemarks', 'chrono:chronometricAgeRemarks', 'string'),
('chrono:', 'chronometricAgeUncertaintyInYears', 'Chronometric Age Uncertainty In Years', 'The temporal uncertainty of the earliestChronometricAge and latestChronometicAge in years.', '', 'The expected unit for this field is years. The value in this field is number of years before and after the values given in the earliest and latest chronometric age fields within which the actual values are estimated to be.', '`100`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'ChronometricAge', 0, 0, 'ChronometricAge.chronometricAgeUncertaintyInYears', 'http://rs.tdwg.org/chrono/terms/', 'http://rs.tdwg.org/chrono/terms/chronometricAgeUncertaintyInYears', 'chrono:chronometricAgeUncertaintyInYears', 'number'),
('chrono:', 'earliestChronometricAge', 'Earliest Chronometric Age', 'The maximum/earliest/oldest possible age of a specimen as determined by a dating method.', '', 'The expected unit for this field is years. This field, if populated, must have an associated earliestChronometricAgeReferenceSystem.', '`100`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'ChronometricAge', 0, 0, 'ChronometricAge.earliestChronometricAge', 'http://rs.tdwg.org/chrono/terms/', 'http://rs.tdwg.org/chrono/terms/earliestChronometricAge', 'chrono:earliestChronometricAge', 'number'),
('chrono:', 'earliestChronometricAgeReferenceSystem', 'Earliest Chronometric Age Reference System', 'The reference system associated with the earliestChronometricAge.', '', '', '`kya`, `mya`, `BP`, `AD`, `BCE`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'ChronometricAge', 0, 0, 'ChronometricAge.earliestChronometricAgeReferenceSystem', 'http://rs.tdwg.org/chrono/terms/', 'http://rs.tdwg.org/chrono/terms/earliestChronometricAgeReferenceSystem', 'chrono:earliestChronometricAgeReferenceSystem', 'string'),
('chrono:', 'latestChronometricAge', 'Latest Chronometric Age', 'The minimum/latest/youngest possible age of a specimen as determined by a dating method.', 'The minimum/latest/youngest possible age of an object in the collection as determined by a dating method.', 'The expected unit for this field is years. This field, if populated, must have an associated latestChronometricAgeReferenceSystem.', '`27`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'ChronometricAge', 0, 0, 'ChronometricAge.latestChronometricAge', 'http://rs.tdwg.org/chrono/terms/', 'http://rs.tdwg.org/chrono/terms/latestChronometricAge', 'chrono:latestChronometricAge', 'number'),
('chrono:', 'latestChronometricAgeReferenceSystem', 'Latest Chronometric Age Reference System', 'The reference system associated with the latestChronometricAge.', '', 'Recommended best practice is to use a controlled vocabulary.', '`kya`, `mya`, `BP`, `AD`, `BCE`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'ChronometricAge', 0, 0, 'ChronometricAge.latestChronometricAgeReferenceSystem', 'http://rs.tdwg.org/chrono/terms/', 'http://rs.tdwg.org/chrono/terms/latestChronometricAgeReferenceSystem', 'chrono:latestChronometricAgeReferenceSystem', 'string'),
('chrono:', 'verbatimChronometricAge', 'Verbatim Chronometric Age', 'The verbatim age for a specimen, whether reported by a dating assay, associated references, or legacy information.', 'The verbatim age for the objects in the collection, whether reported by a dating assay, associated references, or legacy information.', 'For example, this could be the radiocarbon age as given in an AMS dating report. This could also be simply what is reported as the age of a specimen in legacy collections data.', '`27 BC to 14 AD`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'ChronometricAge', 0, 0, 'ChronometricAge.verbatimChronometricAge', 'http://rs.tdwg.org/chrono/terms/', 'http://rs.tdwg.org/chrono/terms/verbatimChronometricAge', 'chrono:verbatimChronometricAge', 'string'),
('dwc:', 'samplingProtocol', 'Sampling Protocol', 'The names of, references to, or descriptions of the methods or protocols used during an Event.', '', 'The primary use of this property is to describe the methods or protocols used to gather objects in the collection.', '`UV light trap`, `mist net`, `bottom trawl`, `ad hoc observation`, `Penguins from space: faecal stains reveal the location of emperor penguin colonies, https://doi.org/10.1111/j.1466-8238.2009.00467.x`, `Takats et al. 2001. Guidelines for Nocturnal Owl Monitoring in North America. Beaverhill Bird Observatory and Bird Studies Canada, Edmonton, Alberta. 32 pp., http://www.bsc-eoc.org/download/Owl.pdf`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'Event', 0, 1, 'Event.samplingProtocol', 'http://rs.tdwg.org/dwc/terms/', 'http://rs.tdwg.org/dwc/terms/samplingProtocol', 'dwc:samplingProtocol', 'list'),
('dwc:', 'verbatimEventDate', 'Verbatim Event Date', 'The verbatim original representation of the date and time information for an Event.', '', '', '`spring 1910`, `Marzo 2002`, `1999-03-XX`, `17IV1934`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'Event', 0, 0, 'Event.verbatimEventDate', 'http://rs.tdwg.org/dwc/terms/', 'http://rs.tdwg.org/dwc/terms/verbatimEventDate', 'dwc:verbatimEventDate', 'string'),
('dwc:', 'continent', 'Continent', 'The name of the continent in which the Location occurs.', 'The name of the continent in which the GeographicContext is located.', 'Based on best practice Getty Thesaurus of Geographic Names. --> http://www.getty.edu/vow/TGNHierarchy?find=&place=&nation=&english=Y&subjectid=7029392. For cultural collections such as economic botany use the Region field to record things like Pacific to replace Oceania.', '`Africa`, `Antarctica`, `Asia`, `Europe`, `North America`, `Oceania`, `South America`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'GeographicContext', 0, 0, 'GeographicContext.continent', 'http://rs.tdwg.org/dwc/terms/', 'http://rs.tdwg.org/dwc/terms/continent', 'dwc:continent', 'string'),
('dwc:', 'country', 'Country', 'The name of the country or major administrative unit in which the Location occurs.', 'The name of the country or major administrative unit in which the GeographicContext is located.', 'Recommended best practice is to use a controlled vocabulary such as the Getty Thesaurus of Geographic Names', '`Angola`, `Denmark`, `Colombia`, `Españax`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'GeographicContext', 0, 0, 'GeographicContext.country', 'http://rs.tdwg.org/dwc/terms/', 'http://rs.tdwg.org/dwc/terms/country', 'dwc:country', 'string'),
('dwc:', 'countryCode', 'Country Code', 'The standard code for the country in which the Location occurs.', 'The standard code for the country in which the GeographicContext is located.', 'Recommended best practice is to use an ISO 3166-1-alpha-2 country code.', '`AR`, `SV`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'GeographicContext', 0, 0, 'GeographicContext.countryCode', 'http://rs.tdwg.org/dwc/terms/', 'http://rs.tdwg.org/dwc/terms/countryCode', 'dwc:countryCode', 'string'),
('dwc:', 'county', 'Second Order Division', 'The full, unabbreviated name of the next smaller administrative region than stateProvince (county, shire, department, etc.) in which the Location occurs.', 'The full, unabbreviated name of the next smaller administrative region than stateProvince (county, shire, department, etc.) in which the GeographicContext is located.', 'Recommended best practice is to use a controlled vocabulary such as the Getty Thesaurus of Geographic Names and to leave this field blank if the Location spans multiple entities at this administrative level or is uncertain.', '`Missoula`, `Los Lagos`, `Mataró`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'GeographicContext', 0, 0, 'GeographicContext.county', 'http://rs.tdwg.org/dwc/terms/', 'http://rs.tdwg.org/dwc/terms/county', 'dwc:county', 'string'),
('dwc:', 'island', 'Island', 'The name of the island on or near which the Location occurs.', 'The name of the island on or near which the GeographicContext is located.', 'Recommended best practice is to use a controlled vocabulary such as the Getty Thesaurus of Geographic Names.', '`Nosy Be`, `Bikini Atoll`, `Vancouver`, `Viti Levu`, `Zanzibar`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'GeographicContext', 0, 0, 'GeographicContext.island', 'http://rs.tdwg.org/dwc/terms/', 'http://rs.tdwg.org/dwc/terms/island', 'dwc:island', 'string'),
('dwc:', 'islandGroup', 'Island Group', 'The name of the island group in which the Location occurs.', 'The name of the island group in which the location occurs.', 'Recommended best practice is to use a controlled vocabulary such as the Getty Thesaurus of Geographic Names.', '`Alexander Archipelago`, `Archipiélago Diego Ramírez`, `Seychelles`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'GeographicContext', 0, 0, 'GeographicContext.islandGroup', 'http://rs.tdwg.org/dwc/terms/', 'http://rs.tdwg.org/dwc/terms/islandGroup', 'dwc:islandGroup', 'string'),
('dwc:', 'locality', 'Locality', 'The specific description of the place.', '', 'Less specific geographic information can be provided in other geographic terms (continent, waterBody). This term may contain information modified from the original to correct perceived errors or standardize the description.', '`Bariloche, 25 km NNE via Ruta Nacional 40 (=Ruta 237).`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'GeographicContext', 0, 0, 'GeographicContext.locality', 'http://rs.tdwg.org/dwc/terms/', 'http://rs.tdwg.org/dwc/terms/locality', 'dwc:locality', 'string'),
('dwc:', 'municipality', 'Municipality', 'The full, unabbreviated name of the next smaller administrative region than county (city, municipality, etc.) in which the Location occurs. Do not use this term for a nearby named place that does not contain the actual location.', 'The full, unabbreviated name of the next smaller administrative region than county (city, municipality, etc.) in which the GeographicContext is located. Do not use this term for a nearby named place that does not contain the actual location.', 'Recommended best practice is to use a controlled vocabulary such as the Getty Thesaurus of Geographic Names.', '`Holzminden`, `Araçatuba`, `Ga-Segonyana`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'GeographicContext', 0, 0, 'GeographicContext.municipality', 'http://rs.tdwg.org/dwc/terms/', 'http://rs.tdwg.org/dwc/terms/municipality', 'dwc:municipality', 'string'),
('dwc:', 'stateProvince', 'First Order Division', 'The name of the next smaller administrative region than country (state, province, canton, department, region, etc.) in which the Location occurs.', 'The name of the next smaller administrative region than country (state, province, canton, department, region, etc.) in which the GeographicContext is located.', 'Recommended best practice is to use a controlled vocabulary such as the Getty Thesaurus of Geographic Names and to leave this field blank if the Location spans multiple entities at this administrative level or is uncertain.', '`Montana`, `Minas Gerais`, `Córdoba`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'GeographicContext', 0, 0, 'GeographicContext.stateProvince', 'http://rs.tdwg.org/dwc/terms/', 'http://rs.tdwg.org/dwc/terms/stateProvince', 'dwc:stateProvince', 'string'),
('dwc:', 'waterBody', 'Water Body', 'The name of the water body in which the Location occurs.', 'The name of the water body in which the GeographicContext is located.', 'This is intended to define the lowest water body or aquatic feature that defines the geographical constraints of aquatic collections below ocean. Suggestions for appropriate vocabularies include: HydroLAKES (https://www.hydrosheds.org/page/hydrolakes), a database aiming to provide the shoreline polygons of all global lakes with a surface area of at least 10 ha, the ''water body'' term in the OBO ontology (http://purl.obolibrary.org/obo/ENVO_00000063) and, for marine water bodies, IHO Sea Areas (http://www.vliz.be/en/imis?dasid=5444&doiid=323).', '`Baltic Sea`, `Hudson River`, `Lago Nahuel Huapi`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'GeographicContext', 0, 0, 'GeographicContext.waterBody', 'http://rs.tdwg.org/dwc/terms/', 'http://rs.tdwg.org/dwc/terms/waterBody', 'dwc:waterBody', 'string'),
('dwc:', 'bed', 'Bed', 'The full name of the lithostratigraphic bed from which the cataloged item was collected.', 'The full name of the lithostratigraphic bed from which the objects in the collection originated.', 'Recommended vocabulary: https://ngmdb.usgs.gov/Geolex/search', '`Beecher Trilobite Bed`, `McAbee Fossil Beds`, `Ashfall Fossil Beds`, `Nut Beds`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'GeologicalContext', 0, 0, 'GeologicalContext.bed', 'http://rs.tdwg.org/dwc/terms/', 'http://rs.tdwg.org/dwc/terms/bed', 'dwc:bed', 'string'),
('dwc:', 'earliestAgeOrLowestStage', 'Earliest Age Or Lowest Stage', 'The full name of the earliest possible geochronologic age or lowest chronostratigraphic stage attributable to the stratigraphic horizon from which the cataloged item was collected.', 'The full name of the earliest possible geochronologic age or lowest chronostratigraphic stage attributable to the stratigraphic horizon from which objects in the collection originated.', 'Recommended vocabularies: https://stratigraphy.org/chart, https://timescalefoundation.org/resources/geowhen/index.html', '`Atlantic`, `Boreal`, `Frasnian`, `Hirnantian`, `Maastrichtian`, `Bridgerian`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'GeologicalContext', 0, 0, 'GeologicalContext.earliestAgeOrLowestStage', 'http://rs.tdwg.org/dwc/terms/', 'http://rs.tdwg.org/dwc/terms/earliestAgeOrLowestStage', 'dwc:earliestAgeOrLowestStage', 'string'),
('dwc:', 'earliestEonOrLowestEonothem', 'Earliest Eon Or Lowest Eonothem', 'The full name of the earliest possible geochronologic eon or lowest chrono-stratigraphic eonothem or the informal name (Precambrian) attributable to the stratigraphic horizon from which the cataloged item was collected.', 'The full name of the earliest possible geochronologic eon or lowest chrono-stratigraphic eonothem or the informal name (Precambrian) attributable to the stratigraphic horizon from which the objects in the collection originated.', 'Recommended vocabularies: https://stratigraphy.org/chart, https://timescalefoundation.org/resources/geowhen/index.html', '`Phanerozoic`, `Proterozoic`, `Arechean`, `Hadean`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'GeologicalContext', 0, 0, 'GeologicalContext.earliestEonOrLowestEonothem', 'http://rs.tdwg.org/dwc/terms/', 'http://rs.tdwg.org/dwc/terms/earliestEonOrLowestEonothem', 'dwc:earliestEonOrLowestEonothem', 'string'),
('dwc:', 'earliestEpochOrLowestSeries', 'Earliest Epoch Or Lowest Series', 'The full name of the earliest possible geochronologic epoch or lowest chronostratigraphic series attributable to the stratigraphic horizon from which the cataloged item was collected.', 'The full name of the earliest possible geochronologic epoch or lowest chronostratigraphic series attributable to the stratigraphic horizon from which objects in the collection originated.', 'Recommended vocabularies: https://stratigraphy.org/chart, https://timescalefoundation.org/resources/geowhen/index.html', '`Holocene`, `Pleistocene`, `Ibexian`, `Late Devonian`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'GeologicalContext', 0, 0, 'GeologicalContext.earliestEpochOrLowestSeries', 'http://rs.tdwg.org/dwc/terms/', 'http://rs.tdwg.org/dwc/terms/earliestEpochOrLowestSeries', 'dwc:earliestEpochOrLowestSeries', 'string'),
('dwc:', 'earliestEraOrLowestErathem', 'Earliest Era Or Lowest Erathem', 'The full name of the earliest possible geochronologic era or lowest chronostratigraphic erathem attributable to the stratigraphic horizon from which the cataloged item was collected.', 'The full name of the earliest possible geochronologic era or lowest chronostratigraphic erathem attributable to the stratigraphic horizon from which the objects in the collection originated.', 'Recommended vocabularies: https://stratigraphy.org/chart, https://timescalefoundation.org/resources/geowhen/index.html', '`Cenozoic`, `Mesozoic`, `Paleozoic`, `Neoproterozoic`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'GeologicalContext', 0, 0, 'GeologicalContext.earliestEraOrLowestErathem', 'http://rs.tdwg.org/dwc/terms/', 'http://rs.tdwg.org/dwc/terms/earliestEraOrLowestErathem', 'dwc:earliestEraOrLowestErathem', 'string'),
('dwc:', 'earliestPeriodOrLowestSystem', 'Earliest Period Or Lowest System', 'The full name of the earliest possible geochronologic period or lowest chronostratigraphic system attributable to the stratigraphic horizon from which the cataloged item was collected.', 'The full name of the earliest possible geochronologic period or lowest chronostratigraphic system attributable to the stratigraphic horizon from which objects in the collection originated.', 'Recommended vocabularies: https://stratigraphy.org/chart, https://timescalefoundation.org/resources/geowhen/index.html', '`Neogene`, `Quaternary`, `Jurassic`, `Devonian`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'GeologicalContext', 0, 0, 'GeologicalContext.earliestPeriodOrLowestSystem', 'http://rs.tdwg.org/dwc/terms/', 'http://rs.tdwg.org/dwc/terms/earliestPeriodOrLowestSystem', 'dwc:earliestPeriodOrLowestSystem', 'string'),
('dwc:', 'formation', 'Formation', 'The full name of the lithostratigraphic formation from which the cataloged item was collected.', 'The full name of the lithostratigraphic formation from which objects in the collection originated.', 'Recommended vocabulary: https://ngmdb.usgs.gov/Geolex/search', '`Notch Peak Formation`, ` House Limestone`, `Fillmore Formation`, `Redwall Limestone`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'GeologicalContext', 0, 0, 'GeologicalContext.formation', 'http://rs.tdwg.org/dwc/terms/', 'http://rs.tdwg.org/dwc/terms/formation', 'dwc:formation', 'string'),
('dwc:', 'group', 'Group', 'The full name of the lithostratigraphic group from which the cataloged item was collected.', 'The full name of the lithostratigraphic group from which the objects in the collection originated.', 'Recommended vocabulary: https://ngmdb.usgs.gov/Geolex/search', '`Bathurst`, `Wealden`, `Elk Mound`, `Supai`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'GeologicalContext', 0, 0, 'GeologicalContext.group', 'http://rs.tdwg.org/dwc/terms/', 'http://rs.tdwg.org/dwc/terms/group', 'dwc:group', 'string'),
('dwc:', 'latestAgeOrHighestStage', 'Latest Age Or Highest Stage', 'The full name of the latest possible geochronologic age or highest chronostratigraphic stage attributable to the stratigraphic horizon from which the cataloged item was collected.', 'The full name of the latest possible geochronologic age or highest chronostratigraphic stage attributable to the stratigraphic horizon from which objects in the collection originated.', 'Recommended vocabularies: https://stratigraphy.org/chart, https://timescalefoundation.org/resources/geowhen/index.html', '`Atlantic`, `Boreal`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'GeologicalContext', 0, 0, 'GeologicalContext.latestAgeOrHighestStage', 'http://rs.tdwg.org/dwc/terms/', 'http://rs.tdwg.org/dwc/terms/latestAgeOrHighestStage', 'dwc:latestAgeOrHighestStage', 'string'),
('dwc:', 'latestEonOrHighestEonothem', 'Latest Eon Or Highest Eonothem', 'The full name of the latest possible geochronologic eon or highest chrono-stratigraphic eonothem or the informal name (Precambrian) attributable to the stratigraphic horizon from which the cataloged item was collected.', 'The full name of the latest possible geochronologic eon or highest chrono-stratigraphic eonothem or the informal name (Precambrian) attributable to the stratigraphic horizon from which the objects in the collection originated.', 'Recommended vocabularies: https://stratigraphy.org/chart, https://timescalefoundation.org/resources/geowhen/index.html', '`Phanerozoic`, `Proterozoic`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'GeologicalContext', 0, 0, 'GeologicalContext.latestEonOrHighestEonothem', 'http://rs.tdwg.org/dwc/terms/', 'http://rs.tdwg.org/dwc/terms/latestEonOrHighestEonothem', 'dwc:latestEonOrHighestEonothem', 'string'),
('dwc:', 'latestEpochOrHighestSeries', 'Latest Epoch Or Highest Series', 'The full name of the latest possible geochronologic epoch or highest chronostratigraphic series attributable to the stratigraphic horizon from which the cataloged item was collected.', 'The full name of the latest possible geochronologic epoch or highest chronostratigraphic series attributable to the stratigraphic horizon from which objects in the collection originated.', 'Recommended vocabularies: https://stratigraphy.org/chart, https://timescalefoundation.org/resources/geowhen/index.html', '`Holocene`, `Pleistocene`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'GeologicalContext', 0, 0, 'GeologicalContext.latestEpochOrHighestSeries', 'http://rs.tdwg.org/dwc/terms/', 'http://rs.tdwg.org/dwc/terms/latestEpochOrHighestSeries', 'dwc:latestEpochOrHighestSeries', 'string'),
('dwc:', 'latestEraOrHighestErathem', 'Latest Era Or Highest Erathem', 'The full name of the latest possible geochronologic era or highest chronostratigraphic erathem attributable to the stratigraphic horizon from which the cataloged item was collected.', 'The full name of the latest possible geochronologic era or highest chronostratigraphic erathem attributable to the stratigraphic horizon from which objects in the collection originated.', 'Recommended vocabularies: https://stratigraphy.org/chart, https://timescalefoundation.org/resources/geowhen/index.html', '`Cenozoic`, `Mesozoic`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'GeologicalContext', 0, 0, 'GeologicalContext.latestEraOrHighestErathem', 'http://rs.tdwg.org/dwc/terms/', 'http://rs.tdwg.org/dwc/terms/latestEraOrHighestErathem', 'dwc:latestEraOrHighestErathem', 'string'),
('dwc:', 'latestPeriodOrHighestSystem', 'Latest Period Or Highest System', 'The full name of the latest possible geochronologic period or highest chronostratigraphic system attributable to the stratigraphic horizon from which the cataloged item was collected.', 'The full name of the latest possible geochronologic period or highest chronostratigraphic system attributable to the stratigraphic horizon from which objects in the collection originated.', 'Recommended vocabularies: https://stratigraphy.org/chart, https://timescalefoundation.org/resources/geowhen/index.html', '`Neogene`, `Tertiary`, `Quaternary`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'GeologicalContext', 0, 0, 'GeologicalContext.latestPeriodOrHighestSystem', 'http://rs.tdwg.org/dwc/terms/', 'http://rs.tdwg.org/dwc/terms/latestPeriodOrHighestSystem', 'dwc:latestPeriodOrHighestSystem', 'string'),
('dwc:', 'member', 'Member', 'The full name of the lithostratigraphic member from which the cataloged item was collected.', 'The full name of the lithostratigraphic member from which objects in the collection originated.', 'Recommend vocabulary: https://ngmdb.usgs.gov/Geolex/search', '`Lava Dam Member`, `Hellnmaria Member`, `Francis Creek Shale`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'GeologicalContext', 0, 0, 'GeologicalContext.member', 'http://rs.tdwg.org/dwc/terms/', 'http://rs.tdwg.org/dwc/terms/member', 'dwc:member', 'string'),
('dwc:', 'measurementAccuracy', 'Measurement Accuracy', 'The description of the potential error associated with the measurementValue.', 'The description of the potential error associated with the measurementValue applied to the collection.', '', '`0.01`, `Normal distribution with variation of 2 m`, `Reported`, `Estimated`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'MeasurementOrFact', 0, 0, 'MeasurementOrFact.measurementAccuracy', 'http://rs.tdwg.org/dwc/terms/', 'http://rs.tdwg.org/dwc/terms/measurementAccuracy', 'dwc:measurementAccuracy', 'string'),
('dwc:', 'measurementMethod', 'Measurement Method', 'A description of or reference to (publication, IRI) the method or protocol used to determine the measurement, fact, characteristic, or assertion.', '', '', '`DiSSCo MIDS level`, `CD Standard Metric`, `https://doi.org/10.5281/zenodo.3465285`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'MeasurementOrFact', 0, 0, 'MeasurementOrFact.measurementMethod', 'http://rs.tdwg.org/dwc/terms/', 'http://rs.tdwg.org/dwc/terms/measurementMethod', 'dwc:measurementMethod', 'string'),
('dwc:', 'measurementRemarks', 'Measurement Remarks', 'Comments or notes accompanying the MeasurementOrFact.', '', '', '`Does not include on-loan material`, `Footprint includes housing`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'MeasurementOrFact', 0, 0, 'MeasurementOrFact.measurementRemarks', 'http://rs.tdwg.org/dwc/terms/', 'http://rs.tdwg.org/dwc/terms/measurementRemarks', 'dwc:measurementRemarks', 'string'),
('dwc:', 'measurementType', 'Measurement Type', 'The nature of the measurement, fact, characteristic, or assertion.', '', 'Recommended best practice is to use a controlled vocabulary.', '`Imaged Level Percentage`, `Storage Volume`, `Object Count`, `MIDS-0 Object Count`, `Historical narrative`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'MeasurementOrFact', 0, 0, 'MeasurementOrFact.measurementType', 'http://rs.tdwg.org/dwc/terms/', 'http://rs.tdwg.org/dwc/terms/measurementType', 'dwc:measurementType', 'string'),
('dwc:', 'measurementUnit', 'Measurement Unit', 'The units associated with the measurementValue.', '', 'For some use cases, this property can also be used to reflect the type of value being stored (e.g. a count, or a percentage).', '`mm`, `C`, `km`, `ha`, `count`, `percentage`, `category`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'MeasurementOrFact', 0, 0, 'MeasurementOrFact.measurementUnit', 'http://rs.tdwg.org/dwc/terms/', 'http://rs.tdwg.org/dwc/terms/measurementUnit', 'dwc:measurementUnit', 'string'),
('dwc:', 'measurementValue', 'Measurement Value', 'The value of the measurement, fact, characteristic, or assertion.', 'The numeric value of the quantitative measurement being made about the collection.', 'In the Collection Description standard, this field is constrained to only accept numeric values in order to better support the aggregation of quantitative metrics. For any non-numeric values, and metrics where the scale is a numeral that cannot be used in any calculations the measurementFactText property should be used instead.', '`45`, `20000`, `1`, `14.5`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'MeasurementOrFact', 0, 0, 'MeasurementOrFact.measurementValue', 'http://rs.tdwg.org/dwc/terms/', 'http://rs.tdwg.org/dwc/terms/measurementValue', 'dwc:measurementValue', 'number'),
('dwc:', 'degreeOfEstablishment', 'Degree of Establishment', 'The degree to which an Organism survives, reproduces, and expands its range at the given place and time.', '', 'Some preserved collections are specifically created from cultivated or captive organisms, or perhaps from rare vagrants. Recommended best practice is to use controlled value strings from the controlled vocabulary designated for use with this term, listed at http://rs.tdwg.org/dwc/doc/doe/. For details, refer to https://doi.org/10.3897/biss.3.38084.', '`native`, `captive`, `cultivated`, `released`, `failing`, `casual`, `reproducing`, `established`, `colonising`, `invasive`, `widespreadInvasive`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'ObjectGroup', 0, 1, 'ObjectGroup.degreeOfEstablishment', 'http://rs.tdwg.org/dwc/terms/', 'http://rs.tdwg.org/dwc/terms/degreeOfEstablishment', 'dwc:degreeOfEstablishment', 'list'),
('dwc:', 'relatedResourceID', 'Related Resource ID', 'An identifier for a related resource (the object, rather than the subject of the relationship).', '', '', '`dc609808-b09b-11e8-96f8-529269fb1459`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'ResourceRelationship', 0, 0, 'ResourceRelationship.relatedResourceID', 'http://rs.tdwg.org/dwc/terms/', 'http://rs.tdwg.org/dwc/terms/relatedResourceID', 'dwc:relatedResourceID', 'string'),
('dwc:', 'relationshipAccordingTo', 'Relationship According To', 'The source (person, organization, publication, reference) establishing the relationship between the two resources.', '', '', '`Julie Woodruff`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'ResourceRelationship', 0, 1, 'ResourceRelationship.relationshipAccordingTo', 'http://rs.tdwg.org/dwc/terms/', 'http://rs.tdwg.org/dwc/terms/relationshipAccordingTo', 'dwc:relationshipAccordingTo', 'list'),
('dwc:', 'relationshipEstablishedDate', 'Relationship Established Date', 'The date-time on which the relationship between the two resources was established.', '', 'Recommended best practice is to use a date that conforms to ISO 8601-1:2019.', '`1963-03-08T14:07-0600`, `2009-02-20T08:40Z`, `2018-08-29T15:19`, `1809-02-12`, `1906-06`, `1971`, `2007-03-01T13:00:00Z/2008-05-11T15:30:00Z`, `1900/1909`, `2007-11-13/15`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'ResourceRelationship', 0, 0, 'ResourceRelationship.relationshipEstablishedDate', 'http://rs.tdwg.org/dwc/terms/', 'http://rs.tdwg.org/dwc/terms/relationshipEstablishedDate', 'dwc:relationshipEstablishedDate', 'string'),
('dwc:', 'relationshipRemarks', 'Relationship Remarks', 'Comments or notes about the relationship between the two resources.', '', '', '`The Darwin fossil collection makes up part of the museum''s palaeontology collection.`, `Some of the same Madagascan bryophytes are included in both of these collections.`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'ResourceRelationship', 0, 0, 'ResourceRelationship.relationshipRemarks', 'http://rs.tdwg.org/dwc/terms/', 'http://rs.tdwg.org/dwc/terms/relationshipRemarks', 'dwc:relationshipRemarks', 'string'),
('dwc:', 'resourceID', 'Resource ID', 'An identifier for the resource that is the subject of the relationship.', '', '', '`f809b9e0-b09b-11e8-96f8-529269fb1459`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'ResourceRelationship', 1, 0, 'ResourceRelationship.resourceID', 'http://rs.tdwg.org/dwc/terms/', 'http://rs.tdwg.org/dwc/terms/resourceID', 'dwc:resourceID', 'string'),
('dwc:', 'genus', 'Genus', 'The full scientific name of the genus in which the taxon is classified.', 'The full scientific name of the genus in which the collection''s taxa are classified.', '', '`Puma`, `Monoclea`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'Taxon', 0, 0, 'Taxon.genus', 'http://rs.tdwg.org/dwc/terms/', 'http://rs.tdwg.org/dwc/terms/genus', 'dwc:genus', 'string'),
('dwc:', 'kingdom', 'Kingdom', 'The full scientific name of the kingdom in which the taxon is classified.', 'The full scientific name of the kingdom in which the taxa in the collection are classified.', 'Examples of controlled vocabularies include http://tdwg.github.io/ontology/ontology/voc/Collection.rdf and https://doi.org/10.1371/journal.pone.0130114 https://en.wikipedia.org/wiki/Two-empire_system.', '`Animalia`, `Archaea`, `Bacteria`, `Chromista`, `Fungi`, `Plantae`, `Protozoa`, `Viruses`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'Taxon', 0, 0, 'Taxon.kingdom', 'http://rs.tdwg.org/dwc/terms/', 'http://rs.tdwg.org/dwc/terms/kingdom', 'dwc:kingdom', 'string'),
('dwc:', 'scientificName', 'Scientific Name', 'The full scientific name, with authorship and date information if known. When forming part of an Identification, this should be the name in lowest level taxonomic rank that can be determined. This term should not contain identification qualifications, which should instead be supplied in the IdentificationQualifier term.', 'The full scientific name. This should be the name in lowest level taxonomic rank that applies across the collection.', 'If this field is used, then recommended to also complete the taxonRank. This term should not contain identification qualifications.', '`Coleoptera` (order), `Vespertilionidae` (family), `Manis` (genus), `Ctenomys sociabilis` (genus + specificEpithet), `Ambystoma tigrinum diaboli` (genus + specificEpithet + infraspecificEpithet)', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'Taxon', 0, 0, 'Taxon.scientificName', 'http://rs.tdwg.org/dwc/terms/', 'http://rs.tdwg.org/dwc/terms/scientificName', 'dwc:scientificName', 'string'),
('dwc:', 'taxonRank', 'Taxon Rank', 'The taxonomic rank of the most specific name in the scientificName.', '', 'Recommended best practice is to use a controlled vocabulary. For example: https://bioportal.bioontology.org/ontologies/TAXRANK?p=summary', '`subspecies`, `varietas`, `forma`, `species`, `genus`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'Taxon', 0, 0, 'Taxon.taxonRank', 'http://rs.tdwg.org/dwc/terms/', 'http://rs.tdwg.org/dwc/terms/taxonRank', 'dwc:taxonRank', 'string'),
('abcd:', 'fullName', 'Full Name', 'String of the preferred form of personal name for displaying.', '', '', '`James Ewert Bradshaw`, `T. van Hooijdonk`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'Person', 0, 0, 'Person.fullName', 'http://rs.tdwg.org/abcd/terms/', 'http://rs.tdwg.org/abcd/terms/fullName', 'abcd:fullName', 'string'),
('dcterms:', 'license', 'License', 'A legal document giving official permission to do something with the resource.', 'A legal document giving official permission to do something with the collection description record.', 'Recommended practice is to identify the license document with a IRI. If this is not possible or feasible, a literal value that identifies the license may be provided.', '`https://creativecommons.org/licenses/by/4.0/`, `https://creativecommons.org/publicdomain/zero/1.0/`, `https://creativecommons.org/licenses/by/4.0/legalcode`, `https://opendatacommons.org/licenses/by/1.0/`, `http://unlicense.org/`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'RecordLevel', 1, 0, 'RecordLevel.license', 'http://purl.org/dc/terms/', 'http://purl.org/dc/terms/license', 'dcterms:license', 'string'),
('dcterms:', 'rights', 'Rights', 'Information about rights held in and over the resource.', 'A statement of any rights held in/over the collection description record.', 'Typically, rights information includes a statement about various property rights associated with the resource, including intellectual property rights. Recommended practice is to refer to a rights statement with a IRI. If this is not possible or feasible, a literal value (name, label, or short text) may be provided.', '`http://scratchpads.eu/about/policies/termsandconditions`, `All rights reserved by DataOwner Ltd.`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'RecordLevel', 0, 0, 'RecordLevel.rights', 'http://purl.org/dc/terms/', 'http://purl.org/dc/terms/rights', 'dcterms:rights', 'string'),
('dcterms:', 'rightsHolder', 'Rights Holder', 'A person or organization owning or managing rights over the resource.', 'A person or organization owning or managing rights held in/over the collection description record.', 'Recommended practice is to refer to the rights holder with a IRI. If this is not possible or feasible, a literal value that identifies the rights holder may be provided.', '`Smith, Clare`, `Natural History Museum, London`, `https://orcid.org/XXXX-XXXX-XXXX-XXXX`, `https://ror.org/XXaaaXXXX`', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property', 'RecordLevel', 0, 0, 'RecordLevel.rightsHolder', 'http://purl.org/dc/terms/', 'http://purl.org/dc/terms/rightsHolder', 'dcterms:rightsHolder', 'string');

--
-- Restore previous SQL mode
--
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;

--
-- Enable foreign keys
--
/*!40014 SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS */;