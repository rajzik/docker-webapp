// @flow

import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import { ListView, FriendItem, Loading } from 'components';
import { Nav } from 'containers';
import { getUsers, addFriend, removeFriend } from 'actions';


type JoinGroupProps = {
    dispatch: (args: any) => void,
    groups: mixed,
    userId: string,
    loading: boolean,
}

@connect(({
    users: { users, loading },
    auth: { me: { id: userId } },
    friends: { friends },
}) => ({
    users, userId, friends, loading,
}), dispatch => ({ dispatch }))
export default class JoinGroup extends Component<JoinGroupProps> {
    constructor(props: JoinGroupProps) {
        super(props);
        this.props.dispatch(getUsers());
    }
    addFriend = id => () => {
        this.props.dispatch(addFriend({ user: id }));
    }

    removeFriend = id => () => {
        this.props.dispatch(removeFriend({ user: id }));
    }
    render() {
        const { props } = this;
        const {
            users, userId, friends, loading,
        } = props;
        return (
            <ListView>
                <Nav {...props} />
                {
                    loading ?
                        <Loading /> :
                        users.map(item => (
                            <FriendItem
                                key={`friend-${item.id}`}
                                {...item}
                                userId={userId}
                                friends={friends}
                                onFriend={this.addFriend(item.id)}
                                onUnfriend={this.removeFriend(item.id)}
                            />))
                }
            </ListView>
        );
    }
}
