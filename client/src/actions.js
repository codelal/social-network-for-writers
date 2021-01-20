import axios from "./axios";
import { BUTTON_TEXT } from "./friends";

export async function receiveFriendsList() {
    const { data } = await axios.get("/api/friends");

    return {
        type: "RECEIVE_FRIENDS",
        friendsList: data.rows,
        userId: data.userId,
    };
}

export async function handleRequest(otherUserId, button) {
    let btnData = {
        button: button,
        otherUserId: otherUserId,
    };

    const { data } = await axios.post("/api/friendship-action/", btnData);

    if (data.text == BUTTON_TEXT.UNFRIEND) {
        return {
            type: "ACCEPT_REQUEST",
            otherUserId: otherUserId,
        };
    }

    if (data.text == BUTTON_TEXT.MAKE_REQUEST) {
        return {
            type: "UNFRIEND",
            otherUserId: otherUserId,
        };
    }
}

export function postNewMessage(messageAndUserData) {
    return {
        type: "POST MESSAGE",
        newMessage: messageAndUserData,
    };
}

export function postRecentMesssages(mostRecentMessages) {
    console.log("mostRecentMessages in action", mostRecentMessages);
    return {
        type: "RECEIVE_MOST_RECENT_MESSAGES",
        mostRecentMessages: mostRecentMessages,
    };
}