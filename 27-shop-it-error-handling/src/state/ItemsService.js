import { itemsStore } from './ItemsStore';

const server = "192.168.134.82"

export class ItemsService {
  constructor(itemsStore) {
    this.itemsStore = itemsStore
  }

  get() {
    this.itemsStore.setLoading(true);
    fetch('http://' + server + ':3000/items')
      .then((response) => response.json())
      .then((items) => {
        this.itemsStore.set(items);
        this.itemsStore.setLoading(false);
      })
      .catch(error => this.handleError('Error getting items', error));
  }

  setActive(id) {
    this.itemsStore.setActive(id);
  }

  updateActive(item) {
    fetch('http://' + server + ':3000/items/' + item.id, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item)
    })
      .then((response) => response.json())
      .then((newItem) => {
        this.itemsStore.updateActive(newItem);
      })
      .catch(error => this.handleError('Error updating item', error));
  }

  add(item) {
    fetch('http://' + server + ':3000/items', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item)
    })
      .then((response) => response.json())
      .then((newItem) => {
        this.itemsStore.add(newItem);
      })
      .catch(error => this.handleError('Error adding item', error));

  }

  remove(id) {
    fetch('http://' + server + ':3000/items/' + id, {
      method: 'DELETE',
    }).then(() => {
      this.itemsStore.remove(id);
    })
      .catch(error => this.handleError('Error removing item', error));

  }

  resetError() {
    this.itemsStore.setError(null);
  }

  handleError(message, error) {
    console.log("ERROR", message, error);
    this.itemsStore.setError(message + '. ' + error);
    this.itemsStore.setLoading(false);
  }
}



export const itemsService = new ItemsService(itemsStore);