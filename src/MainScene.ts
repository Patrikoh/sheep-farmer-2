import SheepPanel from './panels/sheep/SheepPanel';
import depthIndex from './depthIndex.json';
import World from './World';

let sheepPanel: SheepPanel;

let cursors: Phaser.Types.Input.Keyboard.CursorKeys;

export default class MainScene extends Phaser.Scene {
    private world: World;

    constructor() {
        super('MainScene');
    }

    preload() {
        this.load.image("tiles", "assets/maps/sheep-farmer-tiles.png");
        this.load.tilemapTiledJSON("map", "assets/maps/sheep-farm.json");
        this.load.atlas("player", "assets/atlas/player/player.png", "assets/atlas/player/player.json");
        this.load.atlas("sheep", "assets/atlas/sheep/sheep.png", "assets/atlas/sheep/sheep.json");
        this.load.atlas("pickups", "assets/atlas/pickups/pickups.png", "assets/atlas/pickups/pickups.json");
        this.load.atlas("panels", "assets/atlas/panels/sheep-panel.png", "assets/atlas/panels/sheep-panel.json");
        this.load.bitmapFont('pixelFont', 'assets/fonts/pixelFont.png', 'assets/fonts/pixelFont.fnt');
        this.load.atlas("bar", "assets/atlas/panels/bar.png", "assets/atlas/panels/bar.json");
    }

    create() {
        this.loadAllAnimations(this);

        const map = this.make.tilemap({ key: "map" });
        const tileset = map.addTilesetImage("sheep-farmer-tiles", "tiles");

        const belowLayer = map.createStaticLayer("Below Player", tileset, 0, 0);
        const worldLayer = map.createStaticLayer("World", tileset, 0, 0);
        const aboveLayer = map.createStaticLayer("Above Player", tileset, 0, 0);

        worldLayer.setCollisionByProperty({ collides: true });
        aboveLayer.setDepth(depthIndex.WORLD);

        // Makes it possible to walk on the whole map
        this.physics.world.bounds.width = worldLayer.width;
        this.physics.world.bounds.height = worldLayer.height;

        this.world = new World(this, map);

        sheepPanel = new SheepPanel(this, this.world.herd);

        const camera = this.cameras.main;
        camera.startFollow(this.world.player.sprite);
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        cursors = this.input.keyboard.createCursorKeys();

        this.world.player.addCollider(this, worldLayer);
        this.world.herd.addCollider(this, worldLayer);
        this.world.herd.addCollider(this, this.world.player.sprite);
        this.world.wolf.addCollider(this, worldLayer);
        this.world.wolf.addCollider(this, this.world.herd.getGroup());
    }

    update(time: number) {
        this.world.player.update(cursors);
        this.world.herd.update(this, time, this.world.player.sprite.body.position, this.world.pickups);
        this.world.wolf.update(cursors, this.world.herd, time);
        sheepPanel.update(this, this.world.herd);
    }

    loadAllAnimations(scene: Phaser.Scene) {
        scene.anims.create({
            key: "player-down-walk",
            frames: scene.anims.generateFrameNames("player", {
                prefix: "player-down-walk-",
                start: 0,
                end: 11
            }),
            frameRate: 7,
            repeat: -1
        });
        scene.anims.create({
            key: "player-right-walk",
            frames: scene.anims.generateFrameNames("player", {
                prefix: "player-right-walk-",
                start: 0,
                end: 11
            }),
            frameRate: 7,
            repeat: -1
        });
        scene.anims.create({
            key: "player-left-walk",
            frames: scene.anims.generateFrameNames("player", {
                prefix: "player-left-walk-",
                start: 0,
                end: 11
            }),
            frameRate: 7,
            repeat: -1
        });
        scene.anims.create({
            key: "player-up-walk",
            frames: scene.anims.generateFrameNames("player", {
                prefix: "player-up-walk-",
                start: 0,
                end: 11
            }),
            frameRate: 7,
            repeat: -1
        });

        scene.anims.create({
            key: "sheep-down-walk",
            frames: scene.anims.generateFrameNames("sheep", {
                prefix: "sheep-down-walk-",
                start: 0,
                end: 11
            }),
            frameRate: 7,
            repeat: -1
        });
        scene.anims.create({
            key: "sheep-right-walk",
            frames: scene.anims.generateFrameNames("sheep", {
                prefix: "sheep-right-walk-",
                start: 0,
                end: 11
            }),
            frameRate: 7,
            repeat: -1
        });
        scene.anims.create({
            key: "sheep-left-walk",
            frames: scene.anims.generateFrameNames("sheep", {
                prefix: "sheep-left-walk-",
                start: 0,
                end: 11
            }),
            frameRate: 7,
            repeat: -1
        });
        scene.anims.create({
            key: "sheep-up-walk",
            frames: scene.anims.generateFrameNames("sheep", {
                prefix: "sheep-up-walk-",
                start: 0,
                end: 11
            }),
            frameRate: 7,
            repeat: -1
        });
    }
}