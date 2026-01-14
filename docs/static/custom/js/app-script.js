// App Utility Script
// 20241204

$(document).ready(function () {
	// Help popovers for SKOS terms
	$('[data-bs-toggle="popover"]').popover({
		trigger: 'click',
		container: '.popover-container',
		placement: 'top',
		customClass: 'help-popover',
		html: true
	});
	$('[data-bs-toggle="popover"]').click(function (e) {
		e.stopPropagation();
	});
	$('a.poplink').click(function (e) {
		e.preventDefault();
	});
	$(document).click(function (e) {
		if (($('.popover').has(e.target).length == 0) || $(e.target).is('.close')) {
			$('[data-bs-toggle="popover"]').popover('hide');
		}
	});

	// Initialize Mermaid E-R Diagrams
	mermaid.initialize({
		theme: 'forest',
		securityLevel: 'loose',
		startOnLoad: false
	});
	// Master Class Diagram
	const drawMasterClassDiagram = async () => {
		const element = document.querySelector('#masterClassDiagram');
		const graphDefinition = `
		 classDiagram
			direction TB
			class Address{
				addressType : string
				hasIdentifier : array
				addressCountry : string
				addressLocality : string
				addressRegion : string
				postalCode : string
				postOfficeBoxNumber : string
				streetAddress : string
			}
			class ChronometricAge{
				hasIdentifier : array
				hasMeasurementOrFact : array
				hasReference : array
				chronometricAgeProtocol : string
				chronometricAgeRemarks : string
				chronometricAgeUncertaintyInYears : number
				earliestChronometricAge : number
				earliestChronometricAgeReferenceSystem : string
				latestChronometricAge : number
				latestChronometricAgeReferenceSystem : string
				verbatimChronometricAge : string
			}
			class CollectionStatusHistory{
				hasIdentifier : array
				hasMeasurementOrFact : array
				hasReference : array
				hasTemporalCoverage : array
				status : string
				statusChangeReason : string
				statusType : string
			}
			class ContactDetail{
				contactDetailCategory : string
				contactDetailFunction : list
				contactDetailValue : string
				hasIdentifier : array
			}
			class EcologicalContext{
				biogeographicRealm : string
				biome : string
				biomeType : string
				bioregion : string
				ecoregion : string
				ecosystem : string
				habitat : string
				hasIdentifier : array
				hasMeasurementOrFact : array
				hasReference : array
			}
			class Event{
				eventName : string
				hasEcologicalContext : array
				hasGeographicContext : array
				hasIdentifier : array
				hasMeasurementOrFact : array
				hasParentEvent : array
				hasPersonRole : array
				hasReference : array
				hasTemporalCoverage : array
				samplingProtocol : list
				verbatimEventDate : string
			}
			class GeographicContext{
				hasIdentifier : array
				hasMeasurementOrFact : array
				hasReference : array
				region : string
				waterBodyType : string
				continent : string
				country : string
				countryCode : string
				county : string
				island : string
				islandGroup : string
				locality : string
				municipality : string
				stateProvince : string
				waterBody : string
			}
			class GeologicalContext{
				hasIdentifier : array
				hasMeasurementOrFact : array
				hasReference : array
				supergroup : string
				bed : string
				earliestAgeOrLowestStage : string
				earliestEonOrLowestEonothem : string
				earliestEpochOrLowestSeries : string
				earliestEraOrLowestErathem : string
				earliestPeriodOrLowestSystem : string
				formation : string
				group : string
				latestAgeOrHighestStage : string
				latestEonOrHighestEonothem : string
				latestEpochOrHighestSeries : string
				latestEraOrHighestErathem : string
				latestPeriodOrHighestSystem : string
				member : string
			}
			class Identifier{
				hasReference : array
				identifierSource : string
				identifierType : string
				identifierValue : string
			}
			class LatimerCoreScheme{
				basisOfScheme : string
				hasIdentifier : array
				hasObjectGroup : array
				hasReference : array
				hasSchemeMeasurementOrFact : array
				hasSchemeTerm : array
				isDistinctObjects : boolean
				schemeName : string
			}
			class MeasurementOrFact{
				hasIdentifier : array
				hasReference : array
				measurementDerivation : string
				measurementFactText : string
				measurementAccuracy : string
				measurementMethod : string
				measurementRemarks : string
				measurementType : string
				measurementUnit : string
				measurementValue : number
			}
			class ObjectClassification{
				hasIdentifier : array
				hasMeasurementOrFact : array
				hasObjectClassification : array
				hasReference : array
				isTopParent : boolean
				objectClassificationLevel : string
				objectClassificationName : string
			}
			class ObjectGroup{
				alternativeCollectionName : list
				baseTypeOfObjectGroup : list
				collectionManagementSystem : list
				collectionName : string
				conditionsOfAccess : list
				description : string
				discipline : list
				hasChronometricAge : array
				hasCollectionStatusHistory : array
				hasEcologicalContext : array
				hasEvent : array
				hasGeographicContext : array
				hasGeologicalContext : array
				hasIdentifier : array
				hasMeasurementOrFact : array
				hasObjectClassification : array
				hasOrganisationalUnit : array
				hasPersonRole : array
					hasReference : array
					hasResourceRelationship : array
					hasStorageLocation : array
					hasTaxon : array
					isCurrentCollection : boolean
					isKnownToContainTypes : boolean
					material : list
					objectType : list
					period : list
					preparationType : list
					preservationMethod : list
					preservationMode : list
					typeOfObjectGroup : list
					degreeOfEstablishment : list
				}
				class OrganisationalUnit{
				hasAddress : array
				hasContactDetail : array
				hasIdentifier : array
				hasMeasurementOrFact : array
				hasParentOrganisationalUnit : array
				hasPersonRole : array
				hasReference : array
				organisationalUnitName : string
				organisationalUnitType : string
			}
			class Person{
				hasAddress : array
				hasContactDetail : array
				hasIdentifier : array
				hasMeasurementOrFact : array
				hasReference : array
				additionalName : string
				familyName : string
				givenName : string
				fullName : string
			}
			class PersonRole{
				hasAddress : array
				hasContactDetail : array
				hasIdentifier : array
				hasMeasurementOrFact : array
				hasPerson : array
				hasReference : array
				hasRole : array
				hasTemporalCoverage : array
			}
			class RecordLevel{
				hasIdentifier : array
				hasObjectGroup : array
				hasPersonRole : array
				hasReference : array
				hasResourceRelationship : array
				isDerivedCollection : boolean
				license : string
				rights : string
				rightsHolder : string
			}
			class Reference{
				hasIdentifier : array
				referenceDetails : string
				referenceName : string
				referenceType : string
				resourceURI : string
			}
			class ResourceRelationship{
				hasIdentifier : array
				hasReference : array
				relatedResourceName : string
				relationshipOfResource : string
				relatedResourceID : string
				relationshipAccordingTo : list
				relationshipEstablishedDate : string
				relationshipRemarks : string
				resourceID : string
			}
			class Role{
				hasIdentifier : array
				roleName : string
			}
			class SchemeMeasurementOrFact{
				hasIdentifier : array
				hasReference : array
				isMandatoryMetric : boolean
				isRepeatableMetric : boolean
				schemeMeasurementType : string
			}
			class SchemeTerm{
				hasIdentifier : array
				hasReference : array
				isMandatoryTerm : boolean
				isRepeatableTerm : boolean
				termName : string
			}
			class StorageLocation{
				hasAddress : array
				hasIdentifier : array
				hasMeasurementOrFact : array
				hasParentStorageLocation : array
				hasReference : array
				locationDescription : string
				locationName : string
				locationType : string
			}
			class Taxon{
				hasIdentifier : array
				hasMeasurementOrFact : array
				hasReference : array
				genus : string
				kingdom : string
				scientificName : string
				taxonRank : string
			}
			class TemporalCoverage{
				hasMeasurementOrFact : array
				hasReference : array
				temporalCoverageEndDateTime : string
				temporalCoverageStartDateTime : string
				temporalCoverageType : string
			}
			Address -- Identifier
			ChronometricAge -- Identifier
			ChronometricAge -- MeasurementOrFact
			ChronometricAge -- Reference
			CollectionStatusHistory -- Identifier
			CollectionStatusHistory -- MeasurementOrFact
			CollectionStatusHistory -- Reference
			CollectionStatusHistory -- TemporalCoverage
			ContactDetail -- Identifier
			EcologicalContext -- Identifier
			EcologicalContext -- MeasurementOrFact
			EcologicalContext -- Reference
			Event -- EcologicalContext
			Event -- GeographicContext
			Event -- Identifier
			Event -- MeasurementOrFact
			Event -- Event : Parent
			Event -- PersonRole
			Event -- Reference
			Event -- TemporalCoverage
			GeographicContext -- Identifier
			GeographicContext -- MeasurementOrFact
			GeographicContext -- Reference
			GeologicalContext -- Identifier
			GeologicalContext -- MeasurementOrFact
			GeologicalContext -- Reference
			Identifier -- Reference
			LatimerCoreScheme -- Identifier
			LatimerCoreScheme -- ObjectGroup
			LatimerCoreScheme -- Reference
			LatimerCoreScheme -- SchemeMeasurementOrFact
			LatimerCoreScheme -- SchemeTerm
			MeasurementOrFact -- Identifier
			MeasurementOrFact -- Reference
			ObjectClassification -- Identifier
			ObjectClassification -- MeasurementOrFact
			ObjectClassification -- ObjectClassification
			ObjectClassification -- Reference
			ObjectGroup -- ChronometricAge
			ObjectGroup -- CollectionStatusHistory
			ObjectGroup -- EcologicalContext
			ObjectGroup -- Event
			ObjectGroup -- GeographicContext
			ObjectGroup -- GeologicalContext
			ObjectGroup -- Identifier
			ObjectGroup -- MeasurementOrFact
			ObjectGroup -- ObjectClassification
			ObjectGroup -- OrganisationalUnit
			ObjectGroup -- PersonRole
			ObjectGroup -- Reference
			ObjectGroup -- ResourceRelationship
			ObjectGroup -- StorageLocation
			ObjectGroup -- Taxon
			OrganisationalUnit -- Address
			OrganisationalUnit -- ContactDetail
			OrganisationalUnit -- Identifier
			OrganisationalUnit -- MeasurementOrFact
			OrganisationalUnit -- OrganisationalUnit : Parent-Child
			OrganisationalUnit -- PersonRole
			OrganisationalUnit -- Reference
			Person -- Address
			Person -- ContactDetail
			Person -- Identifier
			Person -- MeasurementOrFact
			Person -- Reference
			PersonRole -- Address
			PersonRole -- ContactDetail
			PersonRole -- Identifier
			PersonRole -- MeasurementOrFact
			PersonRole -- Person
			PersonRole -- Reference
			PersonRole -- Role
			PersonRole -- TemporalCoverage
			RecordLevel -- Identifier
			RecordLevel -- ObjectGroup
			RecordLevel -- PersonRole
			RecordLevel -- Reference
			RecordLevel -- ResourceRelationship
			Reference -- Identifier
			ResourceRelationship -- Identifier
			ResourceRelationship -- Reference
			Role -- Identifier
			SchemeMeasurementOrFact -- Identifier
			SchemeMeasurementOrFact -- Reference
			SchemeTerm -- Identifier
			SchemeTerm -- Reference
			StorageLocation -- Address
			StorageLocation -- Identifier
			StorageLocation -- MeasurementOrFact
			StorageLocation -- StorageLocation : Parent
			StorageLocation -- Reference
			Taxon -- Identifier
			Taxon -- MeasurementOrFact
			Taxon -- Reference
			TemporalCoverage -- MeasurementOrFact
			TemporalCoverage -- Reference
		`;
		const { svg } = await mermaid.render('masterClassSvg', graphDefinition);
		element.innerHTML = svg;
		// Initialize svg-pan-zoom on the generated SVG element
		svgPanZoom('#masterClassSvg', {
			zoomEnabled: true,
			panEnabled: true,
			controlIconsEnabled: true, // Optionally show default controls
		});
	};
	drawMasterClassDiagram();

	// Object Group Class Diagram
	const drawObjectGroupClassDiagram = async () => {
		const element = document.querySelector('#objectGroupClassDiagram');
		const graphDefinition = `
		classDiagram
			class ChronometricAge {
				hasIdentifier : array
				hasMeasurementOrFact : array
				hasReference : array
				chronometricAgeProtocol : string
				chronometricAgeRemarks : string
				chronometricAgeUncertaintyInYears : number
				earliestChronometricAge : number
				earliestChronometricAgeReferenceSystem : string
				latestChronometricAge : number
				latestChronometricAgeReferenceSystem : string
				verbatimChronometricAge : string
			}
			class EcologicalContext {
				biogeographicRealm : string
				biome : string
				biomeType : string
				bioregion : string
				ecoregion : string
				ecosystem : string
				habitat : string
				hasIdentifier : array
				hasMeasurementOrFact : array
				hasReference : array
			}
			class GeographicContext{
				hasIdentifier : array
				hasMeasurementOrFact : array
				hasReference : array
				region : string
				waterBodyType : string
				continent : string
				country : string
				countryCode : string
				county : string
				island : string
				islandGroup : string
				locality : string
				municipality : string
				stateProvince : string
				waterBody : string
			}
			class GeologicalContext{
				hasIdentifier : array
				hasMeasurementOrFact : array
				hasReference : array
				supergroup : string
				bed : string
				earliestAgeOrLowestStage : string
				earliestEonOrLowestEonothem : string
				earliestEpochOrLowestSeries : string
				earliestEraOrLowestErathem : string
				earliestPeriodOrLowestSystem : string
				formation : string
				group : string
				latestAgeOrHighestStage : string
				latestEonOrHighestEonothem : string
				latestEpochOrHighestSeries : string
				latestEraOrHighestErathem : string
				latestPeriodOrHighestSystem : string
				member : string
			}
			class ObjectClassification{
				hasIdentifier : array
				hasMeasurementOrFact : array
				hasObjectClassification : array
				hasReference : array
				isTopParent : boolean
				objectClassificationLevel : string
				objectClassificationName : string
			}
			class ObjectGroup {
				alternativeCollectionName : list
				baseTypeOfObjectGroup : list
				collectionManagementSystem : list
				collectionName : string
				conditionsOfAccess : list
				description : string
				discipline : list
				hasChronometricAge : array
				hasCollectionStatusHistory : array
				hasEcologicalContext : array
				hasEvent : array
				hasGeographicContext : array
				hasGeologicalContext : array
				hasIdentifier : array
				hasMeasurementOrFact : array
				hasObjectClassification : array
				hasOrganisationalUnit : array
				hasPersonRole : array
				hasReference : array
				hasResourceRelationship : array
				hasStorageLocation : array
				hasTaxon : array
				isCurrentCollection : boolean
				isKnownToContainTypes : boolean
				material : list
				objectType : list
				period : list
				preparationType : list
				preservationMethod : list
				preservationMode : list
				typeOfObjectGroup : list
				degreeOfEstablishment : list
			}
			class Taxon {
				hasIdentifier : array
				hasMeasurementOrFact : array
				hasReference : array
				genus : string
				kingdom : string
				scientificName : string
				taxonRank : string
			}
			ObjectGroup -- ObjectClassification
			ObjectGroup -- ChronometricAge
			ObjectGroup -- EcologicalContext
			ObjectGroup -- GeologicalContext
			ObjectGroup -- ObjectClassification
			ObjectGroup -- GeographicContext
			ObjectGroup -- Taxon
		`;
		const { svg } = await mermaid.render('objectGroupClassSvg', graphDefinition);
		element.innerHTML = svg;
		// Initialize svg-pan-zoom on the generated SVG element
		svgPanZoom('#objectGroupClassSvg', {
			zoomEnabled: true,
			panEnabled: true,
			controlIconsEnabled: true, // Optionally show default controls
		});
	};
	drawObjectGroupClassDiagram();

	// ObjectGroup Entity-Relationship Diagram
	const drawObjectGroupERDiagram = async () => {
		const element = document.querySelector('#objectGroupERDiagram');
		const graphDefinition = `
		erDiagram
			 ObjectGroup ||--o{ ResourceRelationship : Has
			 Identifier ||--o{ Reference : Has
			 Reference ||--o{ Identifier : Has
			 MeasurementOrFact ||--o{ Identifier : Has
			 MeasurementOrFact ||--o{ Reference : Has
			 LatimerCoreScheme ||--o{ Identifier : Has
			 LatimerCoreScheme ||--o{ ObjectGroup : Has
			 LatimerCoreScheme ||--o{ Reference : Has
			 LatimerCoreScheme ||--o{ SchemeMeasurementOrFact : Has
			 LatimerCoreScheme ||--o{ SchemeTerm : Has
			 RecordLevel ||--o{ Identifier : Has
			 RecordLevel ||--o{ ObjectGroup : Has
			 RecordLevel ||--o{ Reference : Has
			 RecordLevel ||--o{ ResourceRelationship : Has
			 ResourceRelationship ||--o{ Identifier : Has
			 ResourceRelationship ||--o{ Reference : Has
		`;
		const { svg } = await mermaid.render('objectGroupERSvg', graphDefinition);
		element.innerHTML = svg;
		// Initialize svg-pan-zoom on the generated SVG element
		svgPanZoom('#objectGroupERSvg', {
			zoomEnabled: true,
			panEnabled: true,
			controlIconsEnabled: true, // Optionally show default controls
		});
	};
	drawObjectGroupERDiagram();






});