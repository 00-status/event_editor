<?php

namespace NarrativeEditor\Domain;

use JsonSerializable;

class Choice implements JsonSerializable
{
    private ?int $id;
    private int $part_id;
    private string $title;
    private ?int $leading_part_id;
    private int $sort_order;

    public function __construct(?int $id, int $part_id, string $title, ?int $leading_part_id, int $sort_order)
    {
        $this->id = $id;
        $this->part_id = $part_id;
        $this->title = $title;
        $this->leading_part_id = $leading_part_id;
        $this->sort_order = $sort_order;
    }

    public static function fromArray(array $choice): self
    {
        return new Choice(
            $choice['id'],
            $choice['partId'],
            $choice['title'],
            $choice['leadingPartId'],
            $choice['sortOrder']
        );
    }

    public function getSortOrder()
    {
        return $this->sort_order;
    }

    public function getLeadingPartId()
    {
        return $this->leading_part_id;
    }

    public function getTitle()
    {
        return $this->title;
    }

    public function getPartId()
    {
        return $this->part_id;
    }

    public function getId()
    {
        return $this->id;
    }

    public function jsonSerialize()
    {
        return [
            'id' => $this->id,
            'part_id' => $this->part_id,
            'title' => $this->title,
            'leading_part_id' => $this->leading_part_id,
            'sort_order' => $this->sort_order,
        ];
    }
}
