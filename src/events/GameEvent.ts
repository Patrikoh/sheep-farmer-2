import { GameEventType } from "./GameEventType";

export default interface GameEvent {
    type: GameEventType,
    detail?: {
        source
    }
}