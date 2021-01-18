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
                    <div className="messages" key={message.id}>
                        {!message.url && <img src="../defaultpic.png" />}
                        <img src={message.url} />
                        <p>{message.message}</p>
                        <p>
                            {message.first} {message.last} {message.timeStamp}
                        </p>
                    </div>
                ))}
        </>
    );

    const chatMessage = (
        <>
            {messageAndUserData && (
                <div className="messages">
                    {!messageAndUserData.url && <img src="../defaultpic.png" />}
                    <img src={messageAndUserData.url} />
                    <p>{messageAndUserData.message}</p>
                    <p>
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
                <>{recentMessages}</>
                <>{chatMessage}</>
            </div>
            <textarea onKeyDown={handleKeyDown} />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}
