pub struct Car {
    _make: String,
    _model: String,
    _speed: i32,
    _engine_status: String,
}

impl Car {
    pub fn new(make: &str, model: &str) -> Self {
        Car {
            _make: make.to_string(),
            _model: model.to_string(),
            _speed: 0,
            _engine_status: "off".to_string(),
        }
    }

    pub fn get_speed(&self) -> i32 {
        self._speed
    }

    pub fn set_speed(&mut self, value: i32) {
        self._speed = value;
    }

    pub fn get_engine_status(&self) -> &str {
        &self._engine_status
    }

    pub fn set_engine_status(&mut self, status: &str) -> Result<(), String> {
        if status != "on" && status != "off" {
            return Err(format!("Wrong status '{}'. Engine should be either 'on' or 'off'", status));
        }
        if status == "off" {
            self._speed = 0;
        }
        self._engine_status = status.to_string();
        Ok(())
    }
}

pub fn accelerate(car: &mut Car, delta: i32) {
    if car.get_engine_status() == "off" {
        println!("La macchina è spenta. Non si può accelerare.");
        return;
    }
    let new_speed = car.get_speed() + delta;
    if new_speed >= 0 {
        car.set_speed(new_speed);
    }
}

pub fn decelerate(car: &mut Car, delta: i32) {
    if car.get_engine_status() == "off" {
        println!("La macchina è spenta. Non si può decelerare.");
        return;
    }
    let new_speed = car.get_speed() - delta;
    car.set_speed(if new_speed >= 0 { new_speed } else { 0 });
}

fn main() {
    let mut my_car = Car::new("Toyota", "Corolla");
    accelerate(&mut my_car, 20);
    my_car.set_engine_status("on").unwrap();
    println!("Motore acceso? {}", my_car.get_engine_status() == "on");
    accelerate(&mut my_car, 30);
    println!("Velocità dopo accelerazione: {} km/h", my_car.get_speed());
    decelerate(&mut my_car, 10);
    println!("Velocità dopo decelerazione: {} km/h", my_car.get_speed());
    my_car.set_engine_status("off").unwrap();
    accelerate(&mut my_car, 20);
    decelerate(&mut my_car, 20);
    println!("Velocità con la macchina spenta: {} km/h", my_car.get_speed());
} 