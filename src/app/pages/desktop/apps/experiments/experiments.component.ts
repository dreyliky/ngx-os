import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { DynamicWindowRef, DynamicWindowService } from '@lib-modules';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EmptyWindowComponent } from './components';

@Component({
    selector: 'experiments-app',
    templateUrl: './experiments.component.html',
    styleUrls: ['./experiments.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExperimentsAppComponent {
    public get totalWindowsAlive$(): Observable<number> {
        return this.dynamicWindowService.references$
            .pipe(
                map((windowRefs) => windowRefs.length)
            );
    }

    public readonly windowAmoutsToSpawn: number[] = [
        10, 25, 50, 100, 200, 400
    ];

    public totalSpawned: number = 0;

    constructor(
        @Inject(DynamicWindowRef) private readonly windowRef: DynamicWindowRef,
        private readonly dynamicWindowService: DynamicWindowService,
        private readonly changeDetector: ChangeDetectorRef
    ) {}

    public spawnWindows(amount: number): void {
        let currentAmount = 0;
        const spawnerId = setInterval(() => {
            if (currentAmount >= amount) {
                clearInterval(spawnerId);
            }

            this.dynamicWindowService.open(EmptyWindowComponent, { width: 250, height: 125 });

            currentAmount++;
            this.totalSpawned++;
            this.changeDetector.detectChanges();
        }, 100);
    }

    public onCloseAllWindowsButtonClick(): void {
        this.dynamicWindowService.references
            .forEach((windowRef) => {
                if (windowRef.id !== this.windowRef.id) {
                    windowRef.close();
                }
            });
    }
}
