import depthIndex from './depthIndex.json';

export default class Player {
    private sprite: Phaser.Physics.Arcade.Sprite;

    constructor(scene: Phaser.Scene, x: number, y: number) {

        this.sprite = new Phaser.Physics.Arcade.Sprite(scene, x, y, "player");
        scene.add.existing(this.sprite);
        scene.physics.add.existing(this.sprite);
        this.sprite.setActive(true);
        this.sprite.setCollideWorldBounds(true);
        this.sprite.setImmovable();
        this.sprite.setSize(24, 30);
        this.sprite.setDepth(depthIndex.PLAYER);

        this.addAnimations(scene);
    }

    update(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
        const speed = 100;
        const runspeed = 200;
        const prevVelocity = this.sprite.body.velocity.clone();

        // Stop any previous movement from the last frame
        this.sprite.setVelocity(0);

        // Horizontal movement
        if (cursors.left.isDown) {
            this.sprite.setVelocityX(-speed);
        } else if (cursors.right.isDown) {
            this.sprite.setVelocityX(speed);
        }

        // Vertical movement
        if (cursors.up.isDown) {
            this.sprite.setVelocityY(-speed);
        } else if (cursors.down.isDown) {
            this.sprite.setVelocityY(speed);
        }

        // Normalize and scale the velocity so that player can't move faster along a diagonal
        this.sprite.body.velocity.normalize().scale(speed);
        if (cursors.shift.isDown) {
            this.sprite.body.velocity.normalize().scale(runspeed);
        }

        // Update the animation last and give left/right animations precedence over up/down animations
        if (cursors.left.isDown) {
            this.sprite.anims.play("player-left-walk", true);
        } else if (cursors.right.isDown) {
            this.sprite.anims.play("player-right-walk", true);
        } else if (cursors.up.isDown) {
            this.sprite.anims.play("player-up-walk", true);
        } else if (cursors.down.isDown) {
            this.sprite.anims.play("player-down-walk", true);
        } else {
            this.sprite.anims.stop();
            // If we were moving, pick and idle frame to use
            if (prevVelocity.x < 0) this.sprite.setTexture("player", "player-left-idle-0");
            else if (prevVelocity.x > 0) this.sprite.setTexture("player", "player-right-idle-0");
            else if (prevVelocity.y < 0) this.sprite.setTexture("player", "player-up-idle-0");
            else if (prevVelocity.y > 0) this.sprite.setTexture("player", "player-down-idle-0");
        }
    }

    getPosition(): Phaser.Math.Vector2 {
        return this.sprite.body.position;
    }

    getSprite(): Phaser.Physics.Arcade.Sprite {
        return this.sprite;
    }

    addCollider(scene: Phaser.Scene, object) {
        scene.physics.add.collider(this.sprite, object);
    }

    addAnimations(scene: Phaser.Scene) {
        const anims = scene.anims;
        anims.create({
            key: "player-down-walk",
            frames: anims.generateFrameNames("player", {
                prefix: "player-down-walk-",
                start: 0,
                end: 11
            }),
            frameRate: 7,
            repeat: -1
        });
        anims.create({
            key: "player-right-walk",
            frames: anims.generateFrameNames("player", {
                prefix: "player-right-walk-",
                start: 0,
                end: 11
            }),
            frameRate: 7,
            repeat: -1
        });
        anims.create({
            key: "player-left-walk",
            frames: anims.generateFrameNames("player", {
                prefix: "player-left-walk-",
                start: 0,
                end: 11
            }),
            frameRate: 7,
            repeat: -1
        });
        anims.create({
            key: "player-up-walk",
            frames: anims.generateFrameNames("player", {
                prefix: "player-up-walk-",
                start: 0,
                end: 11
            }),
            frameRate: 7,
            repeat: -1
        });
    }
}