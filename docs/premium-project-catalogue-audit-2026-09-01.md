# Premium Gurgaon project catalogue audit

Audit date: 1 September 2026  
Branch: `feat/premium-project-catalogue`  
Production publication: not authorised

## Audit scope and constraints

Repository routes, generated route tree, static project directory, public project-hub loader, property catalogue loader, admin functions, media folders, metadata utilities and sitemap generator were reviewed before implementation. The live `/projects` page exposed 62 project guides; the existing static Gurgaon directory contained 143 deduplicated project entries. The candidate list was compared against names, aliases, sectors and existing routes rather than by exact spelling alone.

The configured Supabase connector did not expose a project in this workspace, so no direct production-table mutation or private-record export was attempted. Public inventory counts and project hubs remain connected through the existing `listPublicProjectHubs` and property loaders. No second project/property database was created.

## Candidate audit

“No guide” means the project is represented in the collection directory but does not yet have a dedicated, indexable project-detail route. “0 found” means no current public project hub or property inventory was found during the live rendered-page comparison; it is not a claim that the market has no inventory.

| Candidate                       | Developer             | Sector        | Corridor                                  | Existing canonical record / route                              | Public Shubh inventory | Approved local image | RERA in current record | Status             | Alternate-name decision                                   | Action                             |
| ------------------------------- | --------------------- | ------------- | ----------------------------------------- | -------------------------------------------------------------- | ---------------------: | -------------------- | ---------------------- | ------------------ | --------------------------------------------------------- | ---------------------------------- |
| DLF Privana South               | DLF                   | Sectors 76–77 | SPR / South Gurgaon                       | Existing directory record; no guide                            |                0 found | No                   | Phase check required   | Under construction | Exact match                                               | Preserve                           |
| Smartworld Sky Arc              | Smartworld Developers | Sector 69     | SPR / South Gurgaon                       | Missing before audit; no guide                                 |                0 found | No                   | GGM/878/610/2024/105   | Under construction | Exact official record                                     | Add verified directory record      |
| Emaar Amaris                    | Emaar India           | Sector 62     | Golf Course Extension Road                | Missing before audit; no guide                                 |                0 found | No                   | GGM/885/617/2024/112   | Under construction | Exact official record                                     | Add verified directory record      |
| Godrej Miraya                   | Godrej Properties     | Sector 43     | Golf Course Road / Central Gurgaon        | Missing before audit; no guide                                 |                0 found | No                   | GGM/870/602/2024/97    | Under construction | Exact official record                                     | Add verified directory record      |
| TREVOC Royal Residences         | TREVOC Group          | Sector 56     | Golf Course Road                          | Missing before audit; no guide                                 |                0 found | No                   | GGM/863/595/2024/90    | Under construction | Preserve brand styling `TREVOC`                           | Add verified directory record      |
| TARC Ishva                      | TARC                  | Sector 63A    | Golf Course Extension Road                | Existing directory record; no guide                            |                0 found | No                   | Phase check required   | New launch         | Exact match                                               | Preserve; phase research still due |
| Silverglades The Legacy         | Silverglades          | Sector 63A    | Golf Course Extension Road                | Missing before audit; no guide                                 |                0 found | No                   | GGM/861/593/2024/88    | Under construction | Exact official record                                     | Add verified directory record      |
| Tulip Crimson                   | Tulip Infratech       | Sector 70     | SPR / South Gurgaon                       | Existing directory record; no guide                            |                0 found | No                   | Phase check required   | Under construction | Exact match                                               | Preserve                           |
| Eldeco Fairway Reserve          | Eldeco                | Sector 80     | New Gurgaon                               | Missing before audit; no guide                                 |                0 found | No                   | GGM/880/612/2024/107   | Under construction | Exact official record                                     | Add verified directory record      |
| Mahindra Luminare               | Mahindra Lifespaces   | Sector 59     | Golf Course Extension Road                | Existing directory record; no guide                            |                0 found | No                   | Phase check required   | Ready to move      | Exact match                                               | Preserve                           |
| Conscient Elevate               | Conscient & Hines     | Sector 59     | Golf Course Extension Road                | Existing canonical record: `Conscient Hines Elevate`; no guide |                0 found | No                   | Phase check required   | Under construction | Alias added: Conscient Elevate / Elevate                  | Do not duplicate                   |
| Signature Global Titanium SPR   | Signature Global      | Sector 71     | SPR                                       | Existing directory record; no guide                            |                0 found | No                   | Phase check required   | Under construction | Exact match                                               | Preserve                           |
| Signature Global Twin Tower DXP | Signature Global      | Sector 84     | New Gurgaon                               | Existing directory record; no guide                            |                0 found | No                   | Phase check required   | Under construction | Exact match                                               | Preserve                           |
| Signature Global De Luxe DXP    | Signature Global      | Sector 37D    | New Gurgaon / Dwarka Expressway influence | Existing directory record; no guide                            |                0 found | No                   | Phase check required   | Under construction | Exact match                                               | Preserve                           |
| Smartworld The Edition          | Smartworld Developers | Sector 66     | Golf Course Extension Road                | Existing directory record; no guide                            |                0 found | No                   | Phase check required   | New launch         | Exact match                                               | Preserve                           |
| Trump Tower Gurgaon             | Tribeca & M3M         | Sector 65     | Golf Course Extension Road                | Existing canonical record: `Trump Towers Delhi NCR`; no guide  |                0 found | No                   | Phase check required   | Ready to move      | Candidate is alternate singular/location wording          | Do not duplicate                   |
| M3M St Andrews                  | M3M India             | Sector 65     | Golf Course Extension Road                | Existing canonical record: `M3M St. Andrews`; no guide         |                0 found | No                   | Phase check required   | Ready to move      | Aliases added for punctuation and Golf Residences wording | Do not duplicate                   |
| M3M Golfestate                  | M3M India             | Sector 65     | Golf Course Extension Road                | Existing canonical record: `M3M Golf Estate`; no guide         |                0 found | No                   | Phase check required   | Ready to move      | `Golfestate` is a spacing variant                         | Do not duplicate                   |
| M3M Altitude                    | M3M India             | Sector 65     | Golf Course Extension Road                | Existing directory record; no guide                            |                0 found | No                   | Phase check required   | Under construction | Exact match                                               | Preserve                           |
| M3M City Heights                | M3M India             | Sector 65     | Golf Course Extension Road                | Existing canonical record: `M3M Heights`; no guide             |                0 found | No                   | Phase check required   | Ready to move      | Official M3M name is M3M Heights; alias added             | Do not duplicate                   |
| M3M Mansion                     | M3M India             | Sector 113    | Dwarka Expressway                         | Existing directory record; no guide                            |                0 found | No                   | Phase check required   | Under construction | Exact match                                               | Preserve                           |

## Confirmed additions

Six genuine gaps were added to the existing static project directory without creating dedicated thin pages or changing production data:

1. Godrej Miraya
2. TREVOC Royal Residences
3. Silverglades The Legacy
4. Emaar Amaris
5. Smartworld Sky Arc
6. Eldeco Fairway Reserve

The directory now contains 149 unique records. Customer-facing cards publish only the verified project name, developer, location, broad configuration/status and official RERA number captured in the source record. Unit sizes, payment plans, possession details, prices and inventory remain qualified or on request where the research record is incomplete.

## Official verification sources for the six additions

| Project                 | Haryana RERA                                                                              | Developer source                                                                         | Facts published in this change                                                      |
| ----------------------- | ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Godrej Miraya           | [HARERA project detail](https://haryanarera.gov.in/view_project/searchprojectDetail/3030) | [Godrej Properties](https://www.godrejproperties.com/gurugram/residential/godrej-miraya) | Name, developer, Sector 43, 3 & 4 BHK, status context, RERA number                  |
| TREVOC Royal Residences | [HARERA project detail](https://haryanarera.gov.in/view_project/searchprojectDetail/3034) | [TREVOC Group](https://www.trevocgroup.com/)                                             | Name, developer, Sector 56, 3 & 4 BHK, status context, RERA number                  |
| Silverglades The Legacy | [HARERA project detail](https://haryanarera.gov.in/view_project/searchprojectDetail/3014) | [Silverglades](https://silverglades.com/the-legacy/)                                     | Name, developer, Sector 63A, 3 & 4 BHK/penthouses, status context, RERA number      |
| Emaar Amaris            | [HARERA project detail](https://haryanarera.gov.in/view_project/searchprojectDetail/3180) | [Emaar India](https://in.emaar.com/en/properties/amaris/)                                | Name, developer, Sector 62, 2/3/4 BHK, status context, RERA number                  |
| Smartworld Sky Arc      | [HARERA project detail](https://haryanarera.gov.in/view_project/searchprojectDetail/3075) | Awaiting an approved reusable developer asset/source package                             | Name, promoter context, Sector 69, broad configuration, status context, RERA number |
| Eldeco Fairway Reserve  | [HARERA project detail](https://haryanarera.gov.in/view_project/searchprojectDetail/3003) | Awaiting an approved reusable developer asset/source package                             | Name, promoter context, Sector 80, broad configuration, status context, RERA number |

## Database and URL decision

- Database migration: **none proposed**. The existing property/project hub loaders remain authoritative for public inventory and admin-managed records.
- Production data: **not changed**. When direct Supabase access is available, the six additions should be reconciled against production `projects`/project-hub records before creating any detail page.
- Existing routes: **not renamed or deleted**. Alias variants remain mapped to their canonical directory record.
- New detail URLs: **not created**. A verified project guide should be published only after the research, approved imagery, metadata and source register are complete.
- Dome Centre Mall: **excluded** because the catalogue is residential and no approved separate commercial catalogue was found.

## Facts still requiring confirmation before project-detail publication

- Legal promoter entity and licence number for every applicable phase
- Phase-specific land area, towers, floors, unit count and approved unit-size schedule
- Carpet/super/built-up area basis for each published size
- Current construction milestones and contractual possession date
- Payment plan, fresh-booking inventory and current resale inventory
- Current unit-specific price basis, taxes, statutory charges and other inclusions
- Amenities and connectivity claims checked against official disclosures
- Advantages, limitations, risks and buyer due-diligence notes written from verified evidence
- Developer-authorised images with a recorded marketing-use basis
