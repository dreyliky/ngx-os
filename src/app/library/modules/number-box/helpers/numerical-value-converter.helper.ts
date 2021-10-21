import { isNil } from '../../../core';
import { NumberBoxComponent } from '../components/number-box/number-box.component';

/** @internal */
export class NumericalValueConverter {
    constructor(
        private readonly context: NumberBoxComponent
    ) {}

    /** Convert value to numerical value by filtering excess symbols */
    public toRaw(value: string | number): string {
        return value.toString()
            .replace(this.getRegexpWithAllowedSymbols(), '')
            .replace(/(?<!^)-/g, '')
            .replace(/(\..*?)\..*/g, '$1');
    }

    /**
     * Convert value to valid numerical value,
     * based on the settings of the context component.
     **/
    public toValid(value: string | number): string {
        let result = this.toRaw(value);
        result = this.processBoundaries(result);
        result = this.processFractionDigits(result);

        return result;
    }

    private processBoundaries(value: string): string {
        let result = this.processMinBoundary(value);
        result = this.processMaxBoundary(result);

        return result;
    }

    private processMinBoundary(value: string): string {
        const result = +value;

        if (!isNil(this.context.min) && (result < this.context.min)) {
            return this.context.min.toString();
        }

        return result.toString();
    }

    private processMaxBoundary(value: string): string {
        const result = +value;

        if (!isNil(this.context.max) && (result > this.context.max)) {
            return this.context.max.toString();
        }

        return result.toString();
    }

    private processFractionDigits(value: string): string {
        let result = value;
        const dotIndex = result.indexOf('.');
        const digits = this.getFractionDigits(result, dotIndex);
        result = this.processMinFractionDigits(result, digits, dotIndex);
        result = this.processMaxFractionDigits(result, digits, dotIndex);

        return result;
    }

    private processMinFractionDigits(value: string, digits: string, dotIndex: number): string {
        if (
            !isNil(this.context.minFractionDigits) &&
            !isNil(digits) &&
            (digits.length < this.context.minFractionDigits)
        ) {
            return value.slice(0, dotIndex);
        }

        return value;
    }

    private processMaxFractionDigits(value: string, digits: string, dotIndex: number): string {
        if (
            !isNil(this.context.maxFractionDigits) &&
            !isNil(digits) &&
            (digits.length > this.context.maxFractionDigits)
        ) {
            return (
                value.slice(0, (dotIndex + 1)) +
                digits.slice(0, this.context.maxFractionDigits)
            );
        }

        return value;
    }

    private getFractionDigits(value: string, dotIndex: number): string {
        if (dotIndex !== -1) {
            return value.slice((dotIndex + 1));
        }

        return null;
    }

    private getRegexpWithAllowedSymbols(): RegExp {
        const dotSymbol = this.context.isAllowDecimal ? '.' : '';
        const regexpAsString = `[^0-9${dotSymbol}-]`;

        return new RegExp(regexpAsString, 'g');
    }
}
