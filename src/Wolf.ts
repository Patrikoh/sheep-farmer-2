import Pickup from "./pickups/Pickup";
import SheepHerd from './SheepHerd';
import Sheep from './Sheep';

enum MovementTypes {
    MovingToSheepPosition,
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
interface HealthState {
    life: number
};
const LIFE_GAIN = -10;

export default class Wolf extends Phaser.Physics.Arcade.Sprite {
    private movementState: MovementState;
    private healthState: HealthState;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "wolf");

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setActive(true);
        this.setCollideWorldBounds(true);

        this.setStandStillState(0);
        this.setHealthState(100);

        this.addAnimations(scene);
    }

    update(scene: Phaser.Scene, time, herd: SheepHerd) {
        const speed = 80;
        const followDistance = 100;
        const searchForSheepDistance = 100;
        const prevVelocity = this.body.velocity.clone();

        if (!this.movementState) this.movementState = { movementType: MovementTypes.StandingStill, stopTime: 0 };

        this.setVelocity(0);

        switch (this.movementState.movementType) {
            case MovementTypes.StandingStill: {
                if (time > this.movementState.stopTime) {
                    this.setRandomWalkState(time);
                }
                break;
            }
            case MovementTypes.MovingToSheepPosition: {
                const closestSheep = this.getClosestSheep(scene, herd);
                let shouldMoveToSheep =
                    closestSheep &&
                    Phaser.Math.Distance.BetweenPoints(this.getCenter(), closestSheep.getCenter()) < searchForSheepDistance;
                if (shouldMoveToSheep) {
                    this.setVelocityX(closestSheep.body.position.x - this.body.position.x);
                    this.setVelocityY(closestSheep.body.position.y - this.body.position.y);
                } else {
                    this.setStandStillState(time);
                }
                break;
            }
            case MovementTypes.WalkAway: {
                if (time > this.movementState.stopTime) {
                    this.setStandStillState(time);
                } else {
                    this.setVelocity(this.body.position.x - this.movementState.position.x, this.body.position.y - this.movementState.position.y);
                }
                break;
            }
            case MovementTypes.RandomWalking: {
                const closestSheep = this.getClosestSheep(scene, herd);
                let shouldMoveToSheep =
                    closestSheep &&
                    Phaser.Math.Distance.BetweenPoints(this.getCenter(), closestSheep.getCenter()) < searchForSheepDistance;
                if (shouldMoveToSheep) {
                    this.setMovingToSheepPositionState();
                } else if (time > this.movementState.stopTime) {
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
        scene.physics.add.collider(this, object, (c: Wolf, c2) => this.onCollision(c, c2, scene), null, scene);
    }

    onCollision(_self: Wolf, other: Phaser.GameObjects.GameObject, scene: Phaser.Scene) {
        if (other instanceof Sheep) {
            other.changeLife(LIFE_GAIN);
            this.setWalkAwayState(scene.time.now, other.x, other.y);
        }
    }

    changeLife(lifeDiff: number) {
        let previousHealth = this.healthState;
        let life = Math.min(previousHealth.life + lifeDiff, previousHealth.life);
        if (life <= 0) {
            this.kill();
        } else {
            this.healthState = { ...previousHealth, life };
        }
    }

    private kill() {
        this.destroy(true);
    }

    private getClosestSheep(scene: Phaser.Scene, herd: SheepHerd) {
        return scene.physics.closest(this, herd.getSheep().filter(f => f.active)) as Sheep;
    }

    private setStandStillState(time: number) {
        this.movementState = {
            movementType: MovementTypes.StandingStill,
            stopTime: time + Phaser.Math.Between(1000, 2000),
        };
    };

    private setRandomWalkState(time: number) {
        this.movementState = {
            movementType: MovementTypes.RandomWalking,
            stopTime: time + Phaser.Math.Between(4000, 6000),
        };
    }

    private setWalkAwayState(time: number, x: number, y: number) {
        this.movementState = {
            movementType: MovementTypes.WalkAway,
            stopTime: time + Phaser.Math.Between(200, 500),
            position: { x, y }
        };
    }

    private setMovingToSheepPositionState() {
        this.movementState = {
            movementType: MovementTypes.MovingToSheepPosition
        };
    }

    private setHealthState(life: number) {
        this.healthState = { life };
    }

    private setAnimation(prevVelocity: Phaser.Math.Vector2) {
        if (this.body.velocity.x < 0) {
            this.anims.play("wolf-left-walk", true);
        } else if (this.body.velocity.x > 0) {
            this.anims.play("wolf-right-walk", true);
        } else if (this.body.velocity.y < 0) {
            this.anims.play("wolf-up-walk", true);
        } else if (this.body.velocity.y > 0) {
            this.anims.play("wolf-down-walk", true);
        } else {
            this.anims.stop();

            if (prevVelocity.x < 0) this.setTexture("wolf", "wolf-left-idle-0");
            else if (prevVelocity.x > 0) this.setTexture("wolf", "wolf-right-idle-0");
            else if (prevVelocity.y < 0) this.setTexture("wolf", "wolf-up-idle-0");
            else if (prevVelocity.y > 0) this.setTexture("wolf", "wolf-down-idle-0");
        }
    }

    addAnimations(scene: Phaser.Scene) {
        const anims = scene.anims;
        anims.create({
            key: "wolf-down-walk",
            frames: anims.generateFrameNames("wolf", {
                prefix: "wolf-down-walk-",
                start: 0,
                end: 11
            }),
            frameRate: 7,
            repeat: -1
        });
        anims.create({
            key: "wolf-right-walk",
            frames: anims.generateFrameNames("wolf", {
                prefix: "wolf-right-walk-",
                start: 0,
                end: 11
            }),
            frameRate: 7,
            repeat: -1
        });
        anims.create({
            key: "wolf-left-walk",
            frames: anims.generateFrameNames("wolf", {
                prefix: "wolf-left-walk-",
                start: 0,
                end: 11
            }),
            frameRate: 7,
            repeat: -1
        });
        anims.create({
            key: "wolf-up-walk",
            frames: anims.generateFrameNames("wolf", {
                prefix: "wolf-up-walk-",
                start: 0,
                end: 11
            }),
            frameRate: 7,
            repeat: -1
        });
    }
}