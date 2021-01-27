import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

export default function OnlineUsers() {
    const dispatch = useDispatch();
    const onlineUsersList = useSelector(
        (state) => state && state.onlineUsersList
    );

    console.log("onlineUsersList", onlineUsersList);

    const onlineUsers = (
        <div id="online-users">
            {onlineUsersList &&
                onlineUsersList.map((user) => (
                    <div id="online-user" key={user.id}>
                        <Link to={`/find-people/${user.id}`}>
                            {!user.url && <img src="../defaultpic.png" />}{" "}
                            {user.url && <img src={user.url} />}
                        </Link>
                        <p>
                            {user.first} {user.last}
                        </p>
                    </div>
                ))}
        </div>
    );

    return (
        <div className="online-users-container">
            <h1>Online</h1>
            <div>{onlineUsers}</div>
        </div>
    );
}
