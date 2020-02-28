import Pickup from "./Pickup";
import GraphicsComponent from "../../components/GraphicsComponent";
import depthIndex from '../../depthIndex.json';

export default class PickupGraphicsComponent extends GraphicsComponent {
    constructor(pickup: Pickup, scene: Phaser.Scene, x: number, y: number) {
        super();
        pickup.sprite = new Phaser.Physics.Arcade.Sprite(scene, x, y, "pickups");
        scene.add.existing(pickup.sprite);
        scene.physics.add.existing(pickup.sprite);
        pickup.sprite.setActive(true);
        pickup.sprite.setImmovable();
        pickup.sprite.setDepth(depthIndex.WORLD + 1);
    }

    addCollider(pickup: Pickup, scene: Phaser.Scene, object: Phaser.GameObjects.GameObject | Phaser.GameObjects.GameObject[] | Phaser.GameObjects.Group | Phaser.GameObjects.Group[]) {
        scene.physics.add.overlap(pickup.sprite, object, (c: Phaser.Physics.Arcade.Sprite, c2) => pickup.onCollision(pickup, c2), null, scene);
    }
}