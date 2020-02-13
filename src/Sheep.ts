enum SheepStates {
    MovingToFollowPosition,
    RandomWalking,
    StandingStill
}

export default class Sheep extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "sheep");

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setActive(true);
        this.setCollideWorldBounds(true);
    }

    update(followPosition: Phaser.Math.Vector2) {
        const speed = 60;
        const distance = 100;
        const prevVelocity = this.body.velocity.clone();

        this.setVelocity(0);

        const moveLeft = followPosition.x + distance < this.body.position.x;
        const moveRight = followPosition.x - distance > this.body.position.x;
        const moveUp = followPosition.y + distance < this.body.position.y;
        const moveDown = followPosition.y - distance > this.body.position.y;
        const shouldMoveToFollowPosition = moveLeft || moveRight || moveUp || moveDown;

        switch (this.state) {
            case SheepStates.MovingToFollowPosition:
                if (!shouldMoveToFollowPosition) {
                    this.setState(SheepStates.StandingStill);
                } else {
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
                }
                break;
            case SheepStates.StandingStill:
                if (shouldMoveToFollowPosition) {
                    this.setState(SheepStates.MovingToFollowPosition);
                } else if (Phaser.Math.FloatBetween(0, 1) > 0.99) {
                    this.setState(SheepStates.RandomWalking);
                }
                break;
            case SheepStates.RandomWalking:
                if (Phaser.Math.FloatBetween(0, 1) > 0.99) {
                    this.setState(SheepStates.StandingStill);
                } else if (prevVelocity.x === 0 && prevVelocity.y === 0) {
                    this.setVelocity(Phaser.Math.Between(-speed, speed), Phaser.Math.Between(-speed, speed));
                } else {
                    this.setVelocity(prevVelocity.x, prevVelocity.y);
                }
            default:
                break;
        }

        // Normalize and scale the velocity so that Sheep can't move faster along a diagonal
        this.body.velocity.normalize().scale(speed);

        if (this.body.velocity.x < 0) {
            this.anims.play("sheep-left-walk", true);
        } else if (this.body.velocity.x > 0) {
            this.anims.play("sheep-right-walk", true);
        } else if (this.body.velocity.y < 0) {
            this.anims.play("sheep-up-walk", true);
        } else if (this.body.velocity.y > 0) {
            this.anims.play("sheep-down-walk", true);
        } else {
            this.anims.stop();

            if (prevVelocity.x < 0) this.setTexture("sheep", "sheep-left-idle-0");
            else if (prevVelocity.x > 0) this.setTexture("sheep", "sheep-right-idle-0");
            else if (prevVelocity.y < 0) this.setTexture("sheep", "sheep-up-idle-0");
            else if (prevVelocity.y > 0) this.setTexture("sheep", "sheep-down-idle-0");
        }
    }

    addCollider(scene: Phaser.Scene, object) {
        scene.physics.add.collider(this, object);
    }

    onEat() {
        this.setScale(this.scaleX * 1.2, this.scaleY * 1.2);
    }
}