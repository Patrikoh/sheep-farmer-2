import depthIndex from '../depthIndex.json';
import InputComponent from './InputComponent';
import AnimationComponent from './AnimationComponent.js';

export default class Player {
    private inputComponent: InputComponent = new InputComponent();
    private animationComponent: AnimationComponent = new AnimationComponent();
    sprite: Phaser.Physics.Arcade.Sprite;

    constructor(scene: Phaser.Scene, x: number, y: number) {

        this.sprite = new Phaser.Physics.Arcade.Sprite(scene, x, y, "player");
        scene.add.existing(this.sprite);
        scene.physics.add.existing(this.sprite);
        this.sprite.setActive(true);
        this.sprite.setCollideWorldBounds(true);
        this.sprite.setImmovable();
        this.sprite.setSize(24, 30);
        this.sprite.setDepth(depthIndex.PLAYER);
    }

    update(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
        this.inputComponent.update(this, cursors);
        this.animationComponent.update(this, cursors);
    }

    addCollider(scene: Phaser.Scene, object) {
        scene.physics.add.collider(this.sprite, object);
    }
}