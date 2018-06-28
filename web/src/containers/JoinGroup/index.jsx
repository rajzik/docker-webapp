// @flow

import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import { ListView, GroupItem, Input, Button } from 'components';
import { Nav } from 'containers';
import { getGroups, joinRoom, leaveRoom, createRoom } from 'actions';

import { form } from './join.css';

type JoinGroupProps = {
    dispatch: (args: any) => void,
    groups: mixed,
    userId: string,
}

@connect(({
    groups: { groups },
    auth: { me: { id: userId } },
}) => ({ groups, userId }), dispatch => ({ dispatch }))
export default class JoinGroup extends Component<JoinGroupProps> {
    constructor(props: JoinGroupProps) {
        super(props);
        this.props.dispatch(getGroups());
    }
    state = {
        name: '',
    }
    changeName = ({ target: { value: name } }) => {
        this.setState({
            name,
        });
    }
    createRoom = () => {
        if (!this.state.name) return;
        this.props.dispatch(createRoom({ roomName: this.state.name }));
        this.setState({
            name: '',
        });
    }
    joinGroup = groupId => () => {
        this.props.dispatch(joinRoom(groupId));
    }

    leaveGroup = groupId => () => {
        this.props.dispatch(leaveRoom(groupId));
    }
    render() {
        const { props } = this;
        const { groups, userId } = props;
        return (
            <ListView>
                <Nav {...props} />
                {
                    groups.map(item => <GroupItem key={`group-${item.id}`} {...item} userId={userId} onJoin={this.joinGroup(item.id)} onLeave={this.leaveGroup(item.id)} />)
                }
                <div className={form}>
                    <Input type="text" placeholder="RoomName" value={this.state.name} onChange={this.changeName} />
                    <Button onClick={this.createRoom}>
                        Create room
                    </Button>
                </div>
            </ListView>
        );
    }
}
