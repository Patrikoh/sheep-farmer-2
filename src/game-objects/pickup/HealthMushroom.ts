import Pickup from './Pickup';
import Sheep from "../sheep/Sheep";

const LIFE_GAIN = 5;

export default class HealthMushroom extends Pickup {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);
        this.sprite.setTexture("pickups", "pickups-mushroom-good-0");
    }

    onCollision(self: HealthMushroom, other: Phaser.GameObjects.GameObject) {
        if (other instanceof Sheep) {
            other.changeLife(LIFE_GAIN);
        }
        self.remove();
    }
}