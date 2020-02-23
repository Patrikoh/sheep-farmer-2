import Player from './player/Player';
import Wolf from './wolf/Wolf';
import SheepHerd from './SheepHerd';
import Pickup from './pickups/Pickup';
import PoisonMushroom from './pickups/PoisonMushroom';
import HealthMushroom from './pickups/HealthMushroom';

export default class World {
    scene: Phaser.Scene;
    player: Player;
    herd: SheepHerd;
    wolf: Wolf;
    pickups: Array<Pickup>;

    constructor(scene: Phaser.Scene, map: Phaser.Tilemaps.Tilemap) {
        this.scene = scene;
        this.player = new Player(this.scene, 200, 100);
        this.herd = new SheepHerd(this.scene, 5);
        this.wolf = new Wolf(this.scene, 400, 200);

        this.pickups = [];
        for (let index = 0; index < 50; index++) {
            let mushroom: Pickup;
            let mushroomIsPoison = index % 3 === 0;
            if (mushroomIsPoison) {
                mushroom = new PoisonMushroom(this.scene, Phaser.Math.Between(0, map.widthInPixels), Phaser.Math.Between(0, map.heightInPixels));
            } else {
                mushroom = new HealthMushroom(this.scene, Phaser.Math.Between(0, map.widthInPixels), Phaser.Math.Between(0, map.heightInPixels));
            }
            mushroom.addCollider(this.scene, this.herd.getGroup());
            this.pickups.push(mushroom);
        }
    }
}