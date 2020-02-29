import GraphicsComponent from "../../components/GraphicsComponent";
import Wolf from "./Wolf";
import { WolfMovementTypes } from './WolfMovementTypes';
import depthIndex from '../../depthIndex.json';
import MainScene from "../../MainScene";
import GameEvent from "../../events/GameEvent";
import { GameEventType } from "../../events/GameEventType";

const LIFE_GAIN = -10;

export default class WolfGraphicsComponent extends GraphicsComponent {
    constructor(wolf: Wolf, scene: Phaser.Scene, x: number, y: number) {
        super(wolf, scene, x, y, depthIndex.WORLD + 1, 'wolf');
        scene.physics.add.existing(wolf.sprite);
        wolf.sprite.setCollideWorldBounds(true);
    }

    addCollider(wolf: Wolf, scene: MainScene, object: Phaser.GameObjects.GameObject | Phaser.GameObjects.GameObject[] | Phaser.GameObjects.Group | Phaser.GameObjects.Group[]) {
        scene.physics.add.collider(wolf.sprite, object, (c: Phaser.Physics.Arcade.Sprite, c2) => this.onCollision(wolf, c, c2, scene), null, scene);
    }

    onCollision(wolf: Wolf, wolfSprite: Phaser.Physics.Arcade.Sprite, other, scene: MainScene) {
        if (other.type === 'sheep') {
            let gameEvent: GameEvent = {
                type: GameEventType.WOLF_ATTACK_SHEEP,
                detail: {
                    lifeGain: LIFE_GAIN,
                    sheepSprite: other
                }
            };
            scene.world.gameEventHandler.dispatchGameEvent(gameEvent);
            this.setWalkAwayState(wolf, scene.time.now, other.x, other.y);
        }
    }

    setWalkAwayState(wolf: Wolf, time: number, x: number, y: number) {
        wolf.movementState = {
            movementType: WolfMovementTypes.WalkAway,
            stopTime: time + Phaser.Math.Between(200, 500),
            position: { x, y }
        };
    }
}