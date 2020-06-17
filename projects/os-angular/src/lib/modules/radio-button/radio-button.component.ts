import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { IdGenerator } from '../../helpers';

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
            this._id = IdGenerator.generate(`os-radio-button`);
        }
    }

}
