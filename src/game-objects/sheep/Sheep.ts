import { uniqueNamesGenerator, adjectives, names } from 'unique-names-generator';
import Pickup from "../pickup/Pickup";
import AnimationComponent from './SheepAnimationComponent';
import GraphicsComponent from './SheepGraphicsComponent';
import { SheepMovementTypes } from './SheepMovementTypes';

interface WolfMovementState {
    movementType: SheepMovementTypes,
    stopTime?: number,
    position?: {
        x: number,
        y: number
    }
};
interface HealthState {
    maxLife: number,
    life: number
};



export default class Sheep {
    private animationComponent: AnimationComponent;
    private grahipcsComponent: GraphicsComponent;

    movementState: WolfMovementState;
    healthState: HealthState;
    sprite: Phaser.Physics.Arcade.Sprite;
    name: string;
    id: string;

    constructor(scene: Phaser.Scene, x: number, y: number) {

        this.animationComponent = new AnimationComponent();
        this.grahipcsComponent = new GraphicsComponent(this, scene, x, y);

        this.name = uniqueNamesGenerator({
            dictionaries: [adjectives, names],
            separator: ' ',
            length: 2,
            style: 'capital'
        });

        this.setStandStillState(0);
        this.setHealthState(100, 100);
    }

    update(scene: Phaser.Scene, time, followPosition: Phaser.Math.Vector2, pickups: Array<Pickup>) {
        const speed = 60;
        const followDistance = 100;
        const searchForGrassDistance = 60;
        const prevVelocity = this.sprite.body.velocity.clone();

        if (!this.movementState) this.movementState = { movementType: SheepMovementTypes.StandingStill, stopTime: 0 };

        this.sprite.setVelocity(0);

        switch (this.movementState.movementType) {
            case SheepMovementTypes.StandingStill: {
                if (time > this.movementState.stopTime) {
                    this.setRandomWalkState(time);
                } else if (followPosition.distance(this.sprite.body.position) > followDistance) {
                    this.setMoveToFollowPositionState(time, followPosition);
                }
                break;
            }
            case SheepMovementTypes.MovingToGrassPosition: {
                const closestPickup = this.getClosestPickup(scene, pickups)
                if (Phaser.Math.Distance.BetweenPoints(this.sprite.getCenter(), closestPickup.getCenter()) < searchForGrassDistance) {
                    this.sprite.setVelocityX(closestPickup.body.position.x - this.sprite.body.position.x);
                    this.sprite.setVelocityY(closestPickup.body.position.y - this.sprite.body.position.y);
                } else {
                    this.setStandStillState(time);
                }
                break;
            }
            case SheepMovementTypes.MovingToFollowPosition: {
                const closestPickup = this.getClosestPickup(scene, pickups);
                if (Phaser.Math.Distance.BetweenPoints(this.sprite.getCenter(), closestPickup.getCenter()) < searchForGrassDistance) {
                    this.setMovingToGrassPositionState();
                } else if (followPosition.distance(this.sprite.body.position) < followDistance) {
                    if (time > this.movementState.stopTime) {
                        this.setStandStillState(time);
                    } else {
                        this.sprite.setVelocity(prevVelocity.x, prevVelocity.y);
                    }
                } else {
                    this.sprite.setVelocity(followPosition.x - this.sprite.body.x, followPosition.y - this.sprite.body.y);
                }
                break;
            }
            case SheepMovementTypes.WalkAway: {
                if (time > this.movementState.stopTime) {
                    this.setStandStillState(time);
                } else {
                    this.sprite.setVelocity(this.sprite.body.position.x - this.movementState.position.x, this.sprite.body.position.y - this.movementState.position.y);
                }
                break;
            }
            case SheepMovementTypes.RandomWalking: {
                const closestPickup = this.getClosestPickup(scene, pickups)
                if (Phaser.Math.Distance.BetweenPoints(this.sprite.getCenter(), closestPickup.getCenter()) < searchForGrassDistance) {
                    this.setMovingToGrassPositionState();
                } else if (time > this.movementState.stopTime) {
                    this.setStandStillState(time);
                } else if (prevVelocity.x === 0 && prevVelocity.y === 0) {
                    this.sprite.setVelocity(Phaser.Math.Between(-speed, speed), Phaser.Math.Between(-speed, speed));
                } else {
                    this.sprite.setVelocity(prevVelocity.x, prevVelocity.y);
                }
            }
            default:
                break;
        }

        // Normalize and scale the velocity so that Sheep can't move faster along a diagonal
        this.sprite.body.velocity.normalize().scale(speed);

        this.animationComponent.update(this);
    }

    addCollider(scene: Phaser.Scene, object: Phaser.GameObjects.GameObject | Phaser.GameObjects.GameObject[] | Phaser.GameObjects.Group | Phaser.GameObjects.Group[]) {
        this.grahipcsComponent.addCollider(this, scene, object);
    }

    changeLife(lifeDiff: number) {
        let previousHealth = this.healthState;
        let life = Math.min(previousHealth.life + lifeDiff, previousHealth.maxLife);
        if (life <= 0) {
            this.kill();
        } else {
            let healthState: HealthState = { ...previousHealth, life };
            this.healthState = healthState;
        }
    }

    onSheepCollision(time: number, x: number, y: number) {
        this.setWalkAwayState(time, x, y);
    }

    getHealth() {
        return this.healthState;
    }

    getName() {
        return this.name;
    }

    private kill() {
        this.sprite.destroy();
    }

    private getClosestPickup(scene: Phaser.Scene, pickups: Array<Pickup>) {
        let activePickups = pickups.filter(p => p.sprite.active);
        let activeSprites = activePickups.map(p => p.sprite);
        let closestSprite = scene.physics.closest(this.sprite, activeSprites);

        return closestSprite as Phaser.Physics.Arcade.Sprite;
    }

    private setStandStillState(time: number) {
        this.movementState = {
            movementType: SheepMovementTypes.StandingStill,
            stopTime: time + Phaser.Math.Between(4000, 6000),
        };
    };

    private setRandomWalkState(time: number) {
        this.movementState = {
            movementType: SheepMovementTypes.RandomWalking,
            stopTime: time + Phaser.Math.Between(2000, 3500),
        };
    }

    private setMoveToFollowPositionState(time: number, followPosition: Phaser.Math.Vector2) {
        this.movementState = {
            movementType: SheepMovementTypes.MovingToFollowPosition,
            stopTime: time + Phaser.Math.Between(2000, 3000),
            position: { x: followPosition.x, y: followPosition.y }
        };
    }

    private setWalkAwayState(time: number, x: number, y: number) {
        this.movementState = {
            movementType: SheepMovementTypes.WalkAway,
            stopTime: time + Phaser.Math.Between(200, 500),
            position: { x, y }
        };
    }

    private setMovingToGrassPositionState() {
        this.movementState = {
            movementType: SheepMovementTypes.MovingToGrassPosition
        };
    }

    private setHealthState(maxLife: number, life: number) {
        this.healthState = { maxLife, life };
    }
}