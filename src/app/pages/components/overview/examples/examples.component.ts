import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
    Input,
    QueryList,
    ViewChildren,
    ViewContainerRef
} from '@angular/core';
import { ComponentMetaInfo } from '@Doc/features/doc';

@Component({
    selector: 'demo-examples',
    templateUrl: './examples.component.html',
    styleUrls: ['./examples.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExamplesComponent implements AfterViewInit {
    @Input()
    public readonly metaInfo: ComponentMetaInfo;

    @ViewChildren('demoTemplate', { read: ViewContainerRef })
    private readonly demoTemplates: QueryList<ViewContainerRef>;

    @ViewChildren(ExamplesComponent)
    private set demoBlockComponents(_: ExamplesComponent) {
        this.initDemoComponents();
    }

    constructor(
        private readonly componentFactoryResolver: ComponentFactoryResolver,
        private readonly changeDetector: ChangeDetectorRef
    ) {}

    public ngAfterViewInit(): void {
        this.initDemoComponents();
    }

    private initDemoComponents(): void {
        const demoComponentsMetaInfo = this.metaInfo.demoComponents;

        if (this.demoTemplates && demoComponentsMetaInfo) {
            demoComponentsMetaInfo.forEach((metaInfo, metaInfoIndex) => {
                const demoTemplates = this.demoTemplates.toArray();
                const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
                    metaInfo.component
                );

                demoTemplates[metaInfoIndex]?.clear();
                demoTemplates[metaInfoIndex]?.createComponent(componentFactory);
                this.changeDetector.detectChanges();
            });
        }
    }
}
