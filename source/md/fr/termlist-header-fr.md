# Liste des termes du Latimer Core

**Titre**
: Liste des termes du Latimer Core

**Date de publication de la dernière mise à jour**
: 2024-02-28

**Date de création**
: 2024-02-28

**Fait partie du standard TDWG**
: <http://www.tdwg.org/standards/643>

**Cette version**
: <http://rs.tdwg.org/ltc/doc/list/2024-02-28>

**Dernière version**
: <http://rs.tdwg.org/ltc/doc/list/>

**Résumé**
: Le Latimer Core (LtC) est un standard de données conçu pour faciliter la représentation, la reconnaissance et la communication autour des collections de sciences naturelles. Un enregistrement Latimer Core peut représenter un groupement d'objets à n'importe quel niveau de granularité au-dessus du niveau d'un objet unique, depuis l'ensemble des collections d'une institution jusqu'à quelques objets dans un seul tiroir. Les classes du standard visent à permettre une représentation généralisée de toute collection donnée en fournissant un cadre dans lequel les caractéristiques déterminantes partagées par les objets de la collection peuvent être décrites. Parmi ces dernières, on retrouve leur couverture taxonomique, géographique, stratigraphique et temporelle. Le Latimer Core offre aussi un cadre permettant d'ajouter des mesures quantitatives et des faits pour aider à quantifier et à décrire les collections.

La création d'enregistrements au niveau des collection vise à promouvoir la visibilité et l'utilisation des éléments des collections qui, autrement, ne sont pas numérisés, en tout ou en partie, à un niveau de granularité satisfaisante. Ce document contient une liste d'attributs pour chaque terme du Latimer Core, y compris un IRI spécifique, un libellé français recommandé pour les interfaces utilisateur, une définition et quelques notes annexes.

**Contributeurs**
: Matt Woodburn, Kate Webbink, Janeen Jones, Sharon Grant, Deborah Paul, Maarten Trekels, Quentin Groom, Sarah Vincent, Gabi Droege, William Ulate, Mike Trizna, Niels Raes, Jutta Buschbom

**Créateur**
: TDWG Collection Descriptions (CD) Interest Group (Groupe d'intérêt TDWG sur les descriptions de collections)

**Référence bibliographique**
: Latimer Core Maintenance Group. 2022. Latimer Core List of Terms. Biodiversity Information Standards (TDWG). <http://rs.tdwg.org/ltc/doc/list/2024-02-28>

## 1 Introduction <span id="1-introduction"><span>
### 1.1 Statut du contenu de ce document <span id="11-status-of-the-content-of-this-document"></span>
Les sections 2 à 3 sont normatives, à l'exception du tableau 1. Dans la section 4 et ses sous-parties, les valeurs de  l'IRI du terme, Définition, Requis et Répétable sont normatives. La valeur de Usage (si elle existe pour un terme donné) est normative en ce sens qu'elle spécifie comment un terme emprunté doit être utilisé dans le cadre du Latimer Core. La valeur de Nom du Terme n'est pas normative, bien que l'on puisse s'attendre à ce que le préfixe de l'abréviation de l'espace de noms soit celui couramment utilisé pour l'espace de noms du terme. Les libellés et les valeurs de toutes les autres propriétés (telles que les notes) ne sont pas normatifs.

### 1.2 Mots clés RFC 2119 <span id="12-rfc-2119-key-words"></span>
Les mots clés "MUST/DOIT", "MUST NOT/NE DOIT PAS", "REQUIRED/OBLIGATOIRE", "SHALL/DEVRA", "SHALL NOT/NE DEVRA PAS", "SHOULD/DEVRAIT", "SHOULD NOT/NE DEVRAIT PAS", "RECOMMENDED/RECOMMANDÉ", "MAY/POURRAIT", et "OPTIONAL/OPTIONNEL" dans ce document doivent être interprétés comme décrit dans [RFC 2119](https://tools.ietf.org/html/rfc2119).

### 1.3 Catégories de termes <span id="13-categories-of-terms"></span>
Un enregistrement Latimer Core (LtC) est une description d'un groupe d'objets de collection utilisant les vocabulaires LtC. Elle est principalement axée sur la description des collections de sciences naturelles, mais pas exclusivement. Les termes utilisés dans ce document peuvent être répartis en plusieurs catégories.

**Termes décrivant la nature et le champ d'application des objets de la collection au sein du groupe.** Il s'agit d'un certain nombre de termes de la classe `ltc:ObjectGroup` et de classes associées qui fournissent des informations sur le champ d'application de la collection décrite, telles que les classes `ltc:GeographicOrigin`, `ltc:GeologicalContext` et `ltc:Taxon`. En raison de la nature potentiellement hétérogène des objets au sein d'un groupe donné, ces classes et termes seront souvent répétés dans un enregistrement LtC.

**Termes décrivant le groupe dans son ensemble.** Il s'agit de termes relatifs au groupe en tant qu'entité intégrée, correspondant au concept de « collection ». Ils comprennent des termes d'informations basiques dans la classe `ltc:ObjectGroup`, tels que `ltc:collectionName` et `ltc:description`, mais aussi des termes relatifs à la gestion, à l'accessibilité et au suivi de la collection, tels que la classe `ltc:CollectionHistory` et la propriété `ltc:conditionsOfAccess`. Il existe également un certain recoupement avec les termes génériques de la catégorie ci-dessous, dans l'association de personnes, d'institutions et d'autres unités organisationnelles avec les collections.

**Termes génériques et réutilisables qui peuvent être appliqués dans plusieurs contextes au sein du standard.** Le Latimer Core utilise une approche flexible pour la représentation des concepts qui peuvent s'appliquer à plus d'un contexte au sein de la classe. Par exemple, plutôt que de spécifier un terme distinct pour chaque type d'identifiant pertinent (pour les collections, les personnes, les organisations, les taxons et ainsi de suite), LtC dispose d'une classe générique `ltc:Identifier`. Le type d'identifiant est défini dans chaque instance de la classe à l'aide de la propriété `ltc:identifierType`. L'objet auquel il se rapporte (comme une instance de `ltc:Person` ou de `ltc:OrganisationalUnit`) est défini par l'association avec ces identifiants dans le jeu de données. Une approche similaire s'applique aux autres classes de LtC, notamment `ltc:Address`, `ltc:ContactDetail` et `ltc:OrganisationalUnit`. De même, `ltc:Person` est réutilisable, mais utilise la classe `ltc:PersonRole` en conjonction avec la classe `ltc:Role` pour associer la personne à des instances d'autres classes dans un contexte de rôle particulier (par exemple, ' Collecteur ', ' Créateur d'enregistrements ').

**Termes fournissant des métadonnées directement exploitables par ordinateur sur l'enregistrement LtC.** Ces termes se trouvent principalement dans la classe `ltc:RecordLevel`, et sont destinés à soutenir la publication des enregistrements de la CT en tant que données FAIR (Facile à trouver, Accessibles, Interopérables et Réutilisables). Il s'agit notamment de la prise en charge des licences et des droits (`dcterms:license`, `dcterms:rights` et `dcterms:rightsHolder`). La classe `ltc:LatimerCoreScheme` entre également dans cette catégorie et vise à fournir un mécanisme pour regrouper les enregistrements LtC sous un gabarit commun qui permettent aux données d'être agrégées et validées de manière appropriée.

## 2 Vocabulaire emprunté <span id="2-borrowed-vocabulary"></span>
Lorsque des termes sont empruntés à d'autres vocabulaires, le LtC utilise les IRI, les abréviations courantes et les préfixes d'espace de noms en vigueur dans ces vocabulaires. Les IRI sont normatifs, mais les abréviations et les préfixes d'espace de noms n'ont aucun effet, si ce n'est de faciliter la lecture de la documentation.

Tableau 1. Vocabulaires desquels des termes ont été empruntés (non-normatif)

| Vocabulaire | Abréviation | Espaces de noms et Abréviation |
|------------|--------------|------------------------------|
| [Darwin Core](https://dwc.tdwg.org/terms/) | DwC         | `dwc: = http://rs.tdwg.org/dwc/terms/`
| [Darwin Core Chronometric Age Vocabulary](https://tdwg.github.io/chrono/) | Chrono         | `chrono: = http://rs.tdwg.org/chrono/terms/`
| [Dublin Core](http://dublincore.org/documents/dcmi-terms/) | DC          | `dcterms: = http://purl.org/dc/terms/` |
| [Schema.org](https://schema.org/) | Schema      | `schema: =  https://schema.org/` |
| [Access to Biological Collection Data](https://abcd.tdwg.org/) | ABCD | `abcd: = http://rs.tdwg.org/abcd/terms/` |

## 3 Espaces de noms, préfixes et noms de termes <span id="3-namespace-prefixes-term-names"></span>
L'espace de noms des termes empruntés à d'autres vocabulaires est celui de la source. L'espace de noms des termes LtC originaux est http://rs.tdwg.org/ltc/terms/. Dans la tableau des termes, chaque entrée de terme comporte une ligne avec le nom du terme. Ce nom de terme est généralement un « nom non qualifié » précédé d'un préfixe largement accepté désignant une abréviation de l'espace de noms. Il est RECOMMANDÉ aux utilisateurs qui ont besoin d'un préfixe d'espace de noms pour l'espace de noms LtC d'utiliser ltc. Dans ce document, le survol d'un terme dans l'[Index des Termes](https://ltc.tdwg.org/termlist/#index-by-term-name) ci-dessous révélera une URL complète qui peut être utilisée dans d'autres documents web pour établir un lien avec le traitement de ce terme dans ce document, même s'il provient d'un vocabulaire emprunté. Il est très important de noter que certains vocabulaires, par exemple ceux de la [Dublin Core Metadata Initiative (DCMI)](http://dublincore.org/), fournissent des versions du même terme dans deux espaces de noms différents, l'un fournissant des valeurs sous forme de chaînes de caractères et l'autre des IRI, même lorsque cette distinction n'est qu'une simple recommandation et non une obligation. Voir cette [entrée du wiki DCMI](https://web.archive.org/web/20171126043657/https://github.com/dcmi/repository/blob/master/mediawiki_wiki/FAQ/DC_and_DCTERMS_Namespaces.md) à ce sujet.