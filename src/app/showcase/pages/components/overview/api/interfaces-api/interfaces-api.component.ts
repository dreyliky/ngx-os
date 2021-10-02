import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DocInterface } from '@Features/documentation';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OverviewService } from '../../overview.service';

@Component({
    selector: 'interfaces-api',
    templateUrl: './interfaces-api.component.html',
    styleUrls: ['./interfaces-api.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InterfacesApiComponent implements OnInit {
    public docInterfaces$: Observable<DocInterface[]>;

    constructor(
        private readonly overviewService: OverviewService
    ) {}

    public ngOnInit(): void {
        this.initDocInterfacesObservable();
    }

    private initDocInterfacesObservable(): void {
        this.docInterfaces$ = this.overviewService.metaInfo$
            .pipe(
                map(() => this.overviewService.docInterfaces)
            );
    }
}
