<?php

$finder = PhpCsFixer\Finder::create()->in([__DIR__ . '/public', __DIR__ . '/src']);

return (new PhpCsFixer\Config())
    ->setRules(['@PSR12' => true, 'declare_strict_types' => true, 'binary_operator_spaces' => ['default' => 'align_single_space_minimal']])
    ->setRiskyAllowed(true)
    ->setFinder($finder);
