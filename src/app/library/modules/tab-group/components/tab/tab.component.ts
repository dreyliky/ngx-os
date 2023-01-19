import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    EventEmitter,
    Input,
    Output,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { ɵOsBaseViewComponent } from '../../../../core';
import { TabContentDirective, TabLabelDirective } from '../../directives';

/**
 * ## Templates
 * `osTabLabel`: Template for the label of the tab button.
 *
 * ```html
 * <os-tab>
 *     <ng-template osTabLabel>
 *         <!-- Your label content here -->
 *     </ng-template>
 * </os-tab>
 * ```
 *
 * `osTabContent`: Template for the content lazy loading.
 *
 * ```html
 * <os-tab>
 *     <ng-template osTabContent>
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
    exportAs: 'osTab',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabComponent extends ɵOsBaseViewComponent {
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
    public osTabSelected: EventEmitter<MouseEvent> = new EventEmitter();

    /** @internal */
    @ContentChild(TabLabelDirective, { read: TemplateRef })
    public readonly _tabLabelTemplate: TemplateRef<HTMLElement>;

    /** @internal */
    @ContentChild(TabContentDirective, { read: TemplateRef })
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
        private readonly changeDetector: ChangeDetectorRef
    ) {
        super();
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
