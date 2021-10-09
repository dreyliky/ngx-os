import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    TemplateRef,
    ViewChild
} from '@angular/core';
import { OsBaseComponent } from '../../../../core';

@Component({
    selector: 'os-tab',
    templateUrl: './tab.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabComponent extends OsBaseComponent implements OnInit {
    /** Label text of the tab */
    @Input()
    public label: string;

    /** Is tab selected? */
    @Input()
    public isSelected: boolean = false;

    /** Is tab disabled? */
    @Input()
    public isDisabled: boolean = false;

    /** Stylelist for the tab button */
    @Input()
    public tabButtonStyle: string;

    /** Classlist for the tab button */
    @Input()
    public tabButtonStyleClass: string;

    /** Fires when the tab button click */
    @Output()
    public osTabButtonClick = new EventEmitter<MouseEvent>();

    /** @internal */
    @ViewChild('tabButtonTemplate', { static: true })
    public _tabButtonTemplate: TemplateRef<HTMLButtonElement>;

    /** @internal */
    @ViewChild('tabContentTemplate', { static: true })
    public _tabContentTemplate: TemplateRef<any>;

    constructor(
        private readonly hostElementRef: ElementRef<HTMLElement>
    ) {
        super();
    }

    public ngOnInit(): void {
        this.classListManager.add('os-tab');
        this.initElementEventObservers(this.hostElementRef.nativeElement);
    }

    /** @internal */
    public onTabButtonClick(event: MouseEvent): void {
        if (!this.isDisabled) {
            this.osTabButtonClick.emit(event);
        }
    }
}
