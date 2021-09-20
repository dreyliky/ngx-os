import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { OsBaseComponent } from '@lib-core';

@Component({
    selector: 'os-title-bar',
    templateUrl: './title-bar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleBarComponent extends OsBaseComponent implements OnInit {
    /** Fires when the "hide" button click */
    @Output()
    public osMinimizeButtonClick: EventEmitter<MouseEvent> = new EventEmitter();

    /** Fires when the "toggle full-screen" button click */
    @Output()
    public osMaximizeButtonClick: EventEmitter<MouseEvent> = new EventEmitter();

    /** Fires when the "close" button click */
    @Output()
    public osCloseButtonClick: EventEmitter<MouseEvent> = new EventEmitter();

    constructor(
        private readonly hostElementRef: ElementRef<HTMLElement>
    ) {
        super();
    }

    public ngOnInit(): void {
        this.classlistManager.add('os-title-bar');
        this.initElementEventObservers(this.hostElementRef.nativeElement);
    }
}
