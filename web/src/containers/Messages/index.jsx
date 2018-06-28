// @flow

import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import { getMessages } from 'actions';
import { Message } from 'components';

import { chat } from './messages.css';

type MessagesProps = {
    dispatch: (args: any) => void,
    messages: Array<mixed>
};

@connect(({ messages: { messages } }) => ({ messages }), dispatch => ({ dispatch }))
export default class Messages extends Component<MessagesProps> {
    constructor(props: MessagesProps) {
        super(props);
        props.dispatch(getMessages());
    }

    render() {
        const { messages } = this.props;
        return (
            <div className={chat}>
                {
                    messages.map(message => (
                        <Message {...message} />
                    ))
                }
            </div>);
    }
}
