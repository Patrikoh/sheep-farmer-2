import Wolf, { MovementTypes } from "./Wolf";
import InputComponent from "../components/InputComponent";
import SheepHerd from "../SheepHerd";

export default class WolfInputComponent implements InputComponent {
    private speed = 100;
    private runspeed = 200;

    update(wolf: Wolf, _cursors, scene: Phaser.Scene, herd: SheepHerd, time: number) {
        const speed = 80;
        const followDistance = 100;
        const searchForSheepDistance = 100;
        const prevVelocity = wolf.sprite.body.velocity.clone();

        if (!wolf.movementState) wolf.movementState = { movementType: MovementTypes.StandingStill, stopTime: 0 };

        wolf.sprite.setVelocity(0);

        switch (wolf.movementState.movementType) {
            case MovementTypes.StandingStill: {
                if (time > wolf.movementState.stopTime) {
                    wolf.setRandomWalkState(time);
                }
                break;
            }
            case MovementTypes.MovingToSheepPosition: {
                const closestSheep = wolf.getClosestSheep(scene, herd);
                let shouldMoveToSheep =
                    closestSheep &&
                    Phaser.Math.Distance.BetweenPoints(wolf.sprite.getCenter(), closestSheep.getCenter()) < searchForSheepDistance;
                if (shouldMoveToSheep) {
                    wolf.sprite.setVelocityX(closestSheep.body.position.x - wolf.sprite.body.position.x);
                    wolf.sprite.setVelocityY(closestSheep.body.position.y - wolf.sprite.body.position.y);
                } else {
                    wolf.setStandStillState(time);
                }
                break;
            }
            case MovementTypes.WalkAway: {
                if (time > wolf.movementState.stopTime) {
                    wolf.setStandStillState(time);
                } else {
                    wolf.sprite.setVelocity(wolf.sprite.body.position.x - wolf.movementState.position.x, wolf.sprite.body.position.y - wolf.movementState.position.y);
                }
                break;
            }
            case MovementTypes.RandomWalking: {
                const closestSheep = wolf.getClosestSheep(scene, herd);
                let shouldMoveToSheep =
                    closestSheep &&
                    Phaser.Math.Distance.BetweenPoints(wolf.sprite.getCenter(), closestSheep.getCenter()) < searchForSheepDistance;
                if (shouldMoveToSheep) {
                    wolf.setMovingToSheepPositionState();
                } else if (time > wolf.movementState.stopTime) {
                    wolf.setStandStillState(time);
                } else if (prevVelocity.x === 0 && prevVelocity.y === 0) {
                    wolf.sprite.setVelocity(Phaser.Math.Between(-speed, speed), Phaser.Math.Between(-speed, speed));
                } else {
                    wolf.sprite.setVelocity(prevVelocity.x, prevVelocity.y);
                }
            }
            default:
                break;
        }

        // Normalize and scale the velocity so that Sheep can't move faster along a diagonal
        wolf.sprite.body.velocity.normalize().scale(speed);
    }
}