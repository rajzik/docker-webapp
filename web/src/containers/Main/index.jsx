// @flow

import PageContainer from 'components/PageContainer';
import { Friends, MessageBox, Messages, Nav } from 'containers';
import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';

@connect()
export default class Main extends Component {
    render() {
        const { props } = this;
        return (
            <PageContainer>
                <Nav {...props} area />
                <Friends {...props} />
                <Messages {...props} />
                <MessageBox {...props} />
            </PageContainer>
        );
    }
}
