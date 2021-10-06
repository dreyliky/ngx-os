import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe-decorator';
import { GridDirectionEnum } from 'ngx-os/modules';
import { Subscription } from 'rxjs';
import { ShortcutSettingsService } from '../../../../features/shortcut';

@Component({
    selector: 'settings-shortcuts-section',
    templateUrl: './shortcuts.component.html',
    styleUrls: ['./shortcuts.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShortcutsComponent implements OnInit {
    public gridDirectionEnum = GridDirectionEnum;
    public formGroup: FormGroup;

    constructor(
        private readonly shortcutSettingsService: ShortcutSettingsService
    ) {}

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

    @AutoUnsubscribe()
    private initFormGroupValueObserver(): Subscription {
        return this.formGroup.valueChanges
            .subscribe((settings) => this.shortcutSettingsService.apply(settings));
    }
}
