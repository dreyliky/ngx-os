import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ComponentMetaInfo, DocInjectable } from '@Doc/features/doc';

@Component({
    selector: 'demo-service-api',
    templateUrl: './service-api.component.html',
    styleUrls: ['./service-api.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServiceApiComponent {
    @Input()
    public service: DocInjectable;

    @Input()
    public metaInfo: ComponentMetaInfo;
}
