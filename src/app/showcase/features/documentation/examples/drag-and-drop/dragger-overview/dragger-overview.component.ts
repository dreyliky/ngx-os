import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'showcase-dragger-overview',
    templateUrl: './dragger-overview.component.html',
    styleUrls: ['./dragger-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DraggerOverviewComponent {
    public onTouchStart(event: Event): void {
        console.log('touchstart', event);
    }

    public onTouchMove(event: Event): void {
        console.log('touchmove', event);
    }

    public onTouchEnd(event: Event): void {
        console.log('touchend', event);
    }
}
