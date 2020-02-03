import React from 'react';
import App from '../App';

import { cleanup, fireEvent, render } from '@testing-library/react-native';
import renderer from 'react-test-renderer';

describe('App', () => {

    // cleanup component tree after each test
    afterEach(cleanup);

    // Create a json file from the rendered component and compare it to a version previously generated.
    // Kind of creating a screenshot. This is dangerous!
    it('should render correctly', () => {
        const tree = renderer.create(<App />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('can switch between master and detail view', () => {

        // from testing-library/react-native
        const app = render(<App title="test" />);
        expect(app.getByLabelText('title').props.children).toBe("test - Master");

        fireEvent.press(app.getByLabelText('goToDetailButton'));
        expect(app.getByLabelText('title').props.children).toBe('test - Detail');

        fireEvent.press(app.getByLabelText('backButton'));
        expect(app.getByLabelText('title').props.children).toBe('test - Master');

    });

});
