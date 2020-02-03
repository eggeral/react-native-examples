jest.mock('../src/Calculator')
// mock is picked up from ../src/__mocks__/Calculator
import Calculator from '../src/Calculator';

describe('Module Mocks', () => {
    it('can use classes in __mocks_ ', () => {
        const calculator = new Calculator();
        expect(calculator.add(2, 3)).toBe(15);

    });
})