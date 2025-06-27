class Car:
    def __init__(self, make: str, model: str):
        self._make = make
        self._model = model
        self._speed = 0
        self._engine_status = 'off'

    @property
    def speed(self) -> int:
        return self._speed

    @speed.setter
    def speed(self, value: int):
        self._speed = value

    @property
    def engine_status(self) -> str:
        return self._engine_status

    @engine_status.setter
    def engine_status(self, status: str):
        if status not in ['on', 'off']:
            raise ValueError(f"Wrong status '{status}'. Engine should be either 'on' or 'off'")
        if status == 'off':
            self._speed = 0
        self._engine_status = status

def accelerate(car: Car, delta: int) -> None:
    if car.engine_status == 'off':
        print("La macchina è spenta. Non si può accelerare.")
        return
    new_speed = car.speed + delta
    if new_speed >= 0:
        car.speed = new_speed

def decelerate(car: Car, delta: int) -> None:
    if car.engine_status == 'off':
        print("La macchina è spenta. Non si può decelerare.")
        return
    new_speed = car.speed - delta
    car.speed = new_speed if new_speed >= 0 else 0

# Usage examples
my_car = Car('Toyota', 'Corolla')
accelerate(my_car, 20)
my_car.engine_status = 'on'
print(f"Motore acceso? {my_car.engine_status == 'on'}")
accelerate(my_car, 30)
print(f"Velocità dopo accelerazione: {my_car.speed} km/h")
decelerate(my_car, 10)
print(f"Velocità dopo decelerazione: {my_car.speed} km/h")
my_car.engine_status = 'off'
accelerate(my_car, 20)
decelerate(my_car, 20)
print(f"Velocità con la macchina spenta: {my_car.speed} km/h") 