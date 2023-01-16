import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GridDirectionEnum, ɵOsBaseViewComponent } from 'ngx-os';
import { filter, takeUntil } from 'rxjs/operators';
import { APPS } from '../../apps';
import { AppMetadata, ExecService } from '../../features/exec';
import { ShortcutSettingsService } from '../../features/shortcut';

@Component({
    selector: 'desktop-shortcuts-zone',
    templateUrl: './shortcuts-zone.component.html',
    styleUrls: ['./shortcuts-zone.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShortcutsZoneComponent extends ɵOsBaseViewComponent implements OnInit {
    public gridDirection = GridDirectionEnum.Vertical;
    public cellSize = 72;

    public programs = APPS;

    constructor(
        private readonly execService: ExecService,
        private readonly shortcutSettingsService: ShortcutSettingsService,
        private readonly changeDetector: ChangeDetectorRef
    ) {
        super();
    }

    public ngOnInit(): void {
        this.initShortcutSettingsObserver();
    }

    public openProgram(program: AppMetadata): void {
        this.execService.run(program);
    }

    private initShortcutSettingsObserver(): void {
        this.shortcutSettingsService.data$
            .pipe(
                filter((settings) => !!settings),
                takeUntil(this.viewDestroyed$)
            )
            .subscribe(({ direction, cellSize }) => {
                this.gridDirection = direction;
                this.cellSize = cellSize;

                this.changeDetector.detectChanges();
            });
    }
}
