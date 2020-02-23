import GraphicsComponent from "../components/GraphicsComponent";
import Wolf from "./Wolf";
import Sheep from "../Sheep";

const LIFE_GAIN = -10;

export default class WolfGraphicsComponent implements GraphicsComponent {
    constructor(wolf: Wolf, scene: Phaser.Scene, x: number, y: number) {
        wolf.sprite = new Phaser.Physics.Arcade.Sprite(scene, x, y, "player");
        scene.add.existing(wolf.sprite);
        scene.physics.add.existing(wolf.sprite);
        wolf.sprite.setActive(true);
        wolf.sprite.setCollideWorldBounds(true);
    }

    addCollider(wolf: Wolf, scene: Phaser.Scene, object: Phaser.GameObjects.GameObject | Phaser.GameObjects.GameObject[] | Phaser.GameObjects.Group | Phaser.GameObjects.Group[]) {
        scene.physics.add.collider(wolf.sprite, object, (c: Phaser.Physics.Arcade.Sprite, c2) => this.onCollision(wolf, c, c2, scene), null, scene);
    }

    onCollision(wolf: Wolf, wolfSprite: Phaser.Physics.Arcade.Sprite, other: Phaser.GameObjects.GameObject, scene: Phaser.Scene) {
        if (other instanceof Sheep) {
            // TODO: Move this to Sheep?
            other.changeLife(LIFE_GAIN);
            wolf.setWalkAwayState(scene.time.now, other.x, other.y);
        }
    }
}