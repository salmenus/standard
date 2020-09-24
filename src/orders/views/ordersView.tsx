import * as React from 'react';
import { Store } from '../infrastructure/store';
import { StoreState } from '../infrastructure/types';
import { Reducers } from '../store/reducers';
import { SideEffects } from '../store/sideEffects';

type OrdersViewState = {
    amount?: string;
    currencyPair?: string;
    isBooking?: boolean;
    bookingResults?: string | null
};

type OrdersViewProps = {
    [name: string]: any;
}

export default class OrdersView extends React.Component<OrdersViewState, OrdersViewProps> {
    private store: Store<StoreState>;

    constructor(props: Readonly<OrdersViewProps>) {
        super(props);

        const initialState: StoreState = {
            amount: '1m',
            currencyPair: 'USDGBP',
            isBooking: false,
            bookingResults: null,
        };

        this.store = new Store<StoreState>(
            initialState,
            Reducers,
            SideEffects,
            (nextState: StoreState) => this.setState(nextState)
        );

        // set initial state
        this.state = this.store.currentState;
    }

    // Passing a lambda function to 'onChange' and 'onClick' attributes means that
    // we define a new function (the lambda function) each time a render() function is called.
    // By passing a reference to an event handler defined at class level (the next 3 functions)
    // we guarantee that event handles are only define once.

    onAmountChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        const amount = event?.target?.value;
        this.store.dispatchAction('onAmountChanged', amount);
    };

    onCurrencyPairChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const ccyPair = event?.target?.value;
        this.store.dispatchAction('onCurrencyPairChanged', ccyPair);
    };

    onBookRequested = () => {
        this.store.dispatchAction('book');
    };

    render() {
        return (
            <div>
                <h1>OrdersList</h1>
                Amount:
                    <input type="text" value={this.state.amount} onChange={this.onAmountChanged} />
                <br/>
                Currency:
                <select value={this.state.currencyPair} onChange={this.onCurrencyPairChanged} >
                    <option value="EURUSD">EURUSD</option>
                    <option value="USDJPY">USDJPY</option>
                    <option value="USDGBP">USDGBP</option>
                </select>
                <br/>
                Order summary: <br/>
                <div>
                    Amount({this.state.amount})
                    <br/>
                    <button onClick={this.onBookRequested}>
                        book
                    </button>
                </div>
            </div>
        );
    }
}
