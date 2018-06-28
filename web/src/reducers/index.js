// @flow
// @ts-check

import { combineReducers } from 'redux';

import auth from './auth';
import messages from './message';
import friends from './friends';
import groups from './group';

export default combineReducers({
    auth,
    messages,
    friends,
    groups,
});
