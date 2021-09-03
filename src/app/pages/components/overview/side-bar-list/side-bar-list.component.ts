import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRouteEnum } from '@Doc/core/enums';
import { ComponentMetaInfo, ComponentMetaInfoMap } from '@Features/doc';
import { Observable } from 'rxjs';
import { OverviewService } from '../overview.service';

@Component({
    selector: 'demo-side-bar-list',
    templateUrl: './side-bar-list.component.html',
    styleUrls: ['./side-bar-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideBarListComponent implements OnInit {
    public metaInfo$: Observable<ComponentMetaInfo>;

    public components: ComponentMetaInfo[] = [...ComponentMetaInfoMap.values()];

    constructor(
        private readonly overviewService: OverviewService,
        private readonly router: Router
    ) {}

    public ngOnInit(): void {
        this.metaInfo$ = this.overviewService.metaInfo$;
    }

    public onComponentOptionSelected(component: ComponentMetaInfo): void {
        this.router.navigateByUrl(`/${AppRouteEnum.Components}/${component.type}`);
    }
}
