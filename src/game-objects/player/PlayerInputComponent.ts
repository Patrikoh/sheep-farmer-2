import Player from "./Player";
import InputComponent from "../../components/InputComponent";
import World from "../../World";

export default class PlayerInputComponent implements InputComponent {
    private speed = 100;
    private runspeed = 200;

    update(player: Player, _world: World, cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
        // Stop any previous movement from the last frame
        player.sprite.setVelocity(0);

        // Horizontal movement
        if (cursors.left.isDown) {
            player.sprite.setVelocityX(-this.speed);
        } else if (cursors.right.isDown) {
            player.sprite.setVelocityX(this.speed);
        }

        // Vertical movement
        if (cursors.up.isDown) {
            player.sprite.setVelocityY(-this.speed);
        } else if (cursors.down.isDown) {
            player.sprite.setVelocityY(this.speed);
        }

        // Normalize and scale the velocity so that player can't move faster along a diagonal
        player.sprite.body.velocity.normalize().scale(this.speed);
        if (cursors.shift.isDown) {
            player.sprite.body.velocity.normalize().scale(this.runspeed);
        }
    }
}