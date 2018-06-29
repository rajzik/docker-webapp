// @flow

import React from 'react';
import { Button } from 'components';

import { row } from './friend-item.css';

type GroupItemProps = {
    username: string,
    onFriend: () => void,
    onUnfriend: () => void,
    friends: Array<mixed>,
    userId: string,
    id: string,
};

export default ({
    id, username, friends, userId, onFriend, onUnfriend,
}: GroupItemProps) => {
    const areWeFriends = friends.some(({ id: friendId }) => friendId === id);
    if (id === userId) return null;
    return (
        <div className={row}>
            <p>{username}</p>
            {
                !areWeFriends ?
                    <Button onClick={onFriend}>
                        Make friend
                    </Button> :
                    <Button onClick={onUnfriend}>
                        Unfriend
                    </Button>
            }
        </div>
    );
};
