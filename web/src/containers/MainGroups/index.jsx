// @flow

import PageContainer from 'components/PageContainer';
import { Groups, MessageBox, Messages, Nav } from 'containers';
import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';

@connect()
export default class Main extends Component {
    render() {
        const { props } = this;
        return (
            <PageContainer>
                <Nav {...props} />
                <Groups {...props} />
                <Messages {...props} />
                <MessageBox {...props} />
            </PageContainer>
        );
    }
}
