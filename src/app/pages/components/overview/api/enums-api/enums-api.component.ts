import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DocEnum } from '@Features/documentation';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OverviewService } from '../../overview.service';

@Component({
    selector: 'enums-api',
    templateUrl: './enums-api.component.html',
    styleUrls: ['./enums-api.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EnumsApiComponent implements OnInit {
    public docEnums$: Observable<DocEnum[]>;

    constructor(
        private readonly overviewService: OverviewService
    ) {}

    public ngOnInit(): void {
        this.initDocEnumsObservable();
    }

    private initDocEnumsObservable(): void {
        this.docEnums$ = this.overviewService.metaInfo$
            .pipe(
                map(() => this.overviewService.docEnums)
            );
    }
}
