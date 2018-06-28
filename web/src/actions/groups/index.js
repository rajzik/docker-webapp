// @flow

import { GROUP_GET, GROUP_LOADING, GROUP_ERROR, GROUP_ADD, client } from 'constants';

const CreateGroupQ = `
($roomName:String!){
    createRoom(roomName: $roomName) {
      roomName
    }
  }`;

const groupQuery = `
{
    rooms {
        id
        roomName
        admin {
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
            });
        }
        dispatch(getGroups());
    };
}

export { getGroups, createRoom };
