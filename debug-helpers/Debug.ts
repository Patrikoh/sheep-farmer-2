import 'phaser';

export default class Debug {
    debugWorldCollisions(scene: Phaser.Scene, layer: Phaser.Tilemaps.StaticTilemapLayer) {
        const debugGraphics = scene.add.graphics().setAlpha(0.75);
        layer.renderDebug(debugGraphics, {
            tileColor: null, // Color of non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        });
    }
}