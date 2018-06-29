// @flow

import PageContainer from 'components/PageContainer';
import { Groups, GroupMessageBox, GroupMessages, Nav } from 'containers';
import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';

@connect()
export default class Main extends Component {
    render() {
        const { props } = this;
        return (
            <PageContainer>
                <Nav {...props} area />
                <Groups {...props} />
                <GroupMessages {...props} />
                <GroupMessageBox {...props} />
            </PageContainer>
        );
    }
}
