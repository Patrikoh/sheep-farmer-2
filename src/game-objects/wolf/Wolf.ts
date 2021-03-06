import MoveComponent from './WolfMoveComponent';
import AnimationComponent from './WolfAnimationComponent';
import GraphicsComponent from './WolfGraphicsComponent';
import { WolfMovementTypes } from './WolfMovementTypes';
import MainScene from '../../MainScene';

interface WolfMovementState {
    movementType: WolfMovementTypes,
    stopTime?: number,
    position?: {
        x: number,
        y: number
    }
};

export default class Wolf {
    private moveComponent: MoveComponent;
    private animationComponent: AnimationComponent;
    private grahipcsComponent: GraphicsComponent;

    movementState: WolfMovementState;
    sprite: Phaser.Physics.Arcade.Sprite;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        this.moveComponent = new MoveComponent(this);
        this.animationComponent = new AnimationComponent();
        this.grahipcsComponent = new GraphicsComponent(this, scene, x, y);
    }

    update(scene: MainScene) {
        this.moveComponent.update(this, scene);
        this.animationComponent.update(this);
    }

    addCollider(scene: MainScene, object: Phaser.GameObjects.GameObject | Phaser.GameObjects.GameObject[] | Phaser.GameObjects.Group | Phaser.GameObjects.Group[]) {
        this.grahipcsComponent.addCollider(this, scene, object);
    }
}