import { log } from '../infrastructure/logger'
import { StoreState } from '../infrastructure/types';
import { OrdersService } from "../services/ordersService";
import { Action, BOOKING_COMPLETE, BOOK } from './actions';

const ordersService = new OrdersService();

// In a similar way to reducers - To make testing easier, I declared sideEffect functions separately
// and exported them. I use 'SideEffects' object at the bottom to combine all the side effect functions.

export const book = (state: Readonly<StoreState>, onDone: (doneAction: Action, ...args: any) => void) => {
    log(`booking execution: ${state.currencyPair} | ${state.amount}`);

    ordersService.book(state.currencyPair, state.amount)
        .then((isSuccessfulBooking) => {
            onDone(BOOKING_COMPLETE, isSuccessfulBooking);
        });
};

export const SideEffects = {
    [BOOK]: book
};
