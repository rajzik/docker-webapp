// @flow
import { AUTH_POST, AUTH_LOADING, AUTH_REGISTER } from 'constants';

import type { AuthType } from 'types';


type ActionType = any;


const defaultState = {
    authenticated: false,
    loading: false,
    token: null,
    me: null,
};

const authReducer = (state: AuthType = defaultState, action: ActionType) => {
    switch (action.type) {
    case AUTH_POST:
        return {
            ...state,
            authenticated: true,
            token: action.login.token,
            me: action.me,
            loading: false,
        };
    case AUTH_LOADING:
        return {
            ...state,
            loading: true,
        };
    case AUTH_REGISTER:
        return {
            ...state,
            loading: false,
        };
    default:
        return state;
    }
};

export default authReducer;
