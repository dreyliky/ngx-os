import { Pipe, PipeTransform } from '@angular/core';
import { MethodsClass } from '@features/documentation';

@Pipe({
    name: 'methodFormatter'
})
export class MethodFormatterPipe implements PipeTransform {
    public transform(method: MethodsClass): string {
        let output = this.addOptionalSymbol(method.name, method.optional);
        output = this.addBracketsWithParams(output, method);
        output = this.addReturnType(output, method);

        return output;
    }

    private addOptionalSymbol(output: string, isOptional: boolean): string {
        return output + ((isOptional) ? '?' : '');
    }

    private addBracketsWithParams(output: string, method: MethodsClass): string {
        let result = `${output}(`;

        if (method.args?.length) {
            result += '<br />';
            result = this.addParameters(result, method);
            result += '<br />';
        }

        result += ')';

        return result;
    }

    private addParameters(output: string, method: MethodsClass): string {
        let result = output;

        method.args.forEach((arg, argIndex) => {
            result += `&emsp;${arg.name}`;
            result = this.addOptionalSymbol(result, arg.optional);
            result += `: <span class="text-primary">${arg.type}</span>`;
            result += (argIndex < (method.args.length - 1)) ? ',<br />' : '';
        });

        return result;
    }

    private addReturnType(output: string, method: MethodsClass): string {
        return `${output}: <span class="text-primary">${method.returnType}</span>`;
    }
}
