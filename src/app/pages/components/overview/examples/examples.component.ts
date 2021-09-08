import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
    OnInit,
    QueryList,
    ViewChildren,
    ViewContainerRef
} from '@angular/core';
import { ComponentMetaInfo } from '@Doc/features/doc';
import { Observable } from 'rxjs';
import { OverviewService } from '../overview.service';

@Component({
    selector: 'demo-examples',
    templateUrl: './examples.component.html',
    styleUrls: ['./examples.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExamplesComponent implements OnInit {
    @ViewChildren('demoTemplate', { read: ViewContainerRef })
    private readonly demoTemplates: QueryList<ViewContainerRef>;

    @ViewChildren(ExamplesComponent)
    private set demoBlockComponents(_: ExamplesComponent) {
        this.initDemoComponents();
    }

    public metaInfo$: Observable<ComponentMetaInfo>;

    constructor(
        private readonly overviewService: OverviewService,
        private readonly componentFactoryResolver: ComponentFactoryResolver,
        private readonly changeDetector: ChangeDetectorRef
    ) {}

    public ngOnInit(): void {
        this.metaInfo$ = this.overviewService.metaInfo$;
    }

    private initDemoComponents(): void {
        const demoComponentsMetaInfo = this.overviewService.metaInfo.demoComponents;

        if (this.demoTemplates && demoComponentsMetaInfo) {
            demoComponentsMetaInfo.forEach((metaInfo, metaInfoIndex) => {
                const demoTemplates = this.demoTemplates.toArray();
                const componentFactory = this.componentFactoryResolver.resolveComponentFactory(metaInfo.component);

                demoTemplates[metaInfoIndex]?.clear();
                demoTemplates[metaInfoIndex]?.createComponent(componentFactory);
            });

            this.changeDetector.detectChanges();
        }
    }
}
