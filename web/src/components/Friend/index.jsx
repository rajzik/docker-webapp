// @flow

import React from 'react';
import { NavLink } from 'react-router-dom';

import { friendLink, activeLink } from './friend.css';

type FriendProps = {
    id: number,
    username: string,
    email: string,
};

export default ({ id, username, email }: FriendProps) => (
    <NavLink to={`/${id}`} exact className={friendLink} activeClassName={activeLink}>
        <p>
            {username}
        </p>
        <p>
            email: {email}
        </p>
    </NavLink>);
