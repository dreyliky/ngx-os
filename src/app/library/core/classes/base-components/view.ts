import { Component } from '@angular/core';
import { injectLocal } from 'ngx-local-injector';
import { ɵDestroyService } from '../../services';

@Component({
    template: ''
})
export abstract class ɵOsBaseViewComponent {
    protected viewDestroyed$ = injectLocal(ɵDestroyService);
}
