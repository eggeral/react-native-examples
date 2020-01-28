import { QueryEntity } from '@datorama/akita';
import { vehiclesStore } from './VehiclesStore';

export class VehiclesQuery extends QueryEntity {
    constructor(store) {
        super(store);
    }
}

export const vehiclesQuery = new VehiclesQuery(vehiclesStore);