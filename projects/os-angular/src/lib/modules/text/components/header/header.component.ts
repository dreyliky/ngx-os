import { ChangeDetectionStrategy, Component, HostBinding, HostListener, Input } from '@angular/core';
import { OsBaseComponent } from 'os-angular/core';

@Component({
    selector: 'os-header',
    templateUrl: './header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent extends OsBaseComponent {
    @Input()
    public set size(value: number) {
        this.validateSize(value);

        this._size = this.getValidSize(value);
    }

    public get size(): number {
        return this._size;
    }

    @HostBinding('class')
    public get hostClass(): string {
        const additionalClass = this.styleClass ?? '';

        return `os-element os-header-${this.size} ${additionalClass}`;
    }

    @HostBinding('style')
    public get hostStyle(): object {
        return this.style;
    }

    @HostBinding('id')
    public get hostId(): string {
        return this.id;
    }

    private _size: number = 1;

    constructor() {
        super();
    }

    @HostListener('click', ['$event'])
    public onClick(event: PointerEvent): void {
        this.osClick.emit(event);
    }

    @HostListener('dblclick', ['$event'])
    public onDblClick(event: MouseEvent): void {
        this.osDblclick.emit(event);
    }

    @HostListener('mousedown', ['$event'])
    public onMousedown(event: MouseEvent): void {
        this.osMousedown.emit(event);
    }

    @HostListener('mousemove', ['$event'])
    public onMousemove(event: MouseEvent): void {
        this.osMousemove.emit(event);
    }

    @HostListener('mouseout', ['$event'])
    public onMouseout(event: MouseEvent): void {
        this.osMouseout.emit(event);
    }

    @HostListener('mouseover', ['$event'])
    public onMouseover(event: MouseEvent): void {
        this.osMouseover.emit(event);
    }

    @HostListener('mouseup', ['$event'])
    public onMouseup(event: MouseEvent): void {
        this.osMouseup.emit(event);
    }

    @HostListener('wheel', ['$event'])
    public onWheel(event: WheelEvent): void {
        this.osWheel.emit(event);
    }

    private getValidSize(value: number): number {
        if (value < 1 || typeof(value) !== 'number') {
            return 1;
        } else if (value > 6) {
            return 6;
        }

        return value;
    }

    private validateSize(value: number): void {
        if (typeof(value) !== 'number') {
            console.warn('os-header size param must be a number!');
        }

        if (value < 1 || value > 6) {
            console.warn('os-header size param can\'t be less than 1 and more than 6!');
        }
    }
}
