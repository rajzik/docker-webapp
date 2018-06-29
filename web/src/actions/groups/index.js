// @flow

import { GROUP_GET, GROUP_LOADING, GROUP_ERROR, GROUP_ADD, client } from 'constants';
import interval from 'interval-promise';

const CreateGroupQ = `
($roomName:String!){
    createRoom(roomName: $roomName) {
      roomName
    }
  }`;

const JoinGroupQ = `
($roomId:Int!){
    joinRoom(roomId:$roomId) {
      roomName
    }
}
`;
const leaveGroupQ = `
($roomId:Int!){
    leaveRoom(roomId: $roomId) {
        success
    }
}
`;

const SendMessageQ = `
($roomId:Int!,$message:String!) {
    sendRoomMessage(roomId:$roomId,message:$message) {
      message
    }
  }
`;

const groupQuery = `
{
    rooms {
      id
      roomName
      users {
        id
      }
      messages {
        id
        message
        fromUser {
          id
          username
        }
      }
    }
}
`;

let stopped = false;

function killItWithRock() {
    stopped = true;
}

function reviveWithEther() {
    stopped = false;
}

const startFetchingGroups = () => async (dispatch: (args: any) => void) => {
    interval(async (_, stop) => {
        if (stopped) {
            stop();
        }
        try {
            const { rooms: groups } = await client.query(groupQuery);
            dispatch({
                type: GROUP_GET,
                groups,
            });
        } catch (e) {
            dispatch({
                type: GROUP_ERROR,
                ...e,
            });
        }
    }, 3000);
};


function getGroups() {
    return async (dispatch: (args: any) => void) => {
        dispatch({
            type: GROUP_LOADING,
        });
        try {
            const { rooms: groups } = await client.query(groupQuery);
            dispatch({
                type: GROUP_GET,
                groups,
            });
        } catch (e) {
            dispatch({
                type: GROUP_ERROR,
                ...e,
            });
        }
    };
}

function createRoom(vars: {
    roomName: string,
}) {
    return async (dispatch: (args: any) => void) => {
        try {
            dispatch({
                type: GROUP_ADD,
                ...await client.mutate(CreateGroupQ, vars),
            });
        } catch (e) {
            dispatch({
                type: GROUP_ERROR,
                ...e,
            });
        }
        dispatch(getGroups());
    };
}

function joinRoom(roomId) {
    return async (dispatch: (args: any) => void) => {
        dispatch({
            type: GROUP_LOADING,
        });
        try {
            await client.mutate(JoinGroupQ, { roomId });
            dispatch(getGroups());
        } catch (e) {
            dispatch({
                type: GROUP_ERROR,
                ...e,
            });
        }
    };
}

function sendRoomMessage(args: {
    message: string,
    roomId: number
}) {
    return async (dispatch: (args: any) => void) => {
        dispatch({
            type: GROUP_LOADING,
        });
        try {
            await client.mutate(SendMessageQ, args);
            dispatch(getGroups());
        } catch (e) {
            dispatch({
                type: GROUP_ERROR,
                ...e,
            });
        }
    };
}
function leaveRoom(roomId) {
    return async (dispatch: (args: any) => void) => {
        dispatch({
            type: GROUP_LOADING,
        });
        try {
            await client.mutate(leaveGroupQ, { roomId });
            dispatch(getGroups());
        } catch (e) {
            dispatch({
                type: GROUP_ERROR,
            });
        }
    };
}


export {
    getGroups,
    createRoom,
    joinRoom,
    leaveRoom,
    sendRoomMessage,
    startFetchingGroups,
    killItWithRock,
    reviveWithEther,
};
