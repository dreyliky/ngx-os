import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DocComponent, LibDocService, MethodsClass } from '@Features/doc';

@Component({
    selector: 'directive-methods',
    templateUrl: './methods.component.html',
    styleUrls: [
        './methods.component.scss',
        '../../base/api-base.component.scss'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MethodsComponent implements OnChanges {
    @Input()
    public readonly directive: DocComponent;

    public methods: MethodsClass[];

    constructor(
        private readonly docService: LibDocService
    ) {}

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.directive.previousValue !== changes.directive.currentValue) {
            this.methods = this.docService.getDocComponentActualPublicMethods(this.directive);
        }
    }
}
