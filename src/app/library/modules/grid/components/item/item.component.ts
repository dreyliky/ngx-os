import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ElementRef,
    HostBinding,
    Injector,
    Input,
    OnInit,
    TemplateRef,
    ViewEncapsulation
} from '@angular/core';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import {
    Coordinate, ɵCommonCssClassEnum, ɵEventOutside, ɵGlobalEvents, ɵOsBaseComponent
} from '../../../../core';

/**
 * ## Templates
 * `#gridItemIcon`: Custom template which will be rendered instead of the default icon.
 *
 * @example
 * ```html
 * <os-grid-item>
 *     <ng-template #gridItemIcon>
 *         <!-- To get default behavior inside your template -->
 *         <picture
 *             class="os-icon"
 *             [style.--os-icon-url]="YOUR_LINK_TO_THE_ICON">
 *             <img [src]="YOUR_LINK_TO_THE_ICON" />
 *         </picture>
 *         <!-- OR JUST WRITE YOUR CUSTOM CONTENT -->
 *     </ng-template>
 * </os-grid-item>
 * ```
 *
 * `#gridItemLabel`: Custom template which will be rendered instead of the default label text.
 *
 * @example
 * ```html
 * <os-grid-item>
 *     <ng-template #gridItemLabel>
 *         <!-- To get default behavior inside your template -->
 *         <os-label [innerText]="YOUR_LABEL_TEXT"></os-label>
 *         <!-- OR JUST WRITE YOUR CUSTOM CONTENT -->
 *     </ng-template>
 * </os-grid-item>
 * ```
 **/
@Component({
    selector: 'os-grid-item',
    templateUrl: './item.component.html',
    host: {
        'class': 'os-grid-item'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridItemComponent extends ɵOsBaseComponent implements OnInit {
    /** Is grid item selected? */
    @Input()
    @HostBinding(`class.${ɵCommonCssClassEnum.Selected}`)
    public set isSelected(isSelected: boolean) {
        this._isSelected$.next(isSelected);

        if (isSelected) {
            this.initClickOutsideObserver();
        }
    }

    /** Is grid item selected? */
    public get isSelected(): boolean {
        return this._isSelected$.getValue();
    }

    /** URL to the icon of the grid item */
    @Input()
    public set iconUrl(value: string) {
        this._iconUrl = value;
        this._iconBackgroundCssUrl = `url(${value})`;
    }

    /** Label text of the grid item */
    @Input()
    public label: string;

    /**
     * Static coordinate of the cell for the grid item.
     *
     * @example
     * `x: 0; y: 0;` - First cell by X-Axis and Y-Axis;
     * `x: 1; y: 2;` - Second cell by X-Axis and third cell by Y-Axis;
    */
    @Input()
    public coordinate: Coordinate;

    /** @internal */
    @ContentChild('gridItemIcon')
    public readonly _gridItemIconTemplate: TemplateRef<any>;

    /** @internal */
    @ContentChild('gridItemLabel')
    public readonly _gridItemLabelTemplate: TemplateRef<any>;

    /** @internal */
    public _iconUrl: string;

    /** @internal */
    public _iconBackgroundCssUrl: string;

    private _isSelected$ = new BehaviorSubject<boolean>(false);

    private get _viewDestroyedOrBecomeDeselected$(): Observable<boolean> {
        return merge(
            this.viewDestroyed$,
            this._isSelected$
                .pipe(filter((isSelected) => !isSelected))
        );
    }

    constructor(
        injector: Injector,
        /** @internal */
        public readonly _hostRef: ElementRef<HTMLElement>,
        private readonly globalEvents: ɵGlobalEvents,
        private readonly changeDetector: ChangeDetectorRef
    ) {
        super(injector);
    }

    public ngOnInit(): void {
        this.initMouseDownObserver();
    }

    private initMouseDownObserver(): void {
        this.osMouseDown
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe(() => {
                this.isSelected = true;

                this.changeDetector.markForCheck();
            });
    }

    private initClickOutsideObserver(): void {
        this.globalEvents.fromDocument('mousedown')
            .pipe(
                takeUntil(this._viewDestroyedOrBecomeDeselected$),
                filter((event) => ɵEventOutside.checkForElement(this._hostRef.nativeElement, event))
            )
            .subscribe(() => {
                this.isSelected = false;

                this.changeDetector.markForCheck();
            });
    }
}
