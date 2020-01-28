import { EntityStore } from '@datorama/akita';


export class ItemsStore extends EntityStore {
    constructor() {
        super({}, { name: 'items', idKey: 'id' });
    }
}

export const itemsStore = new ItemsStore();
