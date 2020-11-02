export interface AnimationSprites {
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
    protected animationSprite: AnimationSprites;

    constructor(animationSprite: AnimationSprites) {
        this.animationSprite = animationSprite;
    }

    update(gameObject) {
        const prevVelocity = gameObject.sprite.body.velocity.clone();
        const {velocity} = gameObject.sprite.body;

        if (velocity.x < 0 && (Math.abs(velocity.x) > Math.abs(velocity.y))) {
            gameObject.sprite.anims.play(this.animationSprite.walk.left, true);
        } else if (velocity.x > 0 && (Math.abs(velocity.x) > Math.abs(velocity.y))) {
            gameObject.sprite.anims.play(this.animationSprite.walk.right, true);
        } else if (velocity.y < 0) {
            gameObject.sprite.anims.play(this.animationSprite.walk.up, true);
        } else if (velocity.y > 0) {
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
