import Player from './Player';
import SheepHerd from './SheepHerd';

let player: Player;
let herd: SheepHerd;
let cursors: Phaser.Types.Input.Keyboard.CursorKeys;

export default class MainScene extends Phaser.Scene {

    constructor() {
        super('MainScene');
    }

    preload() {
        this.load.image("tiles", "assets/maps/sheep-farmer-tiles.png");
        this.load.tilemapTiledJSON("map", "assets/maps/sheep-farm.json");
        this.load.atlas("player", "assets/atlas/player/player.png", "assets/atlas/player/player.json");
    }

    create() {
        const map = this.make.tilemap({ key: "map" });

        // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
        // Phaser's cache (i.e. the name you used in preload)
        const tileset = map.addTilesetImage("sheep-farmer-tiles", "tiles");

        // Parameters: layer name (or index) from Tiled, tileset, x, y
        const belowLayer = map.createStaticLayer("Below Player", tileset, 0, 0);
        const worldLayer = map.createStaticLayer("World", tileset, 0, 0);
        const aboveLayer = map.createStaticLayer("Above Player", tileset, 0, 0);

        worldLayer.setCollisionByProperty({ collides: true });
        aboveLayer.setDepth(10);

        // Makes it possible to walk on the whole map
        this.physics.world.bounds.width = worldLayer.width;
        this.physics.world.bounds.height = worldLayer.height;

        player = new Player(this);
        herd = new SheepHerd(this, 5);

        const camera = this.cameras.main;
        camera.startFollow(player);
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        cursors = this.input.keyboard.createCursorKeys();

        player.addCollider(this, worldLayer);
        herd.addCollider(this, worldLayer);
        herd.addCollider(this, player);
    }

    update(time, delta) {
        player.update(cursors);
        herd.update(player.body.position);
    }
}