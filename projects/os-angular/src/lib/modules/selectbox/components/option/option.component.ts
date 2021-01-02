import {
    ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TemplateRef, ViewChild
} from '@angular/core';
import { OsBaseComponent } from 'os-angular/core';

@Component({
    selector: 'os-option',
    templateUrl: './option.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionComponent<T> extends OsBaseComponent {

    @Input()
    public selected: boolean;

    @Input()
    public value: T;

    @Output()
    public osSelected = new EventEmitter<T>();

    @ViewChild('OptionTemplate', { static: true })
    public optionTemplate: TemplateRef<HTMLOptionElement>;

    constructor() {
        super();
    }

    public onOptionClick(event: MouseEvent): void {
        this.osClick.emit(event);
        this.osSelected.emit(this.value);
    }

}
