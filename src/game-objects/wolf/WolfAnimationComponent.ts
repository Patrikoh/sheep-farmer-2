import AnimationComponent from "../../components/AnimationComponent";

export default class WolfAnimationComponent extends AnimationComponent {
    constructor() {
        let animationSprite = {
            texture: 'wolf',
            walk: {
                left: 'wolf-left-walk',
                right: 'wolf-right-walk',
                up: 'wolf-up-walk',
                down: 'wolf-down-walk'
            },
            idle: {
                left: 'wolf-left-idle-0',
                right: 'wolf-right-idle-0',
                up: 'wolf-up-idle-0',
                down: 'wolf-down-idle-0'
            }
        }
        super(animationSprite);
    }
}