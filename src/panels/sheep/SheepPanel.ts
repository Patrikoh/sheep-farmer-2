import Sheep from "../../game-objects/sheep/Sheep";
import SheepPanelPlank from "./SheepPanelPlank";
import Toggle from "../Toggle";
import depthIndex from '../../depthIndex.json';
import World from "../../World";
import { GameEventType } from "../../events/GameEventType";

export default class SheepPanel {
    private planks: Phaser.GameObjects.Group;
    private topSegment: Phaser.GameObjects.Sprite;
    private bottomSegment: Phaser.GameObjects.Sprite;
    private toggle: Toggle;

    constructor(scene: Phaser.Scene, world: World) {
        this.initializePanel(scene, world);
        world.gameEventHandler.addGameEventListener(GameEventType.TOGGLE_SHEEP_PANEL, () => this.onToggle());
    }

    update(scene: Phaser.Scene, world: World) {
        if (world.herd.getSheep().length !== this.planks.getChildren().length) {
            this.setCorrectNumberOfPlanks(world.herd.getSheep().length);
        } else {
            this.planks.getChildren().forEach((plank: SheepPanelPlank, i) => plank.update(world.herd.getSheep()[i]));
        }
    }

    private onToggle() {
        this.planks.getChildren().forEach((p: SheepPanelPlank) => p.onToggle());
        this.topSegment.setVisible(!this.topSegment.visible);
        this.bottomSegment.setVisible(!this.bottomSegment.visible);
        this.toggle.onToggle();
    }

    private setCorrectNumberOfPlanks(length: number) {
        this.planks.getChildren().filter((_p, i) => i >= length).forEach((p: SheepPanelPlank) => p.remove());
        this.bottomSegment.setPosition(64, 32 * (length + 1));
        this.toggle.setPosition(this.toggle.x, 16 * length + 16)
    }

    private initializePanel(scene: Phaser.Scene, world: World) {
        this.topSegment = new Phaser.GameObjects.Sprite(scene, 64, 0, "panels", "sheep-panel-top-0");
        this.topSegment.setScrollFactor(0);
        this.topSegment.setDepth(depthIndex.UI);
        scene.add.existing(this.topSegment);

        this.bottomSegment = new Phaser.GameObjects.Sprite(scene, 64, 32 * world.herd.getSheep().length + 32, "panels", "sheep-panel-bottom-0");
        this.bottomSegment.setScrollFactor(0);
        this.bottomSegment.setDepth(depthIndex.UI);
        scene.add.existing(this.bottomSegment);

        this.planks = new Phaser.GameObjects.Group(scene);
        world.herd.getSheep().forEach((sheep: Sheep, i) => {
            let plank = new SheepPanelPlank(scene, 64, 32 * i + 32);
            plank.setDepth(depthIndex.UI);
            scene.add.existing(plank);
            plank.setScrollFactor(0);
            this.planks.add(plank);
        });

        this.toggle = new Toggle(scene, 190, 16 * world.herd.getSheep().length + 16);
        this.toggle.setInteractive();
        this.toggle.on('pointerdown', () => {
            world.gameEventHandler.dispatchGameEvent(
                {
                    type: GameEventType.TOGGLE_SHEEP_PANEL
                }
            )
        });

        scene.add.existing(this.toggle);
    }
}