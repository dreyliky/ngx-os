import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, Type } from '@angular/core';
import { DemoComponentMetaInfo, DemoDocService, DocComponent } from '@Features/doc';

enum SectionEnum {
    Demo,
    HTML,
    SCSS,
    TS
}

@Component({
    selector: 'demo-example',
    templateUrl: './example.component.html',
    styleUrls: ['./example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleComponent {
    @Input()
    public set demoComponentMetaInfo(data: DemoComponentMetaInfo) {
        this._demoComponentMetaInfo = data;
        this.initDemoDocComponent(data.component);
    }

    public get demoComponentMetaInfo(): DemoComponentMetaInfo {
        return this._demoComponentMetaInfo;
    }

    public readonly sectionEnum = SectionEnum;

    public openedSection = SectionEnum.Demo;
    public docComponent: DocComponent;

    private _demoComponentMetaInfo: DemoComponentMetaInfo;

    constructor(
        private readonly changeDetector: ChangeDetectorRef,
        private readonly docService: DemoDocService
    ) {}

    private initDemoDocComponent(componentType: Type<any>): void {
        this.docComponent = this.docService.findDocComponentByType(componentType);
        this.changeDetector.detectChanges();
    }
}