// @flow
import { MESSAGES_GET, MESSAGES_LOADING, MESSAGES_ERROR } from 'constants';


type ActionType = any;


const defaultState = {
    loading: false,
    messages: [],
};

const authReducer = (state: any = defaultState, action: ActionType) => {
    switch (action.type) {
    case MESSAGES_GET:
        return {
            ...state,
            messages: action.messages,
            loading: false,
        };
    case MESSAGES_LOADING:
        return {
            ...state,
            loading: true,
        };
    case MESSAGES_ERROR:
        return {
            ...state,
            loading: false,
        };
    default:
        return state;
    }
};

export default authReducer;
