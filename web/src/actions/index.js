// @flow
// @ts-check

import { login, register } from './auth';
import { getMessages, sendMessage, startFetching, killItWithFire, reviveWithWater } from './messages';
import { removeFriend, addFriend, getFriends } from './friends';
import { createRoom, getGroups, joinRoom, leaveRoom, sendRoomMessage, killItWithRock, reviveWithEther, startFetchingGroups } from './groups';
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
    sendRoomMessage,
    killItWithFire,
    reviveWithWater,
    killItWithRock,
    reviveWithEther,
    startFetchingGroups,
};
