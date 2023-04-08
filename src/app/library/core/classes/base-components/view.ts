import { Directive } from '@angular/core';
import { ɵInjectLocal } from '../../helpers';
import { ɵDestroyService } from '../../services';

@Directive({
    host: {
        class: 'os-element'
    }
})
export abstract class ɵOsBaseViewComponent {
    protected viewDestroyed$ = ɵInjectLocal(ɵDestroyService);
}
