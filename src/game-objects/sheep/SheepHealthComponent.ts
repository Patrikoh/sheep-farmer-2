import Sheep from "./Sheep";
import { SheepHealthState } from './SheepHealthState';
import GameEventHandler from "../../events/GameEventHandler";
import { GameEventType } from "../../events/GameEventType";
import GameEvent from "../../events/GameEvent";

export default class SheepHealthComponent {

    constructor(sheep: Sheep) {
        this.setHealthState(sheep, 100, 100);
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

    addGameEventListeners(sheep: Sheep, gameEventHandler: GameEventHandler) {
        gameEventHandler.addGameEventListener(GameEventType.WOLF_ATTACK_SHEEP,
            (event: GameEvent) => {
                if (event.detail.sheepSprite.getData('id') === sheep.id) {
                    sheep.changeLife(event.detail.lifeGain);
                }
            }
        );
    }

    private setHealthState(sheep: Sheep, maxLife: number, life: number) {
        sheep.healthState = { maxLife, life };
    }

}