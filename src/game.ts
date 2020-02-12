import 'phaser';
import MainScene from './MainScene';

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#000000',
    width: 600,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    pixelArt: true,
    parent: "gameDiv",
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
            gravity: { y: 0 } // Top down game, so no gravity
        }
    },
    scene: MainScene
};

const game = new Phaser.Game(config);
