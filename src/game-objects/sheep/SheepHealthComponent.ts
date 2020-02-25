import Sheep from "./Sheep";
import { SheepHealthState } from './SheepHealthState';

export default class SheepAnimationComponent {
    constructor(sheep: Sheep) {
        this.setHealthState(sheep, 100, 100);
    }

    update(sheep: Sheep) {
    }

    changeLife(sheep: Sheep, lifeDiff: number) {
        let previousHealth = sheep.healthState;
        let life = Math.min(previousHealth.life + lifeDiff, previousHealth.maxLife);
        if (life <= 0) {
            sheep.kill();
        } else {
            let healthState: SheepHealthState = { ...previousHealth, life };
            sheep.healthState = healthState;
        }
    }

    private setHealthState(sheep: Sheep, maxLife: number, life: number) {
        sheep.healthState = { maxLife, life };
    }

}