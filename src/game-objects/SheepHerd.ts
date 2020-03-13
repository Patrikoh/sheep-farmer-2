import Sheep from './sheep/Sheep';
import MainScene from '../MainScene';
import GameEventHandler from '../events/GameEventHandler';
import { GameEventType } from '../events/GameEventType';
import GameEvent from '../events/GameEvent';

export default class SheepHerd {
    sheepGroup: Phaser.Physics.Arcade.Group;
    sheepList: Array<Sheep>;

    constructor(scene: MainScene, numberOfSheep: integer) {
        this.sheepGroup = scene.physics.add.group();
        this.sheepList = [];

        for (let index = 0; index < numberOfSheep; index++) {
            let sheep = new Sheep(scene, 10 + index * 100, 10 + index * 100);
            this.sheepGroup.add(sheep.sprite);
            this.sheepList.push(sheep);
        }

        scene.physics.add.collider(this.sheepGroup, this.sheepGroup,
            (s1: Phaser.Physics.Arcade.Sprite, s2: Phaser.Physics.Arcade.Sprite) => {
                this.getSheepFromSprite(s1).onSheepCollision(scene.time.now, s2.body.position.x, s2.body.position.y);
            }, null, this);

        // This is needed due to a bug in Phaser: 
        // https://www.html5gamedevs.com/topic/38972-solved-issue-with-world-bounds-collision/?do=findComment&comment=222837
        this.sheepGroup.getChildren().forEach((s: Phaser.Physics.Arcade.Sprite) => s.setCollideWorldBounds(true));
    }

    addGameEventListeners(gameEventHandler: GameEventHandler) {
        this.sheepList.forEach(s => s.addGameEventListeners(gameEventHandler));
        gameEventHandler.addGameEventListener(GameEventType.SHEEP_KILLED,
            (event: GameEvent) => {
                let sheep: Sheep = event.detail.sheep;
                this.sheepList = this.sheepList.filter(s => s.id != sheep.id);
                sheep.sprite.destroy();
            }
        );
    }

    update(scene: MainScene) {
        this.sheepGroup.getChildren().forEach((sprite: Phaser.Physics.Arcade.Sprite, i) => {
            this.getSheepFromSprite(sprite).update(scene);
        });
    }

    addCollider(scene: Phaser.Scene, object) {
        scene.physics.add.collider(this.sheepGroup, object);
    }

    getSheepFromSprite(sprite: Phaser.Physics.Arcade.Sprite) {
        return this.sheepList.find(s => s.id == sprite.getData('id'));
    }

    getGroup() { return this.sheepGroup };

    getSprites() { return this.sheepGroup.getChildren() };

    getSheep() { return this.sheepList };
}