import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { OsBaseViewComponent } from 'ngx-os';
import { GridDirectionEnum } from 'ngx-os/modules';
import { filter, takeUntil } from 'rxjs/operators';
import { APPS } from '../../apps';
import { AppMetadata, ExecService } from '../../features/exec';
import { Shortcut, ShortcutSettingsService } from '../../features/shortcut';

@Component({
    selector: 'desktop-shortcuts-zone',
    templateUrl: './shortcuts-zone.component.html',
    styleUrls: ['./shortcuts-zone.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShortcutsZoneComponent extends OsBaseViewComponent implements OnInit {
    public gridDirection = GridDirectionEnum.Vertical;
    public gridSize = 72;

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

    public shortcutIconUrlExpr(shortcut: Shortcut): string {
        return shortcut.iconUrl;
    }

    public shortcutLabelExpr(shortcut: Shortcut): string {
        return shortcut.label;
    }

    public onProgramShortcutDblClick(program: AppMetadata): void {
        this.execService.run(program);
    }

    private initShortcutSettingsObserver(): void {
        this.shortcutSettingsService.data$
            .pipe(
                takeUntil(this.viewDestroyed$),
                filter((settings) => !!settings)
            )
            .subscribe(({ direction, gridSize }) => {
                this.gridDirection = direction;
                this.gridSize = gridSize;

                this.changeDetector.detectChanges();
            });
    }
}
