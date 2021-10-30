import { Pipe, PipeTransform } from '@angular/core';
import { DocClassProperty } from '@features/documentation';

@Pipe({
    name: 'propertyFormatter'
})
export class PropertyFormatterPipe implements PipeTransform {
    public transform({ name, type }: DocClassProperty): string {
        return `${name}: <xmp class="text-primary">${type}</xmp>`;
    }
}
