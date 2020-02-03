import { QueryEntity } from '@datorama/akita';
import { itemsStore } from './ItemsStore';

export class ItemsQuery extends QueryEntity {
    constructor(store) {
        super(store);
    }
}

export const itemsQuery = new ItemsQuery(itemsStore);