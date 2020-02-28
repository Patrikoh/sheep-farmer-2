import AnimationComponent from "../../components/AnimationComponent";

export default class SheepAnimationComponent extends AnimationComponent {
    constructor() {
        let animationSprite = {
            texture: 'sheep',
            walk: {
                left: 'sheep-left-walk',
                right: 'sheep-right-walk',
                up: 'sheep-up-walk',
                down: 'sheep-down-walk'
            },
            idle: {
                left: 'sheep-left-idle-0',
                right: 'sheep-right-idle-0',
                up: 'sheep-up-idle-0',
                down: 'sheep-down-idle-0'
            }
        }
        super(animationSprite);
    }
}