import { Component, ElementRef, OnInit } from '@angular/core';
import { OsBaseComponent } from '@lib-core';

@Component({
    selector: 'os-text',
    templateUrl: './text.component.html'
})
export class TextComponent extends OsBaseComponent implements OnInit {
    constructor(
        private readonly hostElementRef: ElementRef<HTMLElement>
    ) {
        super();
    }

    public ngOnInit(): void {
        this.classlistManager.add('os-text');
        this.initElementEventObservers(this.hostElementRef.nativeElement);
    }
}
