export default class Sheep extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene) {
        super(scene, 50, 50, "atlas");

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setActive(true);
        this.setCollideWorldBounds(true);

        // this.addAnimations(scene);
    }

    update(followPosition: Phaser.Math.Vector2) {
        const speed = 100;
        const distance = 100;
        const prevVelocity = this.body.velocity.clone();

        // Stop any previous movement from the last frame
        this.setVelocity(0);

        // Horizontal movement
        if (followPosition.x  + distance < this.body.position.x) {
            this.setVelocityX(-speed);
        } else if (followPosition.x - distance > this.body.position.x) {
            this.setVelocityX(speed);
        }

        // Vertical movement
        if (followPosition.y + distance < this.body.position.y) {
            this.setVelocityY(-speed);
        } else if (followPosition.y - distance > this.body.position.y) {
            this.setVelocityY(speed);
        }

        // Normalize and scale the velocity so that Sheep can't move faster along a diagonal
        this.body.velocity.normalize().scale(speed);

        // // Update the animation last and give left/right animations precedence over up/down animations
        // if (cursors.left.isDown) {
        //     this.anims.play("misa-left-walk", true);
        // } else if (cursors.right.isDown) {
        //     this.anims.play("misa-right-walk", true);
        // } else if (cursors.up.isDown) {
        //     this.anims.play("misa-back-walk", true);
        // } else if (cursors.down.isDown) {
        //     this.anims.play("misa-front-walk", true);
        // } else {
        //     this.anims.stop();

        //     // If we were moving, pick and idle frame to use
        //     if (prevVelocity.x < 0) this.setTexture("atlas", "misa-left");
        //     else if (prevVelocity.x > 0) this.setTexture("atlas", "misa-right");
        //     else if (prevVelocity.y < 0) this.setTexture("atlas", "misa-back");
        //     else if (prevVelocity.y > 0) this.setTexture("atlas", "misa-front");
        // }
    }

    // addAnimations(scene: Phaser.Scene) {
    //     const anims = scene.anims;
    //     anims.create({
    //         key: "misa-left-walk",
    //         frames: anims.generateFrameNames("atlas", {
    //             prefix: "misa-left-walk.",
    //             start: 0,
    //             end: 3,
    //             zeroPad: 3
    //         }),
    //         frameRate: 10,
    //         repeat: -1
    //     });
    //     anims.create({
    //         key: "misa-right-walk",
    //         frames: anims.generateFrameNames("atlas", {
    //             prefix: "misa-right-walk.",
    //             start: 0,
    //             end: 3,
    //             zeroPad: 3
    //         }),
    //         frameRate: 10,
    //         repeat: -1
    //     });
    //     anims.create({
    //         key: "misa-front-walk",
    //         frames: anims.generateFrameNames("atlas", {
    //             prefix: "misa-front-walk.",
    //             start: 0,
    //             end: 3,
    //             zeroPad: 3
    //         }),
    //         frameRate: 10,
    //         repeat: -1
    //     });
    //     anims.create({
    //         key: "misa-back-walk",
    //         frames: anims.generateFrameNames("atlas", {
    //             prefix: "misa-back-walk.",
    //             start: 0,
    //             end: 3,
    //             zeroPad: 3
    //         }),
    //         frameRate: 10,
    //         repeat: -1
    //     });
    // }
}