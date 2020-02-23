import World from "../World";

export default abstract class InputComponent {
    abstract update(gameObject, world: World, cursors: Phaser.Types.Input.Keyboard.CursorKeys): void;
}