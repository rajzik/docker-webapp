// @flow
import { EXAMPLE_GET, EXAMPLE_LOADING } from 'constants';

import type { ExampleType } from 'types';


type ActionType = any;


const defaultState = {
    foo: 0,
    bar: false,
    baz: 'this will be default message',
};

const exampleReducer = (state: ExampleType = defaultState, action: ActionType) => {
    switch (action.type) {
    case EXAMPLE_GET:
        return {
            ...state,
            foo: action.foo,
            bar: action.bar,
            baz: action.baz,
            loading: false,
        };
    case EXAMPLE_LOADING:
        return {
            ...state,
            loading: true,
        };
    default:
        return state;
    }
};

export default exampleReducer;
