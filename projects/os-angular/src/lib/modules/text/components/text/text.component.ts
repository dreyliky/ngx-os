import { Component, HostBinding, HostListener } from '@angular/core';
import { OsBaseComponent } from 'os-angular/core';

@Component({
    selector: 'os-text',
    templateUrl: './text.component.html'
})
export class TextComponent extends OsBaseComponent {
    @HostBinding('class')
    public get hostClass(): string {
        const additionalClass = this.styleClass ?? '';

        return `os-element ${additionalClass}`;
    }

    @HostBinding('style')
    public get hostStyle(): object {
        return this.style;
    }

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
}
