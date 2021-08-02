<?php

namespace NarrativeEditor\Services;

use InvalidArgumentException;
use NarrativeEditor\Domain\Choice;
use NarrativeEditor\Repositories\ChoiceRepository;

class DeleteChoiceService
{
    public function deleteChoice(Choice $choice)
    {
        $choice_id_to_delete = $choice->getId();

        $repo = new ChoiceRepository();
        if (empty($choice_id_to_delete)) {
            throw new InvalidArgumentException('Choice does not exist!');
        }

        $existing_choices = $repo->getChoices();

        $choices_to_save = array_filter($existing_choices, function (Choice $choice) use ($choice_id_to_delete) {
            return $choice->getId() != $choice_id_to_delete;
        });

        $repo->saveChoices($choices_to_save);
    }
}
