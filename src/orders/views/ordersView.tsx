import * as React from 'react';
import { Store } from '../infrastructure/store';
import { StoreState } from '../infrastructure/types';
import { AMOUNT_CHANGED, BOOK, CURRENCY_PAIR_CHANGED } from '../store/actions';

type OrdersViewState = {
    amount?: string;
    currencyPair?: string;
    isBooking?: boolean;
    bookingResults?: string | null
};

type OrdersViewProps = {
    store: Store<StoreState>;
}

export default class OrdersView extends React.Component<OrdersViewProps, OrdersViewState> {
    constructor(props: Readonly<OrdersViewProps>) {
        super(props);

        // Component state shoulld be different store's values - hence the spread operator
        this.state = {... props.store.currentState};
    }

    onStoreStateChange = (storeState: Readonly<StoreState>) => {
        this.setState({... storeState});
    }

    componentDidMount() {
        const { store } = this.props;
        store.subscribe(this.onStoreStateChange);
    };

    componentWillUnmount() {
        // Removing listener to avoid memory leaks
        // We should pass the same reference to the function used when registering the callback
        const { store } = this.props;
        store.unsubscribe(this.onStoreStateChange);
    }

    // Minor memory/performance optimisation:
    // Passing a lambda function to 'onChange' and 'onClick' attributes (as it was previously done) implies
    // that we define a new function (the lambda function) each time a render() function is called.
    // By passing a reference to an event handler defined at class level (like the next 3 functions)
    // we guarantee that event handlers are only define once.

    onAmountChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        const amount = event?.target?.value;
        const { store } = this.props;
        store.dispatchAction(AMOUNT_CHANGED, amount);
    };

    onCurrencyPairChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const ccyPair = event?.target?.value;
        const { store } = this.props;
        store.dispatchAction(CURRENCY_PAIR_CHANGED, ccyPair);
    };

    onBookRequested = () => {
        const { store } = this.props;
        store.dispatchAction(BOOK);
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
