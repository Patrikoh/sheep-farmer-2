import 'phaser';

export default abstract class GrahicsComponent {
    constructor(gameObject, scene: Phaser.Scene, x: number, y: number) { };
    abstract addCollider(gameObject, scene: Phaser.Scene, object: Phaser.GameObjects.GameObject | Phaser.GameObjects.GameObject[] | Phaser.GameObjects.Group | Phaser.GameObjects.Group[]): void;
}