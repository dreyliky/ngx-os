import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DocComponent, InputsClass, LibDocService } from '@Features/doc';

@Component({
    selector: 'demo-properties',
    templateUrl: './properties.component.html',
    styleUrls: [
        './properties.component.scss',
        '../../base/api-base.component.scss'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PropertiesComponent implements OnChanges {
    @Input()
    public readonly component: DocComponent;

    public inputs: InputsClass[];

    constructor(
        private readonly docService: LibDocService
    ) {}

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.component.previousValue !== changes.component.currentValue) {
            this.inputs = this.docService.getUniqueDocComponentInputs(this.component);
        }
    }
}
