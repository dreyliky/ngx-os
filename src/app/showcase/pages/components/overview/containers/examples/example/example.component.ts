import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver, Input, ViewChild,
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

    @ViewChild('exampleTemplate', { read: ViewContainerRef })
    private readonly exampleContainer: ViewContainerRef;

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

    private _demoComponentMetaInfo: DemoComponentMetaInfo;

    constructor(
        private readonly overviewService: OverviewService,
        private readonly docService: ExamplesDocumentationService,
        private readonly componentFactoryResolver: ComponentFactoryResolver,
        private readonly dynamicWindowService: DynamicWindowService,
        private readonly changeDetector: ChangeDetectorRef
    ) {}

    public ngAfterViewInit(): void {
        const componentFactory = this.componentFactoryResolver
            .resolveComponentFactory(this._demoComponentMetaInfo.component);

        this.exampleContainer.clear();
        this.exampleContainer.createComponent(componentFactory);
        this.changeDetector.detectChanges();
    }

    public onOpenInsideDynamicWindowButtonClick(): void {
        this.dynamicWindowService.open(
            this.demoComponentMetaInfo.component,
            { minWidth: 450, minHeight: 350 }
        );
    }
}
