import { DOCUMENT } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ElementRef,
    HostBinding,
    Inject,
    Input,
    OnInit,
    TemplateRef
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { CommonCssClassEnum, EventOutside, OsBaseComponent } from '../../../../core';

/**
 * ## Templates
 * `#iconTemplate`: Custom template which will be rendered instead of the default icon.
 *
 * @example
 * ```html
 * <ng-template #iconTemplate>
 *    <!-- To get default behavior inside your template -->
 *    <div
 *        class="os-icon"
 *        [style.--os-icon-url]="YOUR_LINK_TO_THE_ICON">
 *    </div>
 *    <!-- OR JUST WRITE YOUR CUSTOM CONTENT -->
 * </ng-template>
 * ```
 *
 * `#labelTemplate`: Custom template which will be rendered instead of the default label text.
 *
 * @example
 * ```html
 * <ng-template #labelTemplate>
 *    <!-- To get default behavior inside your template -->
 *    <os-label [innerText]="YOUR_LABEL_TEXT"></os-label>
 *    <!-- OR JUST WRITE YOUR CUSTOM CONTENT -->
 * </ng-template>
 * ```
 **/
@Component({
    selector: 'os-grid-item',
    templateUrl: './item.component.html',
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
        this._iconBackgroundCssUrl = `url(${value})`;
    }

    /** Label text of the grid item */
    @Input()
    public label: string;

    /** @internal */
    @ContentChild('iconTemplate')
    public readonly _gridItemIconTemplate: TemplateRef<HTMLElement>;

    /** @internal */
    @ContentChild('labelTemplate')
    public readonly _gridItemLabelTemplate: TemplateRef<HTMLElement>;

    /** @internal */
    public _iconBackgroundCssUrl: string;

    constructor(
        @Inject(DOCUMENT) private readonly document: Document,
        private readonly changeDetector: ChangeDetectorRef,
        private readonly hostElementRef: ElementRef<HTMLElement>
    ) {
        super();
    }

    public ngOnInit(): void {
        this.classListManager.add('os-grid-item');
        this.initElementEventObservers(this.hostElementRef.nativeElement);
        this.initClickOutsideObserver();
    }

    protected onMouseDown(event: MouseEvent): void {
        this.isSelected = true;

        super.onMouseDown(event);
    }

    private initClickOutsideObserver(): void {
        const hostElement = this.hostElementRef.nativeElement;

        fromEvent(this.document, 'click')
            .pipe(
                takeUntil(this.viewDestroyed$),
                filter(() => this.isSelected),
                filter((event) => EventOutside.checkForElement(hostElement, event))
            )
            .subscribe(() => {
                this.isSelected = false;

                this.changeDetector.markForCheck();
            });
    }
}
