import { AppMetadata } from '../../../features/exec';
import { CalculatorAppComponent } from '../calculator.component';

export const CALCULATOR_APP: AppMetadata = {
    component: CalculatorAppComponent,
    shortcutParams: {
        label: 'Calculator',
        iconUrl: 'assets/showcase/icons/calculator.png'
    },
    windowParams: {
        title: 'Calculator',
        iconUrl: 'assets/showcase/icons/calculator.png',
        isAllowFullscreen: false,
        allowedResizers: [],
        minWidth: 250,
        minHeight: 350
    }
};
