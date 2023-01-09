import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
    OnInit,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRouteEnum } from '@core/enums';
import {
    ComponentMetaInfoMap,
    DemoComponentMetaInfo,
    OsComponentEnum,
    OsComponentOverviewSectionEnum as ComponentSection
} from '@features/documentation';
import { RouteParam } from './route-param.enum';

@Component({
    selector: 'showcase-example',
    templateUrl: './example.component.html',
    styleUrls: ['./example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleComponent implements OnInit, AfterViewInit {
    public componentType: OsComponentEnum;
    public demoMetaInfo: DemoComponentMetaInfo;

    @ViewChild('exampleContainer', { read: ViewContainerRef })
    private readonly exampleContainer: ViewContainerRef;

    private exampleComponentName: string;

    constructor(
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute,
        private readonly componentFactoryResolver: ComponentFactoryResolver,
        private readonly changeDetector: ChangeDetectorRef
    ) {}

    public ngOnInit(): void {
        this.componentType = this.activatedRoute.snapshot.params[RouteParam.ComponentType];
        this.exampleComponentName = this.activatedRoute.snapshot.params[RouteParam.ExampleName];

        this.initExampleComponent();
    }

    public ngAfterViewInit(): void {
        const componentFactory = this.componentFactoryResolver
            .resolveComponentFactory(this.demoMetaInfo.component);

        this.exampleContainer.clear();
        this.exampleContainer.createComponent(componentFactory);
        this.changeDetector.detectChanges();
    }

    public onOpenAllExamplesButtonClick(): void {
        this.router.navigateByUrl(
            `/${AppRouteEnum.Components}/${this.componentType}/${ComponentSection.Examples}`
        );
    }

    private initExampleComponent(): void {
        const demoComponents = ComponentMetaInfoMap
            .get(this.componentType)
            .demoComponents;
        this.demoMetaInfo = demoComponents
            .find(({ componentName }) => componentName === this.exampleComponentName);
    }
}
