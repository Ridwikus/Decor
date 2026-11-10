# Décor Dynasty — Web

PHP partials + Tailwind CSS 3.4 + vanilla JS (ES modules). No framework, no database, no secrets.

## Requirements

- PHP ≥ 8.1
- Node ≥ 18 (only for building CSS and running tests)

## Run

```bash
npm install          # Tailwind, ESLint, Prettier, Playwright, axe
npm run build        # src/css/input.css → public/assets/css/app.css, src/js → public/assets/js
php -S localhost:8000 -t public
```

`public/assets/css/app.css` and `public/assets/js/` are committed, so `php -S localhost:8000 -t public` works straight after cloning. Run `npm run build` after any markup/CSS/JS change.

| Script | Does |
| --- | --- |
| `npm run dev` | Tailwind watch mode |
| `npm run build` | Minified CSS + copy JS to `public/` |
| `npm run lint` / `npm run format` | ESLint + Prettier |
| `npx playwright install chromium` then `npm test` | Responsive + axe tests (starts `php -S` itself) |
| `composer install && composer cs` | PHP-CS-Fixer (PSR-12) |

## Structure

```
web/
├── public/
│   ├── index.php            # entry: bootstrap + partials
│   └── assets/{css,js,img,fonts}
├── src/
│   ├── components/          # head, header, hero, ticker, services, projects,
│   │                        # testimonials, contact, footer, fabs, foot
│   ├── config/              # bootstrap.php (security headers, e(), asset()), site.php (content)
│   ├── css/input.css        # Tailwind directives + the few custom components
│   └── js/                  # main.js + modules/{header,ticker,gallery,back-to-top,motion}.js
├── tests/                   # responsive.spec.js, a11y.spec.js (Playwright + axe)
├── tailwind.config.js       # design tokens
└── package.json / composer.json / eslint.config.js / .env.example
```

## Editing content

- WhatsApp links, page title, meta description → `src/config/site.php`
- Section copy → the matching file in `src/components/`
- Colours / fonts / breakpoints → `tailwind.config.js` (accent is the CSS variable `--accent` in `src/css/input.css`)
