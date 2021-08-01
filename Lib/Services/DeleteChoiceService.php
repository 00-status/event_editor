<?php

namespace NarrativeEditor\Services;

use NarrativeEditor\Domain\Choice;
use NarrativeEditor\Repositories\ChoiceRepository;

class DeleteChoiceService
{
    public function deleteChoiceByPartId(int $part_id)
    {
        $repo = new ChoiceRepository();

        $existing_choices = $repo->getChoices();

        $choices_to_save = array_filter($existing_choices, function (Choice $choice) use ($part_id) {
            return $choice->getPartId() != $part_id && $choice->getLeadingPartId() != $part_id;
        });

        $repo->saveChoices($choices_to_save);
    }
}
