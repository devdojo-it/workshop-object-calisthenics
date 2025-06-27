class Car {
    private _make: string;
    private _model: string;
    private _speed: number;
    private _engineStatus: string;

    constructor(make: string, model: string) {
        this._make = make;
        this._model = model;
        this._speed = 0;
        this._engineStatus = 'off';
    }

    get speed(): number {
        return this._speed;
    }

    set speed(value: number) {
        this._speed = value;
    }

    get engineStatus(): string {
        return this._engineStatus;
    }

    set engineStatus(status: string) {
        if (status !== 'on' && status !== 'off') {
            throw new Error(`Wrong status '${status}'. Engine should be either 'on' or 'off'`);
        }
        if (status === 'off') {
            this._speed = 0;
        }
        this._engineStatus = status;
    }
}

function accelerate(car: Car, delta: number): void {
    if (car.engineStatus === 'off') {
        console.log("La macchina è spenta. Non si può accelerare.");
        return;
    }
    const newSpeed = car.speed + delta;
    if (newSpeed >= 0) {
        car.speed = newSpeed;
    }
}

function decelerate(car: Car, delta: number): void {
    if (car.engineStatus === 'off') {
        console.log("La macchina è spenta. Non si può decelerare.");
        return;
    }
    const newSpeed = car.speed - delta;
    car.speed = newSpeed >= 0 ? newSpeed : 0;
}

// Usage examples
const myCar = new Car('Toyota', 'Corolla');
accelerate(myCar, 20);
myCar.engineStatus = 'on';
console.log("Motore acceso? ", myCar.engineStatus === 'on');
accelerate(myCar, 30);
console.log("Velocità dopo accelerazione:", myCar.speed, "km/h");
decelerate(myCar, 10);
console.log("Velocità dopo decelerazione:", myCar.speed, "km/h");
myCar.engineStatus = 'off';
accelerate(myCar, 20);
decelerate(myCar, 20);
console.log("Velocità con la macchina spenta:", myCar.speed, "km/h"); 