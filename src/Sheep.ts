export default class Sheep extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene) {
        super(scene, 50, 50, "atlas");

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setActive(true);
        this.setCollideWorldBounds(true);
    }

    update(followPosition: Phaser.Math.Vector2) {
        const speed = 100;
        const distance = 100;
        const prevVelocity = this.body.velocity.clone();

        const moveLeft = followPosition.x  + distance < this.body.position.x;
        const moveRight = followPosition.x - distance > this.body.position.x; 
        const moveUp = followPosition.y + distance < this.body.position.y;
        const moveDown = followPosition.y - distance > this.body.position.y;

        // Stop any previous movement from the last frame
        this.setVelocity(0);

        if (moveLeft) {
            this.setVelocityX(-speed);
        } else if (moveRight) {
            this.setVelocityX(speed);
        }

        if (moveUp) {
            this.setVelocityY(-speed);
        } else if (moveDown) {
            this.setVelocityY(speed);
        }

        // Normalize and scale the velocity so that Sheep can't move faster along a diagonal
        this.body.velocity.normalize().scale(speed);

        // Update the animation last and give left/right animations precedence over up/down animations
        if (moveLeft) {
            this.anims.play("misa-left-walk", true);
        } else if (moveRight) {
            this.anims.play("misa-right-walk", true);
        } else if (moveUp) {
            this.anims.play("misa-back-walk", true);
        } else if (moveDown) {
            this.anims.play("misa-front-walk", true);
        } else {
            this.anims.stop();

            // If we were moving, pick and idle frame to use
            if (prevVelocity.x < 0) this.setTexture("atlas", "misa-left");
            else if (prevVelocity.x > 0) this.setTexture("atlas", "misa-right");
            else if (prevVelocity.y < 0) this.setTexture("atlas", "misa-back");
            else if (prevVelocity.y > 0) this.setTexture("atlas", "misa-front");
        }
    }
}