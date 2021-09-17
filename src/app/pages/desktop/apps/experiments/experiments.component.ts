import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { KeysOfType } from '@lib-core';
import { DynamicWindowRef, DynamicWindowService } from '@lib-modules';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EmptyWindowComponent } from './components';
import { WindowsPositionShuffleService } from './services';

@Component({
    selector: 'experiments-app',
    templateUrl: './experiments.component.html',
    styleUrls: ['./experiments.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        WindowsPositionShuffleService
    ]
})
export class ExperimentsAppComponent {
    public get totalWindowsAlive$(): Observable<number> {
        return this.dynamicWindowService.references$
            .pipe(
                map((windowRefs) => windowRefs.length)
            );
    }

    public readonly windowAmoutsToSpawn: number[] = [
        5, 10, 25, 50, 100, 200, 400
    ];

    public actionsDelay: number = 50;
    public totalSpawned: number = 0;

    private currentActionIntervalId: number;

    constructor(
        @Inject(DynamicWindowRef) private readonly windowRef: DynamicWindowRef,
        private readonly dynamicWindowService: DynamicWindowService,
        private readonly windowsPositionShuffleService: WindowsPositionShuffleService,
        private readonly changeDetector: ChangeDetectorRef
    ) {}

    public spawnWindows(amount: number): void {
        clearInterval(this.currentActionIntervalId);

        let currentAmount = 0;
        this.currentActionIntervalId = setInterval(() => {
            currentAmount++;
            this.totalSpawned++;

            this.dynamicWindowService.open(EmptyWindowComponent, { width: 250, height: 125 });
            this.changeDetector.detectChanges();

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

    public makeGroupWindowsAction(action: KeysOfType<DynamicWindowRef, () => any>): void {
        clearInterval(this.currentActionIntervalId);

        const windowRefs = this.dynamicWindowService.references;
        let currentWindowRefIndex = 0;
        this.currentActionIntervalId = setInterval(() => {
            if (this.windowRef.id !== windowRefs[currentWindowRefIndex].id) {
                windowRefs[currentWindowRefIndex][action]();
            }

            if (currentWindowRefIndex >= (windowRefs.length - 1)) {
                clearInterval(this.currentActionIntervalId);
            }

            currentWindowRefIndex++;
        }, this.actionsDelay);
    }
}
