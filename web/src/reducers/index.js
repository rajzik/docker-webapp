// @flow
// @ts-check

import { combineReducers } from 'redux';

import auth from './auth';
import messages from './message';
import friends from './friends';
import groups from './group';
import users from './users';

export default combineReducers({
    auth,
    messages,
    friends,
    groups,
    users,
});
