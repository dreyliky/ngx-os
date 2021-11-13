import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'showcase-example-layout',
    templateUrl: './example.component.html',
    styleUrls: ['./example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleLayoutComponent {}
