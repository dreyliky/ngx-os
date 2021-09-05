import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OutputsClass } from '@Features/doc';

@Component({
    selector: 'shared-outputs',
    templateUrl: './outputs.component.html',
    styleUrls: [
        './outputs.component.scss',
        '../../base/api-base.component.scss'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OutputsComponent {
    @Input()
    public set classOutputs(outputs: OutputsClass[]) {
        if (outputs) {
            this.processOutputs(outputs);
        }
    }

    public outputs: OutputsClass[];

    private processOutputs(outputs: OutputsClass[]): void {
        const outputNames = outputs.map((output) => output.name);

        this.outputs = outputs
            .filter((output, index) => outputNames.indexOf(output.name) === index);
    }
}
