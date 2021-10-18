import { ButtonGroupEnum } from '../enums';
import { BaseButton } from './base-button';

export abstract class NumberButton extends BaseButton {
    public static group = ButtonGroupEnum.Number;

    public onClick(): void {
        const blocks = this.output.splitToBlocks();
        const lastBlock = blocks[blocks.length - 1];
        const lastSymbol = this.output.getLastSymbol();

        if (lastBlock.length === 1 && lastSymbol === '0') {
            this.output.replaceLastSymbol(this.label);
        } else {
            this.output.push(this.label);
        }
    }
}
