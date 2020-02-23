import Wolf, { MovementTypes } from "./Wolf";
import InputComponent from "../components/InputComponent";
import World from "../World";

export default class WolfInputComponent implements InputComponent {
    private speed = 80;
    private searchForSheepDistance = 100;

    update(wolf: Wolf, world: World, _cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
        const prevVelocity = wolf.sprite.body.velocity.clone();

        if (!wolf.movementState) wolf.movementState = { movementType: MovementTypes.StandingStill, stopTime: 0 };

        wolf.sprite.setVelocity(0);

        let time = world.scene.time.now;

        switch (wolf.movementState.movementType) {
            case MovementTypes.StandingStill: {
                if (time > wolf.movementState.stopTime) {
                    wolf.setRandomWalkState(time);
                }
                break;
            }
            case MovementTypes.MovingToSheepPosition: {
                const closestSheep = wolf.getClosestSheep(world.scene, world.herd);
                let shouldMoveToSheep =
                    closestSheep &&
                    Phaser.Math.Distance.BetweenPoints(wolf.sprite.getCenter(), closestSheep.getCenter()) < this.searchForSheepDistance;
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
                const closestSheep = wolf.getClosestSheep(world.scene, world.herd);
                let shouldMoveToSheep =
                    closestSheep &&
                    Phaser.Math.Distance.BetweenPoints(wolf.sprite.getCenter(), closestSheep.getCenter()) < this.searchForSheepDistance;
                if (shouldMoveToSheep) {
                    wolf.setMovingToSheepPositionState();
                } else if (time > wolf.movementState.stopTime) {
                    wolf.setStandStillState(time);
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
}