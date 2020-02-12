export default class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene: Phaser.Scene) {
        super(scene, 200, 200, "player");

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setActive(true);
        this.setCollideWorldBounds(true);

        this.setImmovable();

        this.setSize(32, 32);

        this.addAnimations(scene);
    }

    update(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
        const speed = 100;
        const prevVelocity = this.body.velocity.clone();

        // Stop any previous movement from the last frame
        this.setVelocity(0);

        // Horizontal movement
        if (cursors.left.isDown) {
            this.setVelocityX(-speed);
        } else if (cursors.right.isDown) {
            this.setVelocityX(speed);
        }

        // Vertical movement
        if (cursors.up.isDown) {
            this.setVelocityY(-speed);
        } else if (cursors.down.isDown) {
            this.setVelocityY(speed);
        }

        // Normalize and scale the velocity so that player can't move faster along a diagonal
        this.body.velocity.normalize().scale(speed);

        // Update the animation last and give left/right animations precedence over up/down animations
        if (cursors.left.isDown) {
            this.anims.play("player-left-walk", true);
        } else if (cursors.right.isDown) {
            this.anims.play("player-right-walk", true);
        } else if (cursors.up.isDown) {
            this.anims.play("player-up-walk", true);
        } else if (cursors.down.isDown) {
            this.anims.play("player-down-walk", true);
        } else {
            this.anims.stop();
            // If we were moving, pick and idle frame to use
            if (prevVelocity.x < 0) this.setTexture("player", "player-left-idle-0");
            else if (prevVelocity.x > 0) this.setTexture("player", "player-right-idle-0");
            else if (prevVelocity.y < 0) this.setTexture("player", "player-up-idle-0");
            else if (prevVelocity.y > 0) this.setTexture("player", "player-down-idle-0");
        }
    }

    addCollider(scene: Phaser.Scene, object) {
        scene.physics.add.collider(this, object);
    }

    addAnimations(scene: Phaser.Scene) {
        const anims = scene.anims;
        anims.create({
            key: "player-down-walk",
            frames: anims.generateFrameNames("player", {
                prefix: "player-down-walk-",
                start: 1,
                end: 12
            }),
            frameRate: 7,
            repeat: -1
        });
        anims.create({
            key: "player-right-walk",
            frames: anims.generateFrameNames("player", {
                prefix: "player-right-walk-",
                start: 1,
                end: 12
            }),
            frameRate: 7,
            repeat: -1
        });
        anims.create({
            key: "player-left-walk",
            frames: anims.generateFrameNames("player", {
                prefix: "player-left-walk-",
                start: 1,
                end: 12
            }),
            frameRate: 7,
            repeat: -1
        });
        anims.create({
            key: "player-up-walk",
            frames: anims.generateFrameNames("player", {
                prefix: "player-up-walk-",
                start: 1,
                end: 12
            }),
            frameRate: 7,
            repeat: -1
        });
    }
}