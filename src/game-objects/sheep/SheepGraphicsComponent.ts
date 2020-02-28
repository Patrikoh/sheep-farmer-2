import GraphicsComponent from "../../components/GraphicsComponent";
import Sheep from "./Sheep";

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export default class SheepGraphicsComponent extends GraphicsComponent {
    constructor(sheep: Sheep, scene: Phaser.Scene, x: number, y: number) {
        super();
        sheep.id = uuidv4();
        sheep.sprite = new Phaser.Physics.Arcade.Sprite(scene, x, y, "sheep");
        sheep.sprite.setData('id', sheep.id);
        sheep.sprite.type = 'sheep';
        sheep.sprite.addListener('changeLife', (lifeDiff: number) => sheep.changeLife(lifeDiff));

        scene.add.existing(sheep.sprite);
        scene.physics.add.existing(sheep.sprite);
        sheep.sprite.setActive(true);
        sheep.sprite.setCollideWorldBounds(true);
    }

    addCollider(sheep: Sheep, scene: Phaser.Scene, object: Phaser.GameObjects.GameObject | Phaser.GameObjects.GameObject[] | Phaser.GameObjects.Group | Phaser.GameObjects.Group[]) {
        scene.physics.add.collider(sheep.sprite, object);
    }
}