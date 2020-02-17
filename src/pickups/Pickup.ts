import Sheep from "../Sheep";

export default abstract class Pickup extends Phaser.Physics.Arcade.Sprite {
    protected constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "pickups");
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setActive(true);
        this.setImmovable();
    }

    addCollider(scene: Phaser.Scene, object) {
        scene.physics.add.overlap(this, object, (c: Pickup, c2) => this.onCollision(c, c2), null, scene);
    }

    remove() {
        this.destroy();
    }

    abstract onCollision(self: Pickup, other)
}
