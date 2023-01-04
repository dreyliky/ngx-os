import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { DynamicWindowRef, DYNAMIC_WINDOW_REF, ɵOsBaseViewComponent } from 'ngx-os';
import { takeUntil } from 'rxjs/operators';
import { FONTS, MAX_FONT_SIZE, MIN_FONT_SIZE } from '../../data';
import { SettingsService } from '../../services';

@Component({
    selector: 'notepad-font-window',
    templateUrl: './font-window.component.html',
    styleUrls: ['./font-window.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FontWindowComponent extends ɵOsBaseViewComponent implements OnInit {
    public formGroup!: UntypedFormGroup;

    public readonly minFontSize = MIN_FONT_SIZE;
    public readonly maxFontSize = MAX_FONT_SIZE;

    public readonly fonts = FONTS;

    public get minValueLabel(): string {
        return `From ${this.minFontSize}px`;
    }

    public get maxValueLabel(): string {
        return `To ${this.maxFontSize}px`;
    }

    constructor(
        @Inject(DYNAMIC_WINDOW_REF) private readonly windowRef: DynamicWindowRef,
        private readonly settingsService: SettingsService
    ) {
        super();
    }

    public ngOnInit(): void {
        this.initFormGroup();
        this.initFormGroupValueObserver();
    }

    public onOkButtonClick(): void {
        this.windowRef.close();
    }

    private initFormGroup(): void {
        const settings = this.settingsService.data;

        this.formGroup = new UntypedFormGroup({
            font: new UntypedFormControl(settings?.font),
            fontSizeInPx: new UntypedFormControl(settings?.fontSizeInPx),
            isWordWrapEnabled: new UntypedFormControl(settings?.isWordWrapEnabled)
        });
    }

    private initFormGroupValueObserver(): void {
        this.formGroup.valueChanges
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe((settings) => this.settingsService.update(settings));
    }
}
