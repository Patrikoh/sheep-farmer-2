import InputComponent from './PlayerInputComponent';
import AnimationComponent from './PlayerAnimationComponent';
import GraphicsComponent from './PlayerGraphicsComponent';
import World from '../World';

export default class Player {
    private inputComponent: InputComponent;
    private animationComponent: AnimationComponent;
    private grahipcsComponent: GraphicsComponent;
    sprite: Phaser.Physics.Arcade.Sprite;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        this.inputComponent = new InputComponent();
        this.animationComponent = new AnimationComponent();
        this.grahipcsComponent = new GraphicsComponent(this, scene, x, y);
    }

    update(cursors: Phaser.Types.Input.Keyboard.CursorKeys, world: World) {
        this.inputComponent.update(this, world, cursors);
        this.animationComponent.update(this);
    }

    addCollider(scene: Phaser.Scene, object: Phaser.GameObjects.GameObject | Phaser.GameObjects.GameObject[] | Phaser.GameObjects.Group | Phaser.GameObjects.Group[]) {
        this.grahipcsComponent.addCollider(this, scene, object);
    }
}