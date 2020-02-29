import { uniqueNamesGenerator, adjectives, names } from 'unique-names-generator';
import AnimationComponent from './SheepAnimationComponent';
import GraphicsComponent from './SheepGraphicsComponent';
import MoveComponent from './SheepMoveComponent';
import HealthComponent from './SheepHealthComponent';
import { SheepMovementTypes } from './SheepMovementTypes';
import { SheepHealthState } from './SheepHealthState';
import World from '../../World';
import MainScene from '../../MainScene';

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
    private grahipcsComponent: GraphicsComponent;
    private healthComponent: HealthComponent;

    movementState: SheepMovementState;
    healthState: SheepHealthState;
    sprite: Phaser.Physics.Arcade.Sprite;
    name: string;
    id: string;

    constructor(scene: Phaser.Scene, x: number, y: number) {

        this.moveComponent = new MoveComponent(this);
        this.animationComponent = new AnimationComponent();
        this.grahipcsComponent = new GraphicsComponent(this, scene, x, y);
        this.healthComponent = new HealthComponent(this);

        this.name = uniqueNamesGenerator({
            dictionaries: [adjectives, names],
            separator: ' ',
            length: 2,
            style: 'capital'
        });
    }

    update(scene: MainScene, cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
        this.moveComponent.update(this, scene, cursors);
        this.animationComponent.update(this);
    }

    addCollider(scene: Phaser.Scene, object: Phaser.GameObjects.GameObject | Phaser.GameObjects.GameObject[] | Phaser.GameObjects.Group | Phaser.GameObjects.Group[]) {
        this.grahipcsComponent.addCollider(this, scene, object);
    }

    onSheepCollision(time: number, x: number, y: number) {
        this.moveComponent.setWalkAwayState(this, time, x, y);
    }

    changeLife(lifeDiff: number) {
        this.healthComponent.changeLife(this, lifeDiff);
    }

    kill() {
        this.sprite.destroy();
    }
}