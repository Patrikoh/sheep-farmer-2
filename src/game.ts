import 'phaser';
import MainScene from './MainScene';

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#125555',
    width: 1024,
    height: 800,
    physics: {
        default: "arcade",
        arcade: {
            // debug: true,
            gravity: { y: 0 } // Top down game, so no gravity
        }
    },
    scene: MainScene
};

const game = new Phaser.Game(config);
