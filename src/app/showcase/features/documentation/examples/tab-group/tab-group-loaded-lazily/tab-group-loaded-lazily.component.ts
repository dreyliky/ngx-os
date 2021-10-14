import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'showcase-tab-group-loaded-lazily',
    templateUrl: './tab-group-loaded-lazily.component.html',
    styleUrls: ['./tab-group-loaded-lazily.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabGroupLoadedLazilyComponent {
    public readonly tabLoadTimes: Date[] = [];

    public getTimeLoaded(index: number): Date {
        if (!this.tabLoadTimes[index]) {
            this.tabLoadTimes[index] = new Date();
        }

        return this.tabLoadTimes[index];
    }
}
