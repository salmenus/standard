import { Reducer, SideEffect } from './types';

export class Store<TState> {
    constructor(
        private state: TState,
        private readonly reducers: { [name: string]: Reducer<TState> },
        private readonly sideEffects: { [name: string]: SideEffect<TState> },
        private readonly onStateChanged: (state: TState) => void
    ) {
    }

    get currentState(): TState {
        return this.state;
    }

    // Moving function definition out of caller 'dispatchAction'
    // to avoid re-defining it each time 'dispatchAction' is called
    private onSideEffectDone = (doneAction: string, ...args: any) => {
        this.dispatchAction(doneAction, ...args);
    };

    dispatchAction = (name: string, ...rest: any) => {
        const reducer = this.reducers[name];
        if (reducer) {
            const nextState = reducer(this.state, ...rest);
            const sideEffect = this.sideEffects[name];
            if (sideEffect) {
                sideEffect(nextState, this.onSideEffectDone);
            }
            this.state = nextState;
            this.onStateChanged(this.state);
        }
    };
}
