import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import { AppRouteEnum } from '@core/enums';
import {
    DemoComponentMetaInfo,
    DocComponent,
    ExamplesDocumentationService
} from '@features/documentation';
import { DynamicWindowService } from 'ngx-os';
import { OverviewService } from '../../../overview.service';

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
export class ExampleComponent implements AfterViewInit {
    @Input()
    public set demoComponentMetaInfo(data: DemoComponentMetaInfo) {
        this._demoComponentMetaInfo = data;
        this.docComponent = this.docService.findDocComponentByName(data.componentName);
    }

    public get demoComponentMetaInfo(): DemoComponentMetaInfo {
        return this._demoComponentMetaInfo;
    }

    public get isScssExist(): boolean {
        return !!this.docComponent?.styleUrlsData?.[0]?.data;
    }

    public get isolatedPath(): string {
        const { type: componentType } = this.overviewService.metaInfo;
        const { componentName } = this._demoComponentMetaInfo;

        return `/${AppRouteEnum.Example}/${componentType}/${componentName}`;
    }

    public readonly sectionEnum = SectionEnum;

    public openedSection = SectionEnum.Demo;
    public docComponent: DocComponent;

    @ViewChild('exampleTemplate', { read: ViewContainerRef })
    private readonly exampleContainer: ViewContainerRef;

    private _demoComponentMetaInfo: DemoComponentMetaInfo;

    constructor(
        private readonly overviewService: OverviewService,
        private readonly docService: ExamplesDocumentationService,
        private readonly dynamicWindowService: DynamicWindowService,
        private readonly changeDetector: ChangeDetectorRef
    ) {}

    public ngAfterViewInit(): void {
        this.exampleContainer.clear();
        this.exampleContainer.createComponent(this._demoComponentMetaInfo.component);
        this.changeDetector.detectChanges();
    }

    public onOpenInsideDynamicWindowButtonClick(): void {
        this.dynamicWindowService.open(
            this.demoComponentMetaInfo.component,
            { minWidth: 450, minHeight: 350 }
        );
    }
}
