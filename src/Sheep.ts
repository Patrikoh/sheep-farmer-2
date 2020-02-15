import Grass from "./Grass";

enum SheepStates {
    MovingToFollowPosition,
    MovingToGrassPosition,
    RandomWalking,
    StandingStill,
    WalkAway
};
const DataFields = {
    standStill: 'standStill',
    stopRandomWalkingTime: 'stopRandomWalkingTime',
    earliestStopMovingToFollowPositionTime: 'earliestStopMovingToFollowPositionTime',
    walkAway: 'walkAway'
};

export default class Sheep extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "sheep");

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setActive(true);
        this.setCollideWorldBounds(true);
    }

    update(scene: Phaser.Scene, time, followPosition: Phaser.Math.Vector2, grasses: Array<Grass>) {
        const speed = 60;
        const followDistance = 100;
        const searchForGrassDistance = 60;
        const prevVelocity = this.body.velocity.clone();

        this.setVelocity(0);

        switch (this.state) {
            case SheepStates.StandingStill: {
                let { stopTime } = this.getData(DataFields.standStill);
                if (time > stopTime) {
                    this.setRandomWalkState(time);
                } else if (this.getFollowPositionDecision(followPosition, followDistance).shouldMove) {
                    this.setMoveToFollowPositionState(time);
                }
                break;
            }
            case SheepStates.MovingToGrassPosition: {
                const closestGrass = this.getClosestGrass(scene, grasses)
                if (Phaser.Math.Distance.BetweenPoints(this.getCenter(), closestGrass.getCenter()) < searchForGrassDistance) {
                    this.setVelocityX(closestGrass.body.position.x - this.body.position.x);
                    this.setVelocityY(closestGrass.body.position.y - this.body.position.y);
                } else {
                    this.setStandStillState(time);
                }
                break;
            }
            case SheepStates.MovingToFollowPosition: {
                const closestGrass = this.getClosestGrass(scene, grasses);
                const followPositionDecision = this.getFollowPositionDecision(followPosition, followDistance);
                if (Phaser.Math.Distance.BetweenPoints(this.getCenter(), closestGrass.getCenter()) < searchForGrassDistance) {
                    this.setState(SheepStates.MovingToGrassPosition);
                } else if (!followPositionDecision.shouldMove) {
                    if (this.getData(DataFields.earliestStopMovingToFollowPositionTime) <= time) {
                        this.setStandStillState(time);
                    } else {
                        this.setVelocity(prevVelocity.x, prevVelocity.y);
                    }
                } else {
                    if (followPositionDecision.moveLeft) {
                        this.setVelocityX(-speed);
                    } else if (followPositionDecision.moveRight) {
                        this.setVelocityX(speed);
                    }
                    if (followPositionDecision.moveUp) {
                        this.setVelocityY(-speed);
                    } else if (followPositionDecision.moveDown) {
                        this.setVelocityY(speed);
                    }
                }
                break;
            }
            case SheepStates.WalkAway: {
                let { position, stopTime } = this.getData(DataFields.walkAway);
                if (time > stopTime) {
                    this.setStandStillState(time);
                } else {
                    this.setVelocity(this.body.position.x - position.x, this.body.position.y - position.y);
                }
                break;
            }
            case SheepStates.RandomWalking: {
                const closestGrass = this.getClosestGrass(scene, grasses)
                if (Phaser.Math.Distance.BetweenPoints(this.getCenter(), closestGrass.getCenter()) < searchForGrassDistance) {
                    this.setMovingToGrassPositionState();
                } else if (this.getData(DataFields.stopRandomWalkingTime) <= time) {
                    this.setStandStillState(time);
                } else if (prevVelocity.x === 0 && prevVelocity.y === 0) {
                    this.setVelocity(Phaser.Math.Between(-speed, speed), Phaser.Math.Between(-speed, speed));
                } else {
                    this.setVelocity(prevVelocity.x, prevVelocity.y);
                }
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

    onSheepCollision(time: number, x: number, y: number) {
        this.setWalkAwayState(time, x, y);
    }

    onEat() {
        this.setScale(this.scaleX * 1.1, this.scaleY * 1.1);
    }

    getClosestGrass(scene: Phaser.Scene, grasses: Array<Grass>) {
        return scene.physics.closest(this, grasses.filter(g => g.active)) as Grass;
    }

    getFollowPositionDecision(followPosition: Phaser.Math.Vector2, distance: number) {
        const moveLeft = followPosition.x + distance < this.body.position.x;
        const moveRight = followPosition.x - distance > this.body.position.x;
        const moveUp = followPosition.y + distance < this.body.position.y;
        const moveDown = followPosition.y - distance > this.body.position.y;
        return {
            moveLeft,
            moveRight,
            moveUp,
            moveDown,
            shouldMove: moveLeft || moveRight || moveUp || moveDown
        };
    }

    setStandStillState(time: number) {
        this.setState(SheepStates.StandingStill);
        this.setData(DataFields.standStill, {
            stopTime: time + Phaser.Math.Between(4000, 6000),
        });
    };

    setRandomWalkState(time: number) {
        this.setState(SheepStates.RandomWalking);
        this.setData(DataFields.stopRandomWalkingTime, time + Phaser.Math.Between(2000, 3500));
    }

    setMoveToFollowPositionState(time: number) {
        this.setState(SheepStates.MovingToFollowPosition);
        this.setData(DataFields.earliestStopMovingToFollowPositionTime, time + Phaser.Math.Between(2000, 3000));
    }

    setWalkAwayState(time: number, x: number, y: number) {
        this.setState(SheepStates.WalkAway);
        this.setData(DataFields.walkAway, {
            stopTime: time + Phaser.Math.Between(500, 1000),
            position: { x, y }
        });
    }

    setMovingToGrassPositionState() {
        this.setState(SheepStates.MovingToGrassPosition);
    }
}