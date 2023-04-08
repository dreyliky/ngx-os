import { ButtonGroupEnum } from '../enums';
import { BaseButton } from './base-button';

export class ButtonClear extends BaseButton {
    public override readonly group = ButtonGroupEnum.Action;

    public label = 'C';

    public onClick(): void {
        this.output.clear();
    }
}
