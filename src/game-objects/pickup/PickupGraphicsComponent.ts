import Pickup from "./Pickup";
import GraphicsComponent from "../../components/GraphicsComponent";
import depthIndex from '../../depthIndex.json';
import MainScene from "../../MainScene";

export default class PickupGraphicsComponent extends GraphicsComponent {
    constructor(pickup: Pickup, scene: Phaser.Scene, x: number, y: number) {
        super(pickup, scene, x, y, depthIndex.WORLD + 1, 'pickups');
        scene.physics.add.existing(pickup.sprite);
    }

    addCollider(pickup: Pickup, scene: MainScene, object: Phaser.GameObjects.GameObject | Phaser.GameObjects.GameObject[] | Phaser.GameObjects.Group | Phaser.GameObjects.Group[]) {
        scene.physics.add.overlap(pickup.sprite, object, (c: Phaser.Physics.Arcade.Sprite, c2) => pickup.onCollision(pickup, c2, scene.world.gameEventHandler), null, scene.game);
    }
}