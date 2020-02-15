import Grass from "./Grass";
import { Data } from "phaser";

enum MovementTypes {
    MovingToFollowPosition,
    MovingToGrassPosition,
    RandomWalking,
    StandingStill,
    WalkAway
};
interface MovementState {
    movementType: MovementTypes,
    stopTime?: number,
    position?: {
        x: number,
        y: number
    }
};
const DataFields = {
    movementState: 'movementState',
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
        let movementState: MovementState = this.getData(DataFields.movementState);

        if (!movementState) movementState = { movementType: MovementTypes.StandingStill, stopTime: 0 };

        this.setVelocity(0);

        switch (movementState.movementType) {
            case MovementTypes.StandingStill: {
                if (time > movementState.stopTime) {
                    this.setRandomWalkState(time);
                } else if (followPosition.distance(this.body.position) > followDistance) {
                    this.setMoveToFollowPositionState(time, followPosition);
                }
                break;
            }
            case MovementTypes.MovingToGrassPosition: {
                const closestGrass = this.getClosestGrass(scene, grasses)
                if (Phaser.Math.Distance.BetweenPoints(this.getCenter(), closestGrass.getCenter()) < searchForGrassDistance) {
                    this.setVelocityX(closestGrass.body.position.x - this.body.position.x);
                    this.setVelocityY(closestGrass.body.position.y - this.body.position.y);
                } else {
                    this.setStandStillState(time);
                }
                break;
            }
            case MovementTypes.MovingToFollowPosition: {
                const closestGrass = this.getClosestGrass(scene, grasses);
                if (Phaser.Math.Distance.BetweenPoints(this.getCenter(), closestGrass.getCenter()) < searchForGrassDistance) {
                    this.setMovingToGrassPositionState();
                } else if (followPosition.distance(this.body.position) < followDistance) {
                    if (time > movementState.stopTime) {
                        this.setStandStillState(time);
                    } else {
                        this.setVelocity(prevVelocity.x, prevVelocity.y);
                    }
                } else {
                    this.setVelocity(followPosition.x - this.body.x, followPosition.y - this.body.y);
                }
                break;
            }
            case MovementTypes.WalkAway: {
                if (time > movementState.stopTime) {
                    this.setStandStillState(time);
                } else {
                    this.setVelocity(this.body.position.x - movementState.position.x, this.body.position.y - movementState.position.y);
                }
                break;
            }
            case MovementTypes.RandomWalking: {
                const closestGrass = this.getClosestGrass(scene, grasses)
                if (Phaser.Math.Distance.BetweenPoints(this.getCenter(), closestGrass.getCenter()) < searchForGrassDistance) {
                    this.setMovingToGrassPositionState();
                } else if (time > movementState.stopTime) {
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

        this.setAnimation(prevVelocity);
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

    setStandStillState(time: number) {
        let movementState: MovementState = {
            movementType: MovementTypes.StandingStill,
            stopTime: time + Phaser.Math.Between(4000, 6000),
        }
        this.setData(DataFields.movementState, movementState);
    };

    setRandomWalkState(time: number) {
        let movementState: MovementState = {
            movementType: MovementTypes.RandomWalking,
            stopTime: time + Phaser.Math.Between(2000, 3500),
        }
        this.setData(DataFields.movementState, movementState);
    }

    setMoveToFollowPositionState(time: number, followPosition: Phaser.Math.Vector2) {
        let movementState: MovementState = {
            movementType: MovementTypes.MovingToFollowPosition,
            stopTime: time + Phaser.Math.Between(2000, 3000),
            position: { x: followPosition.x, y: followPosition.y }
        }
        this.setData(DataFields.movementState, movementState);
    }

    setWalkAwayState(time: number, x: number, y: number) {
        let movementState: MovementState = {
            movementType: MovementTypes.WalkAway,
            stopTime: time + Phaser.Math.Between(200, 500),
            position: { x, y }
        }
        this.setData(DataFields.movementState, movementState);
    }

    setMovingToGrassPositionState() {
        let movementState: MovementState = {
            movementType: MovementTypes.MovingToGrassPosition
        }
        this.setData(DataFields.movementState, movementState);
    }

    setAnimation(prevVelocity: Phaser.Math.Vector2) {
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
}