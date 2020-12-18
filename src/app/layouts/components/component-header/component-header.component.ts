import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'doc-component-header',
    templateUrl: './component-header.component.html',
    styleUrls: ['./component-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentHeaderComponent implements OnInit {

    constructor(
        private readonly router: Router
    ) {}

    public ngOnInit(): void {}

    public onBackButtonClick(): void {
        this.router.navigateByUrl(`/`);
    }

}
