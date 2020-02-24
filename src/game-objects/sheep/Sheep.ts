import { uniqueNamesGenerator, adjectives, names } from 'unique-names-generator';
import AnimationComponent from './SheepAnimationComponent';
import GraphicsComponent from './SheepGraphicsComponent';
import InputComponent from './SheepInputComponent';
import { SheepMovementTypes } from './SheepMovementTypes';
import World from '../../World';

interface WolfMovementState {
    movementType: SheepMovementTypes,
    stopTime?: number,
    position?: {
        x: number,
        y: number
    }
};
interface HealthState {
    maxLife: number,
    life: number
};

export default class Sheep {
    private inputComponent: InputComponent;
    private animationComponent: AnimationComponent;
    private grahipcsComponent: GraphicsComponent;

    movementState: WolfMovementState;
    healthState: HealthState;
    sprite: Phaser.Physics.Arcade.Sprite;
    name: string;
    id: string;

    constructor(scene: Phaser.Scene, x: number, y: number) {

        this.inputComponent = new InputComponent(this);
        this.animationComponent = new AnimationComponent();
        this.grahipcsComponent = new GraphicsComponent(this, scene, x, y);

        this.name = uniqueNamesGenerator({
            dictionaries: [adjectives, names],
            separator: ' ',
            length: 2,
            style: 'capital'
        });

        this.setHealthState(100, 100);
    }

    update(world: World, cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
        this.inputComponent.update(this, world, cursors);
        this.animationComponent.update(this);
    }

    addCollider(scene: Phaser.Scene, object: Phaser.GameObjects.GameObject | Phaser.GameObjects.GameObject[] | Phaser.GameObjects.Group | Phaser.GameObjects.Group[]) {
        this.grahipcsComponent.addCollider(this, scene, object);
    }

    changeLife(lifeDiff: number) {
        let previousHealth = this.healthState;
        let life = Math.min(previousHealth.life + lifeDiff, previousHealth.maxLife);
        if (life <= 0) {
            this.kill();
        } else {
            let healthState: HealthState = { ...previousHealth, life };
            this.healthState = healthState;
        }
    }

    onSheepCollision(time: number, x: number, y: number) {
        this.inputComponent.setWalkAwayState(this, time, x, y);
    }

    getHealth() {
        return this.healthState;
    }

    getName() {
        return this.name;
    }

    private kill() {
        this.sprite.destroy();
    }

    private setHealthState(maxLife: number, life: number) {
        this.healthState = { maxLife, life };
    }
}