import Sheep from './Sheep';

let herd: Array<Sheep>;
let gameScene;

export default class SheepHerd {
    constructor(scene: Phaser.Scene, numberOfSheep: integer) {
        herd = [];
        gameScene = scene;
        for (let index = 0; index < numberOfSheep; index++) {
            herd.push(new Sheep(scene, 10 + index * 100, 10 + index * 100));
        }

        scene.physics.add.collider(herd, herd);
    }

    update(followPosition: Phaser.Math.Vector2) {
        herd.forEach((sheep, i) => {
            let herdMedianX = herd.reduce((a, s) => (s.body.position.x + a), 0) / herd.length;
            let herdMedianY = herd.reduce((a, s) => (s.body.position.y + a), 0) / herd.length;
            let positionX = (followPosition.x + herdMedianX) / 2;
            let positionY = (followPosition.y + herdMedianY) / 2;
            sheep.update(new Phaser.Math.Vector2(positionX, positionY));
        });
    }

    addCollider(scene: Phaser.Scene, object) {
        scene.physics.add.collider(herd, object);
    }
}