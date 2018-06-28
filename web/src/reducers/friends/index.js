// @flow
import { FRIENDS_GET, FRIENDS_LOADING, FRIENDS_ERROR } from 'constants';


type ActionType = any;


const defaultState = {
    loading: false,
    friends: [],
};

const friendsReducer = (state: any = defaultState, action: ActionType) => {
    switch (action.type) {
    case FRIENDS_GET:
        return {
            ...state,
            friends: action.friends,
            loading: false,
        };
    case FRIENDS_LOADING:
        return {
            ...state,
            loading: true,
        };
    case FRIENDS_ERROR:
        return {
            ...state,
            loading: false,
        };
    default:
        return state;
    }
};

export default friendsReducer;
