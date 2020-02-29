import MainScene from "../MainScene";

export default abstract class MoveComponent {
    abstract update(gameObject, scene: MainScene, cursors: Phaser.Types.Input.Keyboard.CursorKeys): void;
}