import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ComponentMetaInfo, DocComponent } from '@Features/doc';

@Component({
    selector: 'demo-component-api',
    templateUrl: './component-api.component.html',
    styleUrls: ['./component-api.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentApiComponent {
    @Input()
    public component: DocComponent;

    @Input()
    public metaInfo: ComponentMetaInfo;
}
