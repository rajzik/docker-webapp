// @flow

import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import { ListView, GroupItem } from 'components';
import { Nav } from 'containers';
import { getGroups } from 'actions';

type JoinGroupProps = {
    dispatch: (args: any) => void,
    groups: mixed,
}

@connect(({ groups: { groups } }) => ({ groups }), dispatch => ({ dispatch }))
export default class JoinGroup extends Component<JoinGroupProps> {
    constructor(props: JoinGroupProps) {
        super(props);
        this.props.dispatch(getGroups());
    }
    render() {
        const { props } = this;
        const { groups } = props;
        return (
            <ListView>
                <Nav {...props} />
                {
                    groups.map(item => <GroupItem key={`group-${item.id}`} {...item} />)
                }
            </ListView>
        );
    }
}
