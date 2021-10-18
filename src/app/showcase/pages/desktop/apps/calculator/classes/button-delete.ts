import { ButtonEnum, ButtonGroupEnum } from '../enums';
import { BaseButton } from './base-button';

export class ButtonDelete extends BaseButton {
    public static type = ButtonEnum.Delete;
    public static group = ButtonGroupEnum.Operation;

    public label = '<-';

    public onClick(): void {

        if (this.output.data.length > 1) {
            this.output.deleteLastSymbol();
        } else {
            this.output.clear();
        }
    }
}
