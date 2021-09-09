import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { InputsClass } from '@Features/documentation';

@Component({
    selector: 'shared-inputs',
    templateUrl: './inputs.component.html',
    styleUrls: [
        './inputs.component.scss',
        '../../base/api-base.component.scss'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputsComponent {
    @Input()
    public set classInputs(inputs: InputsClass[]) {
        if (inputs) {
            this.processInputs(inputs);
        }
    }

    public inputs: InputsClass[];

    private processInputs(inputs: InputsClass[]): void {
        const inputNames = inputs.map((input) => input.name);

        this.inputs = inputs
            .filter((input, index) => inputNames.indexOf(input.name) === index);
    }
}
