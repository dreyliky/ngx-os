import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { OverviewService } from '../../overview.service';

@Component({
    selector: 'showcase-api',
    templateUrl: './api.component.html',
    styleUrls: ['./api.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApiComponent implements OnInit {
    constructor(
        private readonly titleService: Title,
        private readonly overviewService: OverviewService
    ) {}

    public ngOnInit(): void {
        this.titleService.setTitle(`ngx-os - ${this.overviewService.metaInfo.name} API`);
    }
}
