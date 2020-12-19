import { InjectionToken, Provider } from '@angular/core';
import { DocStateService } from '../services/doc-state.service';

export const DOC = new InjectionToken('DOC');

export const DocProvider: Provider = {
    provide: DOC,
    useFactory: (docState: DocStateService) => docState.doc,
    deps: [DocStateService]
};
