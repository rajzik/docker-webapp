// @flow
// @ts-check

import {
    FRIENDS_LOADING,
    FRIENDS_GET,
    FRIENDS_ERROR,
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

const removeFriendQ = `
($user:Int!){
    removeFriend(userId:$user) {
      success
    }
  }
`;
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
            await client.mutate(AddFriendQ, args);
            dispatch(getFriends());
        } catch (e) {
            dispatch({
                type: FRIENDS_ERROR,
            });
        }
    };
}

function removeFriend(args: {user: number}) {
    return async (dispatch: (args: any) => void) => {
        dispatch({ type: FRIENDS_LOADING });
        try {
            await client.mutate(removeFriendQ, args);
            dispatch(getFriends());
        } catch (e) {
            dispatch({
                type: FRIENDS_ERROR,
            });
        }
    };
}

export { getFriends, addFriend, removeFriend };
