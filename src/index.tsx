import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { StoreState } from './orders/infrastructure/types';
import { Store } from './orders/infrastructure/store';
import { Reducers } from './orders/store/reducers';
import { SideEffects } from './orders/store/sideEffects';
import OrdersView from './orders/views/ordersView';

const initialState: StoreState = {
  amount: '1m',
  currencyPair: 'USDGBP',
  isBooking: false,
  bookingResults: null
};

// Refactored the store logic to have one store that can be used as a single
// source of truth for all the components of the app.
// A reference to the global store object should be passed as a property 
// to each component that needs it.
const store = new Store<StoreState>(
  initialState,
  Reducers,
  SideEffects
);

ReactDOM.render(
  <OrdersView store={store} />,
  document.getElementById('root')
);
