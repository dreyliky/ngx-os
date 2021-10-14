import {
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    TemplateRef,
    ViewChild
} from '@angular/core';
import { OsBaseComponent } from '../../../../core';

/**
 * ## Templates
 * `#tabLabel`: Template for the label of the tab button.
 *
 * @example
 * ```html
 * <ng-template #tabLabel>
 *    <!-- Your label content here -->
 * </ng-template>
 * ```
 *
 * `#tabContent`: Template for the content lazy loading.
 *
 * @example
 * ```html
 * <ng-template #tabContent>
 *    <!-- Your tab content here -->
 * </ng-template>
 * ```
 */
@Component({
    selector: 'os-tab',
    templateUrl: './tab.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabComponent extends OsBaseComponent implements OnInit {
    /** Label text of the tab */
    @Input()
    public label: string;

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
    @ContentChild('tabLabel')
    public readonly _tabLabelTemplate: TemplateRef<HTMLElement>;

    /** @internal */
    @ContentChild('tabContent')
    public readonly _tabContentTemplate: TemplateRef<HTMLElement>;

    /** @internal */
    @ViewChild('tabButtonInternalTemplate', { static: true })
    public _tabButtonInternalTemplate: TemplateRef<HTMLButtonElement>;

    /** @internal */
    @ViewChild('tabContentInternalTemplate', { static: true })
    public _tabContentInternalTemplate: TemplateRef<any>;

    /** @internal */
    public _isSelected: boolean = false;

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

    /** @internal */
    public setSelectionState(state: boolean): void {
        this._isSelected = state;
    }
}
