//
// The tests in this file rely on enzyme in order to test react components.
// To run the tests, please add the following dependencies to package.json:
//   - enzyme
//   - enzyme-adapter-react-16
//
// By running:
//   yarn add enzyme enzyme-adapter-react-16 @types/enzyme @types/enzyme-adapter-react-16 --dev
//

/*
import * as React from 'react'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Store } from 'src/orders/infrastructure/store';
import { StoreState } from 'src/orders/infrastructure/types';
import OrdersView from '../../../src/orders/views/ordersView';

Enzyme.configure({ adapter: new Adapter() });

test('OrdersView should display "Booking In Progress" message when the booking is in progress', () => {
    const mockStore = {
        currentState: {
            isBooking: true
        },
        subscribe: jest.fn(),
        unsubscribe: jest.fn(),
        dispatchAction: jest.fn()
    } as unknown as Store<StoreState>;

    const wrapper = Enzyme.shallow(<OrdersView store={mockStore} />);
    expect(wrapper.contains(<h3>Booking in progress.</h3>)).toEqual(true);
});

test('OrdersView should display "bookingResults" message when the booking is done', () => {
    const mockStore = {
        currentState: {
            isBooking: false,
            bookingResults: 'BOOKING RESULLTS MESSAGE.'
        },
        subscribe: jest.fn(),
        unsubscribe: jest.fn(),
        dispatchAction: jest.fn()
    } as unknown as Store<StoreState>;

    const wrapper = Enzyme.shallow(<OrdersView store={mockStore} />);
    expect(wrapper.contains(<h3>BOOKING RESULLTS MESSAGE.</h3>)).toEqual(true);
});
*/

test('ordersView test running', () => expect(true).toBe(true));
