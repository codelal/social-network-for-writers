import io from "socket.io-client";
export let socket;
import { postNewMessage, postRecentMesssages } from "./actions";
export const init = (store) => {
    //make sure 1user has one socket independly fron the number f open tabs
    if (!socket) {
        socket = io.connect();
    }
    socket.on("message and user data", (messageAndUserData) => {
        //console.log("messageAndUserData", messageAndUserData);
        store.dispatch(postNewMessage(messageAndUserData));
    });

    socket.on("ten most recent messages", (mostRecentMessages) => {
        //console.log("mostRecentMessages", mostRecentMessages);
        store.dispatch(postRecentMesssages(mostRecentMessages));
    });
};