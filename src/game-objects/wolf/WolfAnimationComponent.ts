import Wolf from "./Wolf";
import AnimationComponent from "../../components/AnimationComponent";

export default class WolfAnimationComponent implements AnimationComponent {
    update(wolf: Wolf) {
        const prevVelocity = wolf.sprite.body.velocity.clone();

        if (wolf.sprite.body.velocity.x < 0) {
            wolf.sprite.anims.play("wolf-left-walk", true);
        } else if (wolf.sprite.body.velocity.x > 0) {
            wolf.sprite.anims.play("wolf-right-walk", true);
        } else if (wolf.sprite.body.velocity.y < 0) {
            wolf.sprite.anims.play("wolf-up-walk", true);
        } else if (wolf.sprite.body.velocity.y > 0) {
            wolf.sprite.anims.play("wolf-down-walk", true);
        } else {
            wolf.sprite.anims.stop();

            if (prevVelocity.x < 0) wolf.sprite.setTexture("wolf", "wolf-left-idle-0");
            else if (prevVelocity.x > 0) wolf.sprite.setTexture("wolf", "wolf-right-idle-0");
            else if (prevVelocity.y < 0) wolf.sprite.setTexture("wolf", "wolf-up-idle-0");
            else if (prevVelocity.y > 0) wolf.sprite.setTexture("wolf", "wolf-down-idle-0");
        }
    }
}