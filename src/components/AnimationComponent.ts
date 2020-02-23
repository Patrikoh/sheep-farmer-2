export default abstract class AnimationComponent {
    abstract update(gameObject, cursors: Phaser.Types.Input.Keyboard.CursorKeys): void;
}