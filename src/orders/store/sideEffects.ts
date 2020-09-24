import { log } from '../infrastructure/logger'
import { StoreState } from '../infrastructure/types';
import { OrdersService } from "../services/ordersService";
import { Action, BOOKING_COMPLETE } from './actions';

const ordersService = new OrdersService();

export const SideEffects = {
    book(state: Readonly<StoreState>, onDone: (doneAction: Action, ...args: any) => void) {
        log(`booking execution: ${state.currencyPair} | ${state.amount}`);
        ordersService.book(state.currencyPair, state.amount, (success) => {
            onDone(BOOKING_COMPLETE, success);
        });
    },
};
