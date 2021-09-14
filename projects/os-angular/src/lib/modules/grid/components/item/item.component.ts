import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostBinding,
    HostListener,
    Input,
    OnInit
} from '@angular/core';
import { OsBaseComponent } from '@lib-core';
import { EventOutside } from '@lib-helpers';
import { GridItem } from '../../interfaces';

@Component({
    selector: 'os-grid-item',
    templateUrl: './item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridItemComponent extends OsBaseComponent implements OnInit {
    @Input()
    public data: GridItem;

    @Input()
    @HostBinding('class.os-selected')
    public isSelected: boolean;

    public get _iconBackgroundCssUrl(): string {
        return (this.data.iconUrl) ? 'url(' + this.data.iconUrl + ')' : '';
    }

    constructor(
        private readonly hostElementRef: ElementRef<HTMLElement>
    ) {
        super();
    }

    public ngOnInit(): void {
        this.classlistManager.add('os-grid-item');
        this.initElementEventObservers(this.hostElementRef.nativeElement);
    }

    @HostListener('document:click', ['$event'])
    public onClickOutside(event: MouseEvent): void {
        const hostElement = this.hostElementRef.nativeElement;
        const isClickOutsideWindow = EventOutside.checkForElement(hostElement, event);

        if (isClickOutsideWindow && this.isSelected) {
            this.isSelected = false;
        }
    }

    protected onClick(event: PointerEvent): void {
        this.data.onClick?.(event);
        super.onClick(event);
    }

    protected onMouseDown(event: MouseEvent): void {
        this.isSelected = true;

        super.onMouseDown(event);
    }

    protected onDblClick(event: MouseEvent): void {
        this.data.onDblClick?.(event);
        super.onDblClick(event);
    }
}
