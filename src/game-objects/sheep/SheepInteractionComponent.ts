import InteractionComponent from "../../components/InteractionComponent";
import Sheep from "./Sheep";

export default class SheepInteractionComponent extends InteractionComponent {
    constructor(sheep: Sheep) {
        super(sheep);
        sheep.sprite.on('pointerdown', () => {
            console.log("Clicked!")
        });
    }

}
