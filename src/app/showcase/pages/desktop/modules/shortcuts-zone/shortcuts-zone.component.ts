import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe-decorator';
import { GridDirectionEnum } from 'ngx-os/modules';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { APPS } from '../../apps';
import { AppMetadata, ExecService } from '../../features/exec';
import { ShortcutSettingsService } from '../../features/shortcut';

@Component({
    selector: 'desktop-shortcuts-zone',
    templateUrl: './shortcuts-zone.component.html',
    styleUrls: ['./shortcuts-zone.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShortcutsZoneComponent implements OnInit {
    public gridDirection = GridDirectionEnum.Vertical;
    public gridSize = 72;

    public programs = APPS;

    constructor(
        private readonly execService: ExecService,
        private readonly shortcutSettingsService: ShortcutSettingsService,
        private readonly changeDetector: ChangeDetectorRef
    ) {}

    public ngOnInit(): void {
        this.initShortcutSettingsObserver();
    }

    public onProgramShortcutDblClick(program: AppMetadata): void {
        this.execService.run(program);
    }

    @AutoUnsubscribe()
    private initShortcutSettingsObserver(): Subscription {
        return this.shortcutSettingsService.data$
            .pipe(
                filter((settings) => !!settings)
            )
            .subscribe(({ direction, gridSize }) => {
                this.gridDirection = direction;
                this.gridSize = gridSize;

                this.changeDetector.detectChanges();
            });
    }
}
