import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DocDirective } from '@features/documentation';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OverviewService } from '../../../overview.service';

@Component({
    selector: 'directives-api',
    templateUrl: './directives-api.component.html',
    styleUrls: ['./directives-api.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DirectivesApiComponent implements OnInit {
    public docDirectives$: Observable<DocDirective[]>;

    constructor(
        private readonly overviewService: OverviewService
    ) {}

    public ngOnInit(): void {
        this.initDocDirectivesObservable();
    }

    private initDocDirectivesObservable(): void {
        this.docDirectives$ = this.overviewService.metaInfo$
            .pipe(
                map(() => this.overviewService.docDirectives)
            );
    }
}
