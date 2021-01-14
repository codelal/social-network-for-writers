import axios from "./axios";


export async function receiveFriends(){
    const { data } = await axios.get("/api/friends");
    console.log("data /api/friends from ", data)
    return {
        type: "RECEIVE_FRIENDS",
        friendsList: data.friendsList,
    };
}

// export function fn() {
//     //we could talk to the server here
//     return {
//         type: "UPDATEE_STATE_SOMEHOW",
//         data: 12,
//     };
// }
