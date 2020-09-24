import { log } from '../infrastructure/logger';
import { ReducersMap, StoreState } from '../infrastructure/types';

export const Reducers: ReducersMap<StoreState> = {
    onAmountChanged(state: Readonly<StoreState>, amount: string): any {
        log(`Amount changed from ${state.amount} to ${amount}`);
        return {
            ...state,
            amount
        };
    },

    onCurrencyPairChanged(state: Readonly<StoreState>, currencyPair: string): any {
        log(`currencyPair changed from ${state.currencyPair} to ${currencyPair}`);
        return {
            ...state,
            currencyPair
        };
    },

    book(state: Readonly<StoreState>): any {
        log(`booking`);
        throw new Error(`not implemented`);
    },

    bookingComplete(state: Readonly<StoreState>, bookingSuccess: boolean): any {
        log(`booking completed`);
        throw new Error(`not implemented`);
    },
};
