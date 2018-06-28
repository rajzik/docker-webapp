// @flow

import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import { FlatButton, Textarea } from 'components';

import { messageBox } from './messagebox.css';

@connect()
export default class MessageBox extends Component {
    render() {
        return (
            <div className={messageBox} >
                <Textarea placeholder="Type something" />
                <FlatButton>Send</FlatButton>
            </div>);
    }
}
