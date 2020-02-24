import Pickup from './Pickup';
import Sheep from "../sheep/Sheep";

const LIFE_GAIN = -50;

export default class PoisonMushroom extends Pickup {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);
        this.sprite.setTexture("pickups", "pickups-mushroom-bad-0");
    }

    onCollision(self: PoisonMushroom, other: Phaser.GameObjects.GameObject) {
        if (other.type === 'sheep') {
            let sheepSprite = other as Phaser.Physics.Arcade.Sprite;
            sheepSprite.emit('changeLife', LIFE_GAIN);
            self.remove();
        }
    }
}