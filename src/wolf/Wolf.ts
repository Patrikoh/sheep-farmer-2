import InputComponent from './WolfInputComponent';
import AnimationComponent from './WolfAnimationComponent';
import GraphicsComponent from './WolfGraphicsComponent';
import SheepHerd from '../SheepHerd';
import Sheep from '../Sheep';
import World from '../World';
import { MovementTypes } from './MovementTypes';

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

    constructor(scene: Phaser.Scene, x: number, y: number) {
        this.inputComponent = new InputComponent(this);
        this.animationComponent = new AnimationComponent();
        this.grahipcsComponent = new GraphicsComponent(this, scene, x, y);

        this.setHealthState(100);
    }

    update(cursors, world: World) {
        this.inputComponent.update(this, world, cursors);
        this.animationComponent.update(this, cursors);
    }

    addCollider(scene: Phaser.Scene, object: Phaser.GameObjects.GameObject | Phaser.GameObjects.GameObject[] | Phaser.GameObjects.Group | Phaser.GameObjects.Group[]) {
        this.grahipcsComponent.addCollider(this, scene, object);
    }

    setHealthState(life: number) {
        this.healthState = { life };
    }

    getClosestSheep(scene: Phaser.Scene, herd: SheepHerd) {
        return scene.physics.closest(this.sprite, herd.getSheep().filter(f => f.active)) as Sheep;
    }
}