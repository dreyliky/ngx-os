import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OsBaseComponent } from '@lib-core';

@Component({
    selector: 'os-header',
    templateUrl: './header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent extends OsBaseComponent {
    @Input()
    public set size(newSize: number) {
        this.validateSize(newSize);

        const currentSizeClassName = `${this.baseHeaderClassName}-${this._size}`;
        const newSizeClassName = `${this.baseHeaderClassName}-${newSize}`;
        this._size = newSize;

        this.hostClasslistManager.remove(currentSizeClassName);
        this.hostClasslistManager.add(newSizeClassName);
    }

    public get size(): number {
        return this._size;
    }

    private _size: number = 1;

    private readonly baseHeaderClassName = 'os-header';

    private validateSize(value: number): void {
        if (typeof(value) !== 'number') {
            throw new Error('os-header size param must be a number!');
        }

        if (value < 1 || value > 6) {
            throw new Error('os-header size param can\'t be less than 1 and more than 6!');
        }
    }
}
