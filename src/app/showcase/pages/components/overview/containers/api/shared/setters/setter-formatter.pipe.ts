import { Pipe, PipeTransform } from '@angular/core';
import { DocSetSignature } from '@features/documentation';

@Pipe({
    name: 'setterFormatter'
})
export class SetterFormatterPipe implements PipeTransform {
    public transform({ name, args }: DocSetSignature): string {
        return `${name}: <xmp class="text-primary">${args[0].type}</xmp>`;
    }
}
