import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DocInjectable, LibDocService, MethodsClass } from '@Features/doc';

@Component({
    selector: 'service-methods',
    templateUrl: './methods.component.html',
    styleUrls: [
        './methods.component.scss',
        '../../base/api-base.component.scss'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MethodsComponent implements OnChanges {
    @Input()
    public readonly service: DocInjectable;

    public methods: MethodsClass[];

    constructor(
        private readonly docService: LibDocService
    ) {}

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.service.previousValue !== changes.service.currentValue) {
            this.methods = this.docService.getDocInjectablePublicMethods(this.service);
        }
    }
}
