export type Reducer<TState> = (currentState: TState, ...args: any) => TState;
export type SideEffect<TState> = (currentState: TState, ...args: any) => void;

export type ReducersMap<TState> = {
    [name: string]: Reducer<TState>
};

export type StoreState = {
    amount: string;
    currencyPair: string;
    isBooking: boolean;
    bookingResults: string | null
};
