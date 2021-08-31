import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentMetaInfo, ComponentMetaInfoMap, ComponentType } from '@Features/doc';
import { Subscription } from 'rxjs';

@Component({
    selector: 'demo-component-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverviewComponent implements OnInit, OnDestroy {
    public metaInfo: ComponentMetaInfo;

    private routeParamsSubscription: Subscription;

    constructor(
        private readonly changeDetector: ChangeDetectorRef,
        private readonly activatedRoute: ActivatedRoute
    ) {}

    public ngOnInit(): void {
        this.initRouteParamsObserver();
    }

    public ngOnDestroy(): void {
        this.routeParamsSubscription?.unsubscribe();
    }

    private initMetaInfo(): void {
        const componentType: ComponentType = this.activatedRoute.snapshot.params.componentType;

        this.metaInfo = ComponentMetaInfoMap.get(componentType);
    }

    private initRouteParamsObserver(): void {
        this.routeParamsSubscription = this.activatedRoute.params
            .subscribe(() => {
                this.initMetaInfo();
                this.changeDetector.detectChanges();
            });
    }
}
