import axios from "./axios";
import { BUTTON_TEXT } from "./friends";

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
    console.log("data post(/api/friendship-action/", data, data.text);

    if ((data.text == BUTTON_TEXT.UNFRIEND)) {
        console.log("ja1", data.text);
        return {
            type: "ACCEPT_REQUEST",
            otherUserId: otherUserId,
        };
    }

    if ((data.text == BUTTON_TEXT.MAKE_REQUEST)) {
        console.log("delete friends data /api/friendship-action/", data.text);
        return {
            type: "UNFRIEND",
            otherUserId: otherUserId,
        };
    }
}
