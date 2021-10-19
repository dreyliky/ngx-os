import { ButtonGroupEnum } from '../enums';
import { BaseButton } from './base-button';

export class ButtonClear extends BaseButton {
    public readonly group = ButtonGroupEnum.Action;

    public label = 'C';

    public onClick(): void {
        this.output.clear();
    }
}
