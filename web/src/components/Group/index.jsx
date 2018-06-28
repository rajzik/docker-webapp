// @flow

import React from 'react';
import { NavLink } from 'react-router-dom';
import { activeLink, groupLink } from './group.css';


type GroupProps = {
    id: number,
    name: string,
};

export default ({ id, name }: GroupProps) => (
    <NavLink to={`/${id}`} exact className={groupLink} activeClassName={activeLink}>
        <p>
            {name}
        </p>
    </NavLink>);
