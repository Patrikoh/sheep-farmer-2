import Wolf from "./Wolf";
import { WolfMovementTypes } from './WolfMovementTypes';
import MoveComponent from "../../components/MoveComponent";
import World from "../../World";
import SheepHerd from '../SheepHerd';

export default class WolfMoveComponent extends MoveComponent {
    private speed = 80;
    private searchForSheepDistance = 100;

    constructor(wolf: Wolf) {
        super();
        this.setStandStillState(wolf, 0);
    }

    update(wolf: Wolf, world: World, _cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
        const prevVelocity = wolf.sprite.body.velocity.clone();

        if (!wolf.movementState) wolf.movementState = { movementType: WolfMovementTypes.StandingStill, stopTime: 0 };

        wolf.sprite.setVelocity(0);

        let time = world.scene.time.now;

        switch (wolf.movementState.movementType) {
            case WolfMovementTypes.StandingStill: {
                if (time > wolf.movementState.stopTime) {
                    this.setRandomWalkState(wolf, time);
                }
                break;
            }
            case WolfMovementTypes.MovingToSheepPosition: {
                const closestSheep = this.getClosestSheep(wolf, world.scene, world.herd);
                let shouldMoveToSheep =
                    closestSheep &&
                    Phaser.Math.Distance.BetweenPoints(wolf.sprite.getCenter(), closestSheep.getCenter()) < this.searchForSheepDistance;
                if (shouldMoveToSheep) {
                    wolf.sprite.setVelocityX(closestSheep.body.position.x - wolf.sprite.body.position.x);
                    wolf.sprite.setVelocityY(closestSheep.body.position.y - wolf.sprite.body.position.y);
                } else {
                    this.setStandStillState(wolf, time);
                }
                break;
            }
            case WolfMovementTypes.WalkAway: {
                if (time > wolf.movementState.stopTime) {
                    this.setStandStillState(wolf, time);
                } else {
                    wolf.sprite.setVelocity(wolf.sprite.body.position.x - wolf.movementState.position.x, wolf.sprite.body.position.y - wolf.movementState.position.y);
                }
                break;
            }
            case WolfMovementTypes.RandomWalking: {
                const closestSheep = this.getClosestSheep(wolf, world.scene, world.herd);
                let shouldMoveToSheep =
                    closestSheep &&
                    Phaser.Math.Distance.BetweenPoints(wolf.sprite.getCenter(), closestSheep.getCenter()) < this.searchForSheepDistance;
                if (shouldMoveToSheep) {
                    this.setMovingToSheepPositionState(wolf);
                } else if (time > wolf.movementState.stopTime) {
                    this.setStandStillState(wolf, time);
                } else if (prevVelocity.x === 0 && prevVelocity.y === 0) {
                    wolf.sprite.setVelocity(Phaser.Math.Between(-this.speed, this.speed), Phaser.Math.Between(-this.speed, this.speed));
                } else {
                    wolf.sprite.setVelocity(prevVelocity.x, prevVelocity.y);
                }
            }
            default:
                break;
        }

        // Normalize and scale the velocity so that Sheep can't move faster along a diagonal
        wolf.sprite.body.velocity.normalize().scale(this.speed);
    }

    getClosestSheep(wolf: Wolf, scene: Phaser.Scene, herd: SheepHerd) {
        return scene.physics.closest(wolf.sprite, herd.getGroup().getChildren().filter(f => f.active)) as Phaser.Physics.Arcade.Sprite;
    }

    setStandStillState(wolf: Wolf, time: number) {
        wolf.movementState = {
            movementType: WolfMovementTypes.StandingStill,
            stopTime: time + Phaser.Math.Between(1000, 2000),
        };
    };

    setRandomWalkState(wolf: Wolf, time: number) {
        wolf.movementState = {
            movementType: WolfMovementTypes.RandomWalking,
            stopTime: time + Phaser.Math.Between(4000, 6000),
        };
    }

    setWalkAwayState(wolf: Wolf, time: number, x: number, y: number) {
        wolf.movementState = {
            movementType: WolfMovementTypes.WalkAway,
            stopTime: time + Phaser.Math.Between(200, 500),
            position: { x, y }
        };
    }

    setMovingToSheepPositionState(wolf: Wolf) {
        wolf.movementState = {
            movementType: WolfMovementTypes.MovingToSheepPosition
        };
    }
}