import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'demo-subheader',
    templateUrl: './subheader.component.html',
    styleUrls: ['./subheader.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubheaderComponent implements OnInit {

    constructor() {}

    public ngOnInit(): void {}

}
