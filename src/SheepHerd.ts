import Sheep from './Sheep';
import Pickup from './pickups/Pickup';

let herd: Phaser.Physics.Arcade.Group;

export default class SheepHerd {
    constructor(scene: Phaser.Scene, numberOfSheep: integer) {
        herd = scene.physics.add.group();

        for (let index = 0; index < numberOfSheep; index++) {
            herd.add(new Sheep(scene, 10 + index * 100, 10 + index * 100));
        }

        scene.physics.add.collider(herd, herd,
            (s1: Sheep, s2: Sheep) => {
                s1.onSheepCollision(scene.time.now, s2.body.position.x, s2.body.position.y);
            }, null, this);

        // This is needed due to a bug in Phaser: 
        // https://www.html5gamedevs.com/topic/38972-solved-issue-with-world-bounds-collision/?do=findComment&comment=222837
        herd.getChildren().forEach((s: Sheep) => s.setCollideWorldBounds(true));
    }

    update(scene: Phaser.Scene, time, followPosition: Phaser.Math.Vector2, grasses: Array<Pickup>) {
        let herdChildren = herd.getChildren();
        herdChildren.forEach((sheep: Sheep, i) => {
            let herdMedianX = herdChildren.reduce((a, s: Phaser.Physics.Arcade.Sprite) => (s.body.position.x + a), 0) / herdChildren.length;
            let herdMedianY = herdChildren.reduce((a, s: Phaser.Physics.Arcade.Sprite) => (s.body.position.y + a), 0) / herdChildren.length;
            let positionX = (followPosition.x + herdMedianX) / 2;
            let positionY = (followPosition.y + herdMedianY) / 2;
            sheep.update(scene, time, new Phaser.Math.Vector2(positionX, positionY), grasses);
        });
    }

    addCollider(scene: Phaser.Scene, object) {
        scene.physics.add.collider(herd, object);
    }

    getGroup() { return herd };

    getSheep() { return herd.getChildren() as Array<Sheep> }
}