import { ButtonEnum, NumberEnum } from '../enums';
import { NumberButton } from './number-button';

export class ButtonThree extends NumberButton {
    public static type = ButtonEnum.Three;

    public label = NumberEnum.Three;
}
