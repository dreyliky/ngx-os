import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    ElementRef,
    HostBinding,
    Input,
    OnChanges,
    QueryList,
    ViewEncapsulation
} from '@angular/core';
import { timer } from 'rxjs';
import { debounce, takeUntil } from 'rxjs/operators';
import { ɵElementResizingObserver, ɵErrorHelper, ɵOsBaseComponent } from '../../../../core';
import {
    ɵBaseGridCellCountDeterminator,
    ɵCell,
    ɵGrid,
    ɵGridCellCountDeterminatorFactory
} from '../../classes';
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
export class GridComponent extends ɵOsBaseComponent implements OnChanges, AfterViewInit {
    /** Direction of grid items */
    @Input()
    public direction: GridDirectionEnum = GridDirectionEnum.Horizontal;

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
    public set _gridItemComponents(elements: QueryList<GridItemComponent>) {
        this.gridItemComponents = elements;

        this.initRecalculations();
    }

    /** @internal */
    public get _gridItemComponents(): QueryList<GridItemComponent> {
        return this.gridItemComponents;
    }

    /** @internal */
    @HostBinding('style.--os-cell-size')
    public get _hostCellSizeClass(): string {
        return `${this._cellSize}px`;
    }

    /** @internal */
    public get hostElement(): HTMLElement {
        return this.hostRef.nativeElement;
    }

    private get hostResizeDelayBeforeCalculation(): number {
        return this.grid ? this.repaintDelayInMs : 4;
    }

    private grid: ɵGrid<ElementRef<HTMLElement>>;
    private cellCountDeterminator: ɵBaseGridCellCountDeterminator;
    private _cellSize: number = 72;
    private _cellMinSize: number = 50;
    private gridItemComponents: QueryList<GridItemComponent>;

    public ngAfterViewInit(): void {
        super.ngAfterViewInit();
        this.initHostSizeChangeObserver();
    }

    public ngOnChanges(): void {
        this.initRecalculations();
    }

    private update(): void {
        this.initCellCountDeterminator();
        this.initGrid();

        if (this.grid) {
            this.fillGridByItemsWithCoordinates();
            this.fillGridByItemsWithoutCoordinates();
        }
    }

    private fillGridByItemsWithCoordinates(): void {
        this.gridItemComponents.forEach((gridItem) => {
            if (gridItem.coordinate) {
                const { x, y } = gridItem.coordinate;
                const targetCell = this.grid.getCell(x, y);

                targetCell?.setData(gridItem._hostRef);
                this.initCellStyles(targetCell);
            }
        });
    }

    private fillGridByItemsWithoutCoordinates(): void {
        let actualCell = this.grid.getFirstEmptyCell();

        for (const gridItem of this.gridItemComponents) {
            if (!actualCell) {
                this.initExcessGridItemStyles(gridItem);
            } else if (!gridItem.coordinate) {
                actualCell.setData(gridItem._hostRef);
                this.initCellStyles(actualCell);

                actualCell = actualCell.getNextWithoutData();
            }
        }
    }

    private initGrid(): void {
        if (this.hostElement.offsetParent) {
            this.grid = new ɵGrid({
                xAxisCellsCount: this.cellCountDeterminator.calculateForAxisX(),
                yAxisCellsCount: this.cellCountDeterminator.calculateForAxisY(),
                directionType: this.direction
            });
        } else {
            this.grid = null;
        }
    }

    private initCellCountDeterminator(): void {
        if (this.cellCountDeterminator?.type !== this.direction) {
            this.cellCountDeterminator = ɵGridCellCountDeterminatorFactory
                .create(this.direction, this);
        }
    }

    private initRecalculations(): void {
        if (this.grid) {
            this.update();
        }
    }

    private initHostSizeChangeObserver(): void {
        ɵElementResizingObserver(this.hostElement)
            .pipe(
                debounce(() => timer(this.hostResizeDelayBeforeCalculation)),
                takeUntil(this.viewDestroyed$)
            )
            .subscribe(() => this.update());
    }

    private initExcessGridItemStyles(gridItem: GridItemComponent): void {
        gridItem._hostRef.nativeElement.style.display = 'none';
    }

    private initCellStyles(cell: ɵCell<ElementRef<HTMLElement>>): void {
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
            ɵErrorHelper.error(this, `Min cellSize is ${this._cellMinSize}`);
        }
    }
}
