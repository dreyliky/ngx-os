import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'showcase-form-validation',
    templateUrl: './form-validation.component.html',
    styleUrls: ['./form-validation.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormValidationComponent {
    public readonly loginControl = new FormControl('', [Validators.required]);
    public readonly infoControl = new FormControl('', [Validators.required]);
    public readonly genderControl = new FormControl(null, [Validators.required]);

    public readonly formGroup = new FormGroup({
        login: this.loginControl,
        info: this.infoControl,
        gender: this.genderControl
    });

    private get controls(): AbstractControl[] {
        return Object.values(this.formGroup.controls);
    }

    public setControlsTouchedState(state: boolean): void {
        this.controls.forEach((control) => {
            const actionFn = (state) ? control.markAsTouched : control.markAsUntouched;

            actionFn.call(control);
            control.updateValueAndValidity();
        });
    }

    public setControlsDisabledState(state: boolean): void {
        this.controls.forEach((control) => {
            const actionFn = (state) ? control.disable : control.enable;

            actionFn.call(control);
        });
    }

    public isControlHasRequiredError(control: FormControl): boolean {
        return (control.touched && control.hasError('required'));
    }
}
