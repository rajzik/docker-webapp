// @flow

import React from 'react';
import { Button } from 'components';

import { row } from './friend-item.css';

type GroupItemProps = {
    username: string,
    onFriend: () => void,
    onUnfriend: () => void,
    users: Array<mixed>,
    userId: string,
};

export default ({
    username, users, userId, onFriend, onUnfriend,
}: GroupItemProps) => {
    const isThere = users.some(user => user.id === userId);
    return (
        <div className={row}>
            <p>{username}</p>
            {
                !isThere ?
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
