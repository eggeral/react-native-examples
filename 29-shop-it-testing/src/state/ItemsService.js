import { itemsStore } from './ItemsStore';

const server = "http://147efc81.ngrok.io"

export class ItemsService {
  constructor(server, itemsStore) {
    this.itemsStore = itemsStore;
    this.api = server + '/items';
  }

  get() {
    this.itemsStore.setLoading(true);
    // return the Promise so we can wait for it in specs
    return fetch(this.api)
      .then((response) => {
        return response.json();
      })
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
    return fetch(this.api + '/' + item.id, {
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
    return fetch(this.api, {
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
    return fetch(this.api + '/' + id, {
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



export const itemsService = new ItemsService(server, itemsStore);