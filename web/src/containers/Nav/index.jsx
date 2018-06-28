// @flow

import { NavLink } from 'components';
import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import { nav } from './nav.css';


@connect()
export default class Nav extends Component {
    render() {
        return (
            <div className={nav}>
                <NavLink to="/group" >Groups</NavLink>
                <NavLink to="/add-friend" >Add friend</NavLink>
                <NavLink to="/join-group" >Find group</NavLink>
            </div>);
    }
}
