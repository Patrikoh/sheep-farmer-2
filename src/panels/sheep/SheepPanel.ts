import SheepHerd from "../../SheepHerd";
import Sheep from "../../Sheep";
import SheepPanelPlank from "./SheepPanelPlank";
import Toggle from "../Toggle";
import depthIndex from '../../depthIndex.json';

export default class SheepPanel {
    private planks: Phaser.GameObjects.Group;
    private topSegment: Phaser.GameObjects.Sprite;
    private bottomSegment: Phaser.GameObjects.Sprite;
    private toggle: Toggle;

    constructor(scene: Phaser.Scene, herd: SheepHerd) {
        this.initializePanel(scene, herd);
    }

    update(scene: Phaser.Scene, herd: SheepHerd) {
        if (herd.getSheep().length !== this.planks.getChildren().length) {
            this.setCorrectNumberOfPlanks(herd.getSheep().length);
        } else {
            this.planks.getChildren().forEach((plank: SheepPanelPlank, i) => plank.update(herd.getSheep()[i]));
        }
    }

    private setCorrectNumberOfPlanks(length: number) {
        this.planks.getChildren().filter((_p, i) => i >= length).forEach((p: SheepPanelPlank) => p.remove());
        this.bottomSegment.setPosition(64, 32 * (length + 1));
        this.toggle.setPosition(190, 16 * length + 16)
    }

    private initializePanel(scene: Phaser.Scene, herd: SheepHerd) {
        this.topSegment = new Phaser.GameObjects.Sprite(scene, 64, 0, "panels", "sheep-panel-top-0");
        this.topSegment.setScrollFactor(0);
        this.topSegment.setDepth(depthIndex.UI);
        scene.add.existing(this.topSegment);

        this.bottomSegment = new Phaser.GameObjects.Sprite(scene, 64, 32 * herd.getSheep().length + 32, "panels", "sheep-panel-bottom-0");
        this.bottomSegment.setScrollFactor(0);
        this.bottomSegment.setDepth(depthIndex.UI);
        scene.add.existing(this.bottomSegment);

        this.planks = new Phaser.GameObjects.Group(scene);
        herd.getSheep().forEach((sheep: Sheep, i) => {
            let plank = new SheepPanelPlank(scene, 64, 32 * i + 32);
            plank.setDepth(depthIndex.UI);
            scene.add.existing(plank);
            plank.setScrollFactor(0);
            this.planks.add(plank);
        });

        this.toggle = new Toggle(scene, 190,  16 * herd.getSheep().length + 16);
        this.toggle.setDepth(depthIndex.UI + 2);
        this.toggle.setScrollFactor(0);
        scene.add.existing(this.toggle);
    }
}