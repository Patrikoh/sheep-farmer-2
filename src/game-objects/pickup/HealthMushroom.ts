import Pickup from './Pickup';
import GameEvent from '../../events/GameEvent';
import { GameEventType } from '../../events/GameEventType';
import GameEventHandler from '../../events/GameEventHandler';

const LIFE_GAIN = 5;

export default class HealthMushroom extends Pickup {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);
        this.sprite.setTexture("pickups", "pickups-mushroom-good-0");
    }

    onCollision(self: HealthMushroom, other: Phaser.GameObjects.GameObject, gameEventHandler: GameEventHandler) {
        if (other.type === 'sheep') {
            let gameEvent: GameEvent = {
                type: GameEventType.SHEEP_EAT_PICKUP,
                detail: {
                    lifeGain: LIFE_GAIN,
                    sheepSprite: other
                }
            };
            gameEventHandler.dispatchGameEvent(gameEvent);
            self.remove();
        }
    }
}