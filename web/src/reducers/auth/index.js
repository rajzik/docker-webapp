// @flow
import { AUTH_POST, AUTH_LOADING } from 'constants';

import type { AuthType } from 'types';


type ActionType = any;


const defaultState = {
    authenticated: false,
    loading: false,
    token: null,
};

const authReducer = (state: AuthType = defaultState, action: ActionType) => {
    switch (action.type) {
    case AUTH_POST:
        return {
            ...state,
            authenticated: true,
            token: action.login.token,
            loading: false,
        };
    case AUTH_LOADING:
        return {
            ...state,
            loading: true,
        };
    default:
        return state;
    }
};

export default authReducer;
