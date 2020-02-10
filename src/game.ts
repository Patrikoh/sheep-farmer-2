import 'phaser';

export default class Demo extends Phaser.Scene
{
    
    constructor ()
    {
        super('demo');
    }

    preload ()
    {
        this.load.image("tiles", "assets/tilesets/tuxmon-sample-32px-extruded.png");
        this.load.tilemapTiledJSON("map", "assets/tilesets/tuxemon-town.json");
    }

    create ()
    {
        const map = this.make.tilemap({ key: "map" });

        // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
        // Phaser's cache (i.e. the name you used in preload)
        const tileset = map.addTilesetImage("tuxmon-sample-32px-extruded", "tiles");

        // Parameters: layer name (or index) from Tiled, tileset, x, y
        const belowLayer = map.createStaticLayer("Below Player", tileset, 0, 0);
        const worldLayer = map.createStaticLayer("World", tileset, 0, 0);
        const aboveLayer = map.createStaticLayer("Above Player", tileset, 0, 0);
    }
}

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#125555',
    width: 800,
    height: 600,
    physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0 } // Top down game, so no gravity
        }
      },
    scene: Demo
};

const game = new Phaser.Game(config);
