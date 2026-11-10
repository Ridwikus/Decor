<?php

declare(strict_types=1);

require __DIR__ . '/../src/config/bootstrap.php';

require COMPONENTS . '/head.php';
require COMPONENTS . '/header.php';
?>
<main id="main" class="flex w-full flex-col items-center">
<?php
require COMPONENTS . '/hero.php';
require COMPONENTS . '/ticker.php';
require COMPONENTS . '/services.php';
require COMPONENTS . '/projects.php';
require COMPONENTS . '/testimonials.php';
require COMPONENTS . '/contact.php';
?>
</main>
<?php
require COMPONENTS . '/footer.php';
require COMPONENTS . '/fabs.php';
require COMPONENTS . '/foot.php';
