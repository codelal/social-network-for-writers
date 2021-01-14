export function reducer(state = {}, action) {

    if (action.type == "RECEIVE_FRIENDS") {
        state = {
            ...state,
            friendsList: action.friendsList,
        };
    }
       
        return state;
}





// const obj = {
//     first: "anna",
// };

// const newObj = {
//     ...obj,
//     last: "kell",
// };

// const arr = [1, 2, 3];
// const newArr = [...arr];
