/* eslint-disable @typescript-eslint/member-ordering */
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
    OnChanges,
    OnInit,
    TemplateRef
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { CommonCssClassEnum, EventOutside, OsBaseComponent } from '../../../../core';

@Component({
    selector: 'os-grid-item',
    templateUrl: './item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridItemComponent<T> extends OsBaseComponent implements OnInit, OnChanges {
    /** Data of grid item */
    @Input()
    public data: T;

    /** Is grid item selected? */
    @Input()
    @HostBinding(`class.${CommonCssClassEnum.Selected}`)
    public isSelected: boolean;

    /** Method should return the URL on the icon for the grid item */
    @Input()
    public iconUrlExpr: (item: T) => string = (item: T) => String(item);

    /** Method should return the label text for the grid item */
    @Input()
    public labelExpr: (item: T) => string = (item: T) => String(item);

    /** @internal */
    @ContentChild('iconTemplate')
    public readonly _gridItemIconTemplate: TemplateRef<HTMLElement>;

    /** @internal */
    @ContentChild('labelTemplate')
    public readonly _gridItemLabelTemplate: TemplateRef<HTMLElement>;

    /** @internal */
    public _iconBackgroundCssUrl: string;

    /** @internal */
    public _label: string;

    constructor(
        @Inject(DOCUMENT) private readonly document: Document,
        private readonly changeDetector: ChangeDetectorRef,
        private readonly hostElementRef: ElementRef<HTMLElement>
    ) {
        super();
    }

    public ngOnChanges(): void {
        this._label = this.labelExpr(this.data);

        this.initIconBackgroundCssUrl();
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

    private initIconBackgroundCssUrl(): void {
        this._iconBackgroundCssUrl = `url(${this.iconUrlExpr(this.data)})`;
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
