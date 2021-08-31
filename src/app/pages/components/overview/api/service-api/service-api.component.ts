import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ComponentMetaInfo, DocInjectable } from '@Doc/features/doc';

@Component({
    selector: 'service-api',
    templateUrl: './service-api.component.html',
    styleUrls: ['./service-api.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServiceApiComponent {
    @Input()
    public readonly service: DocInjectable;

    @Input()
    public readonly metaInfo: ComponentMetaInfo;
}
