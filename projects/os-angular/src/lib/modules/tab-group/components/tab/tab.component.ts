import { Component, ChangeDetectionStrategy, TemplateRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { OsBaseComponent } from 'os-angular/core';

@Component({
    selector: 'os-tab',
    templateUrl: './tab.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabComponent extends OsBaseComponent {

    @Input()
    public selected: boolean;

    @Input()
    public label: string;

    @Input()
    public tabButtonStyle: string;

    @Input()
    public tabButtonStyleClass: string;

    @Output()
    public osTabButtonClick = new EventEmitter<MouseEvent>();

    @ViewChild('TabButtonTemplate', { static: true })
    public tabButtonTemplate: TemplateRef<HTMLButtonElement>;

    @ViewChild('TabContentTemplate', { static: true })
    public tabContentTemplate: TemplateRef<any>;

    constructor() {
        super();
    }

}
