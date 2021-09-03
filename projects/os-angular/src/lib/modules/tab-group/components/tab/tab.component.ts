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

    constructor(
        private readonly hostElementRef: ElementRef<HTMLElement>
    ) {
        super();
    }

    public ngOnInit(): void {
        this.initElementEventObservers(this.hostElementRef.nativeElement);
    }
}
