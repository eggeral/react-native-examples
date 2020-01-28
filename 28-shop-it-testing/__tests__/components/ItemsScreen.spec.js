jest.mock('../../src/components/Icons');

import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react-native';
import renderer, {create} from 'react-test-renderer';
import ItemsScreen from '../../src/components/ItemsScreen';
import {itemsService} from '../../src/state/ItemsService';
import {itemsStore} from '../../src/state/ItemsStore';

describe('ItemsScreen', () => {

    afterEach(cleanup);

    it('should render correctly', () => {
        spyOn(itemsService, 'get').and.callFake(() => {
            itemsStore.set(
                [
                    {id: 1, name: 'item 1'},
                    {id: 2, name: 'item 2'}
                ]
            )
        });
        let params;
        const navigation = {
            setParams: it => params = it
        };

        const tree = renderer.create(<ItemsScreen navigation={navigation}/>).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('can add a new item', () => {
        // given
        spyOn(itemsService, 'get').and.callFake(() => {
            itemsStore.set(
                [
                    {id: 1, name: 'item 1'}
                ]
            )
        });
        spyOn(itemsService, 'add');

        let navigationParams = {};

        let currentScreen = {};
        const navigation = {
            getParam: paramName => navigationParams[paramName],
            setParams: it => Object.assign(navigationParams, it),
            navigate: (title, params) => currentScreen = {title, params},
        };
        create(<ItemsScreen navigation={navigation}/>);
        const header = render(ItemsScreen.navigationOptions({navigation}).headerRight());
        const addButton = header.getByLabelText('addButton');

        // when
        fireEvent.press(addButton);
        expect(currentScreen.title).toEqual('Item');
        currentScreen.params.onOk({name: 'new item'});

        // then
        expect(itemsService.add).toHaveBeenCalledWith({name: 'new item'});

    });

    it('can edit an item', () => {
        // given
        spyOn(itemsService, 'get').and.callFake(() => {
            itemsStore.set(
                [
                    {id: 1, name: 'item 1'}
                ]
            )
        });
        spyOn(itemsService, 'updateActive');

        let createdItem;
        let navigationParams = {
            createItem: item => createdItem = item
        };
        let currentScreen = {};
        const navigation = {
            getParam: paramName => navigationParams[paramName],
            setParams: it => Object.assign(navigationParams, it),
            navigate: (title, params) => currentScreen = {title, params},
        };
        const component = create(<ItemsScreen navigation={navigation}/>);

        // when
        component.getInstance().edit(1);
        expect(currentScreen.title).toEqual('Item');
        currentScreen.params.onOk({id: 1, name: 'new item'});

        // then
        expect(itemsService.updateActive).toHaveBeenCalledWith({id: 1, name: 'new item'});

    });


    it('can remove an item', () => {
        // given
        spyOn(itemsService, 'get').and.callFake(() => {
            itemsStore.set(
                [
                    {id: 1, name: 'item 1'}
                ]
            )
        });
        spyOn(itemsService, 'remove');

        let createdItem;
        let navigationParams = {
            createItem: item => createdItem = item
        };
        const navigation = {
            getParam: paramName => navigationParams[paramName],
            setParams: it => Object.assign(navigationParams, it),
        };
        const component = create(<ItemsScreen navigation={navigation}/>);

        // when
        component.getInstance().remove(1);

        // then
        expect(itemsService.remove).toHaveBeenCalledWith(1);

    });

    it('can refresh the list of items', () => {
        // given
        spyOn(itemsService, 'get').and.callFake(() => {
            itemsStore.set(
                [
                    {id: 1, name: 'item 1'}
                ]
            )
        });
        spyOn(itemsService, 'remove');

        let createdItem;
        let navigationParams = {
            createItem: item => createdItem = item
        };
        const navigation = {
            getParam: paramName => navigationParams[paramName],
            setParams: it => Object.assign(navigationParams, it),
        };
        const component = create(<ItemsScreen navigation={navigation}/>);

        // when
        component.getInstance().refresh(1);

        // then
        expect(itemsService.get).toHaveBeenCalledTimes(2);

    });


});
