import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { OsBaseFieldComponent } from '@lib-core';
import { EmailBoxChangeEvent } from '../../interfaces';

@Component({
    selector: 'os-email-box',
    templateUrl: './email-box.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => EmailBoxComponent),
            multi: true
        }
    ]
})
export class EmailBoxComponent extends OsBaseFieldComponent implements OnInit, AfterViewInit {
    @Input()
    public isAutocompleteEnabled: boolean = false;

    @Output()
    public osChange: EventEmitter<EmailBoxChangeEvent> = new EventEmitter();

    @ViewChild('emailbox')
    private readonly fieldElementRef: ElementRef<HTMLInputElement>;

    public get _inputAutocompleteAttrValue(): string {
        return (this.isAutocompleteEnabled) ? '' : 'off';
    }

    constructor(
        private readonly changeDetector: ChangeDetectorRef
    ) {
        super();
    }

    public ngOnInit(): void {
        this.classlistManager.add('os-email-box');
    }

    public ngAfterViewInit(): void {
        this.initElementEventObservers(this.fieldElementRef.nativeElement);
    }

    public writeValue(value: string): void {
        this.value = value;

        this.changeDetector.detectChanges();
    }

    protected onFieldValueChange(originalEvent: Event): void {
        const targetElement = originalEvent.target as HTMLInputElement;
        const value = targetElement.value;

        this.onChange?.(value);
        this.osChange.emit({ originalEvent, value });
        this.changeDetector.markForCheck();
    }
}
