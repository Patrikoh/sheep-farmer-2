import Player from './game-objects/player/Player';
import Wolf from './game-objects/wolf/Wolf';
import SheepHerd from './game-objects/SheepHerd';
import Pickup from './game-objects/pickup/Pickup';
import PoisonMushroom from './game-objects/pickup/PoisonMushroom';
import HealthMushroom from './game-objects/pickup/HealthMushroom';
import GameEventHandler from './events/GameEventHandler';

export default class World {
    scene: Phaser.Scene;
    player: Player;
    herd: SheepHerd;
    wolf: Wolf;
    pickups: Array<Pickup>;
    gameEventHandler: GameEventHandler;

    constructor(scene: Phaser.Scene, map: Phaser.Tilemaps.Tilemap) {
        this.gameEventHandler = new GameEventHandler();
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

    update(cursors: Phaser.Types.Input.Keyboard.CursorKeys): void {
        this.player.update(cursors, this);
        this.herd.update(cursors, this);
        this.wolf.update(cursors, this);
    }
}
