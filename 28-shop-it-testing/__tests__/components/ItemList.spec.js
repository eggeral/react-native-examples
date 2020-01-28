import React from 'react';

import { cleanup, fireEvent, render } from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import ItemList from '../../src/components/ItemList';

describe('ItemList', () => {

    afterEach(cleanup);

    it('should show all items', () => {
        // given
        const items = [
            { id: 1, name: 'item 1' },
            { id: 2, name: 'item 2' }
        ];

        // when
        const component = render(<ItemList items={items} isFetching={false} />);

        // then
        const itemNames = component.getAllByLabelText('itemName').map(it =>
            it.props.children
        );
        expect(itemNames).toEqual(['item 1', 'item 2']);

    })

    it('should show the item count for items with count > 1', () => {
        // given
        const items = [
            { id: 1, name: 'item 1' },
            { id: 2, name: 'item 2', count: 2 }
        ];

        // when
        const component = render(<ItemList items={items} isFetching={false} />);

        // then
        const itemNames = component.getAllByLabelText('itemCount').map(it =>
            it.props.children
        );
        expect(itemNames).toEqual(['(2)']);

    })


    it('should call edit if the user touches the item text', () => {

        // given
        const items = [{ id: 1, name: 'item 1' }];
        let onEditCalled;

        // when
        const component = render(<ItemList items={items} isFetching={false} onEditItem={id => onEditCalled = id} />);
        const itemText = component.getByLabelText('itemText');
        fireEvent.press(itemText);

        // then
        expect(onEditCalled).toEqual(1);

    })

    it('should call delete if the user preses the delete button', () => {

        // given
        const items = [{ id: 1, name: 'item 1' }];
        let onDeleteCalled;

        // when
        const component = render(<ItemList items={items} isFetching={false} onDeleteItem={id => onDeleteCalled = id} />);
        const deleteButton = component.getByLabelText('itemDeleteButton');
        fireEvent.press(deleteButton);

        // then
        expect(onDeleteCalled).toEqual(1);

    })

    it('should call onRefresh if the list is refreshed', () => {

        // given
        const items = [{ id: 1, name: 'item 1' }];
        let onRefreshCalled;

        // when
        const component = render(<ItemList
            items={items}
            isFetching={false}
            onRefresh={() => onRefreshCalled = true}
        />);
        const itemList = component.getByLabelText('itemList');
        itemList.props.onRefresh();

        // then
        expect(onRefreshCalled).toEqual(true);

    })


})