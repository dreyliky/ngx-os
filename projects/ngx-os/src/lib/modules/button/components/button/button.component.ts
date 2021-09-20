import { ChangeDetectionStrategy, Component, ElementRef, OnInit } from '@angular/core';
import { OsBaseButtonComponent } from '@lib-core';

@Component({
    selector: 'os-button',
    templateUrl: './button.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent extends OsBaseButtonComponent implements OnInit {
    constructor(
        private readonly hostElementRef: ElementRef<HTMLElement>
    ) {
        super();
    }

    public ngOnInit(): void {
        this.classlistManager.add('os-button');
        this.initElementEventObservers(this.hostElementRef.nativeElement);
    }
}
