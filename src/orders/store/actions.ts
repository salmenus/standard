export type Action = 'onAmountChanged' | 'onCurrencyPairChanged' | 'book' | 'bookingComplete';

export const AMOUNT_CHANGED: Action = 'onAmountChanged';
export const CURRENCY_PAIR_CHANGED: Action = 'onCurrencyPairChanged';
export const BOOK: Action = 'book';
export const BOOKING_COMPLETE: Action = 'bookingComplete'
