import { ButtonEnum, NumberEnum } from '../enums';
import { NumberButton } from './number-button';

export class ButtonNine extends NumberButton {
    public static type = ButtonEnum.Nine;

    public label = NumberEnum.Nine;
}
