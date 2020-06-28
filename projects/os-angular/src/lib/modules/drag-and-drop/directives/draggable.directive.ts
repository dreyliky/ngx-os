import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { DraggerConfig } from '../interfaces';
import { DragCoords } from '../interfaces/drag-coords.interface';

@Directive({
    selector: '[os-draggable]'
})
export class OsDraggableDirective implements OnInit, OnDestroy {

    @Input()
    public draggerConfig: DraggerConfig;

    public get DragCoords$ (): Observable<DragCoords> {
        return this._coords$.asObservable();
    }

    private shiftX: number;
    private shiftY: number;

    private readonly _coords$ = new Subject<DragCoords>();

    private _draggableElement: HTMLElement;
    private _movableElement: HTMLElement;

    constructor (
        private readonly element: ElementRef<HTMLElement>
    ) {}

    public ngOnInit (): void {
        this.initDraggableElement();
        this.initMovableElement();

        this._draggableElement.addEventListener('mousedown', this.elementMouseDownHandler);
    }

    public ngOnDestroy (): void {
        this._coords$.complete();
        this._draggableElement.removeEventListener('mousedown', this.elementMouseDownHandler);
    }

    private initDraggableElement (): void {
        if (this.draggerConfig?.draggableElementSelector) {
            this._draggableElement = this.element.nativeElement.querySelector(this.draggerConfig.draggableElementSelector);
        } else {
            this._draggableElement = this.element.nativeElement;
        }
    }

    private initMovableElement (): void {
        if (this.draggerConfig?.movableElementSelector) {
            this._movableElement = this.element.nativeElement.querySelector(this.draggerConfig.movableElementSelector);
        }
    }

    private readonly elementMouseDownHandler = (event: MouseEvent): void => {
        const DragCoords = this.getElementCoords();
        this.shiftX = event.pageX - DragCoords.left;
        this.shiftY = event.pageY - DragCoords.top;

        document.addEventListener('mousemove', this.documentMouseMoveHandler);
        document.addEventListener('mouseup', this.documentMouseUpHandler);
    }

    private readonly documentMouseMoveHandler = (event: MouseEvent): void => {
        const DragCoords: DragCoords = {
            left: event.pageX - this.shiftX,
            top: event.pageY - this.shiftY
        };

        this.moveMovableElement(DragCoords);

        this._coords$.next(DragCoords);
    }

    private moveMovableElement (DragCoords: DragCoords): void {
        if (this._movableElement) {
            this._movableElement.style.left = `${DragCoords.left}px`;
            this._movableElement.style.top  = `${DragCoords.top}px`;
        }
    }

    private readonly documentMouseUpHandler = (event: MouseEvent): void => {
        document.removeEventListener('mousemove', this.documentMouseMoveHandler);
        document.removeEventListener('mouseup', this.documentMouseUpHandler);
    }

    private getElementCoords (): DragCoords {
        const box = this._draggableElement.getBoundingClientRect();

        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };
    }

}
