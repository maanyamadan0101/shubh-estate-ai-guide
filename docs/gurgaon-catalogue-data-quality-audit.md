# Gurgaon catalogue data-quality audit

Reviewed before introducing `/flats-for-sale-in-gurgaon` as the canonical transactional catalogue.

## Records requiring owner confirmation

These conflicts were visible in the published catalogue and have not been silently corrected in source data:

1. **Residency Grand, Sector 52** — the listing title says 4 BHK while the displayed structured configuration says 3 BHK.
2. **Vatika Sovereign, Sector 49** — the listing title mentions an asking price of ₹5 Cr while the catalogue card has displayed ₹5.50 Cr. The new project directory therefore keeps the price on request until the seller instruction is confirmed.
3. **Puri Emerald Bay, Sector 104** — the published dedicated-page title has referenced the sixth floor, while the supplied unit instruction previously referenced the fifteenth floor. Confirm the correct unit before revising the listing.

## Catalogue rules applied

- A project appears once in the directory using normalized project name, sector and phase.
- Individual seller units remain separate addressable property listings.
- Separately registered phases may remain separate when their RERA record, specifications or pricing materially differ.
- Project prices remain on request unless backed by a current Shubh inventory record or a recent comparable-market sample.
- Asking prices are not described as registered transaction prices.
- A project cannot receive a `RERA checked` or `verified inventory` label without the corresponding internal evidence.

## Price-publication coverage

- Seed projects checked: **143**
- Projects with a dated Shubh-inventory or comparable-market price record: **26**
- Projects intentionally held at **Price on request** pending current verification: **117**
