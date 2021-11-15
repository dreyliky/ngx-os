import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ElementRef,
    HostBinding,
    Input,
    OnInit,
    TemplateRef,
    ViewEncapsulation
} from '@angular/core';
import { filter, takeUntil } from 'rxjs/operators';
import {
    CommonCssClassEnum,
    Coordinate,
    EventOutside,
    GlobalEvents,
    OsBaseComponent
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
export class GridItemComponent extends OsBaseComponent implements OnInit {
    /** Is grid item selected? */
    @Input()
    @HostBinding(`class.${CommonCssClassEnum.Selected}`)
    public isSelected: boolean;

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

    constructor(
        /** @internal */
        public readonly hostRef: ElementRef<HTMLElement>,
        private readonly globalEvents: GlobalEvents,
        private readonly changeDetector: ChangeDetectorRef
    ) {
        super();
    }

    public ngOnInit(): void {
        this.initElementEventObservers(this.hostRef.nativeElement);
        this.initClickOutsideObserver();
    }

    protected onMouseDown(event: MouseEvent): void {
        this.isSelected = true;

        super.onMouseDown(event);
        this.changeDetector.markForCheck();
    }

    private initClickOutsideObserver(): void {
        this.globalEvents.fromDocument('mousedown')
            .pipe(
                takeUntil(this.viewDestroyed$),
                filter(() => this.isSelected),
                filter((event) => EventOutside.checkForElement(this.hostRef.nativeElement, event))
            )
            .subscribe(() => {
                this.isSelected = false;

                this.changeDetector.markForCheck();
            });
    }
}
