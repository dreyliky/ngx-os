import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { OsBaseViewComponent } from 'ngx-os';
import { GridDirectionEnum } from 'ngx-os/modules';
import { takeUntil } from 'rxjs/operators';
import { ShortcutSettingsService } from '../../../../features/shortcut';

@Component({
    selector: 'settings-shortcuts-section',
    templateUrl: './shortcuts.component.html',
    styleUrls: ['./shortcuts.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShortcutsComponent extends OsBaseViewComponent implements OnInit {
    public gridDirectionEnum = GridDirectionEnum;
    public formGroup: FormGroup;

    constructor(
        private readonly shortcutSettingsService: ShortcutSettingsService
    ) {
        super();
    }

    public ngOnInit(): void {
        this.initFormGroup();
        this.initFormGroupValueObserver();
    }

    private initFormGroup(): void {
        const settings = this.shortcutSettingsService.data;

        this.formGroup = new FormGroup({
            direction: new FormControl(settings?.direction ?? GridDirectionEnum.Vertical),
            gridSize: new FormControl(settings?.gridSize ?? 72)
        });
    }

    private initFormGroupValueObserver(): void {
        this.formGroup.valueChanges
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe((settings) => this.shortcutSettingsService.apply(settings));
    }
}
