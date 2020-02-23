import InputComponent from './WolfInputComponent';
import AnimationComponent from './WolfAnimationComponent';
import GraphicsComponent from './WolfGraphicsComponent';
import World from '../../World';
import { WolfMovementTypes } from './WolfMovementTypes';

interface MovementState {
    movementType: WolfMovementTypes,
    stopTime?: number,
    position?: {
        x: number,
        y: number
    }
};

export default class Wolf {
    private inputComponent: InputComponent;
    private animationComponent: AnimationComponent;
    private grahipcsComponent: GraphicsComponent;

    movementState: MovementState;
    sprite: Phaser.Physics.Arcade.Sprite;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        this.inputComponent = new InputComponent(this);
        this.animationComponent = new AnimationComponent();
        this.grahipcsComponent = new GraphicsComponent(this, scene, x, y);
    }

    update(cursors, world: World) {
        this.inputComponent.update(this, world, cursors);
        this.animationComponent.update(this);
    }

    addCollider(scene: Phaser.Scene, object: Phaser.GameObjects.GameObject | Phaser.GameObjects.GameObject[] | Phaser.GameObjects.Group | Phaser.GameObjects.Group[]) {
        this.grahipcsComponent.addCollider(this, scene, object);
    }
}