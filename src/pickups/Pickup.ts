import depthIndex from '../depthIndex.json';

export default abstract class Pickup extends Phaser.Physics.Arcade.Sprite {
    protected constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "pickups");
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setActive(true);
        this.setImmovable();
        this.setDepth(depthIndex.WORLD + 1);
    }

    addCollider(scene: Phaser.Scene, object) {
        scene.physics.add.overlap(this, object, (c: Pickup, c2) => this.onCollision(c, c2), null, scene);
    }

    remove() {
        this.destroy();
    }

    abstract onCollision(self: Pickup, other: Phaser.GameObjects.GameObject): void;
}
