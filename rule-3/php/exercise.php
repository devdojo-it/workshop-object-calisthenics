<?php
class User {
    public function __construct(
        public string $name,
        public string $email,
        public int $age,
        public array $roles, // array of string
        public bool $hasActiveSubscription
    ) {}

    public function canAccessFeature(string $feature): bool {
        if ($this->hasActiveSubscription && in_array('premium', $this->roles)) {
            return true;
        }
        if ($feature === 'basic' && in_array('basic', $this->roles)) {
            return true;
        }
        return false;
    }

    public function isAdult(): bool {
        return $this->age >= 18;
    }
} 