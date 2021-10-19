import { Injector } from '@angular/core';
import { ButtonGroupEnum, NumberEnum } from '../enums';
import { BaseButton } from './base-button';

export class ButtonNumber extends BaseButton {
    public readonly group = ButtonGroupEnum.Number;

    constructor(
        injector: Injector,
        public readonly label: NumberEnum
    ) {
        super(injector);
    }

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
