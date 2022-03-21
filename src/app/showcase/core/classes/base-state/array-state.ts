import { ObjectHelper } from '../../helpers';
import { BaseState } from './base-state';
import { RemoveByFieldValueEvent } from './interfaces';

enum Action {
    GetByIndex = 'get by index',
    GetItemByFieldValue = 'get item by field value',
    GetItemIndexByFieldValue = 'get item index by field value',
    PushItem = 'push item',
    UnshiftItem = 'unshift item',
    InsertItem = 'insert item',
    RemoveItem = 'remove item',
    RemoveItemByFieldValue = 'remove item by field value',
    UpdateItemByIndex = 'update item by index',
    UpdateItem = 'update item',
    UpdateItemFieldValue = 'update item field value'
}

export abstract class ArrayState<T> extends BaseState<T[]> {
    public getByIndex(index: number): T {
        return this.tryDoAction<T>(Action.GetByIndex, () => {
            return this.data[index];
        });
    }

    public getItemByFieldValue(fieldName: keyof T, fieldValue: any): T {
        return this.tryDoAction<T>(Action.GetItemByFieldValue, () => {
            return this.data.find((item) => item[fieldName] === fieldValue);
        });
    }

    public getItemIndexByFieldValue(fieldName: keyof T, fieldValue: any): number {
        return this.tryDoAction<number>(Action.GetItemIndexByFieldValue, () => {
            return this.data.findIndex((item) => item[fieldName] === fieldValue);
        });
    }

    public pushItem(item: T): void {
        this.tryDoAction(Action.PushItem, () => {
            const items = [...this.data];

            items.push(item);
            this.set(items);
        });
    }

    public unshiftItem(item: T): void {
        this.tryDoAction(Action.UnshiftItem, () => {
            const items = [...this.data];

            items.unshift(item);
            this.set(items);
        });
    }

    public insertItem(item: T, index: number = 0): void {
        this.tryDoAction(Action.InsertItem, () => {
            const items = [...this.data];

            items.splice(index, 0, item);
            this.set(items);
        });
    }

    public removeItem(item: T): void {
        this.tryDoAction(Action.RemoveItem, () => {
            const items = this.data
                .filter((currentItem) => !this.compareItems(currentItem, item));

            this.set(items);
        });
    }

    public removeItemByFieldValue(fieldName: keyof T, fieldValue: any): RemoveByFieldValueEvent<T> {
        return this.tryDoAction(Action.RemoveItemByFieldValue, () => {
            const items = [...this.data];
            const targetItemIndex = items.findIndex((item) => item[fieldName] === fieldValue);
            const targetItem = items[targetItemIndex];

            items.splice(targetItemIndex, 1);
            this.set(items);

            return { item: targetItem, index: targetItemIndex };
        });
    }

    /**
     * Method replaces the item by index with the new one
     *
     * @param itemToChange Item which will instead of the current item by index `index`.
     * @param index Index for inserting a new item.
     *
     * @remarks
     * `itemToChange` will be cloned to the new instance to notify
     * the ChangeDetection mechanism about your item somehow updated.
     **/
    public updateItemByIndex(itemToChange: T, index: number): void {
        this.tryDoAction(Action.UpdateItemByIndex, () => {
            const items = [...this.data];
            items[index] = ObjectHelper.cloneClass(itemToChange);

            this.set(items);
        });
    }

    /**
     * Method updates item
     *
     * @param itemToUpdate Item which will updated. Should be the same instance which exists in the array.
     *
     * @remarks
     * `itemToUpdate` will be cloned to the new instance to notify
     * the ChangeDetection mechanism about your item somehow updated.
     **/
    public updateItem(itemToUpdate: T): void {
        this.tryDoAction(Action.UpdateItem, () => {
            const items = [...this.data];
            const itemIndex = this.data
                .findIndex((currentItem) => this.compareItems(currentItem, itemToUpdate));

            items[itemIndex] = ObjectHelper.cloneClass(itemToUpdate);

            this.set(items);
        });
    }

    /**
     * Method updates item's field value
     *
     * @param item Item which field value we need to change.
     * @param fieldName Name of the field to modify.
     * @param newFieldValue New value for field.
     *
     * @remarks
     * `item` will be cloned to the new instance to notify
     * the ChangeDetection mechanism about your item somehow updated.
     **/
    public updateItemFieldValue(item: T, fieldName: keyof T, newFieldValue: any): void {
        this.tryDoAction(Action.UpdateItemFieldValue, () => {
            const items = [...this.data];
            const itemIndex = this.data
                .findIndex((currentItem) => this.compareItems(currentItem, item));
            const newItem = ObjectHelper.cloneClass(item);
            newItem[fieldName] = newFieldValue;
            items[itemIndex] = newItem;

            this.set(items);
        });
    }

    public initEmptyArrayIfNoData(): void {
        if (!this.data) {
            this.set([]);
        }
    }

    protected compareItems(itemA: T, itemB: T): boolean {
        return itemA === itemB;
    }
}
