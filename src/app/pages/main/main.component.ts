import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentationRouteEnum } from '@Doc/core/enums';
import { ComponentsRouteEnum } from '../components/components-route.enum';

@Component({
    selector: 'doc-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {

    public componentsRouteEnum = ComponentsRouteEnum;

    constructor(
        private readonly router: Router
    ) {}

    public ngOnInit(): void {}

    public onOpenSectionButtonClick(componentRoute: ComponentsRouteEnum): void {
        this.router.navigateByUrl(`/${DocumentationRouteEnum.Components}/${componentRoute}`);
    }

}
