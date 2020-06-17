import { Component, OnInit, ChangeDetectionStrategy, TemplateRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { OsBaseComponent } from 'projects/os-angular/src/lib/core';

@Component({
    selector: 'os-tab',
    templateUrl: './tab.component.html',
    styleUrls: ['./tab.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabComponent extends OsBaseComponent implements OnInit {

    @Input()
    public selected: boolean;

    @Input()
    public label: string;

    @Output()
    public OnTabButtonClick = new EventEmitter<MouseEvent>();

    @ViewChild('TabButtonTemplate', { static: true })
    public tabButtonTemplate: TemplateRef<HTMLButtonElement>;

    @ViewChild('TabContentTemplate', { static: true })
    public tabContentTemplate: TemplateRef<any>;

    constructor () {
        super({
            elementName: 'os-tab'
        });
    }

    public ngOnInit (): void {
        super.ngOnInit();
    }

}
