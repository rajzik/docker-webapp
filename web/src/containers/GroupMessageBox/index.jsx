// @flow

import { sendRoomMessage } from 'actions';
import { FlatButton, Textarea } from 'components';
import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import { messageBox } from './messagebox.css';

type MessageBoxProps = {
    dispatch: (args: any) => void,
    match: mixed,
}

@connect(_ => _, dispatch => ({ dispatch }))
export default class MessageBox extends Component<MessageBoxProps> {
    state = {
        message: '',
    }
    setMessage = ({ target: { value: message } }) => {
        this.setState({
            message,
        });
    }
    sendMessage = () => {
        const { message } = this.state;
        if (!this.props.match) return;
        const { id } = this.props.match.params;
        if (id && message) {
            this.props.dispatch(sendRoomMessage({
                message,
                roomId: parseInt(id, 10),
            }));
            this.setState({
                message: '',
            });
        }
    }
    render() {
        const { message } = this.state;
        return (
            <div className={messageBox} >
                <Textarea placeholder="Type something" value={message} onChange={this.setMessage} />
                <FlatButton onClick={this.sendMessage}>Send</FlatButton>
            </div>);
    }
}
