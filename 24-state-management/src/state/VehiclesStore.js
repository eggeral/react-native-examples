import { EntityStore } from '@datorama/akita';


export class VehiclesStore extends EntityStore {
    constructor() {
        super({}, { name: 'vehicles', idKey: 'vin' });
    }
}

export const vehiclesStore = new VehiclesStore();
