import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
    selector: 'os-group-box',
    templateUrl: './group-box.component.html',
    styleUrls: ['./group-box.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupBoxComponent implements OnInit {

    @Input()
    public label: string;

    constructor () {}

    public ngOnInit (): void {}

}
