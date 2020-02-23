export default abstract class InputComponent {
    abstract update(gameObject, cursors: Phaser.Types.Input.Keyboard.CursorKeys): void;
}