import { useState, useEffect } from "react";
import axios from "./axios";

const BUTTON_TEXT = {
    MAKE_REQUEST: "Make Friend Request",
    CANCEL_REQUEST: "Cancel Request",
    ACCEPT_REQUEST: "Accept Request",
    UNFRIEND: "Unfriend",
};

export default function FriendButton({ otherUserId }) {
    // console.log("otherUserId", otherUserId);
    const [button, setButton] = useState();
    const [error, setError] = useState(false);

    useEffect(() => {
        axios.get(`/api/friendship-status/${otherUserId}`).then(({ data }) => {
            console.log(
                " data from /friendship-status/${otherUserId} json",
                data,
            );
            setButton(data);
            // if (data.MAKE_REQUEST) {
            //     setButton(data.MAKE_REQUEST);
            // }
            // if (data.CANCEL_REQUEST) {
            //     setButton(data.CANCEL_REQUEST);
            // }
            // if (data.ACCEPT_REQUEST) {
            //     setButton(data.ACCEPT_REQUEST);
            // }
            // if (data.UNFRIEND) {
            //     setButton(data.UNFRIEND);
            // }
        });
    }, [otherUserId]);

    function handleRequests() {
        console.log("button clicked", button);
        let data = {
            button: button,
            otherUserId: otherUserId,
        };

        axios
            .post("/api/friendship-action", data)
            .then(({ data }) => {
                console.log("/api/friendship-action", data);
            })
            .catch((err) => {
                console.log("/api/friendship-action", err);
                // setError(true);
            });
    }

    return (
        <div className="friend-button">
            {error && <p>Something went wrong, try again!</p>}
            <button onClick={handleRequests}>{button}</button>
        </div>
    );
}

function friendshipStatusToButtonText(userAccepted, otherUserAccepted) {
    let buttonText;

    if (userAccepted && otherUserAccepted) {
        buttonText = BUTTON_TEXT.UNFRIEND;
    }

    if (userAccepted && !otherUserAccepted) {
        buttonText = BUTTON_TEXT.CANCEL_REQUEST;
    }
    if (!userAccepted && otherUserAccepted) {
        buttonText = BUTTON_TEXT.ACCEPT_REQUEST;
    }
    if (!userAccepted && !otherUserAccepted) {
        buttonText = BUTTON_TEXT.MAKE_REQUEST;
    }

    return buttonText;
}
