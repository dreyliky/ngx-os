import { ChangeDetectionStrategy, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ComponentMetaInfo, DocComponent, DocService, OutputsClass } from '@Doc/features/doc';

@Component({
    selector: 'demo-events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventsComponent implements OnInit {

    @Input()
    public readonly metaInfo: ComponentMetaInfo;

    @Input()
    public readonly component: DocComponent;

    public outputs: OutputsClass[];

    public isCollapsed: boolean = false;

    constructor(
        private readonly docService: DocService
    ) {}

    public ngOnInit(): void {}

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.component.previousValue !== changes.component.currentValue) {
            this.outputs = this.docService.getUniqueDocComponentOutputs(this.component);
        }
    }

    public onCollapseButtonClick(): void {
        this.isCollapsed = !this.isCollapsed;
    }

}
