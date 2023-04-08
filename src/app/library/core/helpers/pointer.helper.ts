import { ɵIsNil } from './methods.helper';

/** @internal */
export abstract class ɵPointerHelper {
    public static getClientX(event: PointerEvent | TouchEvent): number {
        if (this.isPointerEvent(event)) {
            return event.clientX;
        }

        return event.changedTouches[0].clientX;
    }

    public static getClientY(event: PointerEvent | TouchEvent): number {
        if (this.isPointerEvent(event)) {
            return event.clientY;
        }

        return event.changedTouches[0].clientY;
    }

    public static getPageX(event: PointerEvent | TouchEvent): number {
        if (this.isPointerEvent(event)) {
            return event.pageX;
        }

        return event.touches[0].pageX;
    }

    public static getPageY(event: PointerEvent | TouchEvent): number {
        if (this.isPointerEvent(event)) {
            return event.pageY;
        }

        return event.touches[0].pageY;
    }

    public static isPointerEvent(event: Event): event is PointerEvent {
        const mouseEvent = event as PointerEvent;

        return !ɵIsNil(mouseEvent.clientX) && !ɵIsNil(mouseEvent.clientY);
    }

    public static isTouchEvent(event: Event): event is TouchEvent {
        const touchEvent = event as TouchEvent;

        return !ɵIsNil(touchEvent.touches);
    }
}
