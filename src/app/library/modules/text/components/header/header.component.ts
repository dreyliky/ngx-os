import {
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    Input,
    ViewEncapsulation
} from '@angular/core';
import { ɵOsBaseViewComponent } from '../../../../core';

@Component({
    selector: 'os-header',
    template: '<ng-content></ng-content>',
    host: {
        'class': 'os-header'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent extends ɵOsBaseViewComponent {
    /** Header size from 1 to 6 (like `<h1>` - `<h6>`) */
    @Input()
    public set size(newSize: number) {
        this.validateSize(newSize);

        this._size = newSize;
    }

    /** Header size from 1 to 6 (like `<h1>` - `<h6>`) */
    public get size(): number {
        return this._size;
    }

    /** @internal */
    @HostBinding('class')
    public get _hostHeaderSizeClass(): string {
        return `os-header-${this.size}`;
    }

    private readonly minSize: number = 1;
    private readonly maxSize: number = 6;

    private _size: number = this.minSize;

    private validateSize(value: number): void {
        if (typeof(value) !== 'number') {
            throw new Error('os-header size param must be a number!');
        }

        if (value < this.minSize || value > this.maxSize) {
            throw new Error(
                `os-header size param can't be less than ` +
                `${this.minSize} and more than ${this.maxSize}!`
            );
        }
    }
}
