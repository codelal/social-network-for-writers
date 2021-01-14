import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "./axios";
import { useDispatch, useSelector } from "react-redux";
import { receiveFriends } from "./actions";

export default function Friends() {
    const dispatch = useDispatch();
  //  const wanneBeFriends = useSelector( state => friendsList);
    //const friends = useSelector(
    // (state) => state.friends && state.friends.filter((friend) => friend.unfriend);

    //console.log("friendsList data in Friends", wanneBeFriends);

    useEffect(() => {
        dispatch(receiveFriends());
        console.log("useEffect runs");
    }, []);

    return (
        <div>
            <h1>Friend Component</h1>
        </div>
    );
}
