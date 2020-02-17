import Pickup from './Pickup';
import Sheep from "../Sheep";

const HEALTH_GAIN = -5;

export default class PoisonMushroom extends Pickup {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);
        this.setTexture("pickups", "pickups-mushroom-bad-0");
    }

    onCollision(self: PoisonMushroom, other) {
        if (other instanceof Sheep) {
        }
        self.remove();
    }
}