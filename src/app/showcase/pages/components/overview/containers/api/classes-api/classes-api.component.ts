import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DocClass } from '@features/documentation';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OverviewService } from '../../../overview.service';

@Component({
    selector: 'classes-api',
    templateUrl: './classes-api.component.html',
    styleUrls: ['./classes-api.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClassesApiComponent implements OnInit {
    public docClasses$: Observable<DocClass[]>;

    constructor(
        private readonly overviewService: OverviewService
    ) {}

    public ngOnInit(): void {
        this.initDocClassesObservable();
    }

    private initDocClassesObservable(): void {
        this.docClasses$ = this.overviewService.metaInfo$
            .pipe(
                map(() => this.overviewService.docClasses)
            );
    }
}
