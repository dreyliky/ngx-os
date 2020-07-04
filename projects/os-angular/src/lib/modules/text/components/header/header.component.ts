import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { OsBaseComponent } from 'os-angular/core';

@Component({
    selector: 'os-header',
    templateUrl: './header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent extends OsBaseComponent implements OnInit {

    @Input()
    public set size (value: number) {
        this.validateSize(value);

        this._size = this.getValidSize(value);
    }

    public get size (): number {
        return this._size;
    }

    private _size: number = 1;

    constructor () {
        super({
            elementName: 'os-header'
        });
    }

    public ngOnInit (): void {}

    private getValidSize (value: number): number {
        if (value < 1 || typeof(value) !== 'number') {
            return 1;
        } else if (value > 6) {
            return 6;
        }

        return value;
    }

    private validateSize (value: number): void {
        if (typeof(value) !== 'number') {
            console.warn('os-header size param must be a number!');
        }

        if (value < 1 || value > 6) {
            console.warn('os-header size param can\'t be less than 1 and more than 6!');
        }
    }

}
