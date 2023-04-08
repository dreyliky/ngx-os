import { Injectable } from '@angular/core';
import { Coordinate } from '../interfaces';

/**
 * @internal
 * Abstract model of dependent data for calculations.
 **/
interface InputData {
    readonly pointerPosition: Coordinate;
    readonly element: {
        readonly width: number;
        readonly height: number;
        /** Element offset relative from pointer position */
        readonly offset: Coordinate;
    };
}

/**
 * @internal
 * Calculates position for the element which will within viewport.
 **/
@Injectable({
    providedIn: 'root'
})
export class ɵElementPositionWithinViewport {
    public calculateNearPointer(data: InputData): Coordinate {
        return {
            x: this.calculateElementX(data),
            y: this.calculateElementY(data)
        };
    }

    private getElementIntersectedWidth({ element, pointerPosition }: InputData): number {
        return ((pointerPosition.x + element.offset.x + element.width) - window.innerWidth);
    }

    private getElementIntersectedHeight({ element, pointerPosition }: InputData): number {
        return ((pointerPosition.y + element.offset.y + element.height) - window.innerHeight);
    }

    private calculateElementX(data: InputData): number {
        const intersectedWidth = this.getElementIntersectedWidth(data);

        if (intersectedWidth > 0) {
            return (data.pointerPosition.x - intersectedWidth);
        }

        return (data.pointerPosition.x + data.element.offset.x);
    }

    private calculateElementY(data: InputData): number {
        const intersectedHeight = this.getElementIntersectedHeight(data);

        if (intersectedHeight > 0) {
            return (data.pointerPosition.y - (data.element.height + data.element.offset.y));
        }

        return (data.pointerPosition.y + data.element.offset.y);
    }
}
