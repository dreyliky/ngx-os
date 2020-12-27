import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ComponentMetaInfoMap } from '@Doc/features/doc';
import { TreeNode } from 'os-angular';

@Component({
    selector: 'demo-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements OnInit {

    public components: TreeNode<any>[] = [];

    constructor() {}

    public ngOnInit(): void {
        this.initComponents();
    }

    private initComponents(): void {
        this.components = [...ComponentMetaInfoMap.values()]
            .map((componentMeta) => {
                return {
                    label: componentMeta.name,
                    data: componentMeta
                };
            });
    }

}
