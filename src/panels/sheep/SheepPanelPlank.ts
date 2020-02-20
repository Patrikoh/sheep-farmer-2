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
    constructor(scene: Phaser.Scene, x: number, y: number, type: Type) {
        super(scene, x, y, "panels");

        switch (type) {
            case Type.bottom:
                this.setTexture("panels", "sheep-panel-plank-bottom-0");
                break;
            case Type.middle:
                this.setTexture("panels", "sheep-panel-plank-middle-0");
                break;
            case Type.top:
                this.setTexture("panels", "sheep-panel-plank-top-0");
                break;
        }

        this.lifeBar = new LifeBar(scene, x - 48, y + 8);
        this.sheepStatusText = scene.add.bitmapText(x - 40,y - 8, "gem", "", 10);

        this.sheepStatusText.setDepth(1001);
        this.sheepStatusText.setScrollFactor(0);
    }

    update(sheep: Sheep) {
        const {maxLife, life} = sheep.getHealth();
        this.lifeBar.update(maxLife, life);
        this.sheepStatusText.setText(sheep.getName());
    }
}