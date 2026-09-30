# TurquesaBay guided experience: first release

Approved direction: turn the existing landing page into a guided visit that leads to a residence enquiry. This first release covers the hero, navigation, gallery and contact, plus removal of artificial loading delays on the existing routes. Preserve English copy, existing routes, turquoise/gold identity, contact details and EmailJS integration. Use the project's existing images after inspecting them. The interactive residence map expansion and a generated background video are subsequent releases requiring validated model data and approved media respectively.

- Hero: a stable headline, project imagery, coordinated entrances, direct links to amenities/floor plans and contact; keep the existing video playable on demand through an accessible preview linking to its YouTube player. Remove outdated completion and unverified numeric sales counters from the hero.
- Navigation: fixed-height sticky shell, compact inner content on scroll without document jumps, active route indicator, working visit CTA, accessible mobile toggle with Escape and route-change dismissal.
- Gallery: category filters, labelled navigation, manual progression, image counter and thumbnails, full-screen dialog via a portal, Escape/arrows/Tab support, touch swipes, focus restoration and scroll locking. Failed images expose an intelligible fallback and never block navigation.
- Contact: immediate content, connected labels, accessible errors, pending-send lock including same-tick submissions, preserve form data after failure, distinct success/error feedback, no logging personal form data.
- Motion: reuse Framer Motion; respect reduced motion including CSS, no continual decorative motion or autoplay carousel. Desktop/mobile responsive layouts and keyboard access.
- Verification: meaningful interaction regressions, production CI build, desktop/mobile browser checks with images present, reduced-motion checks, final independent review.

Do not invent prices, availability, surface areas, permit evidence or current construction status. Preserve existing permit content for this bounded release; its factual validation remains a content dependency for the later trust section.
