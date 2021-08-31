import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ComponentMetaInfo, DocModule } from '@Doc/features/doc';

@Component({
    selector: 'module-api',
    templateUrl: './module-api.component.html',
    styleUrls: ['./module-api.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModuleApiComponent {
    @Input()
    public readonly module: DocModule;

    @Input()
    public readonly metaInfo: ComponentMetaInfo;
}
