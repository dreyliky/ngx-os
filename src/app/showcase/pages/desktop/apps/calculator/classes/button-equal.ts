import { ButtonEnum, ButtonGroupEnum } from '../enums';
import { CalculationService } from '../services';
import { BaseButton } from './base-button';

export class ButtonEqual extends BaseButton {
    public static type = ButtonEnum.Equal;
    public static group = ButtonGroupEnum.Operation;

    public label = '=';

    private calculation: CalculationService;

    public onInit(): void {
        super.onInit();

        this.calculation = this.injector.get(CalculationService);
    }

    public onClick(): void {
        const result = this.calculation.process(this.output.data);

        this.output.update(result);
    }
}
