# Project image-source register

Register date: 1 September 2026

Only locally hosted media already present in the Shubh Estate Brokers repository is used in the new project cards. No image was copied from Terranova, scraped from Google Images, hotlinked from another broker or stripped of a watermark.

| Project                       | Website filename                                                                     | Source organisation                       | Image type               | Date recorded | Usage basis                                                 | Website treatment                                 |
| ----------------------------- | ------------------------------------------------------------------------------------ | ----------------------------------------- | ------------------------ | ------------- | ----------------------------------------------------------- | ------------------------------------------------- |
| AIPL Riviera at AIPL LakeCity | `/projects/aipl-riviera/aipl-riviera-walkthrough-poster.jpg`                         | AIPL / Shubh Estate Brokers project media | Walkthrough still        | 1 Sep 2026    | Project media already supplied and hosted in the repository | Labelled as walkthrough still; lazy-loaded        |
| Ansals Highland Park          | `/projects/ansals-highland-park/ansals-highland-park-bird-eye.webp`                  | Shubh Estate Brokers project media        | Project marketing visual | 1 Sep 2026    | Project media already supplied and hosted in the repository | Labelled as project marketing visual; lazy-loaded |
| Ireo Skyon                    | `/properties/ireo-skyon-2045-sector-60/08-ireo-skyon-landscaped-community-view.webp` | Shubh Estate Brokers listing photography  | Project photograph       | 1 Sep 2026    | Listing media already supplied and hosted in the repository | Descriptive alt text; lazy-loaded                 |
| Puri Emerald Bay              | `/properties/puri-emerald-bay-2450/08-puri-emerald-bay-3bhk-balcony-green-view.jpg`  | Shubh Estate Brokers listing photography  | Project photograph       | 1 Sep 2026    | Listing media already supplied and hosted in the repository | Descriptive alt text; lazy-loaded                 |

## Placeholder register

The following newly added projects intentionally display the premium branded placeholder **“Official Project Image Awaited”** until a developer-authorised, broker-supplied or properly licensed asset is available:

- Godrej Miraya
- TREVOC Royal Residences
- Silverglades The Legacy
- Emaar Amaris
- Smartworld Sky Arc
- Eldeco Fairway Reserve

The same placeholder is used for existing directory records without approved local media. This prevents an unrelated render or another broker's promotional image from being presented as project evidence.

## Image delivery controls

- Local images are served through the existing Vercel image optimisation path with responsive `srcset` widths.
- Card media reserves a 16:10 aspect ratio to minimise layout shift.
- Below-the-fold images use native lazy loading and asynchronous decoding.
- Alt text identifies the project and distinguishes photographs, marketing visuals and walkthrough stills.
- External hotlinking is not used by the new directory or featured-project components.
