# TurquesaBay first release Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver the approved first release with polished motion, usable media and reliable enquiry flow.

**Architecture:** Retain React Router, Tailwind and Framer Motion. Share accessible dialog lifecycle between photo/video overlays, keep gallery media data separate, and keep sending state within Contact.

**Tech Stack:** React 18, Framer Motion 11, Tailwind 3, CRA 5, EmailJS.

**Spec:** docs/superpowers/specs/2026-09-30-guided-experience.md

## Global Constraints
- Preserve English, existing routes and contact details.
- Reuse installed dependencies; no full 3D, generated video or invented sales facts.
- Reduced motion, keyboard support and usable content when media fails.
- Work on feat/guided-experience from remote main 2dc8400.

## Review Focus
- Slow/failed image loads leave hero actions and gallery controls usable.
- Narrow phone layouts have no horizontal overflow or obscured controls.
- Keyboard dialogs trap focus, close on Escape and restore opener focus.
- Rapid/repeated form submissions issue at most one pending request, and failures retain inputs.
- Route changes and reduced-motion preferences do not leave hidden content or stale mobile menus.

### Task 1: Shell, hero and navigation
**Files:** App.js, App.test.js, index.css, Navbar.js, Navbar.test.js, pages/Home.js, pages/home/HeroSection.js, pages/home/homeContent.js, pages/home/VideoModal.js, assets/useDialog.js, pages/Amenities.js.
**Interfaces:** App wraps content in MotionConfig reducedMotion=user; useDialog({isOpen,onClose}) returns {dialogRef, restoreFocus}; hero retains onWatchVideo().
- [x] Update App regression for immediate hero visibility; add navigation regressions for visit link, expanded menu, Escape and route changes; run and observe failures.
- [x] Implement stable shell, hero, shared dialog lifecycle, on-demand video and remove artificial route loaders. Add consistent focus and reduced-motion CSS.
- [x] Run App/Navbar/Amenities suite and visually verify hero with project media. Commit deliverable.

### Task 2: Gallery
**Files:** components/gallery/galleryContent.js, components/ImageCarousel.js, components/ImageCarousel.test.js, pages/home/GallerySection.js, public/images/*.
**Interfaces:** ImageCarousel() reads GALLERY_IMAGES entries {id,src,alt,caption,category}; uses useDialog from task 1 ({dialogRef, restoreFocus}); restoreFocus also runs after exit animation.
- [x] Add tests for full-screen keyboard navigation/focus restoration, filtering, swiping and failed-image fallback; run and observe missing behaviors.
- [x] Implement manual category gallery, thumbnails, image counter, portal dialog, swipe navigation and error fallback; optimize verified project assets locally where available.
- [x] Run gallery tests; commit deliverable. Browser checks deferred to hosted preview because local browser launch is blocked by the runtime.

### Task 3: Contact and final validation
**Files:** pages/Contact.js, pages/Contact.test.js, assets/Notification.js, pages/home/CtaSection.js.
**Interfaces:** Keep existing EmailJS template parameter names and IDs. Notification accepts type=success|error, message, isVisible and onClose; Contact owns pending state/ref lock.
- [x] Add tests for immediate form, duplicate-submit prevention, success reset and failure retention/retry; run and observe failures.
- [x] Implement accessible form, pending feedback and reliable request lifecycle; connect CTA links.
- [ ] Run entire suite and CI=true npm run build; inspect desktop/mobile/reduced-motion, review whole diff independently, address important findings, integrate verified release into GitHub using non-forced updates.
