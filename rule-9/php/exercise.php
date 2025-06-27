<?php
class Car {
    private string $_make;
    private string $_model;
    private int $_speed;
    private string $_engineStatus;

    public function __construct(string $make, string $model) {
        $this->_make = $make;
        $this->_model = $model;
        $this->_speed = 0;
        $this->_engineStatus = 'off';
    }

    public function getSpeed(): int {
        return $this->_speed;
    }

    public function setSpeed(int $value): void {
        $this->_speed = $value;
    }

    public function getEngineStatus(): string {
        return $this->_engineStatus;
    }

    public function setEngineStatus(string $status): void {
        if ($status !== 'on' && $status !== 'off') {
            throw new Exception("Wrong status '$status'. Engine should be either 'on' or 'off'");
        }
        if ($status === 'off') {
            $this->_speed = 0;
        }
        $this->_engineStatus = $status;
    }
}

function accelerate(Car $car, int $delta): void {
    if ($car->getEngineStatus() === 'off') {
        echo "La macchina è spenta. Non si può accelerare.\n";
        return;
    }
    $newSpeed = $car->getSpeed() + $delta;
    if ($newSpeed >= 0) {
        $car->setSpeed($newSpeed);
    }
}

function decelerate(Car $car, int $delta): void {
    if ($car->getEngineStatus() === 'off') {
        echo "La macchina è spenta. Non si può decelerare.\n";
        return;
    }
    $newSpeed = $car->getSpeed() - $delta;
    $car->setSpeed($newSpeed >= 0 ? $newSpeed : 0);
}

// Usage examples
$myCar = new Car('Toyota', 'Corolla');
accelerate($myCar, 20);
$myCar->setEngineStatus('on');
echo "Motore acceso? " . ($myCar->getEngineStatus() === 'on' ? 'true' : 'false') . "\n";
accelerate($myCar, 30);
echo "Velocità dopo accelerazione: " . $myCar->getSpeed() . " km/h\n";
decelerate($myCar, 10);
echo "Velocità dopo decelerazione: " . $myCar->getSpeed() . " km/h\n";
$myCar->setEngineStatus('off');
accelerate($myCar, 20);
decelerate($myCar, 20);
echo "Velocità con la macchina spenta: " . $myCar->getSpeed() . " km/h\n"; 