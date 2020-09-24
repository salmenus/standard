import { log } from '../infrastructure/logger';
import { ReducersMap, StoreState } from '../infrastructure/types';
import { AMOUNT_CHANGED, BOOK, BOOKING_COMPLETE, CURRENCY_PAIR_CHANGED } from './actions';

// To make testing easier, and to ensure purity of functions, I declared them sepeeately and
// exported them. I use 'Reducers' object at the bottom to combine all reducers.

export const onAmountChanged = (state: Readonly<StoreState>, amount: string): StoreState => {
    log(`Amount changed from ${state.amount} to ${amount}`);
    return {
        ...state,
        amount
    };
};

export const onCurrencyPairChanged = (state: Readonly<StoreState>, currencyPair: string): StoreState => {
    log(`currencyPair changed from ${state.currencyPair} to ${currencyPair}`);
    return {
        ...state,
        currencyPair
    };
};

export const book = (state: Readonly<StoreState>): StoreState => {
    log(`booking`);
    return {
        ...state,
        bookingResults: null,
        isBooking: true
    };
};

export const bookingComplete = (state: Readonly<StoreState>, bookingSuccess: boolean): StoreState => {
    log(`booking completed`);

    const bookingMessage = bookingSuccess ? 'Booking complete with success.' : 'Booking failed. Please try again.';
    return {
        ...state,
        isBooking: false,
        bookingResults: bookingMessage
    };
};

// Combining all reducers in one object and mapping them to relevant actions
export const Reducers: ReducersMap<StoreState> = {
    [AMOUNT_CHANGED]: onAmountChanged,
    [CURRENCY_PAIR_CHANGED]: onCurrencyPairChanged,
    [BOOK]: book,
    [BOOKING_COMPLETE]: bookingComplete
};
