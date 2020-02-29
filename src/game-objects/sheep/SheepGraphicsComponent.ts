import GraphicsComponent from "../../components/GraphicsComponent";
import Sheep from "./Sheep";
import depthIndex from '../../depthIndex.json';
import MainScene from "../../MainScene";
import { GameEventType } from "../../events/GameEventType";

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export default class SheepGraphicsComponent extends GraphicsComponent {
    constructor(sheep: Sheep, scene: MainScene, x: number, y: number) {
        super(sheep, scene, x, y, depthIndex.WORLD + 1, 'sheep');
        sheep.id = uuidv4();
        sheep.sprite.setData('id', sheep.id);
        sheep.sprite.type = 'sheep';
        scene.physics.add.existing(sheep.sprite);
        sheep.sprite.setCollideWorldBounds(true);
        sheep.sprite.addListener('changeLife', (lifeDiff: number) => sheep.changeLife(lifeDiff));
    }

    addCollider(sheep: Sheep, scene: Phaser.Scene, object: Phaser.GameObjects.GameObject | Phaser.GameObjects.GameObject[] | Phaser.GameObjects.Group | Phaser.GameObjects.Group[]) {
        scene.physics.add.collider(sheep.sprite, object);
    }
}