import Sheep from "./Sheep";
import AnimationComponent from "../../components/AnimationComponent";

export default class SheepAnimationComponent implements AnimationComponent {
    update(sheep: Sheep) {
        const prevVelocity = sheep.sprite.body.velocity.clone();

        if (sheep.sprite.body.velocity.x < 0) {
            sheep.sprite.anims.play("sheep-left-walk", true);
        } else if (sheep.sprite.body.velocity.x > 0) {
            sheep.sprite.anims.play("sheep-right-walk", true);
        } else if (sheep.sprite.body.velocity.y < 0) {
            sheep.sprite.anims.play("sheep-up-walk", true);
        } else if (sheep.sprite.body.velocity.y > 0) {
            sheep.sprite.anims.play("sheep-down-walk", true);
        } else {
            sheep.sprite.anims.stop();

            if (prevVelocity.x < 0) sheep.sprite.setTexture("sheep", "sheep-left-idle-0");
            else if (prevVelocity.x > 0) sheep.sprite.setTexture("sheep", "sheep-right-idle-0");
            else if (prevVelocity.y < 0) sheep.sprite.setTexture("sheep", "sheep-up-idle-0");
            else if (prevVelocity.y > 0) sheep.sprite.setTexture("sheep", "sheep-down-idle-0");
        }
    }
}