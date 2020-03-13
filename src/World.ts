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
    pickups: Array<Pickup> = [];
    gameEventHandler: GameEventHandler;
    scene: MainScene;

    constructor(scene: MainScene) {
        this.gameEventHandler = new GameEventHandler();
        this.player = new Player(scene, 200, 100);
        this.herd = new SheepHerd(scene, 5);
        this.wolf = new Wolf(scene, 400, 200);
        this.scene = scene;
    }

    addColliders(worldLayer: Phaser.Tilemaps.StaticTilemapLayer) {
        this.player.addCollider(this.scene, worldLayer);
        this.herd.addCollider(this.scene, worldLayer);
        this.herd.addCollider(this.scene, this.player.sprite);
        this.wolf.addCollider(this.scene, worldLayer);
        this.wolf.addCollider(this.scene, this.herd.getGroup());
    }

    spawnPickups(spawnTiles: Array<Phaser.Tilemaps.Tile>, probability: number) {
        spawnTiles.filter(() => Math.random() < probability).forEach((tile, index) => {
            let mushroom: Pickup;
            let mushroomIsPoison = index % 3 === 0;
            if (mushroomIsPoison) {
                mushroom = new PoisonMushroom(this.scene, tile.pixelX + 16, tile.pixelY + 16);
            } else {
                mushroom = new HealthMushroom(this.scene, tile.pixelX + 16, tile.pixelY + 16);
            }
            mushroom.addCollider(this.scene, this.herd.getGroup());
            this.pickups.push(mushroom);
        });
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
