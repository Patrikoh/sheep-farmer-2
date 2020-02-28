import 'phaser';

export default abstract class GraphicsComponent {
    abstract addCollider(gameObject, scene: Phaser.Scene, object: Phaser.GameObjects.GameObject | Phaser.GameObjects.GameObject[] | Phaser.GameObjects.Group | Phaser.GameObjects.Group[]): void;
}