import Sheep from "./Sheep";

export default class Grass extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "player");

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setActive(true);
        this.setImmovable();
    }

    addCollider(scene: Phaser.Scene, object) {
        scene.physics.add.overlap(this, object, (c: Grass, c2) => this.onCollision(c, c2), null, scene);
    }

    onCollision(collider: Grass, secondCollider) {
        if (secondCollider instanceof Sheep) {
            secondCollider.eat();
        }
        collider.getEaten();
    }

    getEaten() {
        this.destroy();
    }
}