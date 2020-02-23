import Player from "./Player";
import depthIndex from '../depthIndex.json';

export default class GrahicsComponent {
    constructor(player: Player, scene: Phaser.Scene, x: number, y: number) {
        player.sprite = new Phaser.Physics.Arcade.Sprite(scene, x, y, "player");
        scene.add.existing(player.sprite);
        scene.physics.add.existing(player.sprite);
        player.sprite.setActive(true);
        player.sprite.setCollideWorldBounds(true);
        player.sprite.setImmovable();
        player.sprite.setSize(24, 30);
        player.sprite.setDepth(depthIndex.PLAYER);
    }

    addCollider(player: Player, scene: Phaser.Scene, object: Phaser.GameObjects.GameObject | Phaser.GameObjects.GameObject[] | Phaser.GameObjects.Group | Phaser.GameObjects.Group[]) {
        scene.physics.add.collider(player.sprite, object);
    }
}