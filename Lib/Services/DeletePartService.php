<?php

namespace NarrativeEditor\Services;

use NarrativeEditor\Repositories\PartRepository;
use NarrativeEditor\Domain\Part;

class DeletePartService
{
    public function deletePart(Part $part)
    {
        $part_repository = new PartRepository();

        $existing_parts = $part_repository->getParts();

        // Remove entry from existing parts.
        $parts_to_save = array_filter($existing_parts, function (Part $part) {
            return $part->getId() != $part->getId();
        });

        $part_repository->saveParts($parts_to_save);
    }
}
