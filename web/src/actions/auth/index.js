// @flow
// @ts-check

import { AUTH_POST, AUTH_LOADING, AUTH_ERROR, client } from 'constants';

type LoginType = {
    username: string,
    password: string,
};

const LoginQuery = `
    ($username: String!, $password: String!){
        login(username: $username, password: $password) {
            token
        }
    }
`;

function login(vars: LoginType) {
    return async (dispatch: (args: any) => void) => {
        dispatch({
            type: AUTH_LOADING,
        });
        try {
            dispatch({
                type: AUTH_POST,
                ...await client.mutate(LoginQuery, vars),
            });
        } catch (e) {
            dispatch({
                type: AUTH_ERROR,
            });
        }
    };
}

// eslint-disable-next-line
export { login };
