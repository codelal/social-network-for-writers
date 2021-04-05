import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

export default function OnlineUsers() {
    const dispatch = useDispatch();
    const onlineUsersList = useSelector(
        (state) => state && state.onlineUsersList
    );

    //console.log("onlineUsersList", onlineUsersList);

    const onlineUsers = (
        <div className="online-users">
            {onlineUsersList &&
                onlineUsersList.map((user) => (
                    <div className="online-user" key={user.id}>
                        <Link to={`/find-people/${user.id}`}>
                            {!user.url && <img src="../defaultpic.png" />}{" "}
                            {user.url && <img src={user.url} />}
                        </Link>
                    </div>
                ))}
        </div>
    );

    return (
        <div className="online-users-container">
        
            <div>{onlineUsers}</div>
        </div>
    );
}
