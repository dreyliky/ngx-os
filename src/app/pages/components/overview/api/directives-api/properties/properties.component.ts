import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DocDirective, InputsClass, LibDocService } from '@Features/doc';

@Component({
    selector: 'directive-properties',
    templateUrl: './properties.component.html',
    styleUrls: [
        './properties.component.scss',
        '../../base/api-base.component.scss'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PropertiesComponent implements OnChanges {
    @Input()
    public readonly directive: DocDirective;

    public properties: InputsClass[];

    constructor(
        private readonly docService: LibDocService
    ) {}

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.directive.previousValue !== changes.directive.currentValue) {
            this.properties = this.docService.getDocDirectiveProperties(this.directive);
        }
    }
}
