import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { OsBaseComponent } from '@lib-core';

@Component({
    selector: 'os-title-bar',
    templateUrl: './title-bar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleBarComponent extends OsBaseComponent implements OnInit {
    @Output()
    public osMinimizeButtonClick: EventEmitter<MouseEvent> = new EventEmitter();

    @Output()
    public osMaximizeButtonClick: EventEmitter<MouseEvent> = new EventEmitter();

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
