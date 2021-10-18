import { ButtonEnum, NumberEnum } from '../enums';
import { NumberButton } from './number-button';

export class ButtonOne extends NumberButton {
    public static type = ButtonEnum.One;

    public label = NumberEnum.One;
}
