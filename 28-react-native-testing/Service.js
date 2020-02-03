
export default class Service {

    constructor(store) {
        this.store = store;
    }

    get() {
        return fetch('http://www.test.com:3000/vehicles')
            .then((response) => response.json())
            .then((vehilces) => {
                this.store.length = 0; // clear the store
                this.store.push(...vehilces);
            })
            .catch(error => console.log(error));
    }

}
