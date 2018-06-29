// @flow

import { USERS_GET, USERS_LOADING, USERS_ERROR, client } from 'constants';

const usersQuery = `
{
    users {
      id
      username
      email
    }
}
`;


function getUsers() {
    return async (dispatch: (args: any) => void) => {
        dispatch({
            type: USERS_LOADING,
        });
        try {
            const { users } = await client.query(usersQuery);
            dispatch({
                type: USERS_GET,
                users,
            });
        } catch (e) {
            dispatch({
                type: USERS_ERROR,
                ...e,
            });
        }
    };
}


export default getUsers;
