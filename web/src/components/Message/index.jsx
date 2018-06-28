// @flow

import classnames from 'classnames';
import React from 'react';
import { friend, me, msg } from './message.css';


type MessageProps = {
    friendId: string,
    message: string,
    fromUser: mixed,
}
export default function Message({
    friendId, message, fromUser,
}: MessageProps) {
    return (
        <div className={classnames(msg, {
            [me]: friendId !== fromUser.id,
            [friend]: friendId === fromUser.id,
        })}
        >
            {message}
        </div>
    );
}
