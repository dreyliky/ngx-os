import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractControl, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'showcase-form-validation',
    templateUrl: './form-validation.component.html',
    styleUrls: ['./form-validation.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormValidationComponent {
    public readonly loginControl = new UntypedFormControl('', [Validators.required]);
    public readonly infoControl = new UntypedFormControl('', [Validators.required]);
    public readonly genderControl = new UntypedFormControl(null, [Validators.required]);

    public readonly formGroup = new UntypedFormGroup({
        login: this.loginControl,
        info: this.infoControl,
        gender: this.genderControl
    });

    private get controls(): AbstractControl[] {
        return Object.values(this.formGroup.controls);
    }

    public setControlsTouchedState(state: boolean): void {
        this.controls.forEach((control) => {
            (state) ? control.markAsTouched() : control.markAsUntouched();

            control.updateValueAndValidity();
        });
    }

    public setControlsDisabledState(state: boolean): void {
        this.controls.forEach((control) => {
            (state) ? control.disable() : control.enable();
        });
    }

    public isControlHasRequiredError(control: UntypedFormControl): boolean {
        return (control.touched && control.hasError('required'));
    }
}
