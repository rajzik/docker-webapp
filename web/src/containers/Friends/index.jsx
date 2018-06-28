// @flow

import { getFriends } from 'actions';
import { Friend } from 'components';
import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import { friend } from './friends.css';


type FriendsProps = {
    friends: Array<mixed>,
    dispatch: (args: any) => void;
}
@connect(({ friends: { friends } }) => ({ friends }), dispatch => ({ dispatch }))
export default class Friends extends Component<FriendsProps> {
    constructor(props: FriendsProps) {
        super(props);
        props.dispatch(getFriends());
    }
    render() {
        const { friends } = this.props;
        return (
            <div className={friend}>
                {friends.map(item => <Friend key={`friend-${item.id}`} {...item} />)}
            </div>);
    }
}
