import GraphicsComponent from './PickupGraphicsComponent';

export default abstract class Pickup {
    private graphicsComponent: GraphicsComponent;

    sprite: Phaser.Physics.Arcade.Sprite;

    protected constructor(scene: Phaser.Scene, x: number, y: number) {
        this.graphicsComponent = new GraphicsComponent(this, scene, x, y);
    }

    addCollider(scene: Phaser.Scene, object: Phaser.GameObjects.GameObject | Phaser.GameObjects.GameObject[] | Phaser.GameObjects.Group | Phaser.GameObjects.Group[]) {
        this.graphicsComponent.addCollider(this, scene, object);
    }

    abstract onCollision(self: Pickup, other: Phaser.GameObjects.GameObject): void;

    remove() {
        this.sprite.destroy();
    }
}
