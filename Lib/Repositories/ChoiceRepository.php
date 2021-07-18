<?php

namespace NarrativeEditor\Repositories;

use Exception;
use NarrativeEditor\Domain\Choice;

class ChoiceRepository
{
    private const PATH_TO_CHOICES = './assets/choices.json';
    private const PATH_TO_CHOICES_TEST = './assets/choices_test.json';

    /**
     * @return Choice[]
     */
    public function getChoices(): array
    {
        $choice_data = json_decode(file_get_contents(self::PATH_TO_CHOICES), true);
        $choices = $this->mapChoiceToObject($choice_data);

        return $choices;
    }

    private function mapChoiceToObject(array $data): array
    {
        $choices = [];
        foreach ($data as $choice_entry) {
            $choices[] = new Choice(
                $choice_entry['id'],
                $choice_entry['part_id'],
                $choice_entry['title'],
                $choice_entry['leading_part_id'],
                $choice_entry['sort_order'],
            );
        }

        return $choices;
    }

    /**
     * @param Choice[] $choices
     */
    public function saveChoices(array $choices): void
    {
        if (!file_exists(self::PATH_TO_CHOICES_TEST)) {
            throw new Exception("Choices file does not exist!");
        }

        file_put_contents(self::PATH_TO_CHOICES_TEST, json_encode($choices));
    }
}
