import { MapState } from './map-state';

class FakeState extends MapState<number, string> {}

describe('MapState', () => {
    let initialData: Map<number, string>;
    let state: FakeState;

    beforeEach(() => {
        initialData = new Map<number, string>()
            .set(1, '1')
            .set(2, '2')
            .set(3, '3')
            .set(4, '4');

        state = new FakeState(initialData);
    });

    it('should be created with initialData', () => {
        expect(state).toBeTruthy();
        expect(state.data).toEqual(initialData);
    });

    it('should getByKey', () => {
        const result = state.getByKey(2);

        expect(result).toEqual(initialData.get(2));
    });

    it('should setValueByKey', () => {
        state.setValueByKey(5, '5');

        expect(state.getByKey(5)).toEqual('5');
    });
});
