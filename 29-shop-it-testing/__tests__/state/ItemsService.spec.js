import { ItemsService } from '../../src/state/ItemsService'
import { ItemsStore } from '../../src/state/ItemsStore';
import { ItemsQuery } from '../../src/state/ItemsQuery';

describe('ItemsService', () => {

    it('can get the list of items from the server', async () => {

        // given
        global.fetch = jest.fn(url => Promise.resolve(
            {
                json: () => Promise.resolve([
                    { id: 1, name: 'Milk' },
                    { id: 3, name: 'Eggs' }
                ])
            }
        ));

        const store = new ItemsStore();
        const query = new ItemsQuery(store);
        const service = new ItemsService('test.com', store);

        // when
        await service.get();

        // then
        expect(query.getAll()).toEqual([
            { id: 1, name: 'Milk' },
            { id: 3, name: 'Eggs' }
        ]);
    })

    it('can set the active item', () => {

        // given
        const store = new ItemsStore();
        const query = new ItemsQuery(store);
        const service = new ItemsService('test.com', store);
        store.set([
            { id: 1, name: 'Milk' },
            { id: 3, name: 'Eggs' }
        ]);

        // when
        service.setActive(3);

        // then 
        expect(query.getActive()).toEqual({ id: 3, name: 'Eggs' });

    });

    it('can add a new item', async () => {

        // given
        global.fetch = jest.fn(url => Promise.resolve(
            {
                json: () => Promise.resolve(
                    { id: 3, name: 'Bred' }
                )
            }
        ));

        const store = new ItemsStore();
        const query = new ItemsQuery(store);
        const service = new ItemsService('test.com', store);

        // when
        await service.add({ id: 3, name: 'Bred' });

        // then
        expect(query.getAll()).toEqual([
            { id: 3, name: 'Bred' }
        ]);
        expect(global.fetch).toHaveBeenCalledWith(
            "http://test.com:3000/items",
            {
                "body": "{\"id\":3,\"name\":\"Bred\"}",
                "headers": {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                "method": "POST"
            });
    });

    it('can remove an item', async () => {

        // given
        global.fetch = jest.fn(url => Promise.resolve());

        const store = new ItemsStore();
        const query = new ItemsQuery(store);
        const service = new ItemsService('test.com', store);
        store.set([
            { id: 1, name: 'Milk' },
            { id: 3, name: 'Eggs' }
        ]);

        // when
        await service.remove(1);

        // then
        expect(query.getAll()).toEqual([
            { id: 3, name: 'Eggs' }
        ]);
        expect(global.fetch).toHaveBeenCalledWith(
            "http://test.com:3000/items/1",
            {
                "method": "DELETE"
            });
    });

    it('can update the active item', async () => {

        // given
        global.fetch = jest.fn(url => Promise.resolve(
            {
                json: () => Promise.resolve(
                    { id: 3, name: 'Bred' }
                )
            }
        ));

        const store = new ItemsStore();
        store.set([
            { id: 1, name: 'Milk' },
            { id: 3, name: 'Eggs' }
        ]);
        const query = new ItemsQuery(store);
        const service = new ItemsService('test.com', store);

        // when
        service.setActive(3)
        await service.updateActive({ id: 3, name: 'Bred' });

        // then
        expect(query.getAll()).toEqual([
            { id: 1, name: 'Milk' },
            { id: 3, name: 'Bred' }
        ]);
        expect(global.fetch).toHaveBeenCalledWith(
            "http://test.com:3000/items/3",
            {
                "body": "{\"id\":3,\"name\":\"Bred\"}",
                "headers": {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                "method": "PUT"
            });
    });

    it('should set the error status of the store if the fetch call fails', async () => {
        // given
        global.fetch = jest.fn(url => Promise.reject('TEST 403'));
        const store = new ItemsStore();
        const query = new ItemsQuery(store);
        const service = new ItemsService('test.com', store);

        // when
        await service.get();

        // then 
        expect(query.getValue().error).toEqual('Error getting items. TEST 403');

        // when
        await service.updateActive({});

        // then 
        expect(query.getValue().error).toEqual('Error updating item. TEST 403');

        // when
        await service.remove(1);

        // then 
        expect(query.getValue().error).toEqual('Error removing item. TEST 403');

        // when
        await service.add({});

        // then 
        expect(query.getValue().error).toEqual('Error adding item. TEST 403');

        // when
        service.resetError();
        expect(query.getValue().error).toBeNull();

    });

});