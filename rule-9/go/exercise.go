package main

import (
	"fmt"
	"errors"
)

type Car struct {
	_make        string
	_model       string
	_speed       int
	_engineStatus string
}

func NewCar(make, model string) *Car {
	return &Car{
		_make:        make,
		_model:       model,
		_speed:       0,
		_engineStatus: "off",
	}
}

func (c *Car) GetSpeed() int {
	return c._speed
}

func (c *Car) SetSpeed(value int) {
	c._speed = value
}

func (c *Car) GetEngineStatus() string {
	return c._engineStatus
}

func (c *Car) SetEngineStatus(status string) error {
	if status != "on" && status != "off" {
		return errors.New(fmt.Sprintf("Wrong status '%s'. Engine should be either 'on' or 'off'", status))
	}
	if status == "off" {
		c._speed = 0
	}
	c._engineStatus = status
	return nil
}

func accelerate(car *Car, delta int) {
	if car.GetEngineStatus() == "off" {
		fmt.Println("La macchina è spenta. Non si può accelerare.")
		return
	}
	newSpeed := car.GetSpeed() + delta
	if newSpeed >= 0 {
		car.SetSpeed(newSpeed)
	}
}

func decelerate(car *Car, delta int) {
	if car.GetEngineStatus() == "off" {
		fmt.Println("La macchina è spenta. Non si può decelerare.")
		return
	}
	newSpeed := car.GetSpeed() - delta
	if newSpeed >= 0 {
		car.SetSpeed(newSpeed)
	} else {
		car.SetSpeed(0)
	}
}

func main() {
	myCar := NewCar("Toyota", "Corolla")
	accelerate(myCar, 20)
	myCar.SetEngineStatus("on")
	fmt.Printf("Motore acceso? %t\n", myCar.GetEngineStatus() == "on")
	accelerate(myCar, 30)
	fmt.Printf("Velocità dopo accelerazione: %d km/h\n", myCar.GetSpeed())
	decelerate(myCar, 10)
	fmt.Printf("Velocità dopo decelerazione: %d km/h\n", myCar.GetSpeed())
	myCar.SetEngineStatus("off")
	accelerate(myCar, 20)
	decelerate(myCar, 20)
	fmt.Printf("Velocità con la macchina spenta: %d km/h\n", myCar.GetSpeed())
} 