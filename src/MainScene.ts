import Player from './Player';
import Sheep from './Sheep';

let player: Player;
let sheep: Sheep;
let cursors: Phaser.Types.Input.Keyboard.CursorKeys;

export default class MainScene extends Phaser.Scene {

    constructor() {
        super('MainScene');
    }

    preload() {
        // Scene
        this.load.image("tiles", "assets/tilesets/sheepfarmer-tiles.png");
        this.load.tilemapTiledJSON("map", "assets/tilesets/sheep-farm.json");

        // Sprites
        this.load.atlas("atlas", "assets/atlas/atlas.png", "assets/atlas/atlas.json");
    }

    create() {
        const map = this.make.tilemap({ key: "map" });

        // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
        // Phaser's cache (i.e. the name you used in preload)
        const tileset = map.addTilesetImage("sheepfarmer-tiles", "tiles");

        // Parameters: layer name (or index) from Tiled, tileset, x, y
        const belowLayer = map.createStaticLayer("Below Player", tileset, 0, 0);
        const worldLayer = map.createStaticLayer("World", tileset, 0, 0);
        const aboveLayer = map.createStaticLayer("Above Player", tileset, 0, 0);

        worldLayer.setCollisionByProperty({ collides: true });
        aboveLayer.setDepth(10);

        player = new Player(this);
        sheep = new Sheep(this);

        const camera = this.cameras.main;
        camera.startFollow(player);
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(player, worldLayer);
    }

    update(time, delta) {
        player.update(cursors);
        sheep.update(player.body.position);
    }
}