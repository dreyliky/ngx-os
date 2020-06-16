import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

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
            this.generateId();
        }
    }

    private generateId (): void {
        this.id = `win-checkbox-${Math.random()}`;
    }

}
