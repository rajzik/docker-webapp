// @flow
// @ts-check

import {
    FRIENDS_LOADING,
    FRIENDS_GET,
    FRIENDS_ERROR,
    FRIENDS_ADD,
    client,
} from 'constants';


const FriendsQ = `
{
    me {
        friends {
            id,
            username,
            email
        }
    }
}
`;

const AddFriendQ = `
($user:Int!){
    addFriend(userId:$user) {
      user{
        id,
        username
      }
    }
  }`;

function getFriends() {
    return async (dispatch: (args: any) => void) => {
        dispatch({ type: FRIENDS_LOADING });
        const { me: { friends } } = await client.query(FriendsQ);
        try {
            dispatch({
                type: FRIENDS_GET,
                friends,
            });
        } catch (e) {
            dispatch({
                type: FRIENDS_ERROR,
            });
        }
    };
}

function addFriend(args: {user: number}) {
    return async (dispatch: (args: any) => void) => {
        dispatch({ type: FRIENDS_LOADING });
        try {
            dispatch({
                type: FRIENDS_ADD,
                ...await client.mutate(AddFriendQ, args),
            });
        } catch (e) {
            dispatch({
                type: FRIENDS_ERROR,
            });
        }
    };
}


export { getFriends, addFriend };
