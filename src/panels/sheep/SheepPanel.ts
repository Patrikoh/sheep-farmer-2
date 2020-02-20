import SheepHerd from "../../SheepHerd";
import Sheep from "../../Sheep";
import SheepPanelPlank, { Type } from "./SheepPanelPlank";

let planks: Phaser.GameObjects.Group;

export default class SheepPanel {

    constructor(scene: Phaser.Scene, herd: SheepHerd) {
        planks = new Phaser.GameObjects.Group(scene);

        herd.getSheep().forEach((sheep: Sheep, i) => {
            let plank = new SheepPanelPlank(scene, 64, 32 * i + 16, Type.middle);
            plank.setDepth(1000);
            scene.add.existing(plank);
            plank.setScrollFactor(0);
            planks.add(plank);
        });
    }

    update(herd: SheepHerd) {
        planks.getChildren().forEach((plank: SheepPanelPlank, i) =>  plank.update(herd.getSheep().filter(s => s.active)[i]));
    }

}