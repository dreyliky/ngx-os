import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { IdGenerator } from '../../helpers';

type textboxType = 'text' | 'number' | 'email' | 'password' | 'hidden';

@Component({
    selector: 'os-text-box',
    templateUrl: './text-box.component.html',
    styleUrls: ['./text-box.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextBoxComponent implements OnInit {

    @Input()
    public type: textboxType = 'text';

    @Input()
    public placeholder: string;

    @Input()
    public label: string;

    @Input()
    public name: string;

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
            this._id = IdGenerator.generate(`os-text-box`);
        }
    }

}
