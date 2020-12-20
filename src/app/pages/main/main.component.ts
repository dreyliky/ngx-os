import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentationRouteEnum } from '@Doc/core/enums';
import { ComponentMetaInfoMap, ComponentType } from '@Doc/features/doc';

@Component({
    selector: 'demo-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {

    public components = [...ComponentMetaInfoMap.values()];

    constructor(
        private readonly router: Router
    ) {}

    public ngOnInit(): void {}

    public onOpenSectionButtonClick(componentType: ComponentType): void {
        this.router.navigateByUrl(`/${DocumentationRouteEnum.Components}/${componentType}`);
    }

}
