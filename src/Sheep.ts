enum SheepStates {
    MovingToPlayer,
    RandomWalking,
    StandingStill
}

export default class Sheep extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "player");

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setActive(true);
        this.setCollideWorldBounds(true);
    }

    update(followPosition: Phaser.Math.Vector2) {
        const speed = 60;
        const distance = 50;
        const prevVelocity = this.body.velocity.clone();

        // Stop any previous movement from the last frame
        this.setVelocity(0);

        const moveLeft = followPosition.x + distance < this.body.position.x;
        const moveRight = followPosition.x - distance > this.body.position.x;
        const moveUp = followPosition.y + distance < this.body.position.y;
        const moveDown = followPosition.y - distance > this.body.position.y;
        const shouldMoveToPlayer = moveLeft || moveRight || moveUp || moveDown;

        if (shouldMoveToPlayer && this.state !== SheepStates.MovingToPlayer) {
            this.setState(SheepStates.MovingToPlayer);
        } else if (!shouldMoveToPlayer && this.state === SheepStates.MovingToPlayer) {
            this.setState(SheepStates.StandingStill);
        }

        switch (this.state) {
            case SheepStates.MovingToPlayer:
                console.log('MovingToPlayer');
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
                break;
            case SheepStates.StandingStill:
                console.log('StandingStill');
                if (Phaser.Math.FloatBetween(0, 1) > 0.99) {
                    this.setState(SheepStates.RandomWalking);
                }
                break;
            case SheepStates.RandomWalking:
                console.log('RandomWalking');
                if (Phaser.Math.FloatBetween(0, 1) > 0.99) {
                    this.setState(SheepStates.StandingStill);
                }
                if (prevVelocity.x === 0) {
                    this.setVelocity(Phaser.Math.Between(-speed, speed), Phaser.Math.Between(-speed, speed));
                } else {
                    this.setVelocity(prevVelocity.x, prevVelocity.y);
                }
            default:
                break;
        }

        // Normalize and scale the velocity so that Sheep can't move faster along a diagonal
        this.body.velocity.normalize().scale(speed);

        // Update the animation last and give left/right animations precedence over up/down animations
        if (moveLeft) {
            this.anims.play("player-left-walk", true);
        } else if (moveRight) {
            this.anims.play("player-right-walk", true);
        } else if (moveUp) {
            this.anims.play("player-up-walk", true);
        } else if (moveDown) {
            this.anims.play("player-down-walk", true);
        } else {
            this.anims.stop();

            if (prevVelocity.x < 0) this.setTexture("player", "player-left-idle.png");
            else if (prevVelocity.x > 0) this.setTexture("player", "player-right-idle.png");
            else if (prevVelocity.y < 0) this.setTexture("player", "player-up-idle.png");
            else if (prevVelocity.y > 0) this.setTexture("player", "player-down-idle.png");
        }
    }

    addCollider(scene: Phaser.Scene, object) {
        scene.physics.add.collider(this, object);
    }
}