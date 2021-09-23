import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRouteEnum } from '@Core/enums';
import { ComponentMetaInfo, ComponentMetaInfoMap, OsComponentEnum } from '@Features/documentation';

@Component({
    selector: 'demo-subheader',
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
        OsComponentEnum.Selectbox,
        OsComponentEnum.TabGroup
    ];

    constructor(
        private readonly router: Router
    ) {}

    public ngOnInit(): void {
        this.initComponents();
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
