import Player from "./Player";
import MoveComponent from "../../components/MoveComponent";
import MainScene from "../../MainScene";

export default class PlayerMoveComponent extends MoveComponent {
    private speed = 100;
    private runspeed = 200;

    update(player: Player, scene: MainScene) {
        // Stop any previous movement from the last frame
        player.sprite.setVelocity(0);

        // Horizontal movement
        if (scene.cursors.left.isDown) {
            player.sprite.setVelocityX(-this.speed);
        } else if (scene.cursors.right.isDown) {
            player.sprite.setVelocityX(this.speed);
        }

        // Vertical movement
        if (scene.cursors.up.isDown) {
            player.sprite.setVelocityY(-this.speed);
        } else if (scene.cursors.down.isDown) {
            player.sprite.setVelocityY(this.speed);
        }

        // Normalize and scale the velocity so that player can't move faster along a diagonal
        player.sprite.body.velocity.normalize().scale(this.speed);
        if (scene.cursors.shift.isDown) {
            player.sprite.body.velocity.normalize().scale(this.runspeed);
        }
    }
}