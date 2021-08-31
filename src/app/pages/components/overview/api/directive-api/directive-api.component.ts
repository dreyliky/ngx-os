import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ComponentMetaInfo, DocDirective } from '@Doc/features/doc';

@Component({
    selector: 'directive-api',
    templateUrl: './directive-api.component.html',
    styleUrls: ['./directive-api.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DirectiveApiComponent {
    @Input()
    public directive: DocDirective;

    @Input()
    public metaInfo: ComponentMetaInfo;
}
