import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CalculationService, OutputService } from './services';

@Component({
    selector: 'calculator-app',
    templateUrl: './calculator.component.html',
    styleUrls: ['./calculator.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        OutputService,
        CalculationService
    ]
})
export class CalculatorAppComponent {}
