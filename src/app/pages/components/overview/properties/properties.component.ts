import {
    ChangeDetectionStrategy, Component, Input,
    OnChanges, OnInit, SimpleChanges
} from '@angular/core';
import {
    ComponentMetaInfo, DocComponent, DocService, InputsClass
} from '@Doc/features/doc';

@Component({
    selector: 'demo-properties',
    templateUrl: './properties.component.html',
    styleUrls: ['./properties.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PropertiesComponent implements OnInit, OnChanges {

    @Input()
    public readonly metaInfo: ComponentMetaInfo;

    @Input()
    public readonly component: DocComponent;

    public inputs: InputsClass[];

    public isCollapsed: boolean = false;

    constructor(
        private readonly docService: DocService
    ) {}

    public ngOnInit(): void {}

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.component.previousValue !== changes.component.currentValue) {
            this.inputs = this.docService.getUniqueDocComponentInputs(this.component);
        }
    }

    public onCollapseButtonClick(): void {
        this.isCollapsed = !this.isCollapsed;
    }

}
