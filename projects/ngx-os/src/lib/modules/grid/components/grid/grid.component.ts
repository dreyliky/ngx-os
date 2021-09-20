import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    ElementRef,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    QueryList
} from '@angular/core';
import { OsBaseComponent } from '@lib-core';
import { elementResizingObserver } from '@lib-helpers';
import { Subject, timer } from 'rxjs';
import { debounce, takeUntil } from 'rxjs/operators';
import { Cell, Grid } from '../../classes';
import { GridDirectionEnum } from '../../enums';
import { GridItemComponent } from '../item';

@Component({
    selector: 'os-grid',
    templateUrl: './grid.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridComponent extends OsBaseComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
    @Input()
    public readonly direction: GridDirectionEnum = GridDirectionEnum.Horizontal;

    @Input()
    public gridSize: number = 72;

    @Input()
    public repaintDelayInMs: number = 200;

    @ContentChildren(GridItemComponent, { read: ElementRef })
    private set gridItemElements(elements: QueryList<ElementRef<HTMLElement>>) {
        this._gridItemElements = elements;

        this.calculateGridItemElementsPositions();
    }

    private get hostResizeDelayBeforeCalculation(): number {
        return this.grid ? this.repaintDelayInMs : 0;
    }

    private _gridItemElements: QueryList<ElementRef<HTMLElement>>;
    private grid: Grid<ElementRef<HTMLElement>>;
    private untilDestroyed$ = new Subject();

    constructor(
        private readonly hostElementRef: ElementRef<HTMLElement>
    ) {
        super();
    }

    public ngOnInit(): void {
        this.classlistManager.add(`os-grid`);
        this.initElementEventObservers(this.hostElementRef.nativeElement);
    }

    public ngAfterViewInit(): void {
        this.initHostSizeChangeObserver();
    }

    public ngOnChanges(): void {
        this.initCalculationWhenChanges();
    }

    public ngOnDestroy(): void {
        this.untilDestroyed$.next();
        this.untilDestroyed$.complete();
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
        // FIXME:
        // const yAxisCellsCount = Math.ceil((this.gridSize * this._gridItemElements.length) / gridZoneWidth) + 1;

        this.grid = new Grid({ xAxisCellsCount, yAxisCellsCount, directionType: this.direction });
    }

    private initCalculationWhenChanges(): void {
        if (this.grid) {
            this.calculateGridItemElementsPositions();
        }
    }

    private initHostSizeChangeObserver(): void {
        elementResizingObserver(this.hostElementRef.nativeElement)
            .pipe(
                takeUntil(this.untilDestroyed$),
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
}
