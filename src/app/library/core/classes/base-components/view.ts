import { Directive } from '@angular/core';
import { injectLocal } from 'ngx-local-injector';
import { ɵDestroyService } from '../../services';

@Directive({
    host: {
        class: 'os-element'
    }
})
export abstract class ɵOsBaseViewComponent {
    protected viewDestroyed$ = injectLocal(ɵDestroyService);
}
