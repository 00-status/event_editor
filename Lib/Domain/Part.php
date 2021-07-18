<?php

namespace NarrativeEditor\Domain;

use JsonSerializable;

class Part implements JsonSerializable
{
    private ?int $id;
    private int $event_id;
    private string $title;
    private string $description;

    public function __construct(?int $id, int $event_id, string $title, string $description)
    {
        $this->id = $id;
        $this->event_id = $event_id;
        $this->title = $title;
        $this->description = $description;
    }

    public static function fromArray(array $part): self
    {
        return new self(
            $part['id'],
            $part['eventId'],
            $part['title'],
            $part['description']
        );
    }

    public function getDescription()
    {
        return $this->description;
    }

    public function getTitle()
    {
        return $this->title;
    }
 
    public function getEventId()
    {
        return $this->event_id;
    }
    
    public function getId()
    {
        return $this->id;
    }

    public function jsonSerialize()
    {
        return [
            'id' => $this->id,
            'event_id' => $this->event_id,
            'title' => $this->title,
            'description' => $this->description,
        ];
    }
}
