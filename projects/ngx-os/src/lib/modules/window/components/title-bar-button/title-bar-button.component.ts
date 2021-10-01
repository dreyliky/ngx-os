import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, OnInit } from '@angular/core';
import { CommonCssClassEnum as CommonCssClass, OsBaseButtonComponent } from '@lib-core';

@Component({
    selector: 'os-title-bar-button',
    templateUrl: './title-bar-button.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleBarButtonComponent extends OsBaseButtonComponent implements OnInit {
    /** Link to the icon */
    @Input()
    public readonly iconUrl: string;

    /** Label for the button */
    @Input()
    public readonly label: string;

    /** Styles for the icon */
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

    @HostBinding(`class.${CommonCssClass.HasLabel}`)
    public get _isHasLabel(): boolean {
        return !!this.label;
    }

    @HostBinding(`class.${CommonCssClass.HasIcon}`)
    public get _isHasIcon(): boolean {
        return (!!this.ariaLabel || !!this.iconUrl);
    }

    constructor(
        private readonly hostElementRef: ElementRef<HTMLElement>
    ) {
        super();
    }

    public ngOnInit(): void {
        this.classListManager.add('os-title-bar-button');
        this.initElementEventObservers(this.hostElementRef.nativeElement);
    }
}
