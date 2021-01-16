
export function reducer(state = {}, action) {
    if (action.type == "RECEIVE_FRIENDS") {
        state = {
            ...state,
            friendsList: action.friendsList,
            userId: action.userId,
        };
    }

    if (action.type == "ACCEPT_REQUEST") {
        state = {
            ...state,
            friendsList: state.friendsList.map((friend) => {
                if (friend.id == action.otherUserId) {
                    return {
                        ...friend,
                        accepted: true,
                    };
                } else {
                    return friend;
                }
            }),
        };
    }

    if (action.type == "UNFRIEND") {
        state = {
            ...state,
            friendsList: state.friendsList.filter(
                (friend) => friend.id !== action.otherUserId
            ),
        };
    }

    return state;
}
