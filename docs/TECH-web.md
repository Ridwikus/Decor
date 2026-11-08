# Tech — Web

_Source of truth: the uploaded `Décor Dynasty Landing - Web.html` (1440 desktop frame + 390 mobile-preview frame). Rebuilt in the required stack, with no redesign._

## Stack
- **PHP 8.1+**: layout partials (`src/components/*.php`), escaping helper `e()`, cache-busted `asset()`, security headers (CSP, nosniff, referrer, frame, permissions) in `src/config/bootstrap.php`.
- **Tailwind CSS 3.4**: mobile-first utilities. Tokens live in `tailwind.config.js`. `future.hoverOnlyWhenSupported` keeps hover styles to mouse devices.
- **Custom CSS**: only what utilities can't express (`src/css/input.css`): the CTA arrow reveal, gallery mask and card states, the cursor pill, floating-button pulse, sticky frosted header, skip link and reduced-motion overrides.
- **Vanilla JS (ES modules)**, no inline handlers: `header.js` (scroll state, mobile menu), `ticker.js`, `gallery.js`, `back-to-top.js`, `motion.js`.
- **Fonts**: self-hosted Gloock 400, Outfit 400–500 and Syne 600–700 (latin subsets taken from the HTML, OFL 1.1). Syne and Outfit are preloaded.

## Design tokens (copied 1:1 from the HTML)
| Token | Value | Use |
| --- | --- | --- |
| `accent` | `#885F52` | headings, CTA, ticker, contact block, bottom bar |
| `ink` | `#2B2523` | body text, links |
| `cream` | `#F7F7F2` | page background |
| `line` | `#EDE4DF` | borders, avatar background |
| `muted` | `#6B625E` | testimonial role |
| `soft` | `#4F4946` | footer links and address |
| `brand` | `#3A3533` | footer tagline |
| `tint` | `#F7F2EF` | menu hover |
| `whatsapp` | `#25D366` | WhatsApp button |
| `--gutter` / `--section` / `--stack` / `--card` | `clamp(20px,6.95vw,100px)` / `clamp(72px,8.4vw,120px)` / `clamp(32px,3.4vw,48px)` / `clamp(260px,34.7vw,500px)` | fluid spacing |

Every font size comes straight from the HTML's `clamp()` values, e.g. H1 `clamp(44px, 8.9vw, 128px)`, H2 `clamp(40px, 6.1vw, 88px)`, body `clamp(16px, 1.25vw, 18px)`.

## Breakpoints
They mirror the HTML's own media queries (`max-width: 640px`, `max-width: 1024px`), so Tailwind's `sm` and `lg` sit 1px above the defaults.

| Name | Min width | Layout |
| --- | --- | --- |
| base | 0 | 1 column, burger menu, hero image 217px tall (from the 390 mobile frame), carousel centre-zoom, captions on cards, WhatsApp button 16px from the edges + safe area |
| `sm` | 641px | sticky frosted header with full nav, 2-column services, cursor pill on the gallery (mouse only) |
| `md` | 768px | (no change in the source) |
| `lg` | 1025px | 4-column services, 3-column testimonials |
| `xl` | 1280px | content capped at 1240px |
| `2xl` | 1440px | matches the 1440 × 1028 design |

Tested at 320, 402 (iPhone 17 Pro), 874 × 402 (iPhone landscape), 768, 1024, 1280 and 1440 × 1028: no horizontal scroll, no clipped text, and the primary CTA sits on the first screen at every width.

## How to run
```bash
cd web && npm install && npm run build && php -S localhost:8000 -t public
```
Dependencies (dev only): tailwindcss, eslint + @eslint/js + globals, prettier, @playwright/test, @axe-core/playwright, pa11y; composer: friendsofphp/php-cs-fixer.
Environment variables: none required (`.env.example` holds only `APP_ENV` and `APP_URL`).

## Deployment notes
- Serve **`web/public/`** as the document root (Apache, Nginx + PHP-FPM, or any PHP host); `src/` must not be web-accessible.
- Run `npm run build` in CI before deploying; `public/assets` is self-contained.
- The CSP in `bootstrap.php` allows only same-origin scripts, styles, fonts and images. Loosen it if you add analytics.
- No forms, so no CSRF or POST handling. Both CTAs open WhatsApp (`wa.me`). If a contact form is added, add a CSRF token + validation in `src/config/`.
- Long-cache `assets/` (URLs carry `?v=<mtime>`).

## Differences from the uploaded HTML (all listed)
| # | Change | Why |
| --- | --- | --- |
| 1 | **Pause/play button on the ticker** (right edge, white icon on an accent fade); the ticker starts paused when the OS asks for reduced motion | WCAG 2.2.2 Pause, Stop, Hide (motion > 5s) |
| 2 | **Skip to content** link, hidden until focused | WCAG 2.4.1 Bypass Blocks |
| 3 | Content wrapped in `<main>`; footer + bottom bar in one `<footer>`; floating buttons in `<aside aria-label="Quick actions">`; footer link lists are `<nav>` labelled by their column title (no visual change) | Landmarks (axe `region`), WCAG 1.3.1 |
| 4 | Gallery scroller is a focusable `role="region"` (moves with arrow keys); the centred card shows a 3px accent outline on keyboard focus. The `aria-label` moved from the generic mask `div` to this region. | WCAG 2.1.1 Keyboard, 2.4.7 Focus Visible; axe `scrollable-region-focusable`, `aria-prohibited-attr` |
| 5 | Mobile menu: focus trap, Esc closes and returns focus, closes on outside click and when leaving the mobile layout | Spec requirement; WCAG 2.1.2, 2.4.3 |
| 6 | Back-to-top is out of the tab order and hidden from screen readers while invisible; it moves focus to the H1 after scrolling up | WCAG 2.4.3 / 2.4.11 |
| 7 | Hidden "(opens WhatsApp in a new tab)" text on the WhatsApp CTAs | WCAG 3.2.5 (advisory) |
| 8 | Smooth scroll, pulse and transitions are switched off under `prefers-reduced-motion` | WCAG 2.3.3 (advisory) |
| 9 | Hover effects only on hover-capable devices (`@media (hover:hover)`) | Spec: no sticky hover on touch |
| 10 | Floating buttons and mobile bottom bar padding add `env(safe-area-inset-*)`; viewport has `viewport-fit=cover` | iPhone home indicator / notch |
| 11 | `srcset` (800w hero, 480w project images), `width`/`height`, `loading="lazy"` below the fold, `fetchpriority="high"` on the hero | Performance, CLS |
| 12 | Footer brand column, testimonial name size etc. use the HTML's exact sizes; `line-height: normal` restored on `html` (Tailwind Preflight would use 1.5) | Pixel match. Page height is identical to the source: 4609px at 1440, 5000px at 402 |
| 13 | The design tool's colour switcher (`accent` prop with 4 options) is fixed at the default `#885F52`, still a CSS variable (`--accent`) | Runtime design-tool feature, not part of the page |
| 14 | Added `<meta name="description">` (hero subline) and `theme-color` | SEO / browser UI; not visible |

## Build notes from this delivery
This sandbox had no Node or PHP, and downloading binaries was blocked. So:
- `public/assets/css/app.css` was compiled by Tailwind 3.4.17 (Play CDN build in headless Chromium) from the same `input.css` + config, so it is unminified. Run `npm run build` once to replace it with the minified CLI output.
- The PHP partials were rendered by a small test script that inlines the `require`s and `e()` / `asset()` calls. The real `php -S` run and `npm test` / `pa11y` were **not run here**; run them locally (commands above).

## Visual match
`docs/screenshots/compare-source-vs-web-1440.jpg` and `…-402.jpg` show the source HTML (left) next to this build (right), as full pages. A pixel diff shows differences only in the moving ticker (animation position + the added pause button) and slight image resampling in the gallery.
