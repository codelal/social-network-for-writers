import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { receiveFriendsList, handleRequest } from "./actions";
import { Link } from "react-router-dom";

export const BUTTON_TEXT = {
    MAKE_REQUEST: "Make Friend Request",
    CANCEL_REQUEST: "Cancel Request",
    ACCEPT_REQUEST: "Accept Request",
    UNFRIEND: "Unfriend",
};

export default function Friends() {
    //const [error, setError] = useState(false);

    const dispatch = useDispatch();
    const wannabesAcceptList = useSelector(
        (state) =>
            state.friendsList &&
            state.friendsList.filter(
                (friend) =>
                    friend.accepted == false &&
                    friend.recipient_id == state.userId
            )
    );

    const wannabesRequestList = useSelector(
        (state) =>
            state.friendsList &&
            state.friendsList.filter(
                (friend) =>
                    friend.accepted == false && friend.sender_id == state.userId
            )
    );

    const friendsList = useSelector(
        (state) =>
            state.friendsList &&
            state.friendsList.filter((friend) => friend.accepted)
    );

    useEffect(() => {
        dispatch(receiveFriendsList());
    }, []);

    const wannabesAccept = (
        <div className="wannabes">
            {wannabesAcceptList &&
                wannabesAcceptList.map((wannabe) => (
                    <div className="wannabe" key={wannabe.id}>
                        <p>
                            {wannabe.first} {wannabe.last}
                        </p>
                        {!wannabe.url && <img src="../defaultpic.png" />}
                        <img src={wannabe.url} />
                        <button
                            onClick={() =>
                                dispatch(
                                    handleRequest(
                                        wannabe.id,
                                        BUTTON_TEXT.ACCEPT_REQUEST
                                    )
                                )
                            }
                        >
                            {BUTTON_TEXT.ACCEPT_REQUEST}
                        </button>
                    </div>
                ))}
        </div>
    );

    const wannabesRequest = (
        <div className="wannabes">
            {wannabesRequestList &&
                wannabesRequestList.map((wannabe) => (
                    <div className="wannabe" key={wannabe.id}>
                        <p>
                            {wannabe.first} {wannabe.last}
                        </p>
                        {!wannabe.url && <img src="../defaultpic.png" />}
                        <img src={wannabe.url} />
                        <button
                            onClick={() =>
                                dispatch(
                                    handleRequest(
                                        wannabe.id,
                                        BUTTON_TEXT.CANCEL_REQUEST
                                    )
                                )
                            }
                        >
                            {BUTTON_TEXT.CANCEL_REQUEST}
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
                        {!friend.url && <img src="../defaultpic.png" />}
                        <img src={friend.url} />
                        <button
                            onClick={() =>
                                dispatch(
                                    handleRequest(
                                        friend.id,
                                        BUTTON_TEXT.UNFRIEND
                                    )
                                )
                            }
                        >
                            {BUTTON_TEXT.UNFRIEND}
                        </button>
                    </div>
                ))}
        </div>
    );

    return (
        <div>
            <h2>Friend Component</h2>
            {!wannabesAccept.length &&
                !wannabesRequest.length &&
                !friends.length && (
                    <p>
                        No friends yet{" "}
                        <Link to="/find-people">click here </Link>
                        to find people.
                    </p>
                )}
            <div>{wannabesAccept}</div>
            <div>{wannabesRequest}</div>
            <div>{friends}</div>
        </div>
    );
}
