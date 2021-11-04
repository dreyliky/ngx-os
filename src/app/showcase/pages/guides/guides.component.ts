import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRouteEnum } from '@core/enums';
import { GuideDocumentationEnum } from '@features/documentation';
import { UrlParamEnum } from './url-param.enum';

@Component({
    selector: 'showcase-guides',
    templateUrl: './guides.component.html',
    styleUrls: ['./guides.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuidesComponent implements OnInit {
    public selectedGuideId: GuideDocumentationEnum;

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly router: Router
    ) {}

    public ngOnInit(): void {
        this.initSelectedGuideId();
    }

    public onGuideSelected(id: GuideDocumentationEnum): void {
        this.selectedGuideId = id;

        this.router.navigateByUrl(`/${AppRouteEnum.Guides}/${id}`);
    }

    public onContentLoadError(): void {
        this.initDefaultSelectedGuideId();
        this.router.navigateByUrl(`/${AppRouteEnum.Guides}`);
    }

    private initSelectedGuideId(): void {
        const routeGuideId = this.activatedRoute.snapshot.params[UrlParamEnum.GuideId];

        if (routeGuideId) {
            this.selectedGuideId = routeGuideId;
        } else {
            this.initDefaultSelectedGuideId();
        }
    }

    private initDefaultSelectedGuideId(): void {
        this.selectedGuideId = GuideDocumentationEnum.GetStarted;
    }
}
