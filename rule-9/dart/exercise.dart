class Car {
  String _make;
  String _model;
  int _speed;
  String _engineStatus;

  Car(this._make, this._model)
      : _speed = 0,
        _engineStatus = 'off';

  int get speed => _speed;
  set speed(int value) => _speed = value;

  String get engineStatus => _engineStatus;
  set engineStatus(String status) {
    if (status != 'on' && status != 'off') {
      throw ArgumentError('Wrong status \'$status\'. Engine should be either \'on\' or \'off\'');
    }
    if (status == 'off') {
      _speed = 0;
    }
    _engineStatus = status;
  }
}

void accelerate(Car car, int delta) {
  if (car.engineStatus == 'off') {
    print('La macchina è spenta. Non si può accelerare.');
    return;
  }
  int newSpeed = car.speed + delta;
  if (newSpeed >= 0) {
    car.speed = newSpeed;
  }
}

void decelerate(Car car, int delta) {
  if (car.engineStatus == 'off') {
    print('La macchina è spenta. Non si può decelerare.');
    return;
  }
  int newSpeed = car.speed - delta;
  car.speed = newSpeed >= 0 ? newSpeed : 0;
}

void main() {
  Car myCar = Car('Toyota', 'Corolla');
  accelerate(myCar, 20);
  myCar.engineStatus = 'on';
  print('Motore acceso? ${myCar.engineStatus == 'on'}');
  accelerate(myCar, 30);
  print('Velocità dopo accelerazione: ${myCar.speed} km/h');
  decelerate(myCar, 10);
  print('Velocità dopo decelerazione: ${myCar.speed} km/h');
  myCar.engineStatus = 'off';
  accelerate(myCar, 20);
  decelerate(myCar, 20);
  print('Velocità con la macchina spenta: ${myCar.speed} km/h');
} 