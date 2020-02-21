import Sheep from "../../Sheep";
import LifeBar from "../LifeBar";

export enum Type {
    top,
    bottom,
    middle
}

export default class SheepPanelPlank extends Phaser.GameObjects.Sprite {
    private sheepStatusText: Phaser.GameObjects.BitmapText;
    private lifeBar: LifeBar;
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "panels");
        this.setTexture("panels", "sheep-panel-middle-0");
        this.sheepStatusText = scene.add.bitmapText(x - 54, y - 8, "pixelFont", "");
        this.lifeBar = new LifeBar(scene, x - 54, y + 8);
        this.sheepStatusText.setDepth(1001);
        this.sheepStatusText.setScrollFactor(0);
    }

    update(sheep: Sheep) {
        if (sheep) {
            const { maxLife, life } = sheep.getHealth();
            this.lifeBar.update(maxLife, life);
            this.sheepStatusText.setText(sheep.getName());
        }
    }

    remove() {
        this.sheepStatusText.destroy(true);
        this.lifeBar.remove();
        this.destroy(true);
    }
}