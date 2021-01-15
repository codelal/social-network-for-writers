import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { receiveFriendsList, handleRequest } from "./actions";
// import { BUTTON_TEXT } from "./src/client/server/getButtonText.js";

const BUTTON_TEXT = {
    MAKE_REQUEST: "Make Friend Request",
    CANCEL_REQUEST: "Cancel Request",
    ACCEPT_REQUEST: "Accept Request",
    UNFRIEND: "Unfriend",
};

export default function Friends() {
    const [btnAccept, setbtnAccept] = useState(BUTTON_TEXT.ACCEPT_REQUEST);
    const [btnUnfriend, setbtnUnfriend] = useState(BUTTON_TEXT.UNFRIEND);
    const [error, setError] = useState(false);

    const dispatch = useDispatch();
    const wannabeList = useSelector(
        (state) =>
            state.friendsList &&
            state.friendsList.filter((friend) => friend.accepted == false)
    );
    const friendsList = useSelector(
        (state) =>
            state.friendsList &&
            state.friendsList.filter((friend) => friend.accepted)
    );

    const userId = useSelector((state) => state.userId);

    // console.log("userId", userId);

    useEffect(() => {
        dispatch(receiveFriendsList());
        console.log("useEffect runs");
    }, []);

    const wannabes = (
        <div className="wannabes">
            {wannabeList &&
                wannabeList.map((wannabe) => (
                    <div className="wannabe" key={wannabe.id}>
                        <p>
                            {wannabe.first} {wannabe.last}
                        </p>
                        <img src={wannabe.url} />
                        <button
                            onClick={() =>
                                dispatch(handleRequest(wannabe.id, btnAccept))
                            }
                        >
                            {btnAccept}
                        </button>
                    </div>
                ))}
        </div>
    );
    const friends = (
        <div className="friends">
            {friendsList &&
                friendsList.map((friend) => (
                    <div className="friend" key={friend.id}>
                        <p>
                            {friend.first} {friend.last}
                        </p>
                        <img src={friend.url} />
                        <button
                            onClick={() =>
                                dispatch(handleRequest(wannabe.id, btnUnfriend))
                            }
                        >
                            {btnUnfriend}
                        </button>
                    </div>
                ))}
        </div>
    );

    return (
        <div>
            <h2>Friend Component</h2>
            <div>{wannabes}</div>
            <div>{friends}</div>
        </div>
    );
}
