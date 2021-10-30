import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DocAccessors, DocGetSignature } from '@features/documentation';

@Component({
    selector: 'api-getters',
    templateUrl: './getters.component.html',
    styleUrls: [
        './getters.component.scss',
        '../../base/api-base.component.scss'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GettersComponent {
    @Input()
    public set accessors(accessors: DocAccessors) {
        if (accessors) {
            this.initGetters(accessors);
        }
    }

    public getters: DocGetSignature[];

    private initGetters(accessors: DocAccessors): void {
        this.getters = Object.values(accessors)
            .map((docAccessorValue) => docAccessorValue.getSignature)
            .filter((getter) => (
                !!getter && !getter.name.startsWith('_') &&
                !getter.returnType.startsWith('EventEmitter')
            ))
            .sort((a, b) => (a.line - b.line));
    }
}
