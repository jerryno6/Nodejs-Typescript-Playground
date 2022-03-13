import { getObstacleEvents } from './computer-vision';
import { Car, SteeringControl, IAutonomousCarProps } from './Models/Car'


let steeringControl = new SteeringControl();
let carProps: IAutonomousCarProps = { isRunning: true, steeringControl: steeringControl };

let autonomousCar = new Car(carProps);
let event = getObstacleEvents();
autonomousCar.respond(event);