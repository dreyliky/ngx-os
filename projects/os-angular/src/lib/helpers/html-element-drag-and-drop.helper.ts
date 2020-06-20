import { Subject } from 'rxjs';
import { Observable } from 'rxjs';

interface Coords {
    top: number;
    left: number;
}

export class HtmlElementDragAndDrop {

    public get coords$ (): Observable<Coords> {
        return this._coords$.asObservable();
    }

    private readonly element: HTMLElement;

    private shiftX: number;
    private shiftY: number;

    private readonly _coords$ = new Subject<Coords>();

    constructor (element: HTMLElement) {
        this.element = element;

        this.element.onmousedown = this.elementMouseDownHandler;
    }

    public destroy (): void {
        this._coords$.complete();
        this.element.onmousedown = null;
        this.element.onmouseup = null;
    }

    private readonly elementMouseDownHandler = (event: MouseEvent): void => {
        const coords = this.getElementCoords();
        this.shiftX = event.pageX - coords.left;
        this.shiftY = event.pageY - coords.top;

        document.addEventListener('mousemove', this.documentMouseMoveHandler);
        document.addEventListener('mouseup', this.documentMouseUpHandler);
    }

    private readonly documentMouseMoveHandler = (event: MouseEvent): void => {
        this.emitNewCoords(event);
    }

    private readonly documentMouseUpHandler = (event: MouseEvent): void => {
        document.removeEventListener('mousemove', this.documentMouseMoveHandler);
        document.removeEventListener('mouseup', this.documentMouseUpHandler);
    }

    private emitNewCoords (event: MouseEvent): void {
        const coords: Coords = {
            left: event.pageX - this.shiftX,
            top: event.pageY - this.shiftY
        };

        this._coords$.next(coords);
    }

    private getElementCoords (): Coords {
        const box = this.element.getBoundingClientRect();

        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };
    }

}
