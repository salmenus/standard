import { log } from '../infrastructure/logger';
import { ReducersMap, StoreState } from '../infrastructure/types';

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
    throw new Error(`not implemented`);
};

export const bookingComplete = (state: Readonly<StoreState>, bookingSuccess: boolean): StoreState => {
    log(`booking completed`);
    throw new Error(`not implemented`);
};

// Combining all reducers in one object
export const Reducers: ReducersMap<StoreState> = {
    onAmountChanged,
    onCurrencyPairChanged,
    book,
    bookingComplete
};
