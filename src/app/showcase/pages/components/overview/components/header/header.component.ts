import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ComponentMetaInfo } from '@features/documentation';
import { Observable } from 'rxjs';
import { OverviewService } from '../../overview.service';

@Component({
    selector: 'showcase-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
    public metaInfo$: Observable<ComponentMetaInfo>;

    public get sourceCodeLink(): string {
        const baseLink = 'https://github.com/dreyliky/ngx-os/tree/master/src/app/library/modules/';

        return `${baseLink}${this.overviewService.metaInfo.type}`;
    }

    constructor(
        private readonly overviewService: OverviewService
    ) {}

    public ngOnInit(): void {
        this.metaInfo$ = this.overviewService.metaInfo$;
    }
}
