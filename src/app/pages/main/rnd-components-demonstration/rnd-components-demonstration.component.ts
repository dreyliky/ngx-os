import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ArrayHelper } from '@Core/helpers';
import { ComponentMetaInfo, ComponentMetaInfoMap } from '@Doc/features/doc';

@Component({
    selector: 'demo-rnd-components-demonstration',
    templateUrl: './rnd-components-demonstration.component.html',
    styleUrls: ['./rnd-components-demonstration.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RndComponentsDemonstrationComponent implements OnInit {

    public components: ComponentMetaInfo[];

    private readonly componentsCount: number = 5;

    constructor() {}

    public ngOnInit(): void {
        this.initComponents();
    }

    private initComponents(): void {
        const metaInfos = [...ComponentMetaInfoMap.values()];

        this.components = ArrayHelper.shuffle(metaInfos)
            .slice(0, this.componentsCount);
    }

}
