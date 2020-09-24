import { StoreState } from '../../../src/orders/infrastructure/types';
import { Action, BOOKING_COMPLETE } from '../../../src/orders/store/actions';
import { book } from '../../../src/orders/store/sideEffects';

test('book should call callback function with success result on valid booking', (done) => {
    const mockState: StoreState = {
        amount: '1m',
        currencyPair: 'USDGBP',
        isBooking: false,
        bookingResults: null
    }

    book(mockState, (action: Action, isSuccessfulBooking: boolean) => {
        expect(action).toBe(BOOKING_COMPLETE);
        expect(isSuccessfulBooking).toBe(true);
        done();
    });
});

test('book should call callback function with error result on invalid booking', (done) => {
    const mockState: StoreState = {
        amount: 'INVALID_AMOUNT',
        currencyPair: 'USDGBP',
        isBooking: false,
        bookingResults: null
    }

    book(mockState, (action: Action, isSuccessfulBooking: boolean) => {
        expect(action).toBe(BOOKING_COMPLETE);
        expect(isSuccessfulBooking).toBe(false);
        done();
    });
});
