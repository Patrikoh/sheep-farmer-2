import Sheep from "./Sheep";
import { SheepHealthState } from './SheepHealthState';
import GameEventHandler from "../../events/GameEventHandler";
import { GameEventType } from "../../events/GameEventType";
import GameEvent from "../../events/GameEvent";

export default class SheepHealthComponent {

    constructor(sheep: Sheep) {
        this.setHealthState(sheep, 100, 100);
    }

    changeLife(sheep: Sheep, gameEventHandler: GameEventHandler, lifeDiff: number) {
        let previousHealth = sheep.healthState;
        let life = Math.min(previousHealth.life + lifeDiff, previousHealth.maxLife);
        if (life <= 0) {
            sheep.healthState = { ...previousHealth, life: 0 };
            sheep.kill(gameEventHandler);
        } else {
            sheep.healthState = { ...previousHealth, life };
        }
    }

    addGameEventListeners(sheep: Sheep, gameEventHandler: GameEventHandler) {
        gameEventHandler.addGameEventListener(GameEventType.WOLF_ATTACK_SHEEP,
            (event: GameEvent) => {
                if (event.detail.sheepSprite.getData('id') === sheep.id) {
                    sheep.changeLife(gameEventHandler, event.detail.lifeGain);
                }
            }
        );
        gameEventHandler.addGameEventListener(GameEventType.SHEEP_EAT_PICKUP,
            (event: GameEvent) => {
                if (event.detail.sheepSprite.getData('id') === sheep.id) {
                    sheep.changeLife(gameEventHandler, event.detail.lifeGain);
                }
            }
        );
    }

    private setHealthState(sheep: Sheep, maxLife: number, life: number) {
        sheep.healthState = { maxLife, life };
    }

}