// @flow
// @ts-check
import interval from 'interval-promise';

import { MESSAGES_GET, MESSAGES_LOADING, MESSAGES_ERROR, MESSAGES_SEND, client } from 'constants';


type SendMessageType = {
    message: string,
    user: number,
};

let stopped = false;

function killItWithFire() {
    stopped = true;
}

function reviveWithWater() {
    stopped = false;
}

const SendMessageQ = `
($message:String!, $user:Int!){
    sendMessage(message:$message, userId:$user) {
        message
    }
}`;

const messageQuery = `
{
    me{
        messages{
            id
            created
            message
            fromUser {
                id
            }
            userSet {
                id
            }
        }
    }
}
`;


const startFetching = () => async (dispatch: (args: any) => void) => {
    interval(async (_, stop) => {
        if (stopped) {
            stop();
        }
        try {
            const { me: { messages } } = await client.query(messageQuery);
            dispatch({
                type: MESSAGES_GET,
                messages,
            });
        } catch (e) {
            dispatch({
                type: MESSAGES_ERROR,
            });
        }
    }, 3000);
};

function getMessages() {
    return async (dispatch: (args: any) => void) => {
        dispatch({
            type: MESSAGES_LOADING,
        });
        try {
            const { me: { messages } } = await client.query(messageQuery);
            dispatch({
                type: MESSAGES_GET,
                messages,
            });
        } catch (e) {
            dispatch({
                type: MESSAGES_ERROR,
            });
        }
    };
}

function sendMessage(vars: SendMessageType) {
    return async (dispatch: (args: any) => void) => {
        dispatch({
            type: MESSAGES_LOADING,
        });
        try {
            dispatch({
                type: MESSAGES_SEND,
                ...await client.mutate(SendMessageQ, vars),
            });
        } catch (e) {
            dispatch({
                type: MESSAGES_ERROR,
            });
        }
        dispatch(getMessages());
    };
}

export { getMessages, sendMessage, startFetching, killItWithFire, reviveWithWater };
