export function reducer(state = {}, action) {
    if (action.type == "RECEIVE_FRIENDS") {
        state = {
            ...state,
            friendsList: action.friendsList,
            userId: action.userId,
        };
    }

    return state;
}


