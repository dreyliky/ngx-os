import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DocAccessors, DocGetSignature } from '@Features/doc';

@Component({
    selector: 'shared-getters',
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
            .filter((getter) => !!getter && !getter.name.startsWith('_'));
    }
}
