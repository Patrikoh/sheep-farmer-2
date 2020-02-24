import Sheep from './game-objects/sheep/Sheep';
import World from './World';

export default class SheepHerd {
    sheepGroup: Phaser.Physics.Arcade.Group;
    sheepList: Array<Sheep>;

    constructor(scene: Phaser.Scene, numberOfSheep: integer) {
        this.sheepGroup = scene.physics.add.group();
        this.sheepList = [];

        for (let index = 0; index < numberOfSheep; index++) {
            let sheep = new Sheep(scene, 10 + index * 100, 10 + index * 100);
            this.sheepGroup.add(sheep.sprite);
            this.sheepList.push(sheep);
        }

        scene.physics.add.collider(this.sheepGroup, this.sheepGroup,
            (s1: Phaser.Physics.Arcade.Sprite, s2: Phaser.Physics.Arcade.Sprite) => {
                this.getSheepFromSprite(s1).onSheepCollision(scene.time.now, s2.body.position.x, s2.body.position.y);
            }, null, this);

        // This is needed due to a bug in Phaser: 
        // https://www.html5gamedevs.com/topic/38972-solved-issue-with-world-bounds-collision/?do=findComment&comment=222837
        this.sheepGroup.getChildren().forEach((s: Phaser.Physics.Arcade.Sprite) => s.setCollideWorldBounds(true));
    }

    update(cursors: Phaser.Types.Input.Keyboard.CursorKeys, world: World) {
        let sheepSprites = this.sheepGroup.getChildren();
        sheepSprites.forEach((sprite: Phaser.Physics.Arcade.Sprite, i) => {
            this.getSheepFromSprite(sprite).update(world, cursors);
        });
    }

    addCollider(scene: Phaser.Scene, object) {
        scene.physics.add.collider(this.sheepGroup, object);
    }

    getSheepFromSprite(sprite: Phaser.Physics.Arcade.Sprite) {
        return this.sheepList.find(s => s.id == sprite.getData('id'));
    }

    getGroup() { return this.sheepGroup };

    getSprites() { return this.sheepGroup.getChildren() };

    getSheep() { return this.sheepList };
}