import 'phaser';

export default abstract class InteractionComponent {
    constructor(gameObject) {
        gameObject.sprite.setInteractive({cursor: 'url(assets/sprites/cursors/interactable.png), pointer'})
    }

}
