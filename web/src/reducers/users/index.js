// @flow
import { USERS_GET, USERS_LOADING, USERS_ERROR } from 'constants';


type ActionType = any;


const defaultState = {
    loading: false,
    users: [],
};

const friendsReducer = (state: any = defaultState, action: ActionType) => {
    switch (action.type) {
    case USERS_GET:
        return {
            ...state,
            users: action.users,
            loading: false,
        };
    case USERS_LOADING:
        return {
            ...state,
            loading: true,
        };
    case USERS_ERROR:
        return {
            ...state,
            loading: false,
        };
    default:
        return state;
    }
};

export default friendsReducer;
