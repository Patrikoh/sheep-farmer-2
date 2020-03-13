import Pickup from './Pickup';
import GameEvent from '../../events/GameEvent';
import { GameEventType } from '../../events/GameEventType';
import GameEventHandler from '../../events/GameEventHandler';

const LIFE_GAIN = -50;

export default class PoisonMushroom extends Pickup {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);
        this.sprite.setTexture("pickups", "pickups-mushroom-bad-0");
    }

    onCollision(self: PoisonMushroom, other: Phaser.GameObjects.GameObject, gameEventHandler: GameEventHandler) {
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