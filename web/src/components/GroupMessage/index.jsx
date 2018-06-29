// @flow

import classnames from 'classnames';
import React from 'react';
import { friend, me, msg } from './message.css';


type MessageProps = {
    self: string,
    message: string,
    fromUser: mixed,
}
export default function Message({
    message, fromUser, self,
}: MessageProps) {
    return (
        <div className={classnames(msg, {
            [friend]: self !== fromUser.id,
            [me]: self === fromUser.id,
        })}
        >
            <h2>{fromUser.username}</h2>
            {message}
        </div>
    );
}
