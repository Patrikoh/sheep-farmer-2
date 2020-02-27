import GameEvent from "./GameEvent";
import { GameEventType } from "./GameEventType";

export default class GameEventHandler implements EventTarget {
    private delegate = document.createDocumentFragment();

    addEventListener(...args: any): void {
        this.delegate.addEventListener.apply(this.delegate, args);
    }

    dispatchEvent(...args: any): boolean {
        return this.delegate.dispatchEvent.apply(this.delegate, args);
    }

    removeEventListener(...args: any): void {
        return this.delegate.removeEventListener.apply(this.delegate, args);
    }

    dispatchGameEvent(gameEvent: GameEvent): boolean {
        var customEvent = new CustomEvent(GameEventType[gameEvent.type], { detail: gameEvent.detail });
        return this.dispatchEvent(customEvent);
    }

    addGameEventListener(type: GameEventType, callback) {
        this.addEventListener(GameEventType[type], callback);
    }
}