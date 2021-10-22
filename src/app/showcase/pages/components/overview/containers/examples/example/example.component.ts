import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
    Input,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
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
export class ExampleComponent implements AfterViewInit {
    @Input()
    public set demoComponentMetaInfo(data: DemoComponentMetaInfo) {
        this._demoComponentMetaInfo = data;
        this.docComponent = this.docService.findDocComponentByType(data.component);
    }

    public get demoComponentMetaInfo(): DemoComponentMetaInfo {
        return this._demoComponentMetaInfo;
    }

    @ViewChild('exampleTemplate', { read: ViewContainerRef })
    private readonly exampleContainer: ViewContainerRef;

    public get isScssExist(): boolean {
        return !!this.docComponent?.styleUrlsData?.[0]?.data;
    }

    public readonly sectionEnum = SectionEnum;

    public openedSection = SectionEnum.Demo;
    public docComponent: DocComponent;

    private _demoComponentMetaInfo: DemoComponentMetaInfo;

    constructor(
        private readonly docService: ExamplesDocumentationService,
        private readonly componentFactoryResolver: ComponentFactoryResolver,
        private readonly changeDetector: ChangeDetectorRef
    ) {}

    public ngAfterViewInit(): void {
        this.render();
    }

    public render(): void {
        const componentFactory = this.componentFactoryResolver
            .resolveComponentFactory(this._demoComponentMetaInfo.component);

        this.exampleContainer.clear();
        this.exampleContainer.createComponent(componentFactory);
        this.changeDetector.detectChanges();
    }
}
