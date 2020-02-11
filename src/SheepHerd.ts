import Sheep from './Sheep';

let herd: Array<Sheep>;

export default class SheepHerd {
    constructor(scene: Phaser.Scene, numberOfSheep: integer) {
        herd = [];
        for (let index = 0; index < numberOfSheep; index++) {
            herd.push(new Sheep(scene, 10 + index * 100, 10 + index * 100));
        }

        scene.physics.add.collider(herd, herd);
    }

    update(position: Phaser.Math.Vector2) {
        herd.forEach(sheep => {
            sheep.update(position)
        });
    }

    addCollider(scene: Phaser.Scene, object) {
        scene.physics.add.collider(herd, object);
    }
}