import { Action } from '../store/actions';
import { Reducer, SideEffect, StateChangeCallback } from './types';

export class Store<TState> {
    // Using Set container for callback functions to ensure that each callback is only registered once.
    stateChangedCallbacks: Set<StateChangeCallback<TState>> = new Set();

    constructor(
        private state: TState,
        private readonly reducers: { [name: string]: Reducer<TState> },
        private readonly sideEffects: { [name: string]: SideEffect<TState> },
    ) {
    }

    // Update store logic to allow components to subscribe and/or unsubscribe to store updates
    // as they happen. This allows a single store to be used by multiple components as needed.
    subscribe = (callback: StateChangeCallback<TState>) => {
        this.stateChangedCallbacks.add(callback);
    };

    unsubscribe = (callback: StateChangeCallback<TState>) => {
        this.stateChangedCallbacks.delete(callback);
    };

    // By indicating that the return type is a Readonly<> type, we tell typescript
    // compiler to check that any access to the value returned by this getter
    // is a readonly access and none of the state attributes can be modified outside.
    // The only way to change the state from the outside is to dispatch an action.
    get currentState(): Readonly<TState> {
        return this.state;
    }

    // Moving function definition out of caller 'dispatchAction'
    // to avoid re-defining it each time 'dispatchAction' is called
    private onSideEffectDone = (doneAction: Action, ...args: any) => {
        this.dispatchAction(doneAction, ...args);
    };

    dispatchAction = (name: Action, ...rest: any) => {
        const reducer = this.reducers[name];
        if (reducer) {
            const nextState = reducer(this.state, ...rest);

            const sideEffect = this.sideEffects[name];
            if (sideEffect) {
                sideEffect(nextState, this.onSideEffectDone);
            }

            this.state = nextState;
            this.stateChangedCallbacks.forEach(stateChangedCallback => {
                stateChangedCallback(this.state);
            });
        }
    };
}
