import depthIndex from '../depthIndex.json';
export default class Toggle extends Phaser.GameObjects.Sprite {
    private initialX;
    private toggledX;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "panels", "sheep-panel-toggle-0");
        this.initialX = x;
        this.toggledX = 64;
        this.setDepth(depthIndex.UI + 2);
        this.setScrollFactor(0);
    }

    onToggle() {
        this.x == this.toggledX ? this.x = this.initialX : this.x = this.toggledX;
    }
}