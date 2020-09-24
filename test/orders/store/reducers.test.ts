import { StoreState } from '../../../src/orders/infrastructure/types';
import { onAmountChanged, onCurrencyPairChanged, book, bookingComplete } from '../../../src/orders/store/reducers';

test('onAmountChanged should update amount in state', () => {
    const mockState: StoreState = {
        amount: '10m',
        currencyPair: 'USDGBP',
        isBooking: false,
        bookingResults: null
    };

    const newAmount = '15m';
    const result = onAmountChanged(mockState, newAmount);

    expect(result).toEqual({
        amount: '15m',
        currencyPair: 'USDGBP',
        isBooking: false,
        bookingResults: null
    });
});

test('onCurrencyPairChanged should update currency pair in state', () => {
    const mockState: StoreState = {
        amount: '10m',
        currencyPair: 'USDGBP',
        isBooking: false,
        bookingResults: null
    };

    const newCurrencyPair = 'EURGBP';
    const result = onCurrencyPairChanged(mockState, newCurrencyPair);

    expect(result).toEqual({
        amount: '10m',
        currencyPair: 'EURGBP',
        isBooking: false,
        bookingResults: null
    });
});

test('book should update currency bookingResults and isBooking in state', () => {
    const mockState: StoreState = {
        amount: '10m',
        currencyPair: 'USDGBP',
        isBooking: false,
        bookingResults: 'Previous booking results'
    };

    const result = book(mockState);

    expect(result).toEqual({
        amount: '10m',
        currencyPair: 'USDGBP',
        isBooking: true,
        bookingResults: null
    });
});

test('bookingComplete should set isBooking to false', () => {
    const mockState: StoreState = {
        amount: '10m',
        currencyPair: 'USDGBP',
        isBooking: true,
        bookingResults: 'Booking in progress'
    };

    const result1 = bookingComplete(mockState, false);
    expect(result1).toEqual(
        expect.objectContaining({
            amount: '10m',
            currencyPair: 'USDGBP',
            isBooking: false
        })
    );

    const result2 = bookingComplete(mockState, true);
    expect(result2).toEqual(
        expect.objectContaining({
            amount: '10m',
            currencyPair: 'USDGBP',
            isBooking: false
        })
    );
});

test('bookingComplete should set booking message to success on success', () => {
    const mockState: StoreState = {
        amount: '10m',
        currencyPair: 'USDGBP',
        isBooking: true,
        bookingResults: 'Booking in progress'
    };

    const result = bookingComplete(mockState, true);
    expect(result).toEqual({
        amount: '10m',
        currencyPair: 'USDGBP',
        isBooking: false,
        bookingResults: 'Booking complete with success.'
    });
});

test('bookingComplete should set booking message to error on failure', () => {
    const mockState: StoreState = {
        amount: '10m',
        currencyPair: 'USDGBP',
        isBooking: true,
        bookingResults: 'Booking in progress'
    };

    const result = bookingComplete(mockState, false);
    expect(result).toEqual({
        amount: '10m',
        currencyPair: 'USDGBP',
        isBooking: false,
        bookingResults: 'Booking failed. Please try again.'
    });
});
