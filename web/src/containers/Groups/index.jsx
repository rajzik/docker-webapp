// @flow

import { getGroups, reviveWithEther, killItWithRock, startFetchingGroups } from 'actions';
import { Group } from 'components';
import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import { group } from './groups.css';


type GroupsProps = {
    groups: Array<mixed>,
    dispatch: (args: any) => void;
}
@connect(({ groups: { groups } }) => ({ groups }), dispatch => ({ dispatch }))
export default class Groups extends Component<GroupsProps> {
    constructor(props: GroupsProps) {
        super(props);
        props.dispatch(getGroups());
    }
    componentDidMount() {
        reviveWithEther();
        this.props.dispatch(startFetchingGroups());
    }
    componentWillUnmount() {
        killItWithRock();
    }
    render() {
        const { groups } = this.props;
        return (
            <div className={group}>
                {groups.map(item => <Group key={`friend-${item.id}`} {...item} />)}
            </div>);
    }
}
