import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'showcase-selection-with-anything',
    templateUrl: './selection-with-anything.component.html',
    styleUrls: ['./selection-with-anything.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectionWithAnythingComponent {
    public isCustomElementSelected = false;
}
