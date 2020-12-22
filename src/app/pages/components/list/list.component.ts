import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentationRouteEnum } from '@Doc/core/enums';
import { ComponentMetaInfoMap, ComponentType } from '@Doc/features/doc';

@Component({
    selector: 'demo-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {

    public components = [...ComponentMetaInfoMap.values()];

    constructor(
        private readonly router: Router
    ) {}

    public ngOnInit(): void {}

    public onOpenSectionButtonClick(componentType: ComponentType): void {
        this.router.navigateByUrl(`/${DocumentationRouteEnum.Components}/${componentType}`);
    }

}
