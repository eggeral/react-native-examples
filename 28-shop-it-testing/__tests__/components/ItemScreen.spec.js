jest.mock('../../src/components/Buttons');
import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import ItemScreen from '../../src/components/ItemScreen';

describe('ItemScreen', () => {

    afterEach(cleanup);

    it('should render correctly', () => {
        const item = { id: 1, name: 'item 1' };
        const navigation = {
            getParam: () => item
        }
        const tree = renderer.create(<ItemScreen navigation={navigation} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('can change the item', () => {
        // given
        const item = { id: 1, name: 'item 1', count: 1, photo: 'base64:photo' };
        let changedItem
        let navigationParams = {
            item,
            onOk: item => changedItem = item
        }
        const navigation = {
            getParam: paramName => navigationParams[paramName],
            setParams: it => Object.assign(navigationParams, it),
            goBack: () => { }
        }
        const component = render(<ItemScreen navigation={navigation} />);
        const header = render(ItemScreen.navigationOptions({ navigation }).headerRight());
        const itemNameInput = component.getByLabelText('itemNameInput');
        const lessButton = component.getByLabelText('lessButton');
        const moreButton = component.getByLabelText('moreButton');
        const clearPhotoButton = component.getByLabelText('clearPhotoButton');
        const okButton = header.getByLabelText('okButton');

        // when
        fireEvent.changeText(itemNameInput, "test");
        fireEvent.press(moreButton);
        fireEvent.press(moreButton);
        fireEvent.press(lessButton);
        fireEvent.press(clearPhotoButton);

        fireEvent.press(okButton);

        // then
        expect(navigationParams.item).toEqual({ id: 1, name: 'test', count: 2 });
        expect(changedItem).toEqual({ id: 1, name: 'test', count: 2 });

    });

    it('can scan the item name from a QR code', () => {
        // given
        const item = { id: 1, name: 'item 1' };
        let navigationParams = {
            item,
            onOk: item => changedItem = item
        };
        let currentScreen;
        const navigation = {
            getParam: paramName => navigationParams[paramName],
            setParams: it => Object.assign(navigationParams, it),
            navigate: (title, params) => currentScreen = { title, params },
            goBack: () => { }
        }
        const component = render(<ItemScreen navigation={navigation} />);
        const qrCodeButton = component.getByLabelText('qrCodeButton');

        // when
        fireEvent.press(qrCodeButton);
        expect(currentScreen.title).toEqual('QrCodeScanner');
        currentScreen.params.onScanned('qr code');

        // then
        expect(navigationParams.item).toEqual({ id: 1, name: 'qr code' });

    });

    it('can add a photo to  an item', () => {
        // given
        const item = { id: 1, name: 'item 1' };
        let navigationParams = {
            item,
            onOk: item => changedItem = item
        };
        let currentScreen;
        const navigation = {
            getParam: paramName => navigationParams[paramName],
            setParams: it => Object.assign(navigationParams, it),
            navigate: (title, params) => currentScreen = { title, params },
            goBack: () => { }
        }
        const component = render(<ItemScreen navigation={navigation} />);
        const cameraButton = component.getByLabelText('cameraButton');

        // when
        fireEvent.press(cameraButton);
        expect(currentScreen.title).toEqual('TakePhoto');
        currentScreen.params.onTaken('image of a tree');

        // then
        expect(navigationParams.item).toEqual({ id: 1, name: 'item 1', photo: 'image of a tree' });

    });

})