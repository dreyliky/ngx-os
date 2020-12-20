import { Component, OnInit, ChangeDetectionStrategy, Input, Type } from '@angular/core';
import { DocComponent, DocService } from '@Doc/features/doc';

enum SectionEnum {
    Demo,
    HTML,
    SCSS,
    TS
}

@Component({
    selector: 'demo-demo-block',
    templateUrl: './demo-block.component.html',
    styleUrls: ['./demo-block.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoBlockComponent implements OnInit {

    @Input()
    public set componentType(componentType: Type<any>) {
        this.initDemoDocComponent(componentType.name);
    }

    public readonly sectionEnum = SectionEnum;

    public openedSection = SectionEnum.Demo;
    public docComponent: DocComponent;

    constructor(
        private readonly docService: DocService
    ) {}

    public ngOnInit(): void {}

    private initDemoDocComponent(componentName: string): void {
        this.docComponent = this.docService.getDemoDocComponentByName(componentName);
    }

}
