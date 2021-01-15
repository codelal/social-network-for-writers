import axios from "./axios";

export async function receiveFriendsList() {
    const { data } = await axios.get("/api/friends");
    console.log(
        "data from  /api/friends, data.userId, data.rows",
        data.userId,
        data.rows
    );
    return {
        type: "RECEIVE_FRIENDS",
        friendsList: data.rows,
        userId: data.userId,
    };
}

export async function handleRequest(otherUserId, button) {
    console.log("wannabeid", otherUserId, button);

    let btnData = {
        button: button,
        otherUserId: otherUserId,
    };

    const { data } = await axios.post("/api/friendship-action/", btnData);
    console.log("data post(/api/friendship-action/", data);
    return {
        type: "ACCEPT_FRIEND",
        btnText: data,
    };
}

