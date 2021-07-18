<?php

namespace NarrativeEditor\Services;

use NarrativeEditor\Domain\Part;
use NarrativeEditor\Repositories\PartRepository;

class WritePartsService
{
    /**
     * @param Parts[] $parts
     */
    public function writeParts(array $parts)
    {
        $part_repository = new PartRepository();

        $part_ids = array_map(fn(Part $part) => $part->getId(), $parts);

        $max_id = max($part_ids);
        $parts_to_save = [];

        /** @var Part $part */
        foreach ($parts as $part) {
            if ($part->getId()) {
                $parts_to_save[] = $part;
            } else {
                $parts_to_save[] = new Part(
                    ++$max_id,
                    $part->getEventId(),
                    $part->getTitle(),
                    $part->getDescription()
                );
            }
        }

        $part_repository->saveParts($parts_to_save);
    }
}
