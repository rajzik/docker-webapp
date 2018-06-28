// @flow

import { NavLink } from 'components';
import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import classnames from 'classnames';
import { nav, navArea } from './nav.css';

type NavProps = {
    area: boolean,
}

@connect()
export default class Nav extends Component<NavProps> {
    render() {
        return (
            <div className={classnames(nav, {
                [navArea]: this.props.area,
            })}
            >
                <NavLink to="/" >Friends</NavLink>
                <NavLink to="/group" >Groups</NavLink>
                <NavLink to="/add-friend" >Add friend</NavLink>
                <NavLink to="/join-group" >Find group</NavLink>
            </div>);
    }
}
