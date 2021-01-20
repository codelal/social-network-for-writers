import { useSelector } from "react-redux";
import { socket } from "./socket";
import { useEffect, useRef } from "react";

export default function Chat() {
    const mostRecentMessages = useSelector(
        (state) => state && state.mostRecentMessages
    );

    const elemRef = useRef();
    
    useEffect(() => {
        elemRef.current.scrollTop();// I am not sure what to write here
    }, [mostRecentMessages]);

    console.log("mostRecentMessages in chat", mostRecentMessages);

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            console.log("user pressed enter");
            socket.emit("chat message", e.target.value);
            e.target.value = "";
        }
    };

    const handleSubmit = (e) => {
        socket.emit("chat message", e.target.value);
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
        <div ref = { elemRef } className="chat-container">
            <h1>Chat</h1>
            <div className="chat-messages">
                <>{recentMessages}</>
            </div>
            <textarea onKeyDown={handleKeyDown} />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}



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
