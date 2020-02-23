import PlayerInputComponent from './PlayerInputComponent';
import AnimationComponent from './PlayerAnimationComponent';
import GraphicsComponent from './PlayerGraphicsComponent';

export default class Player {
    private inputComponent: PlayerInputComponent;
    private animationComponent: AnimationComponent;
    private grahipcsComponent: GraphicsComponent;
    sprite: Phaser.Physics.Arcade.Sprite;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        this.inputComponent = new PlayerInputComponent();
        this.animationComponent = new AnimationComponent();
        this.grahipcsComponent = new GraphicsComponent(this, scene, x, y);
    }

    update(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
        this.inputComponent.update(this, cursors);
        this.animationComponent.update(this, cursors);
    }

    addCollider(scene: Phaser.Scene, object: Phaser.GameObjects.GameObject | Phaser.GameObjects.GameObject[] | Phaser.GameObjects.Group | Phaser.GameObjects.Group[]) {
        this.grahipcsComponent.addCollider(this, scene, object);
    }
}