import { ButtonEnum, ButtonGroupEnum } from '../enums';
import { BaseButton } from './base-button';

export class ButtonClear extends BaseButton {
    public static type = ButtonEnum.Clear;
    public static group = ButtonGroupEnum.Operation;

    public label = 'C';

    public onClick(): void {
        this.output.clear();
    }
}
