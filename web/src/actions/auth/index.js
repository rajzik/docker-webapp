// @flow
// @ts-check

import { AUTH_POST, AUTH_LOADING, AUTH_ERROR, AUTH_REGISTER, client } from 'constants';

type LoginType = {
    username: string,
    password: string,
};
type RegisterType = LoginType | {
    email: string,
};


const RegisterQuery = `
($username:String!, $password: String!, $email: String!) {
    createUser(username:$username, password:$password, email:$email) {
      user {
        id,
        username,
        email
      }
    }
  }`;

const LoginQuery = `
    ($username: String!, $password: String!){
        login(username: $username, password: $password) {
            token
        }
    }
`;

const meQuery = `
{
    me{
      id
      friends {
        id
      }
    }
  }
`;

function register(vars: RegisterType) {
    return async (dispatch: (args: any) => void) => {
        dispatch({
            type: AUTH_LOADING,
        });
        try {
            dispatch({
                type: AUTH_REGISTER,
                ...await client.mutate(RegisterQuery, vars),
            });
        } catch (e) {
            dispatch({
                type: AUTH_ERROR,
            });
        }
        try {
            dispatch({
                type: AUTH_POST,
                ...await client.mutate(LoginQuery, {
                    username: vars.username,
                    password: vars.password,
                }),
            });
        } catch (e) {
            dispatch({
                type: AUTH_ERROR,
            });
        }
    };
}

function login(vars: LoginType) {
    return async (dispatch: (args: any) => void) => {
        dispatch({
            type: AUTH_LOADING,
        });
        try {
            dispatch({
                type: AUTH_POST,
                ...await client.mutate(LoginQuery, vars),
                ...await client.query(meQuery),
            });
        } catch (e) {
            dispatch({
                type: AUTH_ERROR,
            });
        }
    };
}

export { login, register };
