import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { GridDirectionEnum, ɵOsBaseViewComponent } from 'ngx-os';
import { takeUntil } from 'rxjs/operators';
import { ShortcutSettingsService } from '../../../../features/shortcut';

@Component({
    selector: 'settings-shortcuts-section',
    templateUrl: './shortcuts.component.html',
    styleUrls: ['./shortcuts.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShortcutsComponent extends ɵOsBaseViewComponent implements OnInit {
    public gridDirectionEnum = GridDirectionEnum;
    public formGroup: UntypedFormGroup;

    public get cellSizeControl(): UntypedFormControl {
        return this.formGroup.controls.cellSize as UntypedFormControl;
    }

    public get directionControl(): UntypedFormControl {
        return this.formGroup.controls.direction as UntypedFormControl;
    }

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

        this.formGroup = new UntypedFormGroup({
            direction: new UntypedFormControl(settings?.direction ?? GridDirectionEnum.Vertical),
            cellSize: new UntypedFormControl(settings?.cellSize ?? 72)
        });
    }

    private initFormGroupValueObserver(): void {
        this.formGroup.valueChanges
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe((settings) => this.shortcutSettingsService.apply(settings));
    }
}
