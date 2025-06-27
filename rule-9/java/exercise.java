public class Car {
    private String _make;
    private String _model;
    private int _speed;
    private String _engineStatus;

    public Car(String make, String model) {
        this._make = make;
        this._model = model;
        this._speed = 0;
        this._engineStatus = "off";
    }

    public int getSpeed() {
        return _speed;
    }

    public void setSpeed(int value) {
        _speed = value;
    }

    public String getEngineStatus() {
        return _engineStatus;
    }

    public void setEngineStatus(String status) {
        if (!status.equals("on") && !status.equals("off")) {
            throw new IllegalArgumentException("Wrong status '" + status + "'. Engine should be either 'on' or 'off'");
        }
        if (status.equals("off")) {
            _speed = 0;
        }
        _engineStatus = status;
    }

    public static void accelerate(Car car, int delta) {
        if (car.getEngineStatus().equals("off")) {
            System.out.println("La macchina è spenta. Non si può accelerare.");
            return;
        }
        int newSpeed = car.getSpeed() + delta;
        if (newSpeed >= 0) {
            car.setSpeed(newSpeed);
        }
    }

    public static void decelerate(Car car, int delta) {
        if (car.getEngineStatus().equals("off")) {
            System.out.println("La macchina è spenta. Non si può decelerare.");
            return;
        }
        int newSpeed = car.getSpeed() - delta;
        car.setSpeed(newSpeed >= 0 ? newSpeed : 0);
    }

    public static void main(String[] args) {
        Car myCar = new Car("Toyota", "Corolla");
        accelerate(myCar, 20);
        myCar.setEngineStatus("on");
        System.out.println("Motore acceso? " + (myCar.getEngineStatus().equals("on")));
        accelerate(myCar, 30);
        System.out.println("Velocità dopo accelerazione: " + myCar.getSpeed() + " km/h");
        decelerate(myCar, 10);
        System.out.println("Velocità dopo decelerazione: " + myCar.getSpeed() + " km/h");
        myCar.setEngineStatus("off");
        accelerate(myCar, 20);
        decelerate(myCar, 20);
        System.out.println("Velocità con la macchina spenta: " + myCar.getSpeed() + " km/h");
    }
} 