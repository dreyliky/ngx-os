import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppRouteEnum } from '@Core/enums';
import { ComponentEnum, ComponentMetaInfoMap } from '@Features/doc';

@Component({
    selector: 'demo-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridComponent {
    public components = [...ComponentMetaInfoMap.values()];

    constructor(
        private readonly router: Router
    ) {}

    public onOpenSectionButtonClick(componentType: ComponentEnum): void {
        this.router.navigateByUrl(`/${AppRouteEnum.Components}/${componentType}`);
    }
}
