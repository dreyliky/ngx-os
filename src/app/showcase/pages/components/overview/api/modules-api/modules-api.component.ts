import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DocModule } from '@Features/documentation';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OverviewService } from '../../overview.service';

@Component({
    selector: 'modules-api',
    templateUrl: './modules-api.component.html',
    styleUrls: ['./modules-api.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModulesApiComponent implements OnInit {
    public docModules$: Observable<DocModule[]>;

    constructor(
        private readonly overviewService: OverviewService
    ) {}

    public ngOnInit(): void {
        this.initDocModulesObservable();
    }

    private initDocModulesObservable(): void {
        this.docModules$ = this.overviewService.metaInfo$
            .pipe(
                map(() => this.overviewService.docModules)
            );
    }
}
