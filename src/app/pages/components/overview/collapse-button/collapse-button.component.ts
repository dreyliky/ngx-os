import {
    ChangeDetectionStrategy, Component,
    EventEmitter, Input, OnInit, Output
} from '@angular/core';

@Component({
    selector: 'demo-collapse-button',
    templateUrl: './collapse-button.component.html',
    styleUrls: ['./collapse-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollapseButtonComponent implements OnInit {

    @Input()
    public isCollapsed: boolean = false;

    @Output()
    public click = new EventEmitter<MouseEvent>();

    constructor() {}

    public ngOnInit(): void {}

    public onCollapseButtonClick(): void {
        this.isCollapsed = !this.isCollapsed;
    }

}
