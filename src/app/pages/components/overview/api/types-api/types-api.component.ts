import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DocTypealias } from '@Features/doc';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OverviewService } from '../../overview.service';

@Component({
    selector: 'types-api',
    templateUrl: './types-api.component.html',
    styleUrls: ['./types-api.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TypesApiComponent implements OnInit {
    public docTypes$: Observable<DocTypealias[]>;

    constructor(
        private readonly overviewService: OverviewService
    ) {}

    public ngOnInit(): void {
        this.initDocTypesObservable();
    }

    private initDocTypesObservable(): void {
        this.docTypes$ = this.overviewService.metaInfo$
            .pipe(
                map(() => this.overviewService.docTypes)
            );
    }
}
