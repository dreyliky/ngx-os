import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit } from '@angular/core';
import { OsBaseComponent } from '@lib-core';

@Component({
    selector: 'os-header',
    templateUrl: './header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent extends OsBaseComponent implements OnInit {
    @Input()
    public set size(newSize: number) {
        this.validateSize(newSize);

        this._size = newSize;
    }

    public get size(): number {
        return this._size;
    }

    public get hostClass(): string {
        return `${this.classListManager.getAsString()} os-header-${this.size}`;
    }

    private readonly minSize: number = 1;
    private readonly maxSize: number = 6;

    private _size: number = this.minSize;

    constructor(
        private readonly hostElementRef: ElementRef<HTMLElement>
    ) {
        super();
    }

    public ngOnInit(): void {
        this.classListManager.add('os-header');
        this.initElementEventObservers(this.hostElementRef.nativeElement);
    }

    private validateSize(value: number): void {
        if (typeof(value) !== 'number') {
            throw new Error('os-header size param must be a number!');
        }

        if (value < this.minSize || value > this.maxSize) {
            throw new Error(`os-header size param can't be less than ${this.minSize} and more than ${this.maxSize}!`);
        }
    }
}
