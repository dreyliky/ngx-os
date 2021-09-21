import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'demo-get-started',
    templateUrl: './get-started.component.html',
    styleUrls: ['./get-started.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GetStartedComponent implements OnInit {
    constructor(
        private readonly titleService: Title
    ) {}

    public ngOnInit(): void {
        this.titleService.setTitle('ngx-os - Get Started');
    }
}
