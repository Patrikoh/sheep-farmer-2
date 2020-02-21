import SheepHerd from "../../SheepHerd";
import Sheep from "../../Sheep";
import SheepPanelPlank from "./SheepPanelPlank";

let planks: Phaser.GameObjects.Group;

export default class SheepPanel {

    constructor(scene: Phaser.Scene, herd: SheepHerd) {
        let topSegment = new Phaser.GameObjects.Sprite(scene, 64, 0, "panels");
        topSegment.setTexture("panels", "sheep-panel-top-0");
        topSegment.setScrollFactor(0);
        topSegment.setDepth(1000);
        scene.add.existing(topSegment);

        let bottomSegment = new Phaser.GameObjects.Sprite(scene, 64, 32 * herd.getSheep().length + 32, "panels");
        bottomSegment.setTexture("panels", "sheep-panel-bottom-0");
        bottomSegment.setScrollFactor(0);
        bottomSegment.setDepth(1000);
        scene.add.existing(bottomSegment);

        planks = new Phaser.GameObjects.Group(scene);
        herd.getSheep().forEach((sheep: Sheep, i) => {
            let plank = new SheepPanelPlank(scene, 64, 32 * i + 32);
            plank.setDepth(1000);
            scene.add.existing(plank);
            plank.setScrollFactor(0);
            planks.add(plank);
        });
    }

    update(herd: SheepHerd) {
        planks.getChildren().forEach((plank: SheepPanelPlank, i) =>  {
            const sheep = herd.getSheep()[i];
            if(sheep) {
                plank.update(herd.getSheep()[i])
            }
        });
    }

}