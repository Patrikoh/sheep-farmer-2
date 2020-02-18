export enum Type {
    top,
    bottom,
    middle
}

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
    }
}