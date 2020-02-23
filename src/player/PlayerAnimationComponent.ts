import Player from "./Player";
import AnimationComponent from "../components/AnimationComponent";

export default class PlayerAnimationComponent implements AnimationComponent {
    update(player: Player, cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
        const prevVelocity = player.sprite.body.velocity.clone();

        if (cursors.left.isDown) {
            player.sprite.anims.play("player-left-walk", true);
        } else if (cursors.right.isDown) {
            player.sprite.anims.play("player-right-walk", true);
        } else if (cursors.up.isDown) {
            player.sprite.anims.play("player-up-walk", true);
        } else if (cursors.down.isDown) {
            player.sprite.anims.play("player-down-walk", true);
        } else {
            player.sprite.anims.stop();
            if (prevVelocity.x < 0) player.sprite.setTexture("player", "player-left-idle-0");
            else if (prevVelocity.x > 0) player.sprite.setTexture("player", "player-right-idle-0");
            else if (prevVelocity.y < 0) player.sprite.setTexture("player", "player-up-idle-0");
            else if (prevVelocity.y > 0) player.sprite.setTexture("player", "player-down-idle-0");
        }
    }
}