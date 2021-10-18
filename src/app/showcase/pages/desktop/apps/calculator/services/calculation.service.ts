import { Injectable } from '@angular/core';

@Injectable()
export class CalculationService {
    public process(mathExpression: string): string {
        // FIXME: Replace to algorithm
        // eslint-disable-next-line no-eval
        return eval(mathExpression).toString();
    }
}
