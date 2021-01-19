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
        <div id="wannabes-accept">
            {wannabesAcceptList &&
                wannabesAcceptList.map((wannabe) => (
                    <div className="friend" key={wannabe.id}>
                        <Link to={`/find-people/${wannabe.id}`}>
                            {!wannabe.url && <img src="../defaultpic.png" />}{" "}
                            {wannabe.url && <img src={wannabe.url} />}
                        </Link>
                        <p>
                            {wannabe.first} {wannabe.last}
                        </p>
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
        <div id="wannabes-cancel">
            {wannabesRequestList &&
                wannabesRequestList.map((wannabe) => (
                    <div className="friend" key={wannabe.id}>
                        <Link to={`/find-people/${wannabe.id}`}>
                            {!wannabe.url && <img src="../defaultpic.png" />}{" "}
                            {wannabe.url && <img src={wannabe.url} />}
                        </Link>
                        <p>
                            {wannabe.first} {wannabe.last}
                        </p>
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
        <div id="friends">
            {friendsList &&
                friendsList.map((friend) => (
                    <div className="friend" key={friend.id}>
                        <Link to={`/find-people/${friend.id}`}>
                            {!friend.url && <img src="../defaultpic.png" />}
                            {friend.url && <img src={friend.url} />}
                        </Link>
                        <p>
                            {friend.first} {friend.last}
                        </p>
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
        <div className="friends-container">
            <h1>Friends</h1>
            <div id="wannabes-accept">{wannabesAccept}</div>
            <div id="friends">{friends}</div>
            <div id="wannabes-cancel">{wannabesRequest}</div>
        </div>
    );
}
