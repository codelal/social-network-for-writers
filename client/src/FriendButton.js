import { useState, useEffect } from "react";
import axios from "./axios";

export default function FriendButton({ otherUserId }) {
    // console.log("otherUserId", otherUserId);
    const [button, setButton] = useState();
    const [error, setError] = useState(false);

    useEffect(() => {
        axios.get(`/api/friendship-status/${otherUserId}`).then(({ data }) => {
            console.log(
                " data from /friendship-status/${otherUserId} json",
                data.text
            );
            setButton(data.text);
        });
    }, [otherUserId]);

    function handleRequests() {
        //console.log("button clicked", button);
        let data = {
            button: button,
            otherUserId: otherUserId,
        };

        axios
            .post("/api/friendship-action", data)
            .then(({ data }) => {
                // console.log("/api/friendship-action", data);
                if (data.success) {
                    setButton(data.text);
                } else {
                    setError(true);
                }
            })
            .catch((err) => {
                console.log("/api/friendship-action", err);
                setError(true);
            });
    }

    return (
        <div className="friend-button">
            {error && <p>Something went wrong, try again!</p>}
            <button onClick={handleRequests}>{button}</button>
        </div>
    );
}
