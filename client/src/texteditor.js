import { useState, useEffect, useMemo, useCallback } from "react";
import axios from "./axios";
import { formateDateTime } from "./formateDate";
import { socket } from "./socket";
import OnlineUsers from "./onlineUsers";
import SlateTexteditor from "./slate-texteditor/slate-texteditor";

export default function Texteditor() {
    const defaultText = "write you text here...";
    const [error, setError] = useState(false);
    const [textareaValue, setTextareaValue] = useState(defaultText);
    const [textSaved, setTextSaved] = useState(false);
    const [updateList, setUpdateList] = useState(false);
    const [latestTextes, setLatestTextes] = useState([]);
    const [switchToPrivateMode, setSwitchToPrivateMode] = useState(false);

    let newTextValue;
    let modus = false;

    useEffect(() => {
        console.log("useEffect runs");
        let abort;

        if (!abort) {
            socket.on("text writing", ({ text }) => {
                console.log("text writing");
                setTextareaValue(text.text);
            });

            axios
                .get("/api/latest-textes/" + modus)
                .then(({ data }) => {
                    console.log("latest coll textes", data);
                    if (data.success) {
                        setLatestTextes(data.latestTextes);

                        setUpdateList(true);
                    } else {
                        setError(true);
                    }
                })
                .catch((err) => {
                    console.log(
                        "error in api/latest-setLatestWritebaords",
                        err
                    );
                    setError(true);
                });
        }
        return () => {
            abort = true;
        };
    }, [updateList, newTextValue]);

    // socket.on("text-list-update", () => {
    //     console.log("text-list-update comes in");
    //     setUpdateList(true);
    // });

    function handleChange(event) {
        setTextareaValue(event.target.value);

        const text = {
            text: event.target.value,
        };
        socket.emit("text writing", text);
    }

    function handleClick() {
        setTextSaved(false);
    }

    function submitText() {
        const text = { text: textareaValue, pmodus: false };
        console.log(text);
        axios
            .post("/api/save-text", text)
            .then(({ data }) => {
                console.log("data /api/save-text");
                if (data.success) {
                    setTextSaved(true);
                    setUpdateList(false);
                    setTextareaValue(defaultText);
                } else {
                    setError(true);
                }
            })
            .catch((err) => {
                console.log("error in /api/delete-text", err);
                this.setState({
                    error: true,
                });
            });
    }

    function deleteText(idText) {
        console.log("delete text runs");
        const textId = {
            textId: idText,
            modus: false,
        };
        axios
            .post("/api/delete-text", textId)
            .then(({ data }) => {
                if (data.success) {
                    setUpdateList(false);
                    // socket.emit("text-list-update"());
                } else {
                    setError(true);
                }
            })
            .catch((err) => {
                console.log("error in /api/delete-text", err);
                this.setState({
                    error: true,
                });
            });
    }

    return (
        <div className="texteditor-container">
            {!switchToPrivateMode && (
                <>
                    {error && (
                        <p className="error-colltext">
                            Something went wrong, try again!
                        </p>
                    )}
                    {latestTextes && (
                        <div className="latest-textes">
                            {" "}
                            <h2>Our Textes:</h2>
                            {latestTextes.map((text) => (
                                <div key={text.id}>
                                
                                    {formateDateTime(text.timestamp)}
                                    <button>Edit</button>
                                    <button
                                        onClick={() => {
                                            deleteText(text.id);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                    <h1>Collaborative Texteditor</h1>
                    <div id="online-texteditor">
                        <OnlineUsers />
                    </div>
                    <textarea
                        value={textareaValue}
                        onChange={(e) => handleChange(e)}
                        onClick={handleClick}
                    ></textarea>

                    <button onClick={submitText}>save Text</button>
                    {textSaved && (
                        <p className="text-saved"> You text is saved!</p>
                    )}
                    <button
                        id="switch-texteditor"
                        onClick={() => setSwitchToPrivateMode(true)}
                    >
                        Switch to private Mode
                    </button>
                </>
            )}

            {switchToPrivateMode && <SlateTexteditor />}
        </div>
    );
}
