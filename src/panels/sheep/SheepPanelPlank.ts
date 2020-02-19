import Sheep from "../../Sheep";

export enum Type {
    top,
    bottom,
    middle
}

let sheepStatusText: Phaser.GameObjects.Text;

export default class SheepPanelPlank extends Phaser.GameObjects.Sprite {
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

        sheepStatusText = scene.add.text(x,y,"test",{
            fontSize: '12px',
            fill: "#000"
        });

        sheepStatusText.setDepth(1001);
        sheepStatusText.setScrollFactor(0);
    }

    update(sheep: Sheep) {

    }
}