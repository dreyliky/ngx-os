import { BaseState } from './base-state';

class FakeState extends BaseState<number> {}

describe('BaseState', () => {
    let state: FakeState;

    beforeEach(() => {
        state = new FakeState();
    });

    it('should be created with initialData null', () => {
        expect(state).toBeTruthy();
        expect(state.data).toBeNull();
    });

    it('should be created with target initialData', () => {
        const initialData = 123;
        const stateWithInitialData = new FakeState(initialData);

        expect(stateWithInitialData.data).toBe(initialData);
    });

    it('should set value and getters must return new value', () => {
        const value = 22;

        state.set(value);

        expect(state.data).toBe(value);

        state.data$
            .subscribe((newValue) => {
                expect(newValue).toBe(value);
            });
    });

    it('should clear', () => {
        state.set(999);
        state.clear();

        expect(state.data).toBeNull();
    });

    it('should emitInternalData', () => {
        const value = 456;

        state.set(value);

        const methodSetSpy = spyOn(state, 'set');

        state.emitInternalData();

        expect(methodSetSpy).toHaveBeenCalledOnceWith(value);
    });
});
