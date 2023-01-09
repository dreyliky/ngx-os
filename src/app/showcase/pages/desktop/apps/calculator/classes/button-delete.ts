import { ButtonGroupEnum } from '../enums';
import { BaseButton } from './base-button';

export class ButtonDelete extends BaseButton {
    public override readonly group = ButtonGroupEnum.Action;

    public label = '<-';

    public onClick(): void {
        if (this.output.data.length > 1) {
            this.output.deleteLastSymbol();
        } else {
            this.output.clear();
        }
    }
}
