import SheepHerd from "../SheepHerd";

export default abstract class InputComponent {
    abstract update(
        gameObject,
        cursors?: Phaser.Types.Input.Keyboard.CursorKeys,
        scene?: Phaser.Scene,
        herd?: SheepHerd,
        time?: number
    ): void;
}