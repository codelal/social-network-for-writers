import { useSelector } from "react-redux";
import { socket } from "./socket";

export default function Chat() {
    const messageAndUserData = useSelector(
        (state) => state && state.messageAndUserData
    );

    const mostRecentMessages = useSelector(
        (state) => state && state.mostRecentMessages
    );

    console.log("mostRecentMessages in chat", mostRecentMessages);

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            console.log("user pressed enter");
            socket.emit("chat message", e.target.value);
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
                            {message.first} {message.last} {message.timestamp}
                        </p>
                    </div>
                ))}
        </>
    );

    const chatMessage = (
        <>
            {messageAndUserData && (
                <div id="messages">
                    {!messageAndUserData.url && <img src="../defaultpic.png" />}
                    {messageAndUserData.url && (
                        <img src={messageAndUserData.url} />
                    )}
                    <p> {messageAndUserData.message}</p>
                    <p id="date">
                        {" "}
                        {messageAndUserData.first} {messageAndUserData.last}{" "}
                        {messageAndUserData.timeStamp}
                    </p>
                </div>
            )}
        </>
    );

    return (
        <div className="chat-container">
            <h1>Chat</h1>
            <div className="chat-messages">
                <p>{recentMessages}</p>
                <p>{chatMessage}</p>
            </div>
            <textarea onKeyDown={handleKeyDown} />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}
