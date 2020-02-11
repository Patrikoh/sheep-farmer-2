export default class Sheep extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene) {
        super(scene, 50, 50, "player");

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setActive(true);
        this.setCollideWorldBounds(true);

        this.setSize(32,40);
        this.setOffset(0, 22);
    }

    update(followPosition: Phaser.Math.Vector2) {
        const speed = 75;
        const distance = 100;
        const prevVelocity = this.body.velocity.clone();

        const moveLeft = followPosition.x  + distance < this.body.position.x;
        const moveRight = followPosition.x - distance > this.body.position.x; 
        const moveUp = followPosition.y + distance < this.body.position.y;
        const moveDown = followPosition.y - distance > this.body.position.y;

        // Stop any previous movement from the last frame
        this.setVelocity(0);

        if (moveLeft) {
            this.setVelocityX(-speed);
        } else if (moveRight) {
            this.setVelocityX(speed);
        }

        if (moveUp) {
            this.setVelocityY(-speed);
        } else if (moveDown) {
            this.setVelocityY(speed);
        }

        // Normalize and scale the velocity so that Sheep can't move faster along a diagonal
        this.body.velocity.normalize().scale(speed);

        // Update the animation last and give left/right animations precedence over up/down animations
        if (moveLeft) {
            this.anims.play("player-left-walk", true);
        } else if (moveRight) {
            this.anims.play("player-right-walk", true);
        } else if (moveUp) {
            this.anims.play("player-up-walk", true);
        } else if (moveDown) {
            this.anims.play("player-down-walk", true);
        } else {
            this.anims.stop();

            if (prevVelocity.x < 0) this.setTexture("player", "player-left-idle.png");
            else if (prevVelocity.x > 0) this.setTexture("player", "player-right-idle.png");
            else if (prevVelocity.y < 0) this.setTexture("player", "player-up-idle.png");
            else if (prevVelocity.y > 0) this.setTexture("player", "player-down-idle.png");
        }
    }
}