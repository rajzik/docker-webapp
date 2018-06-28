// @flow
// @ts-check

import { login, register } from './auth';
import { getMessages, sendMessage, startFetching } from './messages';
import { addFriend, getFriends } from './friends';
import { createRoom, getGroups, joinRoom, leaveRoom } from './groups';

export {
    login,
    register,
    getMessages,
    sendMessage,
    addFriend,
    getFriends,
    startFetching,
    createRoom,
    getGroups,
    joinRoom,
    leaveRoom,
};
