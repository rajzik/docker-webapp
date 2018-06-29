// @flow

import { GroupMessage } from 'components';
import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import { chat } from './messages.css';


type MessagesProps = {
    dispatch: (args: any) => void,
    groups: Array<mixed>,
    match: mixed,
    self: string,
};

@connect(({
    groups: { groups },
    auth: { me: { id: self } },
}) => ({
    groups, self,
}), dispatch => ({ dispatch }))
export default class Messages extends Component<MessagesProps> {
    state = {
        messages: [],
    }
    componentWillReceiveProps(nextProps: MessagesProps) {
        if (nextProps.match) {
            const matchId = nextProps.match.params.id;
            const a = nextProps.groups.find(item => item.id === matchId);
            if (a) {
                this.setState({
                    messages: a.messages,
                });
            }
        }
    }
    componentDidUpdate() {
        if (window.innerHeight + window.scrollY === document.height - 200) {
            window.scrollTo(0, document.body.scrollHeight);
        }
    }

    render() {
        const { messages } = this.state;
        const { self } = this.props;
        return (
            <div className={chat}>
                {
                    messages.map(message => (
                        <GroupMessage self={self} key={message.id} {...message} />
                    ))
                }
                <div />
            </div>);
    }
}
