import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ComponentMetaInfo, DocComponent } from '@Doc/features/doc';

@Component({
    selector: 'demo-component-block',
    templateUrl: './component-block.component.html',
    styleUrls: ['./component-block.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentBlockComponent implements OnInit {

    @Input()
    public component: DocComponent;

    @Input()
    public metaInfo: ComponentMetaInfo;

    constructor() {}

    public ngOnInit(): void {}

}
