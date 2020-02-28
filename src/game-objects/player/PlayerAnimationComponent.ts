import AnimationComponent, { AnimationSprites } from "../../components/AnimationComponent";

export default class PlayerAnimationComponent extends AnimationComponent {
    constructor() {
        let animationSprites: AnimationSprites = {
            texture: 'player',
            walk: {
                left: 'player-left-walk',
                right: 'player-right-walk',
                up: 'player-up-walk',
                down: 'player-down-walk'
            },
            idle: {
                left: 'player-left-idle-0',
                right: 'player-right-idle-0',
                up: 'player-up-idle-0',
                down: 'player-down-idle-0'
            }
        }
        super(animationSprites);
    }
}