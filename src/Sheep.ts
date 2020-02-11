export default class Sheep extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x:number, y:number) {
        super(scene, x, y, "atlas");

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setActive(true);
        this.setCollideWorldBounds(true);

        this.setSize(32,32);
        this.setOffset(0, 32);
    }

    update(followPosition: Phaser.Math.Vector2) {
        const speed = 100;
        const distance = 100;
        const prevVelocity = this.body.velocity.clone();

        const moveLeft = followPosition.x  + distance < this.body.position.x;
        const moveRight = followPosition.x - distance > this.body.position.x; 
        const moveUp = followPosition.y + distance < this.body.position.y;
        const moveDown = followPosition.y - distance > this.body.position.y;
        if (moveLeft || moveRight || moveUp || moveDown) {
            this.setState('movingToPlayer');
        } else {
            this.setState('randomWalking');
        }  

        // Stop any previous movement from the last frame
        this.setVelocity(0);

        if (this.state === 'movingToPlayer') {
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
        } 
        else {
            if (this.state === 'randomWalking') {
                if (Phaser.Math.FloatBetween(0,1) > 0.95) {
                    this.setState('standingStill');
                }
            } else {
                if (Phaser.Math.FloatBetween(0,1) > 0.95) {
                    this.setState('randomWalking');
                }
            }

            if (this.state === 'randomWalking') {
                if (prevVelocity.x === 0) {
                    this.setVelocity(Phaser.Math.Between(-speed, speed), Phaser.Math.Between(-speed, speed));
                } else {
                    this.setVelocity(prevVelocity.x, prevVelocity.y);
                }
            }
        }

        // Normalize and scale the velocity so that Sheep can't move faster along a diagonal
        this.body.velocity.normalize().scale(speed);

        // Update the animation last and give left/right animations precedence over up/down animations
        if (moveLeft) {
            this.anims.play("misa-left-walk", true);
        } else if (moveRight) {
            this.anims.play("misa-right-walk", true);
        } else if (moveUp) {
            this.anims.play("misa-back-walk", true);
        } else if (moveDown) {
            this.anims.play("misa-front-walk", true);
        } else {
            this.anims.stop();

            // If we were moving, pick and idle frame to use
            if (prevVelocity.x < 0) this.setTexture("atlas", "misa-left");
            else if (prevVelocity.x > 0) this.setTexture("atlas", "misa-right");
            else if (prevVelocity.y < 0) this.setTexture("atlas", "misa-back");
            else if (prevVelocity.y > 0) this.setTexture("atlas", "misa-front");
        }
    }

    addCollider(scene: Phaser.Scene, object) {
        scene.physics.add.collider(this, object);
    }
}