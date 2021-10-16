import { ChangeDetectionStrategy, Component, Input, Type } from '@angular/core';
import {
    DemoComponentMetaInfo,
    DocComponent,
    ExamplesDocumentationService
} from '@features/documentation';

enum SectionEnum {
    Demo,
    HTML,
    SCSS,
    TS
}

@Component({
    selector: 'showcase-example',
    templateUrl: './example.component.html',
    styleUrls: ['./example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleComponent {
    @Input()
    public set demoComponentMetaInfo(data: DemoComponentMetaInfo) {
        this._demoComponentMetaInfo = data;
        this.initShowcaseDocComponent(data.component);
    }

    public get demoComponentMetaInfo(): DemoComponentMetaInfo {
        return this._demoComponentMetaInfo;
    }

    public get isScssExist(): boolean {
        return !!this.docComponent?.styleUrlsData?.[0]?.data;
    }

    public readonly sectionEnum = SectionEnum;

    public openedSection = SectionEnum.Demo;
    public docComponent: DocComponent;

    private _demoComponentMetaInfo: DemoComponentMetaInfo;

    constructor(
        private readonly docService: ExamplesDocumentationService
    ) {}

    private initShowcaseDocComponent(componentType: Type<any>): void {
        this.docComponent = this.docService.findDocComponentByType(componentType);
    }
}
