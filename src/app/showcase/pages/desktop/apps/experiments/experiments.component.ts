import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject,
    OnInit
} from '@angular/core';
import {
    DynamicWindowRefModel,
    DynamicWindowService,
    DYNAMIC_WINDOW_REF,
    KeysOfType
} from 'ngx-os';
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
export class ExperimentsAppComponent implements OnInit {
    public totalWindowsAlive$: Observable<number>;

    public readonly windowAmoutsToSpawn: number[] = [
        5, 10, 25, 50, 100, 200, 400
    ];

    public actionsDelay: number = 50;
    public totalSpawned: number = 0;

    private currentActionIntervalId: number;

    constructor(
        @Inject(DYNAMIC_WINDOW_REF) private readonly windowRef: DynamicWindowRefModel,
        private readonly dynamicWindowService: DynamicWindowService,
        private readonly windowsPositionShuffleService: WindowsPositionShuffleService,
        private readonly changeDetector: ChangeDetectorRef
    ) {}

    public ngOnInit(): void {
        this.initTotalWindowsAliveObservable();
    }

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

    public makeGroupWindowsAction(action: KeysOfType<DynamicWindowRefModel, () => any>): void {
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

    public onStopCurrentActionsButtonClick(): void {
        clearInterval(this.currentActionIntervalId);
    }

    private initTotalWindowsAliveObservable(): void {
        this.totalWindowsAlive$ = this.dynamicWindowService.references$
            .pipe(
                map((windowRefs) => windowRefs.length)
            );
    }
}
