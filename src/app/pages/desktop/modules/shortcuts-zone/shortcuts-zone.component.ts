import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { GridDirectionEnum } from '@lib-modules';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { APPS } from '../../apps';
import { AppMetadata, ExecService } from '../../features/exec';
import { ShortcutSettingsData, ShortcutSettingsService } from '../../features/shortcut';

@Component({
    selector: 'desktop-shortcuts-zone',
    templateUrl: './shortcuts-zone.component.html',
    styleUrls: ['./shortcuts-zone.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShortcutsZoneComponent implements OnInit, OnDestroy {
    public gridDirection = GridDirectionEnum.Vertical;
    public gridSize = 72;

    public programs = APPS;

    private shortcutSettingsSubscription: Subscription;

    constructor(
        private readonly execService: ExecService,
        private readonly shortcutSettingsService: ShortcutSettingsService,
        private readonly changeDetector: ChangeDetectorRef
    ) {}

    public ngOnInit(): void {
        this.initShortcutSettingsObserver();
    }

    public ngOnDestroy(): void {
        this.shortcutSettingsSubscription.unsubscribe();
    }

    public onProgramShortcutDblClick(program: AppMetadata): void {
        this.execService.run(program);
    }

    private initShortcutSettingsObserver(): void {
        this.shortcutSettingsSubscription = this.shortcutSettingsService.data$
            .pipe(
                filter(Boolean)
            )
            .subscribe(({ direction, gridSize }: ShortcutSettingsData) => {
                this.gridDirection = direction;
                this.gridSize = gridSize;

                this.changeDetector.detectChanges();
            });
    }
}
