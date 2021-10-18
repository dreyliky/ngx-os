import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'calculator-app',
    templateUrl: './calculator.component.html',
    styleUrls: ['./calculator.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalculatorAppComponent {}
