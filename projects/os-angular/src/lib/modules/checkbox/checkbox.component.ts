import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { IdGenerator } from '../../helpers';

@Component({
    selector: 'os-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxComponent implements OnInit {

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

    constructor () {}

    public ngOnInit (): void {
        if (!this._id) {
            this._id = IdGenerator.generate(`os-checkbox`);
        }
    }

}
