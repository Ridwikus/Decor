<?php

declare(strict_types=1);

/**
 * Bootstrap: security headers, config and view helpers.
 * The page has no forms (both CTAs go to WhatsApp), so there is no POST
 * handling or CSRF token; add src/config/csrf.php if a form is introduced.
 */

const WEB_ROOT   = __DIR__ . '/../..';
const COMPONENTS = __DIR__ . '/../components';

$site = require __DIR__ . '/site.php';

if (!headers_sent()) {
    header('Content-Type: text/html; charset=utf-8');
    header('X-Content-Type-Options: nosniff');
    header('Referrer-Policy: strict-origin-when-cross-origin');
    header('X-Frame-Options: SAMEORIGIN');
    header('Permissions-Policy: camera=(), microphone=(), geolocation=()');
    header(
        "Content-Security-Policy: default-src 'self'; img-src 'self' data:; "
        . "font-src 'self'; style-src 'self'; script-src 'self'; "
        . "base-uri 'self'; form-action 'self'; frame-ancestors 'self'"
    );
}

/** Escape a value for HTML output. */
function e(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

/** Public asset URL with a cache-busting version from the file's mtime. */
function asset(string $path): string
{
    $file = WEB_ROOT . '/public/' . ltrim($path, '/');
    $v    = is_file($file) ? (string) filemtime($file) : '1';

    return e($path . '?v=' . $v);
}
