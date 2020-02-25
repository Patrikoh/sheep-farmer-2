import World from "../World";

export default abstract class MoveComponent {
    abstract update(gameObject, world: World, cursors: Phaser.Types.Input.Keyboard.CursorKeys): void;
}