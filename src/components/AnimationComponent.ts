export interface AnimationSprite {
    texture: string,
    walk: {
        left: string,
        right: string,
        up: string,
        down: string
    },
    idle: {
        left: string,
        right: string,
        up: string,
        down: string
    }
};

export default abstract class AnimationComponent {
    protected animationSprite: AnimationSprite;

    constructor(animationSprite: AnimationSprite) {
        this.animationSprite = animationSprite;
    }

    update(gameObject) {
        const prevVelocity = gameObject.sprite.body.velocity.clone();

        if (gameObject.sprite.body.velocity.x < 0) {
            gameObject.sprite.anims.play(this.animationSprite.walk.left, true);
        } else if (gameObject.sprite.body.velocity.x > 0) {
            gameObject.sprite.anims.play(this.animationSprite.walk.right, true);
        } else if (gameObject.sprite.body.velocity.y < 0) {
            gameObject.sprite.anims.play(this.animationSprite.walk.up, true);
        } else if (gameObject.sprite.body.velocity.y > 0) {
            gameObject.sprite.anims.play(this.animationSprite.walk.down, true);
        } else {
            gameObject.sprite.anims.stop();

            if (prevVelocity.x < 0) gameObject.sprite.setTexture(this.animationSprite.texture, this.animationSprite.idle.left);
            else if (prevVelocity.x > 0) gameObject.sprite.setTexture(this.animationSprite.texture, this.animationSprite.idle.right);
            else if (prevVelocity.y < 0) gameObject.sprite.setTexture(this.animationSprite.texture, this.animationSprite.idle.up);
            else if (prevVelocity.y > 0) gameObject.sprite.setTexture(this.animationSprite.texture, this.animationSprite.idle.down);
        }
    };
}