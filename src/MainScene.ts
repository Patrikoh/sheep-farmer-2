import Player from './player/Player';
import SheepHerd from './SheepHerd';
import SheepPanel from './panels/sheep/SheepPanel';
import Pickup from './pickups/Pickup';
import HealthMushroom from './pickups/HealthMushroom';
import PoisonMushroom from './pickups/PoisonMushroom';
import depthIndex from './depthIndex.json';
import Wolf from './wolf/Wolf';

let player: Player;
let herd: SheepHerd;
let wolf: Wolf;
let sheepPanel: SheepPanel;
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

        player = new Player(this, 200, 100);
        herd = new SheepHerd(this, 5);
        wolf = new Wolf(this, 400, 200);

        sheepPanel = new SheepPanel(this, herd);

        pickups = [];
        for (let index = 0; index < 50; index++) {
            let mushroom: Pickup;
            let mushroomIsPoison = index % 3 === 0;
            if (mushroomIsPoison) {
                mushroom = new PoisonMushroom(this, Phaser.Math.Between(0, map.widthInPixels), Phaser.Math.Between(0, map.heightInPixels));
            } else {
                mushroom = new HealthMushroom(this, Phaser.Math.Between(0, map.widthInPixels), Phaser.Math.Between(0, map.heightInPixels));
            }
            mushroom.addCollider(this, herd.getGroup());
            pickups.push(mushroom);
        }

        const camera = this.cameras.main;
        camera.startFollow(player.sprite);
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        cursors = this.input.keyboard.createCursorKeys();

        player.addCollider(this, worldLayer);
        herd.addCollider(this, worldLayer);
        herd.addCollider(this, player.sprite);
        wolf.addCollider(this, worldLayer);
        wolf.addCollider(this, herd.getGroup());
    }

    update(time: number) {
        player.update(cursors);
        herd.update(this, time, player.sprite.body.position, pickups);
        wolf.update(cursors, herd, time);
        sheepPanel.update(this, herd);
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