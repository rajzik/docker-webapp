// @flow

import PageContainer from 'components/PageContainer';
import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';

@connect()
export default class Main extends Component {
    render() {
        return (
            <PageContainer />
        );
    }
}
