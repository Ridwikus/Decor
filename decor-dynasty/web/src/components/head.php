<?php /** @var array $site */ ?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title><?= e($site['title']) ?></title>
<meta name="description" content="<?= e($site['description']) ?>">
<meta name="theme-color" content="#F7F7F2">
<link rel="preload" href="<?= asset('assets/fonts/syne-latin.woff2') ?>" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="<?= asset('assets/fonts/outfit-latin.woff2') ?>" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="<?= asset('assets/css/app.css') ?>">
<script type="module" src="<?= asset('assets/js/main.js') ?>"></script>
</head>
<body>
<a href="#main" class="dd-skip">Skip to content</a>
<div class="relative box-border flex min-h-screen w-full flex-col items-center overflow-x-clip bg-cream font-sans text-ink">
