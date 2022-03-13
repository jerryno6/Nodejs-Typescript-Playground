interface IEvent {
    [key: string]: boolean
}

interface IAutonomousCar {
    isRunning?: boolean;
    respond(events: IEvent): void
}

export interface IAutonomousCarProps {
    isRunning?: boolean;
    steeringControl: ISteering
}

interface IControl {
    execute(command: string): void;
}

interface ISteering extends IControl {
    turn(direction: string): void;
}

export class SteeringControl implements ISteering {
    execute(command: string): void {
        console.log(`Executing: ${command}`);
    }

    turn(direction: string): void {
        this.execute(`turn ${direction}`);
    }
}

export class Car implements IAutonomousCar {
    isRunning;
    steeringControl?: ISteering = undefined;

    constructor(props: IAutonomousCarProps) {
        this.isRunning = props.isRunning;
        this.steeringControl = props.steeringControl;
    }

    respond(events: IEvent): void {
        if (this.isRunning != true) {
            console.log('The vehicle is not running');
            return;
        }

        Object.keys(events).forEach(eventKey => {
            if (!events[eventKey]) return;

            switch (eventKey) {
                case 'ObstacleLeft':
                    this.steeringControl?.turn('right');
                    break;
                case 'ObstacleRight':
                    this.steeringControl?.turn('left');
                    break;
            }
        });
    }
}
