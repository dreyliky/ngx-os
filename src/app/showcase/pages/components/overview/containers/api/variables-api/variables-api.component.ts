import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DocVariable } from '@features/documentation';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OverviewService } from '../../../overview.service';

@Component({
    selector: 'variables-api',
    templateUrl: './variables-api.component.html',
    styleUrls: ['./variables-api.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VariablesApiComponent implements OnInit {
    public docVariables$: Observable<DocVariable[]>;

    constructor(
        private readonly overviewService: OverviewService
    ) {}

    public ngOnInit(): void {
        this.initDocTypesObservable();
    }

    private initDocTypesObservable(): void {
        this.docVariables$ = this.overviewService.metaInfo$
            .pipe(
                map(() => this.overviewService.docVariables)
            );
    }
}
