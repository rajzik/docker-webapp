// @flow

import { getMessages, startFetching, reviveWithWater, killItWithFire } from 'actions';
import { Message } from 'components';
import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import { chat } from './messages.css';


type MessagesProps = {
    dispatch: (args: any) => void,
    messages: Array<mixed>,
    match: mixed,
};

@connect(({ messages: { messages } }) => ({ messages }), dispatch => ({ dispatch }))
export default class Messages extends Component<MessagesProps> {
    constructor(props: MessagesProps) {
        super(props);
        props.dispatch(getMessages());
    }
    state = {
        messages: [],
        matchId: 0,
    }
    componentDidMount() {
        reviveWithWater();
        this.props.dispatch(startFetching());
        window.scrollTo(0, document.body.scrollHeight);
    }

    componentWillReceiveProps(nextProps: MessagesProps) {
        if (nextProps.match) {
            const matchId = nextProps.match.params.id;
            const messages = nextProps.messages.filter((item) => {
                const { id } = item.userSet[1];
                const { id: id2 } = item.userSet[0];
                return id === matchId || id2 === matchId;
            });
            this.setState({
                messages,
                matchId,
            });
        }
    }
    componentDidUpdate() {
        if (window.innerHeight + window.scrollY === document.height - 200) {
            window.scrollTo(0, document.body.scrollHeight);
        }
    }

    componentWillUnmount() {
        killItWithFire();
    }
    render() {
        const { messages, matchId } = this.state;
        return (
            <div className={chat}>
                {
                    messages.map(message => (
                        <Message key={message.id} friendId={matchId} {...message} />
                    ))
                }
            </div>);
    }
}
