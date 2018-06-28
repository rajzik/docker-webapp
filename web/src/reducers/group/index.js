// @flow
import { GROUP_GET, GROUP_LOADING, GROUP_ERROR } from 'constants';


type ActionType = any;


const defaultState = {
    loading: false,
    groups: [],
};

const groupReducer = (state: any = defaultState, action: ActionType) => {
    switch (action.type) {
    case GROUP_GET:
        return {
            ...state,
            groups: action.groups,
            loading: false,
        };
    case GROUP_LOADING:
        return {
            ...state,
            loading: true,
        };
    case GROUP_ERROR:
        return {
            ...state,
            loading: false,
        };
    default:
        return state;
    }
};

export default groupReducer;
