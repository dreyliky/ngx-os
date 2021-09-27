import { ElementRef, Injectable, OnDestroy, QueryList } from '@angular/core';
import { elementResizingObserver } from '@lib-helpers';
import { DynamicWindowRef, DynamicWindowService, DynamicWindowSharedConfigService } from '@lib-modules';
import { combineLatest, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { TaskbarPlacement } from './interfaces';
import { TaskbarPlacementService } from './services';

@Injectable()
export class TaskbarService implements OnDestroy {
    private windowRefs: DynamicWindowRef[];
    private taskbarChangesSubscription: Subscription;

    private previousPlacement: TaskbarPlacement;

    private _windowRefElements: QueryList<ElementRef<HTMLElement>>;

    constructor(
        private readonly dynamicWindowService: DynamicWindowService,
        private readonly placementService: TaskbarPlacementService,
        private readonly windowSharedConfigService: DynamicWindowSharedConfigService
    ) {}

    public ngOnDestroy(): void {
        this.taskbarChangesSubscription.unsubscribe();
        this.clearWindowSharedConfig();
    }

    public init(taskbarElement: HTMLElement): void {
        this.initChangesObserver(taskbarElement);
        this.initWindowRefsObserver();
    }

    public setWindowRefElements(elements: QueryList<ElementRef<HTMLElement>>): void {
        this._windowRefElements = elements;

        this.updateWindowRefsHidesIntoCoordinate();
    }

    private initWindowRefsObserver(): void {
        this.dynamicWindowService.references$
            .subscribe((windowRefs) => this.windowRefs = windowRefs);
    }

    private initChangesObserver(taskbarElement: HTMLElement): void {
        this.taskbarChangesSubscription = combineLatest([
            elementResizingObserver(taskbarElement),
            this.placementService.data$
        ])
            .pipe(debounceTime(4))
            .subscribe(() => {
                this.updateWindowSharedConfig(taskbarElement);
                this.updateWindowRefsHidesIntoCoordinate();
            });
    }

    private updateWindowSharedConfig(taskbarElement: HTMLElement): void {
        const placement = this.placementService.data;
        const elementSize = taskbarElement[placement.targetSizeProperty];

        this.windowSharedConfigService.update({
            fullscreenOffset: {
                [this.previousPlacement?.windowConfigFullscreenOffsetKey]: '0px',
                [placement.windowConfigFullscreenOffsetKey]: `${elementSize}px`
            }
        });

        this.previousPlacement = placement;
    }

    private clearWindowSharedConfig(): void {
        this.windowSharedConfigService.update({
            fullscreenOffset: {}
        });
    }

    private updateWindowRefsHidesIntoCoordinate(): void {
        this._windowRefElements.forEach(({ nativeElement: element }) => {
            const windowRefId = element.getAttribute('data-window-ref-id');
            const windowRef = this.windowRefs
                .find((currWindowRef) => currWindowRef.id === windowRefId);

            this.updateWindowRefHidesIntoCoordinate(windowRef, element);
        });
    }

    private updateWindowRefHidesIntoCoordinate(windowRef: DynamicWindowRef, windowRefElement: HTMLElement): void {
        const { x, y, width, height } = windowRefElement.getBoundingClientRect();
        const cssX = `${x + (width / 2)}px`;
        const cssY = `${y + (height / 2)}px`;

        if (windowRef.config.hidesInto?.x !== cssX || windowRef.config.hidesInto?.y !== cssY) {
            windowRef.updateConfig({
                hidesInto: { x: cssX, y: cssY }
            });
        }
    }
}
