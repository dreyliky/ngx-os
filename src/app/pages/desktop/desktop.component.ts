import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'doc-desktop-page',
    templateUrl: './desktop.component.html',
    styleUrls: ['./desktop.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DesktopComponent implements OnInit {

    constructor() {}

    public ngOnInit(): void {}

}
