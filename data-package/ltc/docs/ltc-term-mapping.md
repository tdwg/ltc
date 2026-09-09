# Latimer Core -> Data Package Mapping
> 2026-08-31
> ltc-term-mapping.md
> ltc

Maps every Latimer Core class to an LtC-DP table and every Latimer Core property to a column.
Generated from `ltc_terms_source.csv` (25 classes, 228 properties) and `ltc_datatypes.csv` by
`build-mapping.py`. This is the mapping that `vocabulary/ltc-dp-fields.csv` must reproduce.

**Built on two preliminary decisions** recorded in `open-issues.md`, both still open for group
deliberation. Regenerate this document with `python data-package/ltc/build-mapping.py` if either
is revised.

- **Issue 1** — `LatimerCoreScheme` is a table, so `SchemeTerm` and `SchemeMeasurementOrFact`
  are not orphaned. A scheme is something a package contains.
- **Issue 2** — relations follow the Darwin Core DP child-table pattern, so a relation may hold
  many values.

## Structural rules

Darwin Core DP resolves relations three ways. Latimer Core uses the same three.

| Rule | When | Result | DwC-DP precedent |
| -- | -- | -- | -- |
| **Core table** | every Latimer Core class | `<class>` with `<className>_pk` | `event`, `agent` |
| **Direct FK on the child** | the target class has exactly one parent class | `<target>.<parent>_fk` | `chronometric-age.event_fk` |
| **Junction table** | the target class has two or more parent classes | `<parent>-<target>` with two FKs | `event-reference`, `material-media` |
| **Self-reference** | a class references itself | `parent<Class>_fk` on the same table | `organism-relationship.subjectOrganism_fk` |

Darwin Core DP has a fourth pattern: a leaf attribute bundle is inlined into a one-FK child
table (`agent-identifier` carries the identifier fields directly, and there is no `identifier`
table). **This pattern has no applicable case in Latimer Core.** Every one of the 25 Latimer
Core classes carries at least one `has*` relation of its own, so none is a leaf, and a table
with no primary key cannot be referenced. `Identifier` in particular carries `hasReference`.

If Latimer Core were to drop `Identifier.hasReference`, `Identifier` would become a leaf and
could be inlined exactly as Darwin Core DP does, removing the `identifier` table and converting
23 junction tables into 23 inlined child tables. That is a Latimer Core question, not a data
package question — see `open-issues.md`.

## Naming

| Element | Rule | Example |
| -- | -- | -- |
| Table / resource name | kebab-case, all lowercase | `ObjectGroup` -> `object-group` |
| Junction table name | `<parent-table>-<target-table>` | `object-group-identifier` |
| Schema file | `<table-name>.json` | `table-schemas/object-group.json` |
| Primary key | `<className>_pk`, camelCase | `objectGroup_pk` |
| Foreign key | `<targetClassName>_fk`, camelCase | `reference_fk` |
| Self-reference FK | `parent<ClassName>_fk` | `parentEvent_fk` |
| Ordinary column | `term_localName` verbatim (camelCase) | `objectClassificationName` |
| Field `title` | Title Case, key suffix | `Object Group (Primary Key)` |

## Table inventory

106 tables: 25 core (one per Latimer Core class) and 81 junction.

### Core tables

| Latimer Core class | Table | Primary key | Columns | Note |
| -- | -- | -- | -- | -- |
| `Address` | `address` | `address_pk` | 8 |  |
| `ChronometricAge` | `chronometric-age` | `chronometricAge_pk` | 10 |  |
| `CollectionStatusHistory` | `collection-status-history` | `collectionStatusHistory_pk` | 5 |  |
| `ContactDetail` | `contact-detail` | `contactDetail_pk` | 4 |  |
| `EcologicalContext` | `ecological-context` | `ecologicalContext_pk` | 8 |  |
| `Event` | `event` | `event_pk` | 6 |  |
| `GeographicContext` | `geographic-context` | `geographicContext_pk` | 13 |  |
| `GeologicalContext` | `geological-context` | `geologicalContext_pk` | 17 |  |
| `Identifier` | `identifier` | `identifier_pk` | 4 |  |
| `LatimerCoreScheme` | `latimer-core-scheme` | `latimerCoreScheme_pk` | 4 | scheme root - issue 1 |
| `MeasurementOrFact` | `measurement-or-fact` | `measurementOrFact_pk` | 9 |  |
| `ObjectClassification` | `object-classification` | `objectClassification_pk` | 6 |  |
| `ObjectGroup` | `object-group` | `objectGroup_pk` | 18 |  |
| `OrganisationalUnit` | `organisational-unit` | `organisationalUnit_pk` | 5 |  |
| `Person` | `person` | `person_pk` | 5 |  |
| `PersonRole` | `person-role` | `personRole_pk` | 3 |  |
| `RecordLevel` | `record-level` | `recordLevel_pk` | 5 | dataset root |
| `Reference` | `reference` | `reference_pk` | 5 |  |
| `ResourceRelationship` | `resource-relationship` | `resourceRelationship_pk` | 9 |  |
| `Role` | `role` | `role_pk` | 2 |  |
| `SchemeMeasurementOrFact` | `scheme-measurement-or-fact` | `schemeMeasurementOrFact_pk` | 5 |  |
| `SchemeTerm` | `scheme-term` | `schemeTerm_pk` | 5 |  |
| `StorageLocation` | `storage-location` | `storageLocation_pk` | 6 |  |
| `Taxon` | `taxon` | `taxon_pk` | 6 |  |
| `TemporalCoverage` | `temporal-coverage` | `temporalCoverage_pk` | 4 |  |

### Junction tables

Each holds exactly two foreign keys, both required. No payload columns.

| Table | Parent FK | Target FK | From Latimer Core property |
| -- | -- | -- | -- |
| `address-identifier` | `address_fk` -> `address.address_pk` | `identifier_fk` -> `identifier.identifier_pk` | `Address.hasIdentifier` |
| `chronometric-age-identifier` | `chronometricAge_fk` -> `chronometric-age.chronometricAge_pk` | `identifier_fk` -> `identifier.identifier_pk` | `ChronometricAge.hasIdentifier` |
| `chronometric-age-measurement-or-fact` | `chronometricAge_fk` -> `chronometric-age.chronometricAge_pk` | `measurementOrFact_fk` -> `measurement-or-fact.measurementOrFact_pk` | `ChronometricAge.hasMeasurementOrFact` |
| `chronometric-age-reference` | `chronometricAge_fk` -> `chronometric-age.chronometricAge_pk` | `reference_fk` -> `reference.reference_pk` | `ChronometricAge.hasReference` |
| `collection-status-history-identifier` | `collectionStatusHistory_fk` -> `collection-status-history.collectionStatusHistory_pk` | `identifier_fk` -> `identifier.identifier_pk` | `CollectionStatusHistory.hasIdentifier` |
| `collection-status-history-measurement-or-fact` | `collectionStatusHistory_fk` -> `collection-status-history.collectionStatusHistory_pk` | `measurementOrFact_fk` -> `measurement-or-fact.measurementOrFact_pk` | `CollectionStatusHistory.hasMeasurementOrFact` |
| `collection-status-history-reference` | `collectionStatusHistory_fk` -> `collection-status-history.collectionStatusHistory_pk` | `reference_fk` -> `reference.reference_pk` | `CollectionStatusHistory.hasReference` |
| `collection-status-history-temporal-coverage` | `collectionStatusHistory_fk` -> `collection-status-history.collectionStatusHistory_pk` | `temporalCoverage_fk` -> `temporal-coverage.temporalCoverage_pk` | `CollectionStatusHistory.hasTemporalCoverage` |
| `contact-detail-identifier` | `contactDetail_fk` -> `contact-detail.contactDetail_pk` | `identifier_fk` -> `identifier.identifier_pk` | `ContactDetail.hasIdentifier` |
| `ecological-context-identifier` | `ecologicalContext_fk` -> `ecological-context.ecologicalContext_pk` | `identifier_fk` -> `identifier.identifier_pk` | `EcologicalContext.hasIdentifier` |
| `ecological-context-measurement-or-fact` | `ecologicalContext_fk` -> `ecological-context.ecologicalContext_pk` | `measurementOrFact_fk` -> `measurement-or-fact.measurementOrFact_pk` | `EcologicalContext.hasMeasurementOrFact` |
| `ecological-context-reference` | `ecologicalContext_fk` -> `ecological-context.ecologicalContext_pk` | `reference_fk` -> `reference.reference_pk` | `EcologicalContext.hasReference` |
| `event-ecological-context` | `event_fk` -> `event.event_pk` | `ecologicalContext_fk` -> `ecological-context.ecologicalContext_pk` | `Event.hasEcologicalContext` |
| `event-geographic-context` | `event_fk` -> `event.event_pk` | `geographicContext_fk` -> `geographic-context.geographicContext_pk` | `Event.hasGeographicContext` |
| `event-identifier` | `event_fk` -> `event.event_pk` | `identifier_fk` -> `identifier.identifier_pk` | `Event.hasIdentifier` |
| `event-measurement-or-fact` | `event_fk` -> `event.event_pk` | `measurementOrFact_fk` -> `measurement-or-fact.measurementOrFact_pk` | `Event.hasMeasurementOrFact` |
| `event-person-role` | `event_fk` -> `event.event_pk` | `personRole_fk` -> `person-role.personRole_pk` | `Event.hasPersonRole` |
| `event-reference` | `event_fk` -> `event.event_pk` | `reference_fk` -> `reference.reference_pk` | `Event.hasReference` |
| `event-temporal-coverage` | `event_fk` -> `event.event_pk` | `temporalCoverage_fk` -> `temporal-coverage.temporalCoverage_pk` | `Event.hasTemporalCoverage` |
| `geographic-context-identifier` | `geographicContext_fk` -> `geographic-context.geographicContext_pk` | `identifier_fk` -> `identifier.identifier_pk` | `GeographicContext.hasIdentifier` |
| `geographic-context-measurement-or-fact` | `geographicContext_fk` -> `geographic-context.geographicContext_pk` | `measurementOrFact_fk` -> `measurement-or-fact.measurementOrFact_pk` | `GeographicContext.hasMeasurementOrFact` |
| `geographic-context-reference` | `geographicContext_fk` -> `geographic-context.geographicContext_pk` | `reference_fk` -> `reference.reference_pk` | `GeographicContext.hasReference` |
| `geological-context-identifier` | `geologicalContext_fk` -> `geological-context.geologicalContext_pk` | `identifier_fk` -> `identifier.identifier_pk` | `GeologicalContext.hasIdentifier` |
| `geological-context-measurement-or-fact` | `geologicalContext_fk` -> `geological-context.geologicalContext_pk` | `measurementOrFact_fk` -> `measurement-or-fact.measurementOrFact_pk` | `GeologicalContext.hasMeasurementOrFact` |
| `geological-context-reference` | `geologicalContext_fk` -> `geological-context.geologicalContext_pk` | `reference_fk` -> `reference.reference_pk` | `GeologicalContext.hasReference` |
| `identifier-reference` | `identifier_fk` -> `identifier.identifier_pk` | `reference_fk` -> `reference.reference_pk` | `Identifier.hasReference` |
| `latimer-core-scheme-identifier` | `latimerCoreScheme_fk` -> `latimer-core-scheme.latimerCoreScheme_pk` | `identifier_fk` -> `identifier.identifier_pk` | `LatimerCoreScheme.hasIdentifier` |
| `latimer-core-scheme-object-group` | `latimerCoreScheme_fk` -> `latimer-core-scheme.latimerCoreScheme_pk` | `objectGroup_fk` -> `object-group.objectGroup_pk` | `LatimerCoreScheme.hasObjectGroup` |
| `latimer-core-scheme-reference` | `latimerCoreScheme_fk` -> `latimer-core-scheme.latimerCoreScheme_pk` | `reference_fk` -> `reference.reference_pk` | `LatimerCoreScheme.hasReference` |
| `measurement-or-fact-identifier` | `measurementOrFact_fk` -> `measurement-or-fact.measurementOrFact_pk` | `identifier_fk` -> `identifier.identifier_pk` | `MeasurementOrFact.hasIdentifier` |
| `measurement-or-fact-reference` | `measurementOrFact_fk` -> `measurement-or-fact.measurementOrFact_pk` | `reference_fk` -> `reference.reference_pk` | `MeasurementOrFact.hasReference` |
| `object-classification-identifier` | `objectClassification_fk` -> `object-classification.objectClassification_pk` | `identifier_fk` -> `identifier.identifier_pk` | `ObjectClassification.hasIdentifier` |
| `object-classification-measurement-or-fact` | `objectClassification_fk` -> `object-classification.objectClassification_pk` | `measurementOrFact_fk` -> `measurement-or-fact.measurementOrFact_pk` | `ObjectClassification.hasMeasurementOrFact` |
| `object-classification-reference` | `objectClassification_fk` -> `object-classification.objectClassification_pk` | `reference_fk` -> `reference.reference_pk` | `ObjectClassification.hasReference` |
| `object-group-ecological-context` | `objectGroup_fk` -> `object-group.objectGroup_pk` | `ecologicalContext_fk` -> `ecological-context.ecologicalContext_pk` | `ObjectGroup.hasEcologicalContext` |
| `object-group-geographic-context` | `objectGroup_fk` -> `object-group.objectGroup_pk` | `geographicContext_fk` -> `geographic-context.geographicContext_pk` | `ObjectGroup.hasGeographicContext` |
| `object-group-identifier` | `objectGroup_fk` -> `object-group.objectGroup_pk` | `identifier_fk` -> `identifier.identifier_pk` | `ObjectGroup.hasIdentifier` |
| `object-group-measurement-or-fact` | `objectGroup_fk` -> `object-group.objectGroup_pk` | `measurementOrFact_fk` -> `measurement-or-fact.measurementOrFact_pk` | `ObjectGroup.hasMeasurementOrFact` |
| `object-group-person-role` | `objectGroup_fk` -> `object-group.objectGroup_pk` | `personRole_fk` -> `person-role.personRole_pk` | `ObjectGroup.hasPersonRole` |
| `object-group-reference` | `objectGroup_fk` -> `object-group.objectGroup_pk` | `reference_fk` -> `reference.reference_pk` | `ObjectGroup.hasReference` |
| `object-group-resource-relationship` | `objectGroup_fk` -> `object-group.objectGroup_pk` | `resourceRelationship_fk` -> `resource-relationship.resourceRelationship_pk` | `ObjectGroup.hasResourceRelationship` |
| `organisational-unit-address` | `organisationalUnit_fk` -> `organisational-unit.organisationalUnit_pk` | `address_fk` -> `address.address_pk` | `OrganisationalUnit.hasAddress` |
| `organisational-unit-contact-detail` | `organisationalUnit_fk` -> `organisational-unit.organisationalUnit_pk` | `contactDetail_fk` -> `contact-detail.contactDetail_pk` | `OrganisationalUnit.hasContactDetail` |
| `organisational-unit-identifier` | `organisationalUnit_fk` -> `organisational-unit.organisationalUnit_pk` | `identifier_fk` -> `identifier.identifier_pk` | `OrganisationalUnit.hasIdentifier` |
| `organisational-unit-measurement-or-fact` | `organisationalUnit_fk` -> `organisational-unit.organisationalUnit_pk` | `measurementOrFact_fk` -> `measurement-or-fact.measurementOrFact_pk` | `OrganisationalUnit.hasMeasurementOrFact` |
| `organisational-unit-person-role` | `organisationalUnit_fk` -> `organisational-unit.organisationalUnit_pk` | `personRole_fk` -> `person-role.personRole_pk` | `OrganisationalUnit.hasPersonRole` |
| `organisational-unit-reference` | `organisationalUnit_fk` -> `organisational-unit.organisationalUnit_pk` | `reference_fk` -> `reference.reference_pk` | `OrganisationalUnit.hasReference` |
| `person-address` | `person_fk` -> `person.person_pk` | `address_fk` -> `address.address_pk` | `Person.hasAddress` |
| `person-contact-detail` | `person_fk` -> `person.person_pk` | `contactDetail_fk` -> `contact-detail.contactDetail_pk` | `Person.hasContactDetail` |
| `person-identifier` | `person_fk` -> `person.person_pk` | `identifier_fk` -> `identifier.identifier_pk` | `Person.hasIdentifier` |
| `person-measurement-or-fact` | `person_fk` -> `person.person_pk` | `measurementOrFact_fk` -> `measurement-or-fact.measurementOrFact_pk` | `Person.hasMeasurementOrFact` |
| `person-reference` | `person_fk` -> `person.person_pk` | `reference_fk` -> `reference.reference_pk` | `Person.hasReference` |
| `person-role-address` | `personRole_fk` -> `person-role.personRole_pk` | `address_fk` -> `address.address_pk` | `PersonRole.hasAddress` |
| `person-role-contact-detail` | `personRole_fk` -> `person-role.personRole_pk` | `contactDetail_fk` -> `contact-detail.contactDetail_pk` | `PersonRole.hasContactDetail` |
| `person-role-identifier` | `personRole_fk` -> `person-role.personRole_pk` | `identifier_fk` -> `identifier.identifier_pk` | `PersonRole.hasIdentifier` |
| `person-role-measurement-or-fact` | `personRole_fk` -> `person-role.personRole_pk` | `measurementOrFact_fk` -> `measurement-or-fact.measurementOrFact_pk` | `PersonRole.hasMeasurementOrFact` |
| `person-role-reference` | `personRole_fk` -> `person-role.personRole_pk` | `reference_fk` -> `reference.reference_pk` | `PersonRole.hasReference` |
| `person-role-temporal-coverage` | `personRole_fk` -> `person-role.personRole_pk` | `temporalCoverage_fk` -> `temporal-coverage.temporalCoverage_pk` | `PersonRole.hasTemporalCoverage` |
| `record-level-identifier` | `recordLevel_fk` -> `record-level.recordLevel_pk` | `identifier_fk` -> `identifier.identifier_pk` | `RecordLevel.hasIdentifier` |
| `record-level-object-group` | `recordLevel_fk` -> `record-level.recordLevel_pk` | `objectGroup_fk` -> `object-group.objectGroup_pk` | `RecordLevel.hasObjectGroup` |
| `record-level-person-role` | `recordLevel_fk` -> `record-level.recordLevel_pk` | `personRole_fk` -> `person-role.personRole_pk` | `RecordLevel.hasPersonRole` |
| `record-level-reference` | `recordLevel_fk` -> `record-level.recordLevel_pk` | `reference_fk` -> `reference.reference_pk` | `RecordLevel.hasReference` |
| `record-level-resource-relationship` | `recordLevel_fk` -> `record-level.recordLevel_pk` | `resourceRelationship_fk` -> `resource-relationship.resourceRelationship_pk` | `RecordLevel.hasResourceRelationship` |
| `reference-identifier` | `reference_fk` -> `reference.reference_pk` | `identifier_fk` -> `identifier.identifier_pk` | `Reference.hasIdentifier` |
| `resource-relationship-identifier` | `resourceRelationship_fk` -> `resource-relationship.resourceRelationship_pk` | `identifier_fk` -> `identifier.identifier_pk` | `ResourceRelationship.hasIdentifier` |
| `resource-relationship-measurement-or-fact` | `resourceRelationship_fk` -> `resource-relationship.resourceRelationship_pk` | `measurementOrFact_fk` -> `measurement-or-fact.measurementOrFact_pk` | `ResourceRelationship.hasMeasurementOrFact` |
| `resource-relationship-reference` | `resourceRelationship_fk` -> `resource-relationship.resourceRelationship_pk` | `reference_fk` -> `reference.reference_pk` | `ResourceRelationship.hasReference` |
| `role-identifier` | `role_fk` -> `role.role_pk` | `identifier_fk` -> `identifier.identifier_pk` | `Role.hasIdentifier` |
| `scheme-measurement-or-fact-identifier` | `schemeMeasurementOrFact_fk` -> `scheme-measurement-or-fact.schemeMeasurementOrFact_pk` | `identifier_fk` -> `identifier.identifier_pk` | `SchemeMeasurementOrFact.hasIdentifier` |
| `scheme-measurement-or-fact-reference` | `schemeMeasurementOrFact_fk` -> `scheme-measurement-or-fact.schemeMeasurementOrFact_pk` | `reference_fk` -> `reference.reference_pk` | `SchemeMeasurementOrFact.hasReference` |
| `scheme-term-identifier` | `schemeTerm_fk` -> `scheme-term.schemeTerm_pk` | `identifier_fk` -> `identifier.identifier_pk` | `SchemeTerm.hasIdentifier` |
| `scheme-term-reference` | `schemeTerm_fk` -> `scheme-term.schemeTerm_pk` | `reference_fk` -> `reference.reference_pk` | `SchemeTerm.hasReference` |
| `storage-location-address` | `storageLocation_fk` -> `storage-location.storageLocation_pk` | `address_fk` -> `address.address_pk` | `StorageLocation.hasAddress` |
| `storage-location-identifier` | `storageLocation_fk` -> `storage-location.storageLocation_pk` | `identifier_fk` -> `identifier.identifier_pk` | `StorageLocation.hasIdentifier` |
| `storage-location-measurement-or-fact` | `storageLocation_fk` -> `storage-location.storageLocation_pk` | `measurementOrFact_fk` -> `measurement-or-fact.measurementOrFact_pk` | `StorageLocation.hasMeasurementOrFact` |
| `storage-location-reference` | `storageLocation_fk` -> `storage-location.storageLocation_pk` | `reference_fk` -> `reference.reference_pk` | `StorageLocation.hasReference` |
| `taxon-identifier` | `taxon_fk` -> `taxon.taxon_pk` | `identifier_fk` -> `identifier.identifier_pk` | `Taxon.hasIdentifier` |
| `taxon-measurement-or-fact` | `taxon_fk` -> `taxon.taxon_pk` | `measurementOrFact_fk` -> `measurement-or-fact.measurementOrFact_pk` | `Taxon.hasMeasurementOrFact` |
| `taxon-reference` | `taxon_fk` -> `taxon.taxon_pk` | `reference_fk` -> `reference.reference_pk` | `Taxon.hasReference` |
| `temporal-coverage-measurement-or-fact` | `temporalCoverage_fk` -> `temporal-coverage.temporalCoverage_pk` | `measurementOrFact_fk` -> `measurement-or-fact.measurementOrFact_pk` | `TemporalCoverage.hasMeasurementOrFact` |
| `temporal-coverage-reference` | `temporalCoverage_fk` -> `temporal-coverage.temporalCoverage_pk` | `reference_fk` -> `reference.reference_pk` | `TemporalCoverage.hasReference` |

## Property -> column

`key` is the value for the `key` column of `ltc-dp-fields.csv`; blank means an ordinary field.
`ns` is the source namespace, which determines how the term IRI is resolved.
A relation shown as *junction* has no column on this table; see the junction inventory above.

### Address -> `address`

| Latimer Core term | ns | Column | Type | key | References | Req |
| -- | -- | -- | -- | -- | -- | -- |
| _(minted)_ | ltc | `address_pk` | string | pk | | Yes |
| `addressCountry` | schema | `addressCountry` | string | | | Yes |
| `addressLocality` | schema | `addressLocality` | string | | |  |
| `addressRegion` | schema | `addressRegion` | string | | |  |
| `addressType` | ltc | `addressType` | string | | |  |
| `hasIdentifier` | ltc | _junction_ | | | `address-identifier` |  |
| `postOfficeBoxNumber` | schema | `postOfficeBoxNumber` | string | | |  |
| `postalCode` | schema | `postalCode` | string | | |  |
| `streetAddress` | schema | `streetAddress` | string | | | Yes |

### ChronometricAge -> `chronometric-age`

| Latimer Core term | ns | Column | Type | key | References | Req |
| -- | -- | -- | -- | -- | -- | -- |
| _(minted)_ | ltc | `chronometricAge_pk` | string | pk | | Yes |
| `ObjectGroup.hasChronometricAge` | ltc | `objectGroup_fk` | string | fk | `object-group.objectGroup_pk` | |
| `chronometricAgeProtocol` | chrono | `chronometricAgeProtocol` | string | | |  |
| `chronometricAgeRemarks` | chrono | `chronometricAgeRemarks` | string | | |  |
| `chronometricAgeUncertaintyInYears` | chrono | `chronometricAgeUncertaintyInYears` | number | | |  |
| `earliestChronometricAge` | chrono | `earliestChronometricAge` | number | | |  |
| `earliestChronometricAgeReferenceSystem` | chrono | `earliestChronometricAgeReferenceSystem` | string | | |  |
| `hasIdentifier` | ltc | _junction_ | | | `chronometric-age-identifier` |  |
| `hasMeasurementOrFact` | ltc | _junction_ | | | `chronometric-age-measurement-or-fact` |  |
| `hasReference` | ltc | _junction_ | | | `chronometric-age-reference` |  |
| `latestChronometricAge` | chrono | `latestChronometricAge` | number | | |  |
| `latestChronometricAgeReferenceSystem` | chrono | `latestChronometricAgeReferenceSystem` | string | | |  |
| `verbatimChronometricAge` | chrono | `verbatimChronometricAge` | string | | |  |

### CollectionStatusHistory -> `collection-status-history`

| Latimer Core term | ns | Column | Type | key | References | Req |
| -- | -- | -- | -- | -- | -- | -- |
| _(minted)_ | ltc | `collectionStatusHistory_pk` | string | pk | | Yes |
| `ObjectGroup.hasCollectionStatusHistory` | ltc | `objectGroup_fk` | string | fk | `object-group.objectGroup_pk` | |
| `hasIdentifier` | ltc | _junction_ | | | `collection-status-history-identifier` |  |
| `hasMeasurementOrFact` | ltc | _junction_ | | | `collection-status-history-measurement-or-fact` |  |
| `hasReference` | ltc | _junction_ | | | `collection-status-history-reference` |  |
| `hasTemporalCoverage` | ltc | _junction_ | | | `collection-status-history-temporal-coverage` |  |
| `status` | ltc | `status` | string | | | Yes |
| `statusChangeReason` | ltc | `statusChangeReason` | string | | |  |
| `statusType` | ltc | `statusType` | string | | | Yes |

### ContactDetail -> `contact-detail`

| Latimer Core term | ns | Column | Type | key | References | Req |
| -- | -- | -- | -- | -- | -- | -- |
| _(minted)_ | ltc | `contactDetail_pk` | string | pk | | Yes |
| `contactDetailCategory` | ltc | `contactDetailCategory` | string | | | Yes |
| `contactDetailFunction` | ltc | `contactDetailFunction` | array | | |  |
| `contactDetailValue` | ltc | `contactDetailValue` | string | | | Yes |
| `hasIdentifier` | ltc | _junction_ | | | `contact-detail-identifier` |  |

### EcologicalContext -> `ecological-context`

| Latimer Core term | ns | Column | Type | key | References | Req |
| -- | -- | -- | -- | -- | -- | -- |
| _(minted)_ | ltc | `ecologicalContext_pk` | string | pk | | Yes |
| `biogeographicRealm` | ltc | `biogeographicRealm` | string | | |  |
| `biome` | ltc | `biome` | string | | |  |
| `biomeType` | ltc | `biomeType` | string | | |  |
| `bioregion` | ltc | `bioregion` | string | | |  |
| `ecoregion` | ltc | `ecoregion` | string | | |  |
| `ecosystem` | ltc | `ecosystem` | string | | |  |
| `habitat` | ltc | `habitat` | string | | |  |
| `hasIdentifier` | ltc | _junction_ | | | `ecological-context-identifier` |  |
| `hasMeasurementOrFact` | ltc | _junction_ | | | `ecological-context-measurement-or-fact` |  |
| `hasReference` | ltc | _junction_ | | | `ecological-context-reference` |  |

### Event -> `event`

| Latimer Core term | ns | Column | Type | key | References | Req |
| -- | -- | -- | -- | -- | -- | -- |
| _(minted)_ | ltc | `event_pk` | string | pk | | Yes |
| `ObjectGroup.hasEvent` | ltc | `objectGroup_fk` | string | fk | `object-group.objectGroup_pk` | |
| `hasParentEvent` | ltc | `parentEvent_fk` | string | fk | `event.event_pk` | |
| `eventName` | ltc | `eventName` | string | | |  |
| `hasEcologicalContext` | ltc | _junction_ | | | `event-ecological-context` |  |
| `hasGeographicContext` | ltc | _junction_ | | | `event-geographic-context` |  |
| `hasIdentifier` | ltc | _junction_ | | | `event-identifier` |  |
| `hasMeasurementOrFact` | ltc | _junction_ | | | `event-measurement-or-fact` |  |
| `hasPersonRole` | ltc | _junction_ | | | `event-person-role` |  |
| `hasReference` | ltc | _junction_ | | | `event-reference` |  |
| `hasTemporalCoverage` | ltc | _junction_ | | | `event-temporal-coverage` |  |
| `samplingProtocol` | dwc | `samplingProtocol` | array | | |  |
| `verbatimEventDate` | dwc | `verbatimEventDate` | string | | |  |

### GeographicContext -> `geographic-context`

| Latimer Core term | ns | Column | Type | key | References | Req |
| -- | -- | -- | -- | -- | -- | -- |
| _(minted)_ | ltc | `geographicContext_pk` | string | pk | | Yes |
| `continent` | dwc | `continent` | string | | |  |
| `country` | dwc | `country` | string | | |  |
| `countryCode` | dwc | `countryCode` | string | | |  |
| `county` | dwc | `county` | string | | |  |
| `hasIdentifier` | ltc | _junction_ | | | `geographic-context-identifier` |  |
| `hasMeasurementOrFact` | ltc | _junction_ | | | `geographic-context-measurement-or-fact` |  |
| `hasReference` | ltc | _junction_ | | | `geographic-context-reference` |  |
| `island` | dwc | `island` | string | | |  |
| `islandGroup` | dwc | `islandGroup` | string | | |  |
| `locality` | dwc | `locality` | string | | |  |
| `municipality` | dwc | `municipality` | string | | |  |
| `region` | ltc | `region` | string | | |  |
| `stateProvince` | dwc | `stateProvince` | string | | |  |
| `waterBody` | dwc | `waterBody` | string | | |  |
| `waterBodyType` | ltc | `waterBodyType` | string | | |  |

### GeologicalContext -> `geological-context`

| Latimer Core term | ns | Column | Type | key | References | Req |
| -- | -- | -- | -- | -- | -- | -- |
| _(minted)_ | ltc | `geologicalContext_pk` | string | pk | | Yes |
| `ObjectGroup.hasGeologicalContext` | ltc | `objectGroup_fk` | string | fk | `object-group.objectGroup_pk` | |
| `bed` | dwc | `bed` | string | | |  |
| `earliestAgeOrLowestStage` | dwc | `earliestAgeOrLowestStage` | string | | |  |
| `earliestEonOrLowestEonothem` | dwc | `earliestEonOrLowestEonothem` | string | | |  |
| `earliestEpochOrLowestSeries` | dwc | `earliestEpochOrLowestSeries` | string | | |  |
| `earliestEraOrLowestErathem` | dwc | `earliestEraOrLowestErathem` | string | | |  |
| `earliestPeriodOrLowestSystem` | dwc | `earliestPeriodOrLowestSystem` | string | | |  |
| `formation` | dwc | `formation` | string | | |  |
| `group` | dwc | `group` | string | | |  |
| `hasIdentifier` | ltc | _junction_ | | | `geological-context-identifier` |  |
| `hasMeasurementOrFact` | ltc | _junction_ | | | `geological-context-measurement-or-fact` |  |
| `hasReference` | ltc | _junction_ | | | `geological-context-reference` |  |
| `latestAgeOrHighestStage` | dwc | `latestAgeOrHighestStage` | string | | |  |
| `latestEonOrHighestEonothem` | dwc | `latestEonOrHighestEonothem` | string | | |  |
| `latestEpochOrHighestSeries` | dwc | `latestEpochOrHighestSeries` | string | | |  |
| `latestEraOrHighestErathem` | dwc | `latestEraOrHighestErathem` | string | | |  |
| `latestPeriodOrHighestSystem` | dwc | `latestPeriodOrHighestSystem` | string | | |  |
| `member` | dwc | `member` | string | | |  |
| `supergroup` | ltc | `supergroup` | string | | |  |

### Identifier -> `identifier`

| Latimer Core term | ns | Column | Type | key | References | Req |
| -- | -- | -- | -- | -- | -- | -- |
| _(minted)_ | ltc | `identifier_pk` | string | pk | | Yes |
| `hasReference` | ltc | _junction_ | | | `identifier-reference` |  |
| `identifierSource` | ltc | `identifierSource` | string | | |  |
| `identifierType` | ltc | `identifierType` | string | | | Yes |
| `identifierValue` | ltc | `identifierValue` | string | | | Yes |

### LatimerCoreScheme -> `latimer-core-scheme`

| Latimer Core term | ns | Column | Type | key | References | Req |
| -- | -- | -- | -- | -- | -- | -- |
| _(minted)_ | ltc | `latimerCoreScheme_pk` | string | pk | | Yes |
| `basisOfScheme` | ltc | `basisOfScheme` | string | | |  |
| `hasIdentifier` | ltc | _junction_ | | | `latimer-core-scheme-identifier` |  |
| `hasObjectGroup` | ltc | _junction_ | | | `latimer-core-scheme-object-group` |  |
| `hasReference` | ltc | _junction_ | | | `latimer-core-scheme-reference` |  |
| `hasSchemeMeasurementOrFact` | ltc | _FK on child_ | | | `scheme-measurement-or-fact.latimerCoreScheme_fk` |  |
| `hasSchemeTerm` | ltc | _FK on child_ | | | `scheme-term.latimerCoreScheme_fk` |  |
| `isDistinctObjects` | ltc | `isDistinctObjects` | boolean | | | Yes |
| `schemeName` | ltc | `schemeName` | string | | | Yes |

### MeasurementOrFact -> `measurement-or-fact`

| Latimer Core term | ns | Column | Type | key | References | Req |
| -- | -- | -- | -- | -- | -- | -- |
| _(minted)_ | ltc | `measurementOrFact_pk` | string | pk | | Yes |
| `hasIdentifier` | ltc | _junction_ | | | `measurement-or-fact-identifier` |  |
| `hasReference` | ltc | _junction_ | | | `measurement-or-fact-reference` |  |
| `measurementAccuracy` | dwc | `measurementAccuracy` | string | | |  |
| `measurementDerivation` | ltc | `measurementDerivation` | string | | |  |
| `measurementFactText` | ltc | `measurementFactText` | string | | |  |
| `measurementMethod` | dwc | `measurementMethod` | string | | |  |
| `measurementRemarks` | dwc | `measurementRemarks` | string | | |  |
| `measurementType` | dwc | `measurementType` | string | | |  |
| `measurementUnit` | dwc | `measurementUnit` | string | | |  |
| `measurementValue` | dwc | `measurementValue` | number | | |  |

### ObjectClassification -> `object-classification`

| Latimer Core term | ns | Column | Type | key | References | Req |
| -- | -- | -- | -- | -- | -- | -- |
| _(minted)_ | ltc | `objectClassification_pk` | string | pk | | Yes |
| `ObjectGroup.hasObjectClassification` | ltc | `objectGroup_fk` | string | fk | `object-group.objectGroup_pk` | |
| `hasParentObjectClassification` | ltc | `parentObjectClassification_fk` | string | fk | `object-classification.objectClassification_pk` | |
| `hasIdentifier` | ltc | _junction_ | | | `object-classification-identifier` |  |
| `hasMeasurementOrFact` | ltc | _junction_ | | | `object-classification-measurement-or-fact` |  |
| `hasReference` | ltc | _junction_ | | | `object-classification-reference` |  |
| `isTopParent` | ltc | `isTopParent` | boolean | | |  |
| `objectClassificationLevel` | ltc | `objectClassificationLevel` | string | | |  |
| `objectClassificationName` | ltc | `objectClassificationName` | string | | | Yes |

### ObjectGroup -> `object-group`

| Latimer Core term | ns | Column | Type | key | References | Req |
| -- | -- | -- | -- | -- | -- | -- |
| _(minted)_ | ltc | `objectGroup_pk` | string | pk | | Yes |
| `alternativeCollectionName` | ltc | `alternativeCollectionName` | array | | |  |
| `baseTypeOfObjectGroup` | ltc | `baseTypeOfObjectGroup` | array | | | Yes |
| `collectionManagementSystem` | ltc | `collectionManagementSystem` | array | | |  |
| `collectionName` | ltc | `collectionName` | string | | |  |
| `conditionsOfAccess` | ltc | `conditionsOfAccess` | array | | |  |
| `degreeOfEstablishment` | dwc | `degreeOfEstablishment` | array | | |  |
| `description` | ltc | `description` | string | | |  |
| `discipline` | ltc | `discipline` | array | | |  |
| `hasChronometricAge` | ltc | _FK on child_ | | | `chronometric-age.objectGroup_fk` |  |
| `hasCollectionStatusHistory` | ltc | _FK on child_ | | | `collection-status-history.objectGroup_fk` |  |
| `hasEcologicalContext` | ltc | _junction_ | | | `object-group-ecological-context` |  |
| `hasEvent` | ltc | _FK on child_ | | | `event.objectGroup_fk` |  |
| `hasGeographicContext` | ltc | _junction_ | | | `object-group-geographic-context` |  |
| `hasGeologicalContext` | ltc | _FK on child_ | | | `geological-context.objectGroup_fk` |  |
| `hasIdentifier` | ltc | _junction_ | | | `object-group-identifier` |  |
| `hasMeasurementOrFact` | ltc | _junction_ | | | `object-group-measurement-or-fact` |  |
| `hasObjectClassification` | ltc | _FK on child_ | | | `object-classification.objectGroup_fk` |  |
| `hasOrganisationalUnit` | ltc | _FK on child_ | | | `organisational-unit.objectGroup_fk` |  |
| `hasPersonRole` | ltc | _junction_ | | | `object-group-person-role` |  |
| `hasReference` | ltc | _junction_ | | | `object-group-reference` |  |
| `hasResourceRelationship` | ltc | _junction_ | | | `object-group-resource-relationship` |  |
| `hasStorageLocation` | ltc | _FK on child_ | | | `storage-location.objectGroup_fk` |  |
| `hasTaxon` | ltc | _FK on child_ | | | `taxon.objectGroup_fk` |  |
| `isCurrentCollection` | ltc | `isCurrentCollection` | boolean | | |  |
| `isKnownToContainTypes` | ltc | `isKnownToContainTypes` | boolean | | |  |
| `material` | ltc | `material` | array | | |  |
| `objectType` | ltc | `objectType` | array | | |  |
| `period` | ltc | `period` | array | | |  |
| `preparationType` | ltc | `preparationType` | array | | |  |
| `preservationMethod` | ltc | `preservationMethod` | array | | |  |
| `preservationMode` | ltc | `preservationMode` | array | | |  |
| `typeOfObjectGroup` | ltc | `typeOfObjectGroup` | array | | |  |

### OrganisationalUnit -> `organisational-unit`

| Latimer Core term | ns | Column | Type | key | References | Req |
| -- | -- | -- | -- | -- | -- | -- |
| _(minted)_ | ltc | `organisationalUnit_pk` | string | pk | | Yes |
| `ObjectGroup.hasOrganisationalUnit` | ltc | `objectGroup_fk` | string | fk | `object-group.objectGroup_pk` | |
| `hasParentOrganisationalUnit` | ltc | `parentOrganisationalUnit_fk` | string | fk | `organisational-unit.organisationalUnit_pk` | |
| `hasAddress` | ltc | _junction_ | | | `organisational-unit-address` |  |
| `hasContactDetail` | ltc | _junction_ | | | `organisational-unit-contact-detail` |  |
| `hasIdentifier` | ltc | _junction_ | | | `organisational-unit-identifier` |  |
| `hasMeasurementOrFact` | ltc | _junction_ | | | `organisational-unit-measurement-or-fact` |  |
| `hasPersonRole` | ltc | _junction_ | | | `organisational-unit-person-role` |  |
| `hasReference` | ltc | _junction_ | | | `organisational-unit-reference` |  |
| `organisationalUnitName` | ltc | `organisationalUnitName` | string | | | Yes |
| `organisationalUnitType` | ltc | `organisationalUnitType` | string | | | Yes |

### Person -> `person`

| Latimer Core term | ns | Column | Type | key | References | Req |
| -- | -- | -- | -- | -- | -- | -- |
| _(minted)_ | ltc | `person_pk` | string | pk | | Yes |
| `additionalName` | schema | `additionalName` | string | | |  |
| `familyName` | schema | `familyName` | string | | |  |
| `fullName` | abcd | `fullName` | string | | |  |
| `givenName` | schema | `givenName` | string | | |  |
| `hasAddress` | ltc | _junction_ | | | `person-address` |  |
| `hasContactDetail` | ltc | _junction_ | | | `person-contact-detail` |  |
| `hasIdentifier` | ltc | _junction_ | | | `person-identifier` |  |
| `hasMeasurementOrFact` | ltc | _junction_ | | | `person-measurement-or-fact` |  |
| `hasReference` | ltc | _junction_ | | | `person-reference` |  |

### PersonRole -> `person-role`

| Latimer Core term | ns | Column | Type | key | References | Req |
| -- | -- | -- | -- | -- | -- | -- |
| _(minted)_ | ltc | `personRole_pk` | string | pk | | Yes |
| `hasPerson` | ltc | `person_fk` | string | fk | `person.person_pk` | |
| `hasRole` | ltc | `role_fk` | string | fk | `role.role_pk` | |
| `hasAddress` | ltc | _junction_ | | | `person-role-address` |  |
| `hasContactDetail` | ltc | _junction_ | | | `person-role-contact-detail` |  |
| `hasIdentifier` | ltc | _junction_ | | | `person-role-identifier` |  |
| `hasMeasurementOrFact` | ltc | _junction_ | | | `person-role-measurement-or-fact` |  |
| `hasReference` | ltc | _junction_ | | | `person-role-reference` |  |
| `hasTemporalCoverage` | ltc | _junction_ | | | `person-role-temporal-coverage` |  |

### RecordLevel -> `record-level`

| Latimer Core term | ns | Column | Type | key | References | Req |
| -- | -- | -- | -- | -- | -- | -- |
| _(minted)_ | ltc | `recordLevel_pk` | string | pk | | Yes |
| `hasIdentifier` | ltc | _junction_ | | | `record-level-identifier` | Yes |
| `hasObjectGroup` | ltc | _junction_ | | | `record-level-object-group` |  |
| `hasPersonRole` | ltc | _junction_ | | | `record-level-person-role` |  |
| `hasReference` | ltc | _junction_ | | | `record-level-reference` |  |
| `hasResourceRelationship` | ltc | _junction_ | | | `record-level-resource-relationship` |  |
| `isDerivedCollection` | ltc | `isDerivedCollection` | boolean | | |  |
| `license` | dcterms | `license` | string | | | Yes |
| `rights` | dcterms | `rights` | string | | |  |
| `rightsHolder` | dcterms | `rightsHolder` | string | | |  |

### Reference -> `reference`

| Latimer Core term | ns | Column | Type | key | References | Req |
| -- | -- | -- | -- | -- | -- | -- |
| _(minted)_ | ltc | `reference_pk` | string | pk | | Yes |
| `hasIdentifier` | ltc | _junction_ | | | `reference-identifier` |  |
| `referenceDetails` | ltc | `referenceDetails` | string | | |  |
| `referenceName` | ltc | `referenceName` | string | | |  |
| `referenceType` | ltc | `referenceType` | string | | |  |
| `resourceIRI` | ltc | `resourceIRI` | string | | |  |

### ResourceRelationship -> `resource-relationship`

| Latimer Core term | ns | Column | Type | key | References | Req |
| -- | -- | -- | -- | -- | -- | -- |
| _(minted)_ | ltc | `resourceRelationship_pk` | string | pk | | Yes |
| `hasIdentifier` | ltc | _junction_ | | | `resource-relationship-identifier` |  |
| `hasMeasurementOrFact` | ltc | _junction_ | | | `resource-relationship-measurement-or-fact` |  |
| `hasReference` | ltc | _junction_ | | | `resource-relationship-reference` |  |
| `relatedResourceID` | dwc | `relatedResourceID` | string | | |  |
| `relatedResourceName` | ltc | `relatedResourceName` | string | | |  |
| `relatedResourceType` | ltc | `relatedResourceType` | string | | |  |
| `relationshipAccordingTo` | dwc | `relationshipAccordingTo` | array | | |  |
| `relationshipEstablishedDate` | dwc | `relationshipEstablishedDate` | string | | |  |
| `relationshipOfResource` | ltc | `relationshipOfResource` | string | | | Yes |
| `relationshipRemarks` | dwc | `relationshipRemarks` | string | | |  |
| `resourceID` | dwc | `resourceID` | string | | | Yes |

### Role -> `role`

| Latimer Core term | ns | Column | Type | key | References | Req |
| -- | -- | -- | -- | -- | -- | -- |
| _(minted)_ | ltc | `role_pk` | string | pk | | Yes |
| `hasIdentifier` | ltc | _junction_ | | | `role-identifier` |  |
| `roleName` | ltc | `roleName` | string | | |  |

### SchemeMeasurementOrFact -> `scheme-measurement-or-fact`

| Latimer Core term | ns | Column | Type | key | References | Req |
| -- | -- | -- | -- | -- | -- | -- |
| _(minted)_ | ltc | `schemeMeasurementOrFact_pk` | string | pk | | Yes |
| `LatimerCoreScheme.hasSchemeMeasurementOrFact` | ltc | `latimerCoreScheme_fk` | string | fk | `latimer-core-scheme.latimerCoreScheme_pk` | |
| `hasIdentifier` | ltc | _junction_ | | | `scheme-measurement-or-fact-identifier` |  |
| `hasReference` | ltc | _junction_ | | | `scheme-measurement-or-fact-reference` |  |
| `isMandatoryMetric` | ltc | `isMandatoryMetric` | boolean | | | Yes |
| `isRepeatableMetric` | ltc | `isRepeatableMetric` | boolean | | | Yes |
| `schemeMeasurementType` | ltc | `schemeMeasurementType` | string | | | Yes |

### SchemeTerm -> `scheme-term`

| Latimer Core term | ns | Column | Type | key | References | Req |
| -- | -- | -- | -- | -- | -- | -- |
| _(minted)_ | ltc | `schemeTerm_pk` | string | pk | | Yes |
| `LatimerCoreScheme.hasSchemeTerm` | ltc | `latimerCoreScheme_fk` | string | fk | `latimer-core-scheme.latimerCoreScheme_pk` | |
| `hasIdentifier` | ltc | _junction_ | | | `scheme-term-identifier` |  |
| `hasReference` | ltc | _junction_ | | | `scheme-term-reference` |  |
| `isMandatoryTerm` | ltc | `isMandatoryTerm` | boolean | | | Yes |
| `isRepeatableTerm` | ltc | `isRepeatableTerm` | boolean | | | Yes |
| `termName` | ltc | `termName` | string | | | Yes |

### StorageLocation -> `storage-location`

| Latimer Core term | ns | Column | Type | key | References | Req |
| -- | -- | -- | -- | -- | -- | -- |
| _(minted)_ | ltc | `storageLocation_pk` | string | pk | | Yes |
| `ObjectGroup.hasStorageLocation` | ltc | `objectGroup_fk` | string | fk | `object-group.objectGroup_pk` | |
| `hasParentStorageLocation` | ltc | `parentStorageLocation_fk` | string | fk | `storage-location.storageLocation_pk` | |
| `hasAddress` | ltc | _junction_ | | | `storage-location-address` |  |
| `hasIdentifier` | ltc | _junction_ | | | `storage-location-identifier` |  |
| `hasMeasurementOrFact` | ltc | _junction_ | | | `storage-location-measurement-or-fact` |  |
| `hasReference` | ltc | _junction_ | | | `storage-location-reference` |  |
| `locationDescription` | ltc | `locationDescription` | string | | |  |
| `locationName` | ltc | `locationName` | string | | | Yes |
| `locationType` | ltc | `locationType` | string | | |  |

### Taxon -> `taxon`

| Latimer Core term | ns | Column | Type | key | References | Req |
| -- | -- | -- | -- | -- | -- | -- |
| _(minted)_ | ltc | `taxon_pk` | string | pk | | Yes |
| `ObjectGroup.hasTaxon` | ltc | `objectGroup_fk` | string | fk | `object-group.objectGroup_pk` | |
| `genus` | dwc | `genus` | string | | |  |
| `hasIdentifier` | ltc | _junction_ | | | `taxon-identifier` |  |
| `hasMeasurementOrFact` | ltc | _junction_ | | | `taxon-measurement-or-fact` |  |
| `hasReference` | ltc | _junction_ | | | `taxon-reference` |  |
| `kingdom` | dwc | `kingdom` | string | | |  |
| `scientificName` | dwc | `scientificName` | string | | |  |
| `taxonRank` | dwc | `taxonRank` | string | | |  |

### TemporalCoverage -> `temporal-coverage`

| Latimer Core term | ns | Column | Type | key | References | Req |
| -- | -- | -- | -- | -- | -- | -- |
| _(minted)_ | ltc | `temporalCoverage_pk` | string | pk | | Yes |
| `hasMeasurementOrFact` | ltc | _junction_ | | | `temporal-coverage-measurement-or-fact` |  |
| `hasReference` | ltc | _junction_ | | | `temporal-coverage-reference` |  |
| `temporalCoverageEndDateTime` | ltc | `temporalCoverageEndDateTime` | string | | |  |
| `temporalCoverageStartDateTime` | ltc | `temporalCoverageStartDateTime` | string | | |  |
| `temporalCoverageType` | ltc | `temporalCoverageType` | string | | |  |

## Relation summary

97 relations: 81 as junction tables, 16 as direct foreign keys.

| Target class | Parent classes | Resolution |
| -- | -- | -- |
| `Identifier` | 23 | 23 junction tables |
| `Reference` | 21 | 21 junction tables |
| `MeasurementOrFact` | 15 | 15 junction tables |
| `Address` | 4 | 4 junction tables |
| `PersonRole` | 4 | 4 junction tables |
| `ContactDetail` | 3 | 3 junction tables |
| `TemporalCoverage` | 3 | 3 junction tables |
| `EcologicalContext` | 2 | 2 junction tables |
| `GeographicContext` | 2 | 2 junction tables |
| `ObjectGroup` | 2 | 2 junction tables |
| `ResourceRelationship` | 2 | 2 junction tables |
| `ChronometricAge` | 1 | direct FK on `chronometric-age` |
| `CollectionStatusHistory` | 1 | direct FK on `collection-status-history` |
| `Event` | 1 | direct FK on `event` + self-reference |
| `GeologicalContext` | 1 | direct FK on `geological-context` |
| `ObjectClassification` | 1 | direct FK on `object-classification` + self-reference |
| `OrganisationalUnit` | 1 | direct FK on `organisational-unit` + self-reference |
| `Person` | 1 | direct FK on `person-role` |
| `Role` | 1 | direct FK on `person-role` |
| `SchemeMeasurementOrFact` | 1 | direct FK on `scheme-measurement-or-fact` |
| `SchemeTerm` | 1 | direct FK on `scheme-term` |
| `StorageLocation` | 1 | direct FK on `storage-location` + self-reference |
| `Taxon` | 1 | direct FK on `taxon` |

Self-references: `event.parentEvent_fk`, `object-classification.parentObjectClassification_fk`, `organisational-unit.parentOrganisationalUnit_fk`, `storage-location.parentStorageLocation_fk`.

## Source data defects

Found while generating this mapping. Fix in `source/terms/` before the build is finalised.

| Class | Term | Issue |
| -- | -- | -- |
| Reference | `resourceIRI` | `ltc_datatypes.csv` still lists this as `abcd:resourceURI`; `ltc_terms_source.csv` has `ltc:resourceIRI`. Datatype assumed `string`. |
| ObjectClassification | `hasParentObjectClassification` | Not in `source/rs.tdwg.org/ltc.csv` (published there as `hasObjectClassification`). No IRI. |
| ResourceRelationship | `hasMeasurementOrFact` | Not in `source/rs.tdwg.org/ltc.csv`. No IRI. |
| ResourceRelationship | `relatedResourceType` | Not in `source/rs.tdwg.org/ltc.csv`. No IRI. |
| _(all)_ | `has*` | `tdwgutility_repeatable` is `No` on every `has*` property, contradicting both the definition ("one or more") and the `array<ltc:Class>` datatype. Under the child-table model the definition is authoritative; correct the source data to `Yes`. |

