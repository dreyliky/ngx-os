import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
    selector: 'win-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxComponent implements OnInit {

    @Input()
    public label: string;

    public id: string;

    constructor () {}

    public ngOnInit (): void {
        this.generateId();
    }

    private generateId (): void {
        this.id = `win-checkbox-${Math.random()}`;
    }

}
