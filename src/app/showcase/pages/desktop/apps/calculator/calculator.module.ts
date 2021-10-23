import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { CalculatorAppComponent } from './calculator.component';
import { ButtonsPanelComponent, OutputPanelComponent } from './components';

@NgModule({
    declarations: [
        CalculatorAppComponent,
        ButtonsPanelComponent,
        OutputPanelComponent
    ],
    imports: [
        SharedModule
    ]
})
export class CalculatorModule {}
