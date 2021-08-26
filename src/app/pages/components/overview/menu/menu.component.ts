import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentationRouteEnum } from '@Doc/core/enums';
import { ComponentMetaInfo, ComponentMetaInfoMap } from '@Features/doc';

@Component({
    selector: 'demo-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent {
    @Input()
    public openedComponentMetaInfo: ComponentMetaInfo;

    public components: ComponentMetaInfo[] = [...ComponentMetaInfoMap.values()];

    constructor(
        private readonly router: Router
    ) {}

    public onComponentOptionSelected(component: ComponentMetaInfo): void {
        this.router.navigateByUrl(`/${DocumentationRouteEnum.Components}/${component.type}`);
    }
}
