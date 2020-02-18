import Player from './Player';
import SheepHerd from './SheepHerd';
import Pickup from './pickups/Pickup';
import HealthMushroom from './pickups/HealthMushroom';
import PoisonMushroom from './pickups/PoisonMushroom';

let player: Player;
let herd: SheepHerd;
let pickups: Array<Pickup>;
let cursors: Phaser.Types.Input.Keyboard.CursorKeys;

export default class MainScene extends Phaser.Scene {

    constructor() {
        super('MainScene');
    }

    preload() {
        this.load.image("tiles", "assets/maps/sheep-farmer-tiles.png");
        this.load.tilemapTiledJSON("map", "assets/maps/sheep-farm.json");
        this.load.atlas("player", "assets/atlas/player/player.png", "assets/atlas/player/player.json");
        this.load.atlas("sheep", "assets/atlas/sheep/sheep.png", "assets/atlas/sheep/sheep.json");
        this.load.atlas("pickups", "assets/atlas/pickups/pickups.png", "assets/atlas/pickups/pickups.json");
    }

    create() {
        const map = this.make.tilemap({key: "map"});

        const tileset = map.addTilesetImage("sheep-farmer-tiles", "tiles");

        const belowLayer = map.createStaticLayer("Below Player", tileset, 0, 0);
        const worldLayer = map.createStaticLayer("World", tileset, 0, 0);
        const aboveLayer = map.createStaticLayer("Above Player", tileset, 0, 0);

        worldLayer.setCollisionByProperty({collides: true});
        aboveLayer.setDepth(10);

        // Makes it possible to walk on the whole map
        this.physics.world.bounds.width = worldLayer.width;
        this.physics.world.bounds.height = worldLayer.height;

        player = new Player(this);
        herd = new SheepHerd(this, 5);

        pickups = [];
        for (let index = 0; index < 50; index++) {
            let mushroom;
            let mushroomIsPoison = index % 3 === 0;
            if(mushroomIsPoison) {
                mushroom = new PoisonMushroom(this, Phaser.Math.Between(0, map.widthInPixels), Phaser.Math.Between(0, map.heightInPixels));
            } else {
                mushroom = new HealthMushroom(this, Phaser.Math.Between(0, map.widthInPixels), Phaser.Math.Between(0, map.heightInPixels));
            }
            mushroom.addCollider(this, herd.getGroup());
            pickups.push(mushroom);
        }

        const camera = this.cameras.main;
        camera.startFollow(player);
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        cursors = this.input.keyboard.createCursorKeys();

        player.addCollider(this, worldLayer);
        herd.addCollider(this, worldLayer);
        herd.addCollider(this, player);
    }

    update(time: number) {
        player.update(cursors);
        herd.update(this, time, player.body.position, pickups);
    }
}