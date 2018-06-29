// @flow

import React from 'react';
import { NavLink } from 'react-router-dom';
import { activeLink, groupLink } from './group.css';


type GroupProps = {
    id: number,
    roomName: string,
};

export default ({ id, roomName }: GroupProps) => (
    <NavLink to={`/group/${id}`} exact className={groupLink} activeClassName={activeLink}>
        <p>
            {roomName}
        </p>
    </NavLink>);
