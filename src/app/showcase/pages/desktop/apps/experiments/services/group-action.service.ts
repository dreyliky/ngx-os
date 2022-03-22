import { Inject, Injectable } from '@angular/core';
import { DynamicWindowRef, DynamicWindowService, DYNAMIC_WINDOW_REF, ɵKeysOfType } from 'ngx-os';
import { BehaviorSubject, Observable } from 'rxjs';
import { EmptyWindowComponent } from '../components';
import { WindowsPositionShuffleService } from './windows-position-shuffle.service';

@Injectable()
export class GroupActionService {
    public get totalSpawnedWindows$(): Observable<number> {
        return this._totalSpawnedWindows$.asObservable();
    }

    public get totalSpawnedWindows(): number {
        return this._totalSpawnedWindows$.getValue();
    }

    public get actionsDelay$(): Observable<number> {
        return this._actionsDelay$.asObservable();
    }

    public get actionsDelay(): number {
        return this._actionsDelay$.getValue();
    }

    private currentActionIntervalId: number;
    private readonly _totalSpawnedWindows$ = new BehaviorSubject<number>(0);
    private readonly _actionsDelay$ = new BehaviorSubject<number>(50);

    constructor(
        @Inject(DYNAMIC_WINDOW_REF) private readonly windowRef: DynamicWindowRef,
        private readonly dynamicWindowService: DynamicWindowService,
        private readonly windowsPositionShuffleService: WindowsPositionShuffleService
    ) {}

    public setActionsDelayValue(value: number): void {
        this._actionsDelay$.next(value);
    }

    public spawnWindows(amount: number): void {
        clearInterval(this.currentActionIntervalId);

        let currentAmount = 0;
        this.currentActionIntervalId = setInterval(() => {
            currentAmount++;
            this._totalSpawnedWindows$.next(this.totalSpawnedWindows + 1);
            this.dynamicWindowService.open(EmptyWindowComponent, { width: 250, height: 125 });

            if (currentAmount >= amount) {
                clearInterval(this.currentActionIntervalId);
            }
        }, this.actionsDelay);
    }

    public shuffleWindowsPositions(): void {
        clearInterval(this.currentActionIntervalId);

        this.currentActionIntervalId = this.windowsPositionShuffleService.shuffle({
            windowRefs: this.dynamicWindowService.references,
            ignoreWindowRefIds: [this.windowRef.id],
            iterationDelayInMs: this.actionsDelay
        });
    }

    public makeGroupWindowsAction(action: ɵKeysOfType<DynamicWindowRef, () => any>): void {
        clearInterval(this.currentActionIntervalId);

        let currentWindowRefIndex = 0;
        const windowRefs = [...this.dynamicWindowService.references];

        this.currentActionIntervalId = setInterval(() => {
            const windowRef = windowRefs[currentWindowRefIndex];

            if (windowRef.id !== this.windowRef.id) {
                windowRef[action]();
            }

            if (currentWindowRefIndex >= (windowRefs.length - 1)) {
                clearInterval(this.currentActionIntervalId);
            }

            currentWindowRefIndex++;
        }, this.actionsDelay);
    }

    public stopCurrentActions(): void {
        clearInterval(this.currentActionIntervalId);
    }
}
