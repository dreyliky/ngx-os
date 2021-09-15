import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit } from '@angular/core';
import { OsBaseButtonComponent } from '@lib-core';

@Component({
    selector: 'os-title-bar-button',
    templateUrl: './title-bar-button.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleBarButtonComponent extends OsBaseButtonComponent implements OnInit {
    @Input()
    public readonly iconUrl: string;

    @Input()
    public readonly iconStyles: object;

    public get _styles(): object {
        return (!this.iconUrl) ? null : {
            backgroundImage: `url(${this.iconUrl})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '0px 0px',
            ...this.iconStyles
        };
    }

    constructor(
        private readonly hostElementRef: ElementRef<HTMLElement>
    ) {
        super();
    }

    public ngOnInit(): void {
        this.classlistManager.add('os-title-bar-button');
        this.initElementEventObservers(this.hostElementRef.nativeElement);
    }
}
