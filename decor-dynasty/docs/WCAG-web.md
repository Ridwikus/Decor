# WCAG 2.2 AA — Code test · Web

**Tooling:** axe-core 4.12.1 via Playwright (Chromium 158), tags `wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa, best-practice`, plus scripted keyboard, reduced-motion, zoom and reflow checks.

**Result:** 0 automated violations at 402px, 768px and 1440px (41 rules passed at each width). At 402px axe left one rule undecided (`color-contrast` for text over photos), so it is a manual check below.

> Automated tools catch only part of WCAG. This is **not** a claim of full compliance; see the manual checks.

| Criterion | Level | Status | Issue | Fix |
| --- | --- | --- | --- | --- |
| 1.1.1 Non-text Content | A | Pass | — | Descriptive `alt` on hero + 5 projects; decorative SVGs `aria-hidden`; icon links/buttons have `aria-label` |
| 1.3.1 Info and Relationships | A | Pass (fixed) | No `<main>`; content outside landmarks | Added `main`, `footer`, `aside`, labelled footer `nav`s; heading order h1 → h2 → h3 |
| 1.3.4 Orientation | AA | Pass | — | Tested portrait 402 × 874 and landscape 874 × 402 |
| 1.4.3 Contrast (Minimum) | AA | Pass | — | ink/cream 14.04:1 · accent/cream 5.13:1 · white/accent 5.52:1 · muted/white 5.94:1 · soft/cream 8.23:1 |
| 1.4.4 Resize Text | AA | Pass | — | 200% zoom on a 1440 window: no horizontal scroll, no loss of content |
| 1.4.10 Reflow | AA | Pass | — | 320px: no horizontal scroll, no clipped text |
| 1.4.11 Non-text Contrast | AA | Pass / note | Avatar icon on `#EDE4DF` 4.41:1 (decorative). White WhatsApp glyph on `#25D366` 1.98:1 | WhatsApp mark is a logo (exempt); its accessible name is "Chat with us on WhatsApp" |
| 1.4.12 Text Spacing | AA | Manual | — | No fixed-height text boxes except ticker and 44px pills; verify with a text-spacing bookmarklet |
| 1.4.13 Content on Hover or Focus | AA | Pass | — | "Chat with us" label and gallery pill are duplicates of existing names, non-blocking, `pointer-events:none` / `aria-hidden` |
| 2.1.1 Keyboard | A | Pass (fixed) | Gallery scroll area wasn't keyboard reachable | Focusable region, arrow keys scroll; prev/next buttons |
| 2.1.2 No Keyboard Trap | A | Pass | — | Menu trap releases on Esc / toggle |
| 2.2.2 Pause, Stop, Hide | A | Pass (fixed) | Ticker moves forever with no control | Pause/play button; starts paused under reduced motion; stops when the tab is hidden |
| 2.3.3 Animation from Interactions | AAA (advisory) | Pass | — | Reduced motion disables smooth scroll, pulse and transitions |
| 2.4.1 Bypass Blocks | A | Pass (fixed) | No skip link | "Skip to content" on first Tab |
| 2.4.3 Focus Order | A | Pass | — | Nav → hero CTA → ticker control → gallery → arrows → contact CTA → footer links → socials → WhatsApp |
| 2.4.7 Focus Visible | AA | Pass | — | 2px accent outline (white on accent backgrounds) on every stop; checked automatically for 30 tab stops |
| 2.4.11 Focus Not Obscured (Minimum) | AA | Manual | Fixed header (≥641px) and floating buttons could cover focused items | `scroll-margin-top: 100px` on section targets; check while tabbing through the footer on a short window |
| 2.5.3 Label in Name | A | Pass | — | Visible labels start the accessible names |
| 2.5.8 Target Size (Minimum) | AA | Pass | — | Nav 44px tall, burger 48, arrows 44–52, socials 48, WhatsApp 60, footer links 40px tall |
| 3.1.1 Language of Page | A | Pass | — | `lang="en"` |
| 3.2.5 Change on Request | AAA (advisory) | Pass | — | New-tab WhatsApp links announce it |
| 4.1.2 Name, Role, Value | A | Pass | — | Burger `aria-expanded` / `aria-controls`; ticker toggle `aria-pressed`; arrows `disabled` at the ends |

## Manual checks still needed (a person with assistive tech)
1. **VoiceOver on iPhone (Safari)** and **NVDA + Firefox / JAWS + Chrome**: read the whole page; confirm the ticker is read once (the second group is `aria-hidden`), testimonials read as quote + name, and the gallery region announces its label.
2. **Text over photos** (mobile card captions on the dark gradient): check contrast on each real photo (axe couldn't decide).
3. **Text spacing (1.4.12)** with a bookmarklet at 402 and 1440.
4. **Focus not obscured (2.4.11)**: tab through on a short laptop window (e.g. 1280 × 650) and confirm the sticky header and floating buttons never fully hide the focused element.
5. **Windows High Contrast / forced colours**: borders and focus rings stay visible.
6. **Pa11y / Lighthouse accessibility**: not run in this sandbox (no Node). Run `npx pa11y http://localhost:8000` and Lighthouse locally.
7. Footer links currently point to `#` (as in the source). Give them real URLs before launch.
