import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DocInjectable, InputsClass, LibDocService } from '@Features/doc';

@Component({
    selector: 'api-properties',
    templateUrl: './properties.component.html',
    styleUrls: [
        './properties.component.scss',
        '../../base/api-base.component.scss'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PropertiesComponent implements OnChanges {
    @Input()
    public readonly service: DocInjectable;

    public properties: InputsClass[];

    constructor(
        private readonly docService: LibDocService
    ) {}

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.service.previousValue !== changes.service.currentValue) {
            this.properties = this.docService.getDocInjectableProperties(this.service);
        }
    }
}
