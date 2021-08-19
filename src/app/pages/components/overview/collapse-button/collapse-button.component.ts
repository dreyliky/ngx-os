import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'demo-collapse-button',
    templateUrl: './collapse-button.component.html',
    styleUrls: ['./collapse-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollapseButtonComponent {
    @Input()
    public isCollapsed: boolean = false;

    @Output()
    public pressed = new EventEmitter<MouseEvent>();

    public onCollapseButtonClick(): void {
        this.isCollapsed = !this.isCollapsed;
    }
}
