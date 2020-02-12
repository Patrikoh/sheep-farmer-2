import 'phaser';
import MainScene from './MainScene';

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#125555',
    width: window.innerWidth,
    height: window.innerHeight,
    parent: "gameDiv",
    physics: {
        default: "arcade",
        arcade: {
            debug: true,
            gravity: { y: 0 } // Top down game, so no gravity
        }
    },
    scene: MainScene
};

const game = new Phaser.Game(config);
