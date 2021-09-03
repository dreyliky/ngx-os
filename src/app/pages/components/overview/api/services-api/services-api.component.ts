import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DocInjectable } from '@Features/doc';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OverviewService } from '../../overview.service';

@Component({
    selector: 'services-api',
    templateUrl: './services-api.component.html',
    styleUrls: ['./services-api.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServicesApiComponent implements OnInit {
    public docServices$: Observable<DocInjectable[]>;

    constructor(
        private readonly overviewService: OverviewService
    ) {}

    public ngOnInit(): void {
        this.initDocServicesObservable();
    }

    private initDocServicesObservable(): void {
        this.docServices$ = this.overviewService.metaInfo$
            .pipe(
                map(() => this.overviewService.docServices)
            );
    }
}
