import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ComponentMetaInfo } from '@Features/doc';

@Component({
    selector: 'demo-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
    @Input()
    public readonly metaInfo: ComponentMetaInfo;
}
