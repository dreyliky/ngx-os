import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { CalculatorAppComponent } from './calculator.component';
import { ButtonsPanelComponent, OutputPanelComponent } from './components';
import { CalculationService, OutputService } from './services';

@NgModule({
    declarations: [
        CalculatorAppComponent,
        ButtonsPanelComponent,
        OutputPanelComponent
    ],
    imports: [
        SharedModule
    ],
    providers: [
        OutputService,
        CalculationService
    ]
})
export class CalculatorModule {}
