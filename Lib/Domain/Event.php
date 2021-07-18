<?php

namespace NarrativeEditor\Domain;

use JsonSerializable;

class Event implements JsonSerializable
{
    /** @var Part[] $parts */
    private array $parts;

    /** @var Choice[] $choices */
    private array $choices;
    
    /**
     * @param Part[] $parts
     * @param Choice[] $choices
     */
    public function __construct(array $parts, array $choices)
    {
        $this->parts = $parts;
        $this->choices = $choices;
    }

    /**
     * @return Choice[]
     */ 
    public function getChoices(): array
    {
        return $this->choices;
    }

    /**
     * @return Part[]
     */
    public function getParts(): array
    {
        return $this->parts;
    }

    public function jsonSerialize(): array
    {
        return [
            'parts' => $this->parts,
            'choices' => $this->choices,
        ];
    }
}
