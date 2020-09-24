import { log } from '../infrastructure/logger'
import { OrdersService } from "../services/ordersService";

const ordersService = new OrdersService();

export const SideEffects = {
    book(state: any, onDone: (doneAction: string, ...args: any) => void) {
        log(`booking`);
    },
};
