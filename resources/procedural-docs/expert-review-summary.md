# Latimer Core: Expert Review Summary

Author: Ben Norton
Document Version: 20231103
Approved on 20231128


## Summary

In adherence with the normative TDWG review processes documentation, the purpose of this document is to provide the following information as a single package:

1. Detailed descriptions regarding the procedures and outcomes of the Latimer Core expert review process
2. Provide a post-review category recommendation to the TDWG executive board [https://www.tdwg.org/about/review-managers/](https://www.tdwg.org/about/review-managers/))

In addition to the requirements listed above, this document provides insight into necessary changes made to the review process during the review and additional information regarding potential opportunities and areas of improvement for future reviews.


## Parts of the Standard

The Latimer Core Standard (LtC) is comprised of the following normative document: [https://tdwg.github.io/ltc/terms/](https://tdwg.github.io/ltc/terms/index.html)


## Latimer Core Overview


 > The Latimer Core (LtC) schema, named after[ Marjorie Courtenay-Latimer](https://en.wikipedia.org/wiki/Marjorie_Courtenay-Latimer), is a standard designed to support the representation and discovery of natural science collections by structuring data about the[ groups of objects](https://github.com/tdwg/cd/wiki/2.4-Core-elements-of-the-standard#the-objectgroup-concept) that those collections and their subcomponents encompass. The classes and properties (collectively terms) aim to represent information that describes these groupings in enough detail to inform deeper discovery of the resources contained within them._

<p style="text-align: right">
<em><a href="https://github.com/tdwg/cd/wiki">https://github.com/tdwg/cd/wiki</a></em></p>


Latimer Core is one of the largest and most complex standards submitted for ratification. For context, the following table compares Latimer Core with other recently ratified TDWG standards (or in the final stages of ratification).


#### Table 1. Quick Statistics


<table>
  <tr>
   <td>Latimer Core
   </td>
   <td>Number of Classes
   </td>
   <td>25
   </td>
  </tr>
  <tr>
   <td>Latimer Core
   </td>
   <td>Number of Terms
   </td>
   <td>252
   </td>
  </tr>
  <tr>
   <td>Humboldt Extension
   </td>
   <td>Number of Classes
   </td>
   <td>1
   </td>
  </tr>
  <tr>
   <td>Humboldt Extension
   </td>
   <td>Number of Terms
   </td>
   <td>54
   </td>
  </tr>
  <tr>
   <td>Chronometric Age
   </td>
   <td>Number of Classes
   </td>
   <td>1
   </td>
  </tr>
  <tr>
   <td>Chronometric Age
   </td>
   <td>Number of Terms
   </td>
   <td>22
   </td>
  </tr>
  <tr>
   <td>Audiovisual Core
   </td>
   <td>Number of Classes
   </td>
   <td>11 *
   </td>
  </tr>
  <tr>
   <td>Audiovisual Core
   </td>
   <td>Number of Terms
   </td>
   <td>144
   </td>
  </tr>
</table>



######
*_Referred to as Vocabularies in Audiovisual Core ([https://ac.tdwg.org/termlist/](https://ac.tdwg.org/termlist/))_


## Process

According to the normative TDWG review documentation ([https://www.tdwg.org/about/process/](https://www.tdwg.org/about/process/)), expert review processes operate similarly to the peer review of scientific journal publications. A group of anonymous reviewers evaluates a submission independently and then provides feedback in written form to the editorial staff. This process model was designed to review standards smaller in size and scope  (see Table 1) to Latimer Core. At the onset of the expert review, it became apparent that this process model needed to be revised for the Latimer Core review. The review team opted for an alternate approach that maintains the current review criteria  ([https://www.tdwg.org/about/review-managers/](https://www.tdwg.org/about/review-managers/)) but, in a way, is more suited to large, more complex standards requiring more extended review.

Instead of reviewing the 25 classes and 252 terms individually, the Latimer Core standard was divided into thematic groupings of 1-6 classes, and each group was evaluated as a unit, analogous to a review of several small standards instead of one large one. Each group was reviewed in regularly scheduled bi-weekly review sessions. To structure and ensure the review was completed in an orderly and timely fashion, the review of the next group was allowed to begin once the current review was complete.

In each session, the LtC team would provide a detailed walkthrough of the classes and terms belonging to the target grouping. The expert reviewers would pose questions and make recommendations when appropriate throughout the meeting. The LtC team leveraged the GitHub issue tracking system in the Collections Description standard repository to track these recommendations. The group determined that it was more efficient to tackle recommendations as they were created instead of waiting until the conclusion of all the review sessions. This decision kept the review process on schedule, and both groups engaged, both of which are critical to mitigate the risk of reviewer fatigue. Once all sessions were complete, a final recommendation to proceed to public review was contingent upon an audit of the normative review criteria as described in the TDWG documentation (see [https://www.tdwg.org/about/review-managers/#22-review-criteria](https://www.tdwg.org/about/review-managers/#22-review-criteria)) with the following additional criteria associated with the alternate review process.



1. The issue tracking system records all recommended revisions during the review sessions.
2. All GitHub issues were addressed and subsequently closed upon confirmation from the expert reviewers.


#### Additional Opportunities

We recognize the opportunity to extend the review process to accommodate better future work of standards of similar scope and scale as Latimer Core. Detailed documentation of a generalized version of this alternate strategy is outside the scope of this document. Instead, it will be forthcoming in a separate deliverable in early 2024.


## Recommendation

In October 2023, the expert review team confirmed that the LtC team had satisfied all review criteria. The review team recommends that the ratification of Latimer Core advance to the next stage, pending confirmation by the TDWG executive committee, followed by the public review (see Figure 1).


## Appendices

## 1. New Components

Several new standardized components are introduced with the Latimer Core Standard. These are listed below and are directly integrated into the LtC documentation web pages. Further details can be found in the standard documentation.

1. _Data types_ - Terms are assigned a data type, including arrays
2. _SKOS Mappings_ - Using the Simple Standard for Sharing Ontological Mappings (SSSOM) specification, SKOS mappings are provided for most terms in LtC and presented on the documentation Terms page.
3. _Class association_ - _Belongs to Class_ field that indicates the parent class of the property. In LtC, several terms are repeated and scoped to a particular class.
4. _Exploration _- The LtC team created multiple visual exploration tools for users to improve and ease their understanding of the standard and to facilitate implementation following ratification (See exploratory tools below).


## 2. Conventions

**Expert Reviewers**: Group that consists of the review manager, two expert reviews, and a special consultant (_see Expert Review Team under Appendix 5. Review Participants_)

**Latimer Core Team**: Refers to the group of core members and conveners that participated in the review as representatives of the standard. See _Appendix 5. Review Participants_ for a list of names with contact information.

**LtC:** Abbreviation form of  Latimer Core Standard

**SSSOM**: Simple Standard for Sharing Ontological Mappings ([https://mapping-commons.github.io/sssom/](https://mapping-commons.github.io/sssom/))

**TDWG:** Biodiversity Information Standards ([https://www.tdwg.org/](https://www.tdwg.org/))


## 3. Resources
| Resource Name | URL |
| -- | -- |
| Latimer Core Repository | [https://github.com/tdwg/ltc](https://github.com/tdwg/ltc) |
| Latimer Core Documentation Webpages | [https://tdwg.github.io/ltc/](https://tdwg.github.io/ltc/) |
| Latimer Core Wiki | [https://github.com/tdwg/ltc/wiki](https://github.com/tdwg/ltc/wiki) |
| Collections Description Standard Repository | [https://github.com/tdwg/cd/](https://github.com/tdwg/cd/) |
| Power BI | [Power BI Visualization](https://app.powerbi.com/view?r=eyJrIjoiZTAwZjQ0NzItNDIxMy00OGNiLTk0ZDQtZDUyMzRhZDM2MWMzIiwidCI6IjczYTI5YzAxLTRlNzgtNDM3Zi1hMGQ0LWM4NTUzZTE5NjBjMSIsImMiOjh9) |
| Linktree | [https://linktr.ee/TDWG_LatimerCore](https://linktr.ee/TDWG_LatimerCore) |

| Process | Resource |
| -- | -- |
| Expert Review Issues | [https://github.com/tdwg/cd/issues?q=is%3Aissue+label%3Areview+](https://github.com/tdwg/cd/issues?q=is%3Aissue+label%3Areview+) |
| Dicussion Forum | [https://github.com/tdwg/ltc/discussions](https://github.com/tdwg/ltc/discussions) |
| Public Review Issues | [https://github.com/tdwg/ltc/issues?q=is%3Aissue+label%3A%22Public+Review%22+](https://github.com/tdwg/ltc/issues?q=is%3Aissue+label%3A%22Public+Review%22+) |




## 4. Review Participants

### Expert Review Team
Ben Norton
Review Manager
Informatics and Technology Consultant
[michaelnorton.ben@gmail.com](mailto:michaelnorton.ben@gmail.com)

Robert Sanderson
Expert Reviewer
Yale Peabody Museum
[robert.sanderson@yale.edu](mailto:robert.sanderson@yale.edu)

Ian Engelbrecht
Expert Reviewer
Natural Science Collections Facility, South Africa
[ian@nscf.org.za](mailto:ian@nscf.org.za)


### Latimer Core Team
Sharon Grant
Field Museum, Chicago
[@rondlg](https://github.com/rondlg)

Janeen Jones
Field Museum, Chicago
[@fmjjones](https://github.com/fmjjones)

Kate Webbink
Field Museum, Chicago
[@magpiedin](https://github.com/magpiedin)

Matt Woodburn
Natural History Museum London
[@mswoodburn](https://github.com/mswoodburn)

Jutta Buschbom
Statistical Genetics/Natural History Museum London
[@jbstatgen](https://github.com/jbstatgen)

Sarah Vincent
Natural History Museum London
[@essvee](https://github.com/essvee)

Maarten Trekels
Meise Botanic Garden/Synthesys+
[@mtrekels](https://github.com/mtrekels)

Quentin Groom
Meise Botanic Garden/TDWG/Synthesys+
[@qgroom](https://github.com/qgroom)

<hr style="border:none; height: 1px; background: rgb(150,150,150)">

### Acknowledgment
Special thanks to Steve Baskauf for his thoughtful consultation throughout the expert review process.


