// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { receiveOnlineUsersList } from "./actions";
// import { Link } from "react-router-dom";

// export default function OnlineUsers() {
//     const dispatch = useDispatch();
//     const onlineUsersList = useSelector(
//         (state) =>
//             state.userList &&
//             state.userList.filter((friend) => friend.online == true)
//     );

//     useEffect(() => {
//         dispatch(receiveOnlineUsersList());
//     }, []);

//     const onlineUsers = (
//         <div id="online-users">
//             {onlineUsersList &&
//                 onlineUsersList.map((user) => (
//                     <div className="user" key={user.id}>
//                         <Link to={`/find-people/${user.id}`}>
//                             {!user.url && <img src="../defaultpic.png" />}{" "}
//                             {user.url && <img src={user.url} />}
//                         </Link>
//                         <p>
//                             {user.first} {user.last}
//                         </p>
//                     </div>
//                 ))}
//         </div>
//     );

//     return (
//         <div className="online-users-container">
//             <h1>Online</h1>
//             <div id="online-users">{onlineUsers}</div>
//         </div>
//     );
// }
