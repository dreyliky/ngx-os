import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DocAccessors, DocSetSignature } from '@Features/documentation';

@Component({
    selector: 'shared-setters',
    templateUrl: './setters.component.html',
    styleUrls: [
        './setters.component.scss',
        '../../base/api-base.component.scss'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettersComponent {
    @Input()
    public set accessors(accessors: DocAccessors) {
        if (accessors) {
            this.initSetters(accessors);
        }
    }

    public setters: DocSetSignature[];

    private initSetters(accessors: DocAccessors): void {
        this.setters = Object.values(accessors)
            .map((docAccessorValue) => docAccessorValue.setSignature)
            .filter((setter) => !!setter && !setter.name.startsWith('_'));
    }
}
