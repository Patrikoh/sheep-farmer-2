import Wolf from "./Wolf";
import AnimationComponent from "../components/AnimationComponent";

export default class WolfAnimationComponent implements AnimationComponent {
    update(wolf: Wolf, cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
        const prevVelocity = wolf.sprite.body.velocity.clone();

        if (wolf.sprite.body.velocity.x < 0) {
            wolf.sprite.anims.play("player-left-walk", true);
        } else if (wolf.sprite.body.velocity.x > 0) {
            wolf.sprite.anims.play("player-right-walk", true);
        } else if (wolf.sprite.body.velocity.y < 0) {
            wolf.sprite.anims.play("player-up-walk", true);
        } else if (wolf.sprite.body.velocity.y > 0) {
            wolf.sprite.anims.play("player-down-walk", true);
        } else {
            wolf.sprite.anims.stop();

            if (prevVelocity.x < 0) wolf.sprite.setTexture("player", "player-left-idle-0");
            else if (prevVelocity.x > 0) wolf.sprite.setTexture("player", "player-right-idle-0");
            else if (prevVelocity.y < 0) wolf.sprite.setTexture("player", "player-up-idle-0");
            else if (prevVelocity.y > 0) wolf.sprite.setTexture("player", "player-down-idle-0");
        }
    }
}