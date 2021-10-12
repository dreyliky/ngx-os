/* eslint-disable @typescript-eslint/member-ordering */
import {
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ElementRef, HostBinding,
    HostListener,
    Input,
    OnChanges,
    OnInit,
    TemplateRef
} from '@angular/core';
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

    @Input()
    public iconUrlExpr: (item: T) => string = (item: T) => String(item);

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
    }

    /** @internal */
    @HostListener('document:click', ['$event'])
    public onClickOutside(event: MouseEvent): void {
        const hostElement = this.hostElementRef.nativeElement;
        const isClickOutsideWindow = EventOutside.checkForElement(hostElement, event);

        if (isClickOutsideWindow && this.isSelected) {
            this.isSelected = false;
        }
    }

    protected onMouseDown(event: MouseEvent): void {
        this.isSelected = true;

        super.onMouseDown(event);
    }

    private initIconBackgroundCssUrl(): void {
        this._iconBackgroundCssUrl = `url(${this.iconUrlExpr(this.data)})`;
    }
}
