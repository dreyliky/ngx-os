import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
    selector: 'os-radio-button',
    templateUrl: './radio-button.component.html',
    styleUrls: ['./radio-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioButtonComponent implements OnInit {

    @Input()
    public label: string;

    @Input()
    public name: string;

    @Input()
    public checked: boolean;

    @Input()
    public disabled: boolean;

    @Input()
    public set id (value: string) {
        this._id = value;
    }

    public get id (): string {
        return this._id;
    }

    private _id: string;

    public ngOnInit (): void {
        if (!this._id) {
            this.generateId();
        }
    }

    private generateId (): void {
        this.id = `os-radiobutton-${Math.random()}`;
    }

}
