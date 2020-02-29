import Player from './game-objects/player/Player';
import Wolf from './game-objects/wolf/Wolf';
import SheepHerd from './game-objects/SheepHerd';
import Pickup from './game-objects/pickup/Pickup';
import PoisonMushroom from './game-objects/pickup/PoisonMushroom';
import HealthMushroom from './game-objects/pickup/HealthMushroom';
import GameEventHandler from './events/GameEventHandler';
import MainScene from './MainScene';

export default class World {
    player: Player;
    herd: SheepHerd;
    wolf: Wolf;
    pickups: Array<Pickup>;
    gameEventHandler: GameEventHandler;

    constructor(scene: MainScene, map: Phaser.Tilemaps.Tilemap) {
        this.gameEventHandler = new GameEventHandler();
        this.player = new Player(scene, 200, 100);
        this.herd = new SheepHerd(scene, 5);
        this.wolf = new Wolf(scene, 400, 200);

        this.pickups = [];
        for (let index = 0; index < 50; index++) {
            let mushroom: Pickup;
            let mushroomIsPoison = index % 3 === 0;
            if (mushroomIsPoison) {
                mushroom = new PoisonMushroom(scene, Phaser.Math.Between(0, map.widthInPixels), Phaser.Math.Between(0, map.heightInPixels));
            } else {
                mushroom = new HealthMushroom(scene, Phaser.Math.Between(0, map.widthInPixels), Phaser.Math.Between(0, map.heightInPixels));
            }
            mushroom.addCollider(scene, this.herd.getGroup());
            this.pickups.push(mushroom);
        }
    }

    addColliders(scene: MainScene, worldLayer: Phaser.Tilemaps.StaticTilemapLayer) {
        this.player.addCollider(scene, worldLayer);
        this.herd.addCollider(scene, worldLayer);
        this.herd.addCollider(scene, this.player.sprite);
        this.wolf.addCollider(scene, worldLayer);
        this.wolf.addCollider(scene, this.herd.getGroup());
    }

    addGameEventListeners() {
        this.herd.addGameEventListeners(this.gameEventHandler);
    }

    update(scene: MainScene): void {
        this.player.update(scene);
        this.herd.update(scene);
        this.wolf.update(scene);
    }
}
