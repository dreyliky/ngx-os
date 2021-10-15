import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    ElementRef,
    HostBinding,
    Input,
    OnChanges,
    OnInit,
    QueryList,
    ViewEncapsulation
} from '@angular/core';
import { timer } from 'rxjs';
import { debounce, takeUntil } from 'rxjs/operators';
import { elementResizingObserver, ErrorHelper, OsBaseComponent } from '../../../../core';
import { Cell, Grid } from '../../classes';
import { GridDirectionEnum } from '../../enums';
import { GridItemComponent } from '../item';

/**
 * ## Content Projection Slots
 *
 * - Component `os-grid-item`: Slot for `GridItemComponent`'s
 *
 * @example
 * ```html
 * <os-grid>
 *     <os-grid-item *ngFor="let item of items"></os-grid-item>
 * </os-grid>
 * ```
 **/
@Component({
    selector: 'os-grid',
    templateUrl: './grid.component.html',
    host: {
        'class': 'os-grid'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridComponent extends OsBaseComponent implements OnInit, OnChanges, AfterViewInit {
    /** Direction of grid items */
    @Input()
    public readonly direction: GridDirectionEnum = GridDirectionEnum.Horizontal;

    /** Size of each grid item in pixels */
    @Input()
    public set gridSize(value: number) {
        this._gridSize = value;

        this.validateGridSize();
    }

    /** Size of each grid item in pixels */
    public get gridSize(): number {
        return this._gridSize;
    }

    /** How long in milliseconds, the grid should wait after changes before recalculate and repaint all grid items? */
    @Input()
    public repaintDelayInMs: number = 200;

    /** @internal */
    @ContentChildren(GridItemComponent, { read: ElementRef })
    public set __gridItemElements(elements: QueryList<ElementRef<HTMLElement>>) {
        this._gridItemElements = elements;

        this.initRecalculations();
    }

    /** @internal */
    @HostBinding('style.--os-grid-size')
    public get _hostGridSizeClass(): string {
        return `${this._gridSize}px`;
    }

    private get hostResizeDelayBeforeCalculation(): number {
        return this.grid ? this.repaintDelayInMs : 4;
    }

    private grid: Grid<ElementRef<HTMLElement>>;
    private _gridSize: number = 72;
    private _gridMinSize: number = 50;
    private _gridItemElements: QueryList<ElementRef<HTMLElement>>;

    constructor(
        private readonly hostElementRef: ElementRef<HTMLElement>
    ) {
        super();
    }

    public ngOnInit(): void {
        this.initElementEventObservers(this.hostElementRef.nativeElement);
    }

    public ngAfterViewInit(): void {
        this.initHostSizeChangeObserver();
    }

    public ngOnChanges(): void {
        this.initRecalculations();
    }

    private calculateGridItemElementsPositions(): void {
        this.adjustGridBeforeCalculatingItemElementsPositions();

        let actualCell = this.grid.get(0, 0);

        this._gridItemElements.forEach((gridItem) => {
            if (actualCell) {
                actualCell.setData(gridItem);
                this.initCellStyles(actualCell);

                actualCell = actualCell.getNextWithoutData();
            }
        });
    }

    private adjustGridBeforeCalculatingItemElementsPositions(): void {
        const hostElement = this.hostElementRef.nativeElement;
        const gridZoneWidth = hostElement.clientWidth || hostElement.scrollWidth;
        const gridZoneHeight = hostElement.clientHeight || hostElement.scrollHeight;
        const xAxisCellsCount = Math.floor(gridZoneWidth / this.gridSize);
        const yAxisCellsCount = Math.floor(gridZoneHeight / this.gridSize);

        this.grid = new Grid({ xAxisCellsCount, yAxisCellsCount, directionType: this.direction });
    }

    private initRecalculations(): void {
        if (this.grid) {
            this.calculateGridItemElementsPositions();
        }
    }

    private initHostSizeChangeObserver(): void {
        elementResizingObserver(this.hostElementRef.nativeElement)
            .pipe(
                takeUntil(this.viewDestroyed$),
                debounce(() => timer(this.hostResizeDelayBeforeCalculation))
            )
            .subscribe(() => this.calculateGridItemElementsPositions());
    }

    private initCellStyles(cell: Cell<ElementRef<HTMLElement>>): void {
        const cellStyle = cell.getData().nativeElement.style;
        cellStyle.width = `${this.gridSize}px`;
        cellStyle.height = `${this.gridSize}px`;
        cellStyle.left = `${cell.x * this.gridSize}px`;
        cellStyle.top = `${cell.y * this.gridSize}px`;
    }

    private validateGridSize(): void {
        if (this._gridSize < this._gridMinSize) {
            ErrorHelper.error(this, `Min gridSize is ${this._gridMinSize}`);
        }
    }
}
