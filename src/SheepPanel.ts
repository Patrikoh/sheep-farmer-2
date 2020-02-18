import SheepHerd from "./SheepHerd";
import Sheep from "./Sheep";

let planks: Phaser.GameObjects.Group;

export default class SheepPanel {

    constructor(scene: Phaser.Scene, herd: SheepHerd) {
        planks = new Phaser.GameObjects.Group(scene);

        herd.getGroup().getChildren().forEach((sheep: Sheep, i) => {
            let texture: string;
            let plank = new Phaser.GameObjects.Sprite(scene, 64, 32 * i + 16, "panels");
            if (i == 0) {
                plank.setTexture("panels", "sheep-panel-plank-top-0")
            } else if (i === herd.getGroup().getChildren().length - 1) {
                plank.setTexture("panels", "sheep-panel-plank-bottom-0")
            }
            scene.add.existing(plank);
            planks.add(plank);
        });

    }

}