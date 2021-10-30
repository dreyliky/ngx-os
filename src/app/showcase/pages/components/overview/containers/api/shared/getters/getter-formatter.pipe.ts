import { Pipe, PipeTransform } from '@angular/core';
import { DocGetSignature } from '@features/documentation';

@Pipe({
    name: 'getterFormatter'
})
export class GetterFormatterPipe implements PipeTransform {
    public transform({ name, returnType }: DocGetSignature): string {
        return `${name}: <xmp class="text-primary">${returnType}</xmp>`;
    }
}
