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
    template: '<ng-content select="os-grid-item"></ng-content>',
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

    /** Size of the grid cell in pixels inside which will be rendered each grid item */
    @Input()
    public set cellSize(value: number) {
        this._cellSize = value;

        this.validateCellSize();
    }

    /** Size of the grid cell in pixels inside which will be rendered each grid item */
    public get cellSize(): number {
        return this._cellSize;
    }

    /** Is grid element should increase to accommodate all items? */
    @Input()
    public isHeightResizing: boolean = false;

    /** How long in milliseconds, the grid should wait after changes before recalculate and repaint all grid items? */
    @Input()
    public repaintDelayInMs: number = 200;

    /** @internal */
    @ContentChildren(GridItemComponent)
    public set __gridItemElements(elements: QueryList<GridItemComponent>) {
        this._gridItemComponents = elements;

        this.initRecalculations();
    }

    /** @internal */
    @HostBinding('style.--os-cell-size')
    public get _hostCellSizeClass(): string {
        return `${this._cellSize}px`;
    }

    private get hostResizeDelayBeforeCalculation(): number {
        return this.grid ? this.repaintDelayInMs : 4;
    }

    private get hostElement(): HTMLElement {
        return this.hostRef.nativeElement;
    }

    private grid: Grid<ElementRef<HTMLElement>>;
    private _cellSize: number = 72;
    private _cellMinSize: number = 50;
    private _gridItemComponents: QueryList<GridItemComponent>;

    constructor(
        private readonly hostRef: ElementRef<HTMLElement>
    ) {
        super();
    }

    public ngOnInit(): void {
        this.initElementEventObservers(this.hostElement);
    }

    public ngAfterViewInit(): void {
        this.initHostSizeChangeObserver();
    }

    public ngOnChanges(): void {
        this.initRecalculations();
    }

    private update(): void {
        this.initGrid();

        if (this.grid) {
            this.fillGridByItemsWithCoordinates();
            this.fillGridByItemsWithoutCoordinates();
        }
    }

    private fillGridByItemsWithCoordinates(): void {
        this._gridItemComponents.forEach((gridItem) => {
            if (gridItem.coordinate) {
                const { x, y } = gridItem.coordinate;
                const targetCell = this.grid.getCell(x, y);

                targetCell?.setData(gridItem.hostRef);
                this.initCellStyles(targetCell);
            }
        });
    }

    private fillGridByItemsWithoutCoordinates(): void {
        let actualCell = this.grid.getFirstEmptyCell();

        for (const gridItem of this._gridItemComponents) {
            if (!actualCell) {
                this.initExcessGridItemStyles(gridItem);
            } else if (!gridItem.coordinate) {
                actualCell.setData(gridItem.hostRef);
                this.initCellStyles(actualCell);

                actualCell = actualCell.getNextWithoutData();
            }
        }
    }

    private calculateGridCellsCountByX(): number {
        const gridZoneWidth = this.hostElement.clientWidth || this.hostElement.scrollWidth;
        const cellsCount = Math.floor(gridZoneWidth / this.cellSize);

        return (cellsCount <= 0) ? 1 : cellsCount;
    }

    private calculateGridCellsCountByY(): number {
        if (this.isHeightResizing) {
            return Math.ceil(this._gridItemComponents.length / this.calculateGridCellsCountByX());
        }

        const gridZoneHeight = this.hostElement.clientHeight || this.hostElement.scrollHeight;

        return Math.floor(gridZoneHeight / this.cellSize);
    }

    private initGrid(): void {
        if (this.hostElement.offsetParent) {
            this.grid = new Grid({
                xAxisCellsCount: this.calculateGridCellsCountByX(),
                yAxisCellsCount: this.calculateGridCellsCountByY(),
                directionType: this.direction
            });
        } else {
            this.grid = null;
        }
    }

    private initRecalculations(): void {
        if (this.grid) {
            this.update();
        }
    }

    private initHostSizeChangeObserver(): void {
        elementResizingObserver(this.hostElement)
            .pipe(
                takeUntil(this.viewDestroyed$),
                debounce(() => timer(this.hostResizeDelayBeforeCalculation))
            )
            .subscribe(() => this.update());
    }

    private initExcessGridItemStyles(gridItem: GridItemComponent): void {
        gridItem.hostRef.nativeElement.style.display = 'none';
    }

    private initCellStyles(cell: Cell<ElementRef<HTMLElement>>): void {
        const cellStyle = cell?.getData().nativeElement.style;

        if (cellStyle) {
            cellStyle.display = '';
            cellStyle.width = `${this.cellSize}px`;
            cellStyle.height = `${this.cellSize}px`;
            cellStyle.left = `${cell.x * this.cellSize}px`;
            cellStyle.top = `${cell.y * this.cellSize}px`;
        }
    }

    private validateCellSize(): void {
        if (this._cellSize < this._cellMinSize) {
            ErrorHelper.error(this, `Min cellSize is ${this._cellMinSize}`);
        }
    }
}
