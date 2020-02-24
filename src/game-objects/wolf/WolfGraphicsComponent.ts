import GraphicsComponent from "../../components/GraphicsComponent";
import Wolf from "./Wolf";
import { WolfMovementTypes } from './WolfMovementTypes';
import Sheep from "../sheep/Sheep";

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

    onCollision(wolf: Wolf, wolfSprite: Phaser.Physics.Arcade.Sprite, other, scene: Phaser.Scene) {
        if (other.type === 'sheep') {
            let sheepSprite = other as Phaser.Physics.Arcade.Sprite;
            sheepSprite.emit('changeLife', LIFE_GAIN);
            this.setWalkAwayState(wolf, scene.time.now, sheepSprite.x, sheepSprite.y);
        }
    }

    setWalkAwayState(wolf: Wolf, time: number, x: number, y: number) {
        wolf.movementState = {
            movementType: WolfMovementTypes.WalkAway,
            stopTime: time + Phaser.Math.Between(200, 500),
            position: { x, y }
        };
    }
}