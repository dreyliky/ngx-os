import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ComponentMetaInfo, DocEnum } from '@Features/doc';

@Component({
    selector: 'enum-api',
    templateUrl: './enum-api.component.html',
    styleUrls: ['./enum-api.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EnumApiComponent {
    @Input()
    public readonly enum: DocEnum;

    @Input()
    public readonly metaInfo: ComponentMetaInfo;
}
