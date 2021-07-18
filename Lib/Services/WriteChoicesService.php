<?php

namespace NarrativeEditor\Services;

use NarrativeEditor\Domain\Choice;
use NarrativeEditor\Repositories\ChoiceRepository;

class WriteChoicesService
{
    /**
     * @param Choice[] $choices
     */
    public function writeChoices(array $choices): void
    {
        $choice_repository = new ChoiceRepository();

        $existing_choices = $choice_repository->getChoices();

        $choice_ids = array_map(fn(Choice $choice) => $choice->getId(), $existing_choices);
        $max_id = max($choice_ids);

        $choices_to_save = $existing_choices;
        /** @var Choice $choice */
        foreach($choices as $choice)
        {
            if (empty($choice->getId())) {
                $choices_to_save[] = new Choice(
                    ++$max_id,
                    $choice->getPartId(),
                    $choice->getTitle(),
                    $choice->getLeadingPartId(),
                    $choice->getSortOrder()
                );
            } else {
                $choices_to_save = array_reduce($choices_to_save, function (
                    array $acc,
                    Choice $existing_choice
                    ) use ($choice) {
                        if ($choice->getId() === $existing_choice->getId()) {
                            $acc[] = $choice;
                        } else {
                            $acc[] = $existing_choice;
                        }

                        return $acc;
                    }, []);
            }
        }

        $choice_repository->saveChoices($choices_to_save);
    }
}
