import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostBinding,
    HostListener,
    Input,
    OnInit
} from '@angular/core';
import { CommonCssClassEnum, EventOutside, OsBaseComponent } from '../../../../core';
import { IGridItem } from '../../interfaces';

@Component({
    selector: 'os-grid-item',
    templateUrl: './item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridItemComponent extends OsBaseComponent implements OnInit {
    @Input()
    public data: IGridItem;

    @Input()
    @HostBinding(`class.${CommonCssClassEnum.Selected}`)
    public isSelected: boolean;

    public gridSize: number;

    public get _iconBackgroundCssUrl(): string {
        return (this.data.iconUrl) ? `url(${this.data.iconUrl})` : '';
    }

    public get _hostStyles(): object {
        return {
            ...this.style,
            '--gridSize': this.gridSize
        };
    }

    constructor(
        private readonly hostElementRef: ElementRef<HTMLElement>
    ) {
        super();
    }

    public ngOnInit(): void {
        this.classListManager.add('os-grid-item');
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
