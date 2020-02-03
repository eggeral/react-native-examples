import { vehiclesStore } from './VehiclesStore';
import { of } from 'rxjs';

const vehicles =  [
    { vin: 'asdf34', brand: 'BMW', color: 'yellow' },
    { vin: 'adf333', brand: 'Audi', color: 'red' },
] 

export class VehiclesService {
  constructor(vehiclesStore) {
      this.vehiclesStore = vehiclesStore
  }

  get() {
    of(vehicles).subscribe(entities => {
      this.vehiclesStore.set(entities);
    });
  }

  setActive(id) {
    this.vehiclesStore.setActive(id);
  }

  updateActive(vehicle) {
    this.vehiclesStore.updateActive(vehicle);
  }
  
  add(vehicle) {
    this.vehiclesStore.add(vehicle);
  }
}

export const vehiclesService = new VehiclesService(vehiclesStore);