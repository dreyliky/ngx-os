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
import { OsBaseComponent } from '@lib-core';

@Component({
    selector: 'os-tab',
    templateUrl: './tab.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabComponent extends OsBaseComponent implements OnInit {
    @Input()
    public label: string;

    @Input()
    public isSelected: boolean = false;

    @Input()
    public isDisabled: boolean = false;

    @Input()
    public tabButtonStyle: string;

    @Input()
    public tabButtonStyleClass: string;

    @Output()
    public osTabButtonClick = new EventEmitter<MouseEvent>();

    @ViewChild('tabButtonTemplate', { static: true })
    public tabButtonTemplate: TemplateRef<HTMLButtonElement>;

    @ViewChild('tabContentTemplate', { static: true })
    public tabContentTemplate: TemplateRef<any>;

    constructor(
        private readonly hostElementRef: ElementRef<HTMLElement>
    ) {
        super();
    }

    public ngOnInit(): void {
        this.classListManager.add('os-tab');
        this.initElementEventObservers(this.hostElementRef.nativeElement);
    }

    public onTabButtonClick(event: MouseEvent): void {
        if (!this.isDisabled) {
            this.osTabButtonClick.emit(event);
        }
    }
}
