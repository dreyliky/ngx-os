import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DocComponent, DocService, MethodsClass } from '@Features/doc';

@Component({
    selector: 'demo-methods',
    templateUrl: './methods.component.html',
    styleUrls: [
        './methods.component.scss',
        '../../base/api-base.component.scss'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MethodsComponent implements OnChanges {
    @Input()
    public readonly component: DocComponent;

    public methods: MethodsClass[];

    constructor(
        private readonly docService: DocService
    ) {}

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.component.previousValue !== changes.component.currentValue) {
            this.methods = this.docService.getDocComponentActualPublicMethods(this.component);
        }
    }
}
