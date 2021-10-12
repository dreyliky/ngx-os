import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRouteEnum } from '@core/enums';
import { ComponentMetaInfo, ComponentMetaInfoMap, OsComponentEnum } from '@features/documentation';

@Component({
    selector: 'showcase-subheader',
    templateUrl: './subheader.component.html',
    styleUrls: ['./subheader.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubheaderComponent implements OnInit {
    public components: ComponentMetaInfo[];

    private readonly componentsToDisplay: OsComponentEnum[] = [
        OsComponentEnum.Window,
        OsComponentEnum.TreeView,
        OsComponentEnum.Grid,
        OsComponentEnum.List,
        OsComponentEnum.Dropdown,
        OsComponentEnum.TabGroup
    ];

    constructor(
        private readonly router: Router
    ) {}

    public ngOnInit(): void {
        this.initComponents();
    }

    public componentIconUrlExpr(component: ComponentMetaInfo): string {
        return component.imageUrl;
    }

    public componentLabelExpr(component: ComponentMetaInfo): string {
        return component.name;
    }

    public onGridItemClick(component: ComponentMetaInfo): void {
        this.router.navigateByUrl(`/${AppRouteEnum.Components}/${component.type}`);
    }

    private initComponents(): void {
        const metaInfos = [...ComponentMetaInfoMap.values()];

        this.components = this.componentsToDisplay
            .map((componentType) => metaInfos.find((metaInfo) => metaInfo.type === componentType));
    }
}
