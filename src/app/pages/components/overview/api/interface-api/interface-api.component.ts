import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ComponentMetaInfo, DocInterface } from '@Features/doc';

@Component({
    selector: 'interface-api',
    templateUrl: './interface-api.component.html',
    styleUrls: ['./interface-api.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InterfaceApiComponent {
    @Input()
    public readonly interface: DocInterface;

    @Input()
    public readonly metaInfo: ComponentMetaInfo;
}
