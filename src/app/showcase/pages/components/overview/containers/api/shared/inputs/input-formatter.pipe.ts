import { Pipe, PipeTransform } from '@angular/core';
import { InputsClass } from '@features/documentation';

@Pipe({
    name: 'inputFormatter'
})
export class InputFormatterPipe implements PipeTransform {
    public transform({ name, type }: InputsClass): string {
        return `${name}: <span class="text-primary">${type}</span>`;
    }
}
