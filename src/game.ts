import 'phaser';
import MainScene from './MainScene';

const config = {
    type: Phaser.CANVAS,
    backgroundColor: '#000000',
    width: 500,
    height: 350,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    pixelArt: true,
    parent: "gameDiv",
    physics: {
        default: "arcade",
        arcade: {
            debug: true,
            gravity: { y: 0 }
        }
    },
    scene: MainScene
};

const game = new Phaser.Game(config);
