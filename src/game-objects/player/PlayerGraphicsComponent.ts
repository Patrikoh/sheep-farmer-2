import Player from "./Player";
import GraphicsComponent from "../../components/GraphicsComponent";
import depthIndex from '../../depthIndex.json';

export default class PlayerGraphicsComponent extends GraphicsComponent {
    constructor(player: Player, scene: Phaser.Scene, x: number, y: number) {
        super(player, scene, x, y, depthIndex.PLAYER, 'player');
        scene.physics.add.existing(player.sprite);
        player.sprite.setCollideWorldBounds(true);
        player.sprite.setImmovable();
        player.sprite.setSize(24, 30);
    }

    addCollider(player: Player, scene: Phaser.Scene, object: Phaser.GameObjects.GameObject | Phaser.GameObjects.GameObject[] | Phaser.GameObjects.Group | Phaser.GameObjects.Group[]) {
        scene.physics.add.collider(player.sprite, object);
    }
}