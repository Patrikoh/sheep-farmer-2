import { uniqueNamesGenerator, adjectives, names } from 'unique-names-generator';
import AnimationComponent from './SheepAnimationComponent';
import GraphicsComponent from './SheepGraphicsComponent';
import MoveComponent from './SheepMoveComponent';
import HealthComponent from './SheepHealthComponent';
import InteractionComponent from "./SheepInteractionComponent";
import { SheepMovementTypes } from './SheepMovementTypes';
import { SheepHealthState } from './SheepHealthState';
import MainScene from '../../MainScene';
import GameEventHandler from '../../events/GameEventHandler';
import { GameEventType } from '../../events/GameEventType';
import GameEvent from '../../events/GameEvent';

interface SheepMovementState {
    movementType: SheepMovementTypes,
    stopTime?: number,
    position?: {
        x: number,
        y: number
    }
};

export default class Sheep {
    private moveComponent: MoveComponent;
    private animationComponent: AnimationComponent;
    private graphicsComponent: GraphicsComponent;
    private healthComponent: HealthComponent;
    private interactionComponent: InteractionComponent;

    movementState: SheepMovementState;
    healthState: SheepHealthState;
    sprite: Phaser.Physics.Arcade.Sprite;
    name: string;
    id: string;

    constructor(scene: MainScene, x: number, y: number) {
        this.moveComponent = new MoveComponent(this);
        this.animationComponent = new AnimationComponent();
        this.graphicsComponent = new GraphicsComponent(this, scene, x, y);
        this.healthComponent = new HealthComponent(this);
        this.interactionComponent = new InteractionComponent(this);

        this.name = uniqueNamesGenerator({
            dictionaries: [adjectives, names],
            separator: ' ',
            length: 2,
            style: 'capital'
        });
    }

    addGameEventListeners(gameEventHandler: GameEventHandler): void {
        this.healthComponent.addGameEventListeners(this, gameEventHandler);
    }

    update(scene: MainScene) {
        this.moveComponent.update(this, scene);
        this.animationComponent.update(this);
    }

    addCollider(scene: Phaser.Scene, object: Phaser.GameObjects.GameObject | Phaser.GameObjects.GameObject[] | Phaser.GameObjects.Group | Phaser.GameObjects.Group[]) {
        this.graphicsComponent.addCollider(this, scene, object);
    }

    onSheepCollision(time: number, x: number, y: number) {
        this.moveComponent.setWalkAwayState(this, time, x, y);
    }

    changeLife(gameEventHandler: GameEventHandler, lifeDiff: number) {
        this.healthComponent.changeLife(this, gameEventHandler, lifeDiff);
    }

    kill(gameEventHandler: GameEventHandler) {
        let gameEvent: GameEvent = {
            type: GameEventType.SHEEP_KILLED,
            detail: { sheep: this }
        };
        gameEventHandler.dispatchGameEvent(gameEvent);
    }
}
