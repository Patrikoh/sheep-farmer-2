
export default class LifeBar {
    private bar: Array<Phaser.GameObjects.Sprite> = [];
    constructor(scene: Phaser.Scene, x: number, y: number) {
        let length = 100;
        for (let i = 0; i < length; i++) {
            const barSegment = new Phaser.GameObjects.Sprite(scene, x + i, y, "bar");
            barSegment.setDepth(1001);
            barSegment.setScrollFactor(0);
            scene.add.existing(barSegment);
            this.bar.push(barSegment);
        }
    }

    update(maxLife: number, life: number) {
        let texture = "bar-life-0";
        let length = 100;
        for (let i = 0; i < length; i++) {
            if ((life / maxLife) * length < i) {
                texture = "bar-life-1";
            }
            this.bar[i].setTexture("bar", texture);
        }
    }

    remove() {
        for (let i = 0; i < this.bar.length; i++) {
            this.bar[i].destroy(true);
        }
    }
}