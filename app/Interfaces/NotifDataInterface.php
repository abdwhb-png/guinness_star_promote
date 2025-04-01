<?php

namespace App\Interfaces;

interface NotifDataInterface
{
    public function setTitle(string $title): void;
    public function setBody(?string $body): void;

    public function getTitle(): string;
    public function getBody(): ?string;

    public function getData(): array;
}
