// @flow
// @ts-check

import { login, register } from './auth';
import { getMessages, sendMessage, startFetching } from './messages';
import { removeFriend, addFriend, getFriends } from './friends';
import { createRoom, getGroups, joinRoom, leaveRoom } from './groups';
import getUsers from './users';

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
    getUsers,
    removeFriend,
};
