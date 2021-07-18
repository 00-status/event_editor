<?php

namespace NarrativeEditor\Repositories;

use Exception;
use NarrativeEditor\Domain\Part;

class PartRepository
{
    private const PATH_TO_PARTS = './assets/parts.json';

    /**
     * @return Part[]
     */
    public function getParts(): array
    {
        if (!file_exists(self::PATH_TO_PARTS)) {
            throw new Exception("Parts File does not exist!");
        }

        $part_data = json_decode(file_get_contents(self::PATH_TO_PARTS), true);
        $parts = $this->mapPartToObject($part_data);

        return $parts;
    }

    private function mapPartToObject(array $data): array
    {
        $parts = [];
        foreach ($data as $part_entry) {
            $parts[] = new Part(
                $part_entry['id'],
                $part_entry['event_id'],
                $part_entry['title'],
                $part_entry['description']
            );
        }

        return $parts;
    }

    /** @param Part[] $parts */
    public function saveParts(array $parts): void
    {
        if (!file_exists(self::PATH_TO_PARTS)) {
            throw new Exception("Parts File does not exist!");
        }

        file_put_contents(self::PATH_TO_PARTS, json_encode($parts));
    }
}