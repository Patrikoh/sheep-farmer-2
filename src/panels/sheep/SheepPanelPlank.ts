import Sheep from "../../game-objects/sheep/Sheep";
import LifeBar from "../LifeBar";
import depthIndex from '../../depthIndex.json';

export default class SheepPanelPlank extends Phaser.GameObjects.Sprite {
    private sheepStatusText: Phaser.GameObjects.BitmapText;
    private lifeBar: LifeBar;
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "panels");
        this.setTexture("panels", "sheep-panel-middle-0");
        this.sheepStatusText = scene.add.bitmapText(x - 54, y - 8, "pixelFont", "");
        this.lifeBar = new LifeBar(scene, x - 54, y + 8);
        this.sheepStatusText.setDepth(depthIndex.UI + 1);
        this.sheepStatusText.setScrollFactor(0);
    }

    update(sheep: Sheep) {
        if (sheep) {
            const { maxLife, life } = sheep.healthState;
            this.lifeBar.update(maxLife, life);
            this.sheepStatusText.setText(sheep.name);
        }
    }

    onToggle() {
        this.setVisible(!this.visible);
        this.sheepStatusText.setVisible(!this.sheepStatusText.visible);
        this.lifeBar.onToggle();
    }

    remove() {
        this.sheepStatusText.destroy(true);
        this.lifeBar.remove();
        this.destroy(true);
    }
}