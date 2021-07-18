<?php

namespace NarrativeEditor\Services;

use NarrativeEditor\Domain\Event;
use NarrativeEditor\Repositories\ChoiceRepository;
use NarrativeEditor\Repositories\PartRepository;

class ReadEventService
{
    public function readData(): Event
    {
        $part_repository = new PartRepository();
        $choice_repository = new ChoiceRepository();

        $parts = $part_repository->getParts();
        $choices = $choice_repository->getChoices();

        return new Event($parts, $choices);
    }
}
