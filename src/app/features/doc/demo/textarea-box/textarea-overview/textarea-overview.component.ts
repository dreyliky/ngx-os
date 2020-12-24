import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'demo-textarea-overview',
    templateUrl: './textarea-overview.component.html',
    styleUrls: ['./textarea-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextareaOverviewComponent implements OnInit {

    constructor() {}

    public ngOnInit(): void {}

}
