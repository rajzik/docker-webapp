// @flow

import { getFriends } from 'actions';
import { Group } from 'components';
import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import { friend } from './groups.css';


type GroupsProps = {
    groups: Array<mixed>,
    dispatch: (args: any) => void;
}
@connect(({ groups: { groups } }) => ({ groups }), dispatch => ({ dispatch }))
export default class Groups extends Component<GroupsProps> {
    constructor(props: FriendsProps) {
        super(props);
        props.dispatch(getFriends());
    }
    render() {
        const { groups } = this.props;
        return (
            <div className={friend}>
                {groups.map(item => <Group key={`friend-${item.id}`} {...item} />)}
            </div>);
    }
}
