import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'doc-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent implements OnInit {

    constructor() {}

    public ngOnInit(): void {}

}
