import {
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    EventEmitter,
    Injector,
    Input,
    Output,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { ɵOsBaseComponent } from '../../../../core';

/**
 * ## Templates
 * `#tabLabel`: Template for the label of the tab button.
 *
 * @example
 * ```html
 * <os-tab>
 *     <ng-template #tabLabel>
 *         <!-- Your label content here -->
 *     </ng-template>
 * </os-tab>
 * ```
 *
 * `#tabContent`: Template for the content lazy loading.
 *
 * @example
 * ```html
 * <os-tab>
 *     <ng-template #tabContent>
 *         <!-- Your tab content here -->
 *     </ng-template>
 * </os-tab>
 * ```
 */
@Component({
    selector: 'os-tab',
    templateUrl: './tab.component.html',
    host: {
        'class': 'os-tab'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabComponent extends ɵOsBaseComponent {
    /** Label text of the tab */
    @Input()
    public label: string;

    /** Is tab disabled? */
    @Input()
    public isDisabled: boolean = false;

    /** Stylelist for the tab button */
    @Input()
    public tabButtonStyle: object;

    /** Classlist for the tab button */
    @Input()
    public tabButtonStyleClass: string;

    /** Fires when the tab selected */
    @Output()
    public osTabSelected = new EventEmitter<MouseEvent>();

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
        injector: Injector
    ) {
        super(injector);
    }

    /** @internal */
    public _onTabButtonClick(event: MouseEvent): void {
        if (!this.isDisabled) {
            this.osTabSelected.emit(event);
        }
    }

    /** @internal */
    public _setSelectionState(state: boolean): void {
        this._isSelected = state;

        this.changeDetector.detectChanges();
    }
}
