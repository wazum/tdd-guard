<?php

declare(strict_types=1);

namespace TddGuard\PHPUnit;

final class Storage
{
    private string $projectRoot;

    public function __construct(string $projectRoot = '')
    {
        $resolvedRoot = PathValidator::resolveProjectRoot($projectRoot);
        if ($resolvedRoot === false) {
            throw new \RuntimeException('Could not determine project root directory');
        }
        $this->projectRoot = $resolvedRoot;
    }

    public function saveTest(string $content): void
    {
        $dataDir = $this->projectRoot . '/.claude/tdd-guard/data';

        if (!is_dir($dataDir)) {
            mkdir($dataDir, 0755, true);
        }

        file_put_contents($dataDir . '/test.json', $content);
    }
}
