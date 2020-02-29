import Sheep from "./Sheep";
import { SheepMovementTypes } from './SheepMovementTypes';
import MoveComponent from "../../components/MoveComponent";
import Pickup from "../pickup/Pickup";
import MainScene from "../../MainScene";

export default class SheepMoveComponent extends MoveComponent {

    constructor(sheep: Sheep) {
        super();
        this.setStandStillState(sheep, 0);
    }

    update(sheep: Sheep, scene: MainScene) {
        const speed = 60;
        const followDistance = 100;
        const searchForGrassDistance = 60;
        const prevVelocity = sheep.sprite.body.velocity.clone();

        let playerPosition = new Phaser.Math.Vector2(scene.world.player.sprite.x, scene.world.player.sprite.y);
        let sheepSprites = scene.world.herd.getSprites();
        let herdMedianX = sheepSprites.reduce((a, s: Phaser.Physics.Arcade.Sprite) => (s.body.position.x + a), 0) / sheepSprites.length;
        let herdMedianY = sheepSprites.reduce((a, s: Phaser.Physics.Arcade.Sprite) => (s.body.position.y + a), 0) / sheepSprites.length;
        let positionX = (playerPosition.x + herdMedianX) / 2;
        let positionY = (playerPosition.y + herdMedianY) / 2;

        let followPosition = new Phaser.Math.Vector2(positionX, positionY);

        if (!sheep.movementState) sheep.movementState = { movementType: SheepMovementTypes.StandingStill, stopTime: 0 };

        sheep.sprite.setVelocity(0);

        let time = scene.time.now;

        switch (sheep.movementState.movementType) {
            case SheepMovementTypes.StandingStill: {
                if (time > sheep.movementState.stopTime) {
                    this.setRandomWalkState(sheep, time);
                } else if (followPosition.distance(sheep.sprite.body.position) > followDistance) {
                    this.setMoveToFollowPositionState(sheep, time, followPosition);
                }
                break;
            }
            case SheepMovementTypes.MovingToGrassPosition: {
                const closestPickup = this.getClosestPickup(sheep, scene, scene.world.pickups);
                if (Phaser.Math.Distance.BetweenPoints(sheep.sprite.getCenter(), closestPickup.getCenter()) < searchForGrassDistance) {
                    sheep.sprite.setVelocityX(closestPickup.body.position.x - sheep.sprite.body.position.x);
                    sheep.sprite.setVelocityY(closestPickup.body.position.y - sheep.sprite.body.position.y);
                } else {
                    this.setStandStillState(sheep, time);
                }
                break;
            }
            case SheepMovementTypes.MovingToFollowPosition: {
                const closestPickup = this.getClosestPickup(sheep, scene, scene.world.pickups);
                if (Phaser.Math.Distance.BetweenPoints(sheep.sprite.getCenter(), closestPickup.getCenter()) < searchForGrassDistance) {
                    this.setMovingToGrassPositionState(sheep);
                } else if (followPosition.distance(sheep.sprite.body.position) < followDistance) {
                    if (time > sheep.movementState.stopTime) {
                        this.setStandStillState(sheep, time);
                    } else {
                        sheep.sprite.setVelocity(prevVelocity.x, prevVelocity.y);
                    }
                } else {
                    sheep.sprite.setVelocity(followPosition.x - sheep.sprite.body.x, followPosition.y - sheep.sprite.body.y);
                }
                break;
            }
            case SheepMovementTypes.WalkAway: {
                if (time > sheep.movementState.stopTime) {
                    this.setStandStillState(sheep, time);
                } else {
                    sheep.sprite.setVelocity(sheep.sprite.body.position.x - sheep.movementState.position.x, sheep.sprite.body.position.y - sheep.movementState.position.y);
                }
                break;
            }
            case SheepMovementTypes.RandomWalking: {
                const closestPickup = this.getClosestPickup(sheep, scene, scene.world.pickups);
                if (Phaser.Math.Distance.BetweenPoints(sheep.sprite.getCenter(), closestPickup.getCenter()) < searchForGrassDistance) {
                    this.setMovingToGrassPositionState(sheep);
                } else if (time > sheep.movementState.stopTime) {
                    this.setStandStillState(sheep, time);
                } else if (prevVelocity.x === 0 && prevVelocity.y === 0) {
                    sheep.sprite.setVelocity(Phaser.Math.Between(-speed, speed), Phaser.Math.Between(-speed, speed));
                } else {
                    sheep.sprite.setVelocity(prevVelocity.x, prevVelocity.y);
                }
            }
            default:
                break;
        }

        // Normalize and scale the velocity so that Sheep can't move faster along a diagonal
        sheep.sprite.body.velocity.normalize().scale(speed);
    }

    private setStandStillState(sheep: Sheep, time: number) {
        sheep.movementState = {
            movementType: SheepMovementTypes.StandingStill,
            stopTime: time + Phaser.Math.Between(4000, 6000),
        };
    };

    private setRandomWalkState(sheep: Sheep, time: number) {
        sheep.movementState = {
            movementType: SheepMovementTypes.RandomWalking,
            stopTime: time + Phaser.Math.Between(2000, 3500),
        };
    }

    private setMoveToFollowPositionState(sheep: Sheep, time: number, followPosition: Phaser.Math.Vector2) {
        sheep.movementState = {
            movementType: SheepMovementTypes.MovingToFollowPosition,
            stopTime: time + Phaser.Math.Between(2000, 3000),
            position: { x: followPosition.x, y: followPosition.y }
        };
    }

    setWalkAwayState(sheep: Sheep, time: number, x: number, y: number) {
        sheep.movementState = {
            movementType: SheepMovementTypes.WalkAway,
            stopTime: time + Phaser.Math.Between(200, 500),
            position: { x, y }
        };
    }

    private setMovingToGrassPositionState(sheep: Sheep, ) {
        sheep.movementState = {
            movementType: SheepMovementTypes.MovingToGrassPosition
        };
    }

    private getClosestPickup(sheep: Sheep, scene: Phaser.Scene, pickups: Array<Pickup>) {
        let activePickups = pickups.filter(p => p.sprite.active);
        let activeSprites = activePickups.map(p => p.sprite);
        let closestSprite = scene.physics.closest(sheep.sprite, activeSprites);

        return closestSprite as Phaser.Physics.Arcade.Sprite;
    }
}