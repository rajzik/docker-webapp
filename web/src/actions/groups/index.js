// @flow

import { GROUP_GET, GROUP_LOADING, GROUP_ERROR, GROUP_ADD, client } from 'constants';

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

const groupQuery = `
{
    rooms {
      id
      roomName
      users {
        id
      }
    }
}
`;


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


export { getGroups, createRoom, joinRoom, leaveRoom };
