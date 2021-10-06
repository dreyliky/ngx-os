import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    ElementRef,
    Input,
    OnChanges,
    OnInit,
    QueryList
} from '@angular/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe-decorator';
import { Subscription, timer } from 'rxjs';
import { debounce } from 'rxjs/operators';
import { elementResizingObserver, OsBaseComponent } from '../../../../core';
import { Cell, Grid } from '../../classes';
import { GridDirectionEnum } from '../../enums';
import { GridItemComponent } from '../item';

@Component({
    selector: 'os-grid',
    templateUrl: './grid.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridComponent extends OsBaseComponent implements OnInit, OnChanges, AfterViewInit {
    @Input()
    public readonly direction: GridDirectionEnum = GridDirectionEnum.Horizontal;

    @Input()
    public gridSize: number = 72;

    @Input()
    public repaintDelayInMs: number = 200;

    @ContentChildren(GridItemComponent, { read: ElementRef })
    private set gridItemElements(elements: QueryList<ElementRef<HTMLElement>>) {
        this._gridItemElements = elements;

        this.initRecalculations();
    }

    private get hostResizeDelayBeforeCalculation(): number {
        return this.grid ? this.repaintDelayInMs : 4;
    }

    private _gridItemElements: QueryList<ElementRef<HTMLElement>>;
    private grid: Grid<ElementRef<HTMLElement>>;

    constructor(
        private readonly hostElementRef: ElementRef<HTMLElement>
    ) {
        super();
    }

    public ngOnInit(): void {
        this.classListManager.add(`os-grid`);
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
        // FIXME:
        // const yAxisCellsCount = Math.ceil((this.gridSize * this._gridItemElements.length) / gridZoneWidth) + 1;

        this.grid = new Grid({ xAxisCellsCount, yAxisCellsCount, directionType: this.direction });
    }

    private initRecalculations(): void {
        if (this.grid) {
            this.calculateGridItemElementsPositions();
        }
    }

    @AutoUnsubscribe()
    private initHostSizeChangeObserver(): Subscription {
        return elementResizingObserver(this.hostElementRef.nativeElement)
            .pipe(
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
        cellStyle.setProperty('--os-grid-size', `${this.gridSize}px`);
    }
}
