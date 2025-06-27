class Car2 {
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


    isEngineOn(): boolean {
        return this._engineStatus == 'on';
    }

    isEnginOff(): boolean {
        return this._engineStatus == 'off';
    }

    ignite():void  {
        if(this._engineStatus = 'on') {
            throw new Error('Engine already on');
        }

        this._engineStatus = 'on';
    }

    switchOff(): void {
        this._engineStatus ='off';
        this._speed = 0;
    }

    accelerate(delta: number): void {
        if (this.isEnginOff()) {
            console.log("La macchina è spenta. Non si può accelerare.");
            return;
        }

        const newSpeed = this.speed + delta;

        if (newSpeed >= 0) {
            this.speed = newSpeed;
        }
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
const myCar2:Car2 = new Car2('Toyota', 'Corolla');
myCar2.accelerate(20);
myCar2.ignite();
console.log("Motore acceso? ", myCar2.isEngineOn());
myCar2.accelerate(30);

console.log("Velocità dopo accelerazione:", myCar2.speed, "km/h");

myCar2.decelerate(10);
console.log("Velocità dopo decelerazione:", myCar2.speed, "km/h");
myCar2.switchOff();
accelerate(myCar2, 20);
decelerate(myCar2, 20);
console.log("Velocità con la macchina spenta:", myCar2.speed, "km/h"); 