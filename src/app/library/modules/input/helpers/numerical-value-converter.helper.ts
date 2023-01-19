import { ɵIsNil } from '../../../core';
import { InputNumberComponent } from '../components';

/** @internal */
export class ɵNumericalValueConverter {
    constructor(
        private readonly context: InputNumberComponent
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

        if (!ɵIsNil(this.context.min) && (result < this.context.min)) {
            return this.context.min.toString();
        }

        return result.toString();
    }

    private processMaxBoundary(value: string): string {
        const result = +value;

        if (!ɵIsNil(this.context.max) && (result > this.context.max)) {
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
            !ɵIsNil(this.context.minFractionDigits) &&
            !ɵIsNil(digits) &&
            (digits.length < this.context.minFractionDigits)
        ) {
            return value.slice(0, dotIndex);
        }

        return value;
    }

    private processMaxFractionDigits(value: string, digits: string, dotIndex: number): string {
        if (
            !ɵIsNil(this.context.maxFractionDigits) &&
            !ɵIsNil(digits) &&
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
