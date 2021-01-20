import { useSelector } from "react-redux";
import { socket } from "./socket";
import { useEffect, useRef } from "react";
const formateDateTime = (date) => {
    return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    }).format(new Date(date));
};

export default function Chat() {
    const mostRecentMessages = useSelector(
        (state) => state && state.mostRecentMessages
    );

    const elemRef = useRef();

    useEffect(() => {
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, [mostRecentMessages]);

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            console.log("user pressed enter");
            socket.emit("chat message", e.target.value);
            e.target.value = "";
        }
    };

    const recentMessages = (
        <>
            {mostRecentMessages &&
                mostRecentMessages.map((message) => (
                    <div id="messages" key={message.id}>
                        {!message.url && <img src="../defaultpic.png" />}
                        {message.url && <img src={message.url} />}
                        <p>{message.message}</p>
                        <p id="date">
                            {" "}
                            {message.first} {message.last}{" "}
                            {formateDateTime(message.timestamp)}
                        </p>
                    </div>
                ))}
        </>
    );

    return (
        <div className="chat-component">
            <h1>Chat</h1>
            <div ref={elemRef} className="chat-messages">
                <>{recentMessages}</>
            </div>
            <textarea onKeyDown={handleKeyDown} />
        </div>
    );
}
