// @flow

import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import { NavLink } from 'components';

import { nav } from './nav.css';

@connect()
export default class Nav extends Component {
    render() {
        return (
            <div className={nav}>
                <NavLink to="/add-friend" >Add friend</NavLink>
                <NavLink to="/join-group" >Find group</NavLink>
            </div>);
    }
}
