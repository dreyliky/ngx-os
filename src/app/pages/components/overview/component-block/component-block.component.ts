import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ComponentMetaInfo, DocComponent } from '@Features/doc';

@Component({
    selector: 'demo-component-block',
    templateUrl: './component-block.component.html',
    styleUrls: ['./component-block.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentBlockComponent {
    @Input()
    public component: DocComponent;

    @Input()
    public metaInfo: ComponentMetaInfo;
}
