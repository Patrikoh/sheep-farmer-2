import 'phaser';

export default abstract class GraphicsComponent {
    constructor(gameObject, scene: Phaser.Scene, x: number, y: number, depth: number, texture: string) {
        gameObject.sprite = new Phaser.Physics.Arcade.Sprite(scene, x, y, texture);
        scene.add.existing(gameObject.sprite);
        gameObject.sprite.setActive(true);
        gameObject.sprite.setDepth(depth);
    }

    abstract addCollider(gameObject, scene: Phaser.Scene, object: Phaser.GameObjects.GameObject | Phaser.GameObjects.GameObject[] | Phaser.GameObjects.Group | Phaser.GameObjects.Group[]): void;

}
