import Service from '../Service';

describe('Service', () => {

    // mock fetch operations (have to use async and await!)
    // An alternative to that is expect(...).resolves.toBe(...) 
    it('can fetch the list of vehicles', async () => {

        global.fetch = jest.fn(url => Promise.resolve(
            {
                json: () => Promise.resolve([
                    { vin: 1 },
                    { vin: 2 }
                ])
            }
        ));

        const store = [];
        const service = new Service(store);
        await service.get();
        expect(store).toEqual([{ vin: 1 }, { vin: 2 }]);
    });

});

