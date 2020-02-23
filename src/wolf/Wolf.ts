import InputComponent from './WolfInputComponent';
import AnimationComponent from './WolfAnimationComponent';
import GraphicsComponent from './WolfGraphicsComponent';
import SheepHerd from '../SheepHerd';
import Sheep from '../Sheep';

export enum MovementTypes {
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

export default class Wolf {
    private inputComponent: InputComponent;
    private animationComponent: AnimationComponent;
    private grahipcsComponent: GraphicsComponent;

    movementState: MovementState;
    healthState: HealthState;

    sprite: Phaser.Physics.Arcade.Sprite;
    scene: Phaser.Scene;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        this.inputComponent = new InputComponent();
        this.animationComponent = new AnimationComponent();
        this.grahipcsComponent = new GraphicsComponent(this, scene, x, y);

        this.scene = scene;
        this.setStandStillState(0);
        this.setHealthState(100);
    }

    update(cursors, herd: SheepHerd, time: number) {
        this.inputComponent.update(this, null, this.scene, herd, time);
        this.animationComponent.update(this, cursors);
    }

    addCollider(scene: Phaser.Scene, object: Phaser.GameObjects.GameObject | Phaser.GameObjects.GameObject[] | Phaser.GameObjects.Group | Phaser.GameObjects.Group[]) {
        this.grahipcsComponent.addCollider(this, scene, object);
    }

    setStandStillState(time: number) {
        this.movementState = {
            movementType: MovementTypes.StandingStill,
            stopTime: time + Phaser.Math.Between(1000, 2000),
        };
    };

    setRandomWalkState(time: number) {
        this.movementState = {
            movementType: MovementTypes.RandomWalking,
            stopTime: time + Phaser.Math.Between(4000, 6000),
        };
    }

    setWalkAwayState(time: number, x: number, y: number) {
        this.movementState = {
            movementType: MovementTypes.WalkAway,
            stopTime: time + Phaser.Math.Between(200, 500),
            position: { x, y }
        };
    }

    setMovingToSheepPositionState() {
        this.movementState = {
            movementType: MovementTypes.MovingToSheepPosition
        };
    }

    setHealthState(life: number) {
        this.healthState = { life };
    }

    getClosestSheep(scene: Phaser.Scene, herd: SheepHerd) {
        return scene.physics.closest(this.sprite, herd.getSheep().filter(f => f.active)) as Sheep;
    }
}