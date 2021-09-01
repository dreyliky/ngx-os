import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ComponentMetaInfo, DocTypealias } from '@Features/doc';

@Component({
    selector: 'type-api',
    templateUrl: './type-api.component.html',
    styleUrls: ['./type-api.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TypeApiComponent {
    @Input()
    public readonly type: DocTypealias;

    @Input()
    public readonly metaInfo: ComponentMetaInfo;
}
