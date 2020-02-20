import Sheep from "../../Sheep";

export enum Type {
    top,
    bottom,
    middle
}

export default class SheepPanelPlank extends Phaser.GameObjects.Sprite {

    private sheepStatusText: Phaser.GameObjects.BitmapText;

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

        this.sheepStatusText = scene.add.bitmapText(x, y, "pixelFont", "");

        this.sheepStatusText.setDepth(1001);
        this.sheepStatusText.setScrollFactor(0);
    }

    update(sheep: Sheep) {
        this.sheepStatusText.setText(sheep.getName());
    }
}