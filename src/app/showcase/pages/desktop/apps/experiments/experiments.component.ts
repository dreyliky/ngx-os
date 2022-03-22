import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DynamicWindowService, NumberBoxChangeEvent } from 'ngx-os';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GroupActionService, WindowsPositionShuffleService } from './services';

@Component({
    selector: 'experiments-app',
    templateUrl: './experiments.component.html',
    styleUrls: ['./experiments.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        WindowsPositionShuffleService,
        GroupActionService
    ]
})
export class ExperimentsAppComponent implements OnInit {
    public totalWindowsAlive$: Observable<number>;
    public totalSpawnedWindows$ = this.groupActionService.totalSpawnedWindows$;
    public actionsDelay$ = this.groupActionService.actionsDelay$;

    constructor(
        private readonly dynamicWindowService: DynamicWindowService,
        private readonly groupActionService: GroupActionService
    ) {}

    public ngOnInit(): void {
        this.initTotalWindowsAliveObservable();
    }

    public onActionsDelayNumberBoxValueChange({ value }: NumberBoxChangeEvent): void {
        this.groupActionService.setActionsDelayValue(value);
    }

    public onStopCurrentActionsButtonClick(): void {
        this.groupActionService.stopCurrentActions();
    }

    private initTotalWindowsAliveObservable(): void {
        this.totalWindowsAlive$ = this.dynamicWindowService.references$
            .pipe(
                map((windowRefs) => windowRefs.length)
            );
    }
}
