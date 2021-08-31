import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DocComponent, LibDocService, OutputsClass } from '@Features/doc';

@Component({
    selector: 'directive-events',
    templateUrl: './events.component.html',
    styleUrls: [
        './events.component.scss',
        '../../base/api-base.component.scss'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventsComponent implements OnChanges {
    @Input()
    public readonly directive: DocComponent;

    public outputs: OutputsClass[];

    constructor(
        private readonly docService: LibDocService
    ) {}

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.directive.previousValue !== changes.directive.currentValue) {
            this.outputs = this.docService.getUniqueDocComponentOutputs(this.directive);
        }
    }
}
