import { inject } from '@angular/core';
import { ButtonGroupEnum } from '../enums';
import { CalculationService } from '../services';
import { BaseButton } from './base-button';

export class ButtonEqual extends BaseButton {
    public override readonly group = ButtonGroupEnum.Action;

    public label = '=';

    private calculation = inject(CalculationService);

    public onClick(): void {
        const result = this.calculation.process(this.output.data);

        this.output.update(result);
    }
}
