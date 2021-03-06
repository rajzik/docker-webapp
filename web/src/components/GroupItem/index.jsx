// @flow

import React from 'react';
import { Button } from 'components';

import { row } from './group-item.css';

type GroupItemProps = {
    roomName: string,
    onJoin: () => void,
    onLeave: () => void,
    users: Array<mixed>,
    userId: string,
};

export default ({
    roomName, users, userId, onJoin, onLeave,
}: GroupItemProps) => {
    const isThere = users.some(user => user.id === userId);
    return (
        <div className={row}>
            <p>{roomName}</p>
            {
                !isThere ?
                    <Button onClick={onJoin}>
                        Join
                    </Button> :
                    <Button onClick={onLeave}>
                        Leave
                    </Button>
            }
        </div>
    );
};
