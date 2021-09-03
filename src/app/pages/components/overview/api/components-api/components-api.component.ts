import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DocComponent } from '@Features/doc';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OverviewService } from '../../overview.service';

@Component({
    selector: 'components-api',
    templateUrl: './components-api.component.html',
    styleUrls: ['./components-api.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentsApiComponent implements OnInit {
    public docComponents$: Observable<DocComponent[]>;

    constructor(
        private readonly overviewService: OverviewService
    ) {}

    public ngOnInit(): void {
        this.initDocComponentsObservable();
    }

    private initDocComponentsObservable(): void {
        this.docComponents$ = this.overviewService.metaInfo$
            .pipe(
                map(() => this.overviewService.docComponents)
            );
    }
}
