# Gurgaon catalogue data-quality audit

Reviewed before introducing `/flats-for-sale-in-gurgaon` as the canonical transactional catalogue.

## Confirmed inventory corrections

The three previously flagged conflicts have now been resolved for public catalogue and property-detail output using confirmed Shubh Estate Brokers source instructions. The underlying production database rows should still be normalized through the admin/database layer when direct database access is available.

1. **Residency Grand, Sector 52** — confirmed as **4 BHK**, approximately **2,900 sq ft**, **6th floor**, asking **₹3.60 Cr**. Public output now overrides the stale 3 BHK field and removes repeated `Sector 52, Sector 52` locality text.
2. **Vatika Sovereign, Sector 49** — confirmed seller unit as **4 BHK + servant**, approximately **3,000 sq ft** with **2,999 sq ft carpet area**, **3rd floor**, asking **₹5 Cr**. Public output now overrides the stale ₹5.50 Cr field. The project directory may remain conservative at price-on-request until the source row is edited.
3. **Puri Emerald Bay, Sector 104** — confirmed seller unit as **3 BHK + servant**, **2,450 sq ft**, **Tower A3**, **15th floor**, **north-east facing**, asking **₹3.25 Cr**. The dedicated listing already reflected the 15th-floor instruction; the earlier sixth-floor note was stale audit context.

## Catalogue rules applied

- A project appears once in the directory using normalized project name, sector and phase.
- Individual seller units remain separate addressable property listings.
- Separately registered phases may remain separate when their RERA record, specifications or pricing materially differ.
- Project prices remain on request unless backed by a current Shubh inventory record or a recent comparable-market sample.
- Asking prices are not described as registered transaction prices.
- A project cannot receive a `RERA checked` or `verified inventory` label without the corresponding internal evidence.
- Confirmed public-output corrections are centralized so stale imported fields cannot reappear across catalogue, NRI, luxury, project-hub or property-detail pages while the source database awaits cleanup.

## Price-publication coverage

- Seed projects checked: **143**
- Projects with a dated Shubh-inventory or comparable-market price record: **26**
- Projects intentionally held at **Price on request** pending current verification: **117**
