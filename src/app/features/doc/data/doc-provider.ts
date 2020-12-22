import { InjectionToken, Provider } from '@angular/core';
import { DocStateService } from '../services/doc-state.service';

export const LIB_DOC = new InjectionToken('LIB_DOC');
export const DEMO_DOC = new InjectionToken('DEMO_DOC');

export const LibDocProvider: Provider = {
    provide: LIB_DOC,
    useFactory: (docState: DocStateService) => docState.libDoc,
    deps: [DocStateService]
};

export const DemoDocProvider: Provider = {
    provide: LIB_DOC,
    useFactory: (docState: DocStateService) => docState.demoDoc,
    deps: [DocStateService]
};
