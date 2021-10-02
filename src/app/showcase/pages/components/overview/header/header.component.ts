import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ComponentMetaInfo } from '@features/documentation';
import { Observable } from 'rxjs';
import { OverviewService } from '../overview.service';

@Component({
    selector: 'demo-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
    public metaInfo$: Observable<ComponentMetaInfo>;

    constructor(
        private readonly overviewService: OverviewService
    ) {}

    public ngOnInit(): void {
        this.metaInfo$ = this.overviewService.metaInfo$;
    }
}
