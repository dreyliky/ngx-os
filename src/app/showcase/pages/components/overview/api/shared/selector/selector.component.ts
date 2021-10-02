import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'api-selector',
    templateUrl: './selector.component.html',
    styleUrls: ['./selector.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorComponent {
    @Input()
    public readonly name: string;

    public onSelectorTextboxClick(event: MouseEvent): void {
        const inputElement = event.target as HTMLInputElement;

        inputElement.select();
    }
}
