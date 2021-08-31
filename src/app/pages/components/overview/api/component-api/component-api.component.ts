import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ComponentMetaInfo, DocComponent } from '@Features/doc';

@Component({
    selector: 'component-api',
    templateUrl: './component-api.component.html',
    styleUrls: ['./component-api.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentApiComponent {
    @Input()
    public readonly component: DocComponent;

    @Input()
    public readonly metaInfo: ComponentMetaInfo;
}
