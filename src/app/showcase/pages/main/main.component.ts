import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'showcase-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {
    constructor(
        private readonly titleService: Title
    ) {}

    public ngOnInit(): void {
        this.titleService.setTitle(`ngx-os - Main Page`);
    }
}
