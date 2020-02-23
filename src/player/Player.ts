import InputComponent from './InputComponent';
import AnimationComponent from './AnimationComponent';
import GraphicsComponent from './GraphicsComponent';

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

    update(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
        this.inputComponent.update(this, cursors);
        this.animationComponent.update(this, cursors);
    }

    addCollider(scene: Phaser.Scene, object) {
        this.grahipcsComponent.addCollider(this, scene, object);
    }
}