import { Pipe, PipeTransform } from '@angular/core';
import { OutputsClass } from '@features/documentation';

@Pipe({
    name: 'outputFormatter'
})
export class OutputFormatterPipe implements PipeTransform {
    public transform({ name, type }: OutputsClass): string {
        return `${name}: <xmp class="os-text text-primary">${type}</xmp>`;
    }
}
