#include <string>
#include <iostream>
#include <stdexcept>

class Car {
private:
    std::string _make;
    std::string _model;
    int _speed;
    std::string _engineStatus;

public:
    Car(const std::string& make, const std::string& model) 
        : _make(make), _model(model), _speed(0), _engineStatus("off") {}

    int getSpeed() const { return _speed; }
    void setSpeed(int value) { _speed = value; }

    std::string getEngineStatus() const { return _engineStatus; }
    void setEngineStatus(const std::string& status) {
        if (status != "on" && status != "off") {
            throw std::invalid_argument("Wrong status '" + status + "'. Engine should be either 'on' or 'off'");
        }
        if (status == "off") {
            _speed = 0;
        }
        _engineStatus = status;
    }
};

void accelerate(Car& car, int delta) {
    if (car.getEngineStatus() == "off") {
        std::cout << "La macchina è spenta. Non si può accelerare." << std::endl;
        return;
    }
    int newSpeed = car.getSpeed() + delta;
    if (newSpeed >= 0) {
        car.setSpeed(newSpeed);
    }
}

void decelerate(Car& car, int delta) {
    if (car.getEngineStatus() == "off") {
        std::cout << "La macchina è spenta. Non si può decelerare." << std::endl;
        return;
    }
    int newSpeed = car.getSpeed() - delta;
    car.setSpeed(newSpeed >= 0 ? newSpeed : 0);
}

int main() {
    Car myCar("Toyota", "Corolla");
    accelerate(myCar, 20);
    myCar.setEngineStatus("on");
    std::cout << "Motore acceso? " << (myCar.getEngineStatus() == "on" ? "true" : "false") << std::endl;
    accelerate(myCar, 30);
    std::cout << "Velocità dopo accelerazione: " << myCar.getSpeed() << " km/h" << std::endl;
    decelerate(myCar, 10);
    std::cout << "Velocità dopo decelerazione: " << myCar.getSpeed() << " km/h" << std::endl;
    myCar.setEngineStatus("off");
    accelerate(myCar, 20);
    decelerate(myCar, 20);
    std::cout << "Velocità con la macchina spenta: " << myCar.getSpeed() << " km/h" << std::endl;
    return 0;
} 