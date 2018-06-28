// @flow

import PageContainer from 'components/PageContainer';
import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import { Friends, Messages, MessageBox, Nav } from 'containers';

@connect()
export default class Main extends Component {
    render() {
        return (
            <PageContainer>
                <Nav />
                <Friends />
                <Messages />
                <MessageBox />
            </PageContainer>
        );
    }
}
