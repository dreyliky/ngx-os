import { Injectable, Injector } from '@angular/core';
import { ButtonEnum } from '../enums';
import { BaseButton } from './base-button';
import { ButtonClear } from './button-clear';
import { ButtonDelete } from './button-delete';
import { ButtonDivision } from './button-division';
import { ButtonEight } from './button-eight';
import { ButtonEqual } from './button-equal';
import { ButtonFive } from './button-five';
import { ButtonFour } from './button-four';
import { ButtonMinus } from './button-minus';
import { ButtonMultiply } from './button-multiply';
import { ButtonNine } from './button-nine';
import { ButtonOne } from './button-one';
import { ButtonPlus } from './button-plus';
import { ButtonSeven } from './button-seven';
import { ButtonSix } from './button-six';
import { ButtonThree } from './button-three';
import { ButtonTwo } from './button-two';
import { ButtonZero } from './button-zero';

@Injectable()
export class ButtonFactory {
    public readonly buttons = [
        ButtonZero,
        ButtonOne,
        ButtonTwo,
        ButtonThree,
        ButtonFour,
        ButtonFive,
        ButtonSix,
        ButtonSeven,
        ButtonEight,
        ButtonNine,
        ButtonClear,
        ButtonDelete,
        ButtonPlus,
        ButtonMinus,
        ButtonMultiply,
        ButtonDivision,
        ButtonEqual
    ];

    constructor(
        private readonly injector: Injector
    ) {}

    public create(type: ButtonEnum): BaseButton {
        const ButtonType = this.buttons
            .find((button) => button.type === type);

        return new ButtonType(this.injector);
    }
}
