import { IDynamicWindowParams } from '@lib-modules';
import { Observable, of } from 'rxjs';

// FIXME: Remove
export const tst = (): Observable<IDynamicWindowParams> => of(<IDynamicWindowParams>{
    fullscreenOffset: {
        bottom: '50px'
    }
});
