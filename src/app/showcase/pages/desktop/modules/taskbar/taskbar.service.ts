import { ElementRef, Injectable, OnDestroy, QueryList } from '@angular/core';
import {
    DynamicWindowRefModel,
    DynamicWindowService,
    DynamicWindowSharedConfigService,
    elementResizingObserver
} from 'ngx-os';
import { combineLatest, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { TaskbarPlacement } from './interfaces';
import { TaskbarPlacementService } from './services';

@Injectable()
export class TaskbarService implements OnDestroy {
    private windowRefs: DynamicWindowRefModel[];
    private previousPlacement: TaskbarPlacement;
    private windowRefElements: QueryList<ElementRef<HTMLElement>>;
    private destroyed$ = new Subject();

    constructor(
        private readonly dynamicWindowService: DynamicWindowService,
        private readonly placementService: TaskbarPlacementService,
        private readonly windowSharedConfigService: DynamicWindowSharedConfigService
    ) {}

    public ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
        this.clearWindowSharedConfig();
    }

    public init(taskbarElement: HTMLElement): void {
        this.initChangesObserver(taskbarElement);
        this.initWindowRefsObserver();
    }

    public setWindowRefElements(elements: QueryList<ElementRef<HTMLElement>>): void {
        this.windowRefElements = elements;

        this.updateWindowRefsHidesIntoCoordinate();
    }

    private initWindowRefsObserver(): void {
        this.dynamicWindowService.references$
            .pipe(takeUntil(this.destroyed$))
            .subscribe((windowRefs) => this.windowRefs = windowRefs);
    }

    private initChangesObserver(taskbarElement: HTMLElement): void {
        combineLatest([
            elementResizingObserver(taskbarElement),
            this.placementService.data$
        ])
            .pipe(
                takeUntil(this.destroyed$),
                debounceTime(50)
            )
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
            fullscreenOffset: {
                [this.previousPlacement.windowConfigFullscreenOffsetKey]: '0px'
            }
        });
    }

    private updateWindowRefsHidesIntoCoordinate(): void {
        this.windowRefElements.forEach(({ nativeElement: element }) => {
            const windowRefId = element.getAttribute('data-window-ref-id');
            const windowRef = this.windowRefs
                ?.find((currWindowRef) => currWindowRef.id === windowRefId);

            if (windowRef) {
                this.updateWindowRefHidesIntoCoordinate(windowRef, element);

            }
        });
    }

    private updateWindowRefHidesIntoCoordinate(
        windowRef: DynamicWindowRefModel,
        windowRefElement: HTMLElement
    ): void {
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
