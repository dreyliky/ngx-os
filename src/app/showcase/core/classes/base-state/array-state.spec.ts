import { ArrayState } from './array-state';

class Human {
    constructor(public name: string, public age: number) {}
}

const newItem = new Human('Sally', 25);

class FakeState extends ArrayState<Human> {}

describe('ArrayState', () => {
    let initialData: Human[];
    let state: FakeState;

    beforeEach(() => {
        initialData = [
            new Human('Emma', 18),
            new Human('Esmeralda', 22),
            new Human('Piety', 18),
            new Human('Lexine', 64),
            new Human('Karena', 55)
        ];

        state = new FakeState(initialData);
    });

    it('should be created with initialData', () => {
        expect(state).toBeTruthy();
        expect(state.data).toBe(initialData);
    });

    it('should getByIndex', () => {
        const result = state.getByIndex(1);

        expect(result).toBe(initialData[1]);
    });

    it('should getItemByFieldValue', () => {
        const result1 = state.getItemByFieldValue('age', 18);
        const result2 = state.getItemByFieldValue('name', 'Lexine');

        expect(result1).toBe(initialData[0]);
        expect(result2).toBe(initialData[3]);
    });

    it('should getItemIndexByFieldValue', () => {
        const result1 = state.getItemIndexByFieldValue('age', 18);
        const result2 = state.getItemIndexByFieldValue('name', 'Lexine');

        expect(result1).toBe(0);
        expect(result2).toBe(3);
    });

    it('should pushItem', () => {
        state.pushItem(newItem);

        expect(state.data.length).toBe(6);
        expect(state.data[state.data.length - 1]).toBe(newItem);
    });

    it('should unshiftItem', () => {
        state.unshiftItem(newItem);

        expect(state.data.length).toBe(6);
        expect(state.data[0]).toBe(newItem);
    });

    it('should insertItem', () => {
        state.insertItem(newItem, 1);

        expect(state.data.length).toBe(6);
        expect(state.data[1]).toBe(newItem);
    });

    it('should removeItem', () => {
        state.removeItem(initialData[2]);

        expect(state.data.length).toBe(4);
        expect(state.data[2] !== initialData[2]).toBeTrue();
    });

    it('should removeItemByFieldValue', () => {
        const result1 = state.removeItemByFieldValue('name', 'Piety');

        expect(state.data.length).toBe(4);
        expect(result1.item).toBe(initialData[2]);

        const result2 = state.removeItemByFieldValue('age', 55);

        expect(state.data.length).toBe(3);
        expect(result2.item).toBe(initialData[4]);
    });

    it('should updateItemByIndex', () => {
        const previousItem = state.data[1];

        state.updateItemByIndex(newItem, 1);

        expect(state.data[1]).toEqual(newItem);
        expect(previousItem).not.toBe(newItem);
    });

    it('should updateItem', () => {
        const newAge = 99;
        const updatedItem = initialData[2];
        updatedItem.age = newAge;

        state.updateItem(updatedItem);

        expect(state.data[2].age).toBe(newAge);
        expect(state.data[2].name).toBe(updatedItem.name);
        expect(state.data[2]).not.toBe(updatedItem);
    });

    it('should updateItemFieldValue', () => {
        const newAge = 99;
        const updatedItem = initialData[2];
        updatedItem.age = newAge;

        state.updateItemFieldValue(updatedItem, 'age', newAge);

        expect(state.data[2].age).toBe(newAge);
        expect(state.data[2].name).toBe(updatedItem.name);
        expect(state.data[2]).not.toBe(updatedItem);
    });

    it('should initEmptyArrayIfNoData', () => {
        const newState = new FakeState();

        newState.initEmptyArrayIfNoData();

        expect(newState.data).toEqual([]);
    });
});
