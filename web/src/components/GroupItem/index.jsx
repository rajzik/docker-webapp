// @flow

import React from 'react';
import { Button } from 'components';

import { row } from './group-item.css';

type GroupItemProps = {
    roomName: string,
    onJoin: () => void,
    onLeave: () => void,
};

export default ({ roomName, onJoin, onLeave }: GroupItemProps) => (
    <div className={row}>
        <p>{roomName}</p>
        <Button onClick={onJoin}>
            Join
        </Button>
        <Button onClick={onLeave}>
            Leave
        </Button>
    </div>
);
