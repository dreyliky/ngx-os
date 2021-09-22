import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GridDirectionEnum } from '@lib-modules';
import { Subscription } from 'rxjs';
import { ShortcutSettingsService } from '../../../../features/shortcut';

@Component({
    selector: 'settings-shortcuts-section',
    templateUrl: './shortcuts.component.html',
    styleUrls: ['./shortcuts.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShortcutsComponent implements OnInit, OnDestroy {
    public gridDirectionEnum = GridDirectionEnum;
    public formGroup: FormGroup;

    private formGroupSubscription: Subscription;

    constructor(
        private readonly shortcutSettingsService: ShortcutSettingsService
    ) {}

    public ngOnInit(): void {
        this.initFormGroup();
        this.initFormGroupValueObserver();
    }

    public ngOnDestroy(): void {
        this.formGroupSubscription.unsubscribe();
    }

    private initFormGroup(): void {
        const settings = this.shortcutSettingsService.data;

        this.formGroup = new FormGroup({
            direction: new FormControl(settings?.direction ?? GridDirectionEnum.Vertical),
            gridSize: new FormControl(settings?.gridSize ?? 72)
        });
    }

    private initFormGroupValueObserver(): void {
        this.formGroupSubscription = this.formGroup.valueChanges
            .subscribe((settings) => this.shortcutSettingsService.apply(settings));
    }
}
