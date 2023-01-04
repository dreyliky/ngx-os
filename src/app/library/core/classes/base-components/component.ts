/* eslint-disable @typescript-eslint/member-ordering */
import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    HostBinding,
    inject,
    Input,
    Output
} from '@angular/core';
import { BehaviorSubject, fromEvent, Observable } from 'rxjs';
import { filter, share, switchMap } from 'rxjs/operators';
import { ɵOsBaseViewComponent } from './view';

@Component({
    template: '',
    host: {
        class: 'os-element'
    }
})
export abstract class ɵOsBaseComponent
    extends ɵOsBaseViewComponent
    implements AfterViewInit {
    private _targetInternalElement$ = new BehaviorSubject<HTMLElement>(null);

    /** Target internal element stylelist */
    @Input()
    @HostBinding('style')
    public style: object;

    /** Target internal element classList */
    @Input()
    @HostBinding('class')
    public styleClass: string | string[] | object;

    /** Target internal element id */
    @Input()
    @HostBinding('attr.id')
    public id: string;

    /** Target internal element click event */
    @Output()
    public osClick: Observable<PointerEvent> = this.createEvent('click');

    /** Target internal element dblclick event */
    @Output()
    public osDblClick: Observable<PointerEvent> = this.createEvent('dblclick');

    /** Target internal element mousedown event */
    @Output()
    public osMouseDown: Observable<PointerEvent> = this.createEvent('mousedown');

    /** Target internal element mouseup event */
    @Output()
    public osMouseUp: Observable<PointerEvent> = this.createEvent('mouseup');

    /** Target internal element mousemove event */
    @Output()
    public osMouseMove: Observable<PointerEvent> = this.createEvent('mousemove');

    /** Target internal element mouseout event */
    @Output()
    public osMouseOut: Observable<PointerEvent> = this.createEvent('mouseout');

    /** Target internal element mouseover event */
    @Output()
    public osMouseOver: Observable<PointerEvent> = this.createEvent('mouseover');

    /** Target internal element wheel event */
    @Output()
    public osWheel: Observable<WheelEvent> = this.createEvent('wheel');

    /** Target internal element keydown event */
    @Output()
    public osKeyDown: Observable<KeyboardEvent> = this.createEvent('keydown');

    /** Target internal element keyup event */
    @Output()
    public osKeyUp: Observable<KeyboardEvent> = this.createEvent('keyup');

    protected get targetInternalElement(): HTMLElement {
        return this._targetInternalElement$.getValue();
    }

    protected get targetInternalElement$(): Observable<HTMLElement> {
        return this._targetInternalElement$.asObservable();
    }

    /**
     * Allows defining a selector of a child (relative to the host) HTML element for which
     * all event handlers will be defined as output emitters.
     */
    protected readonly targetInternalElementSelector: string;
    protected readonly hostRef: ElementRef<HTMLElement> = inject(ElementRef);
    protected readonly changeDetector = inject(ChangeDetectorRef);

    public ngAfterViewInit(): void {
        super.ngAfterViewInit();
        this.initTargetInternalElement();
    }

    /**
     * Allows creation event listener of the specific event for target internal element.
     * The listener will be created after subscription to it.
     **/
    protected createEvent<T = Event>(eventName: keyof HTMLElementEventMap): Observable<T> {
        return this.targetInternalElement$
            .pipe(
                filter((element) => !!element),
                switchMap((element) => fromEvent<T>(element, eventName as string)),
                share()
            );
    }

    private initTargetInternalElement(): void {
        const hostElement = this.hostRef.nativeElement;
        const selector = this.targetInternalElementSelector;
        const element = (selector) ? hostElement.querySelector<HTMLElement>(selector) : hostElement;

        this._targetInternalElement$.next(element);
    }
}
