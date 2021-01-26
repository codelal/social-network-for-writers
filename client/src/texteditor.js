import { useState, useEffect, useMemo, useCallback } from "react";
import axios from "./axios";
import { formateDateTime } from "./formateDate";
import { socket } from "./socket";

export default function Texteditor() {
    const defaultText = "write here";
    const [error, setError] = useState(false);
    const [textareaValue, setTextareaValue] = useState(defaultText);
    const [textSaved, setTextSaved] = useState(false);
    const [updateList, setUpdateList] = useState(false);
    const [latestTextes, setLatestTextes] = useState([]);

    let newTextValue;

    useEffect(() => {
        console.log("useEffect runs");
        // let abort;

        socket.on("text writing", ({ text }) => {
            console.log("text writing", text.text);
            setTextareaValue(text.text);
        });

        axios
            .get("/api/latest-textes")
            .then(({ data }) => {
                if (data.success) {
                    setLatestTextes(data.latestTextes);
                    console.log(data, data.latestTextes);
                    setUpdateList(true);
                } else {
                    setError(true);
                }
            })
            .catch((err) => {
                console.log("error in api/latest-setLatestWritebaords", err);
                setError(true);
            });

        // return () => {
        //     abort = true;
        // };
    }, [updateList, newTextValue]);

    function handleChange(event) {
        setTextareaValue(event.target.value);

        const text = {
            text: event.target.value,
        };
        socket.emit("text writing", text);
    }

    function submitText() {
        const text = { text: textareaValue };
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
        };
        axios
            .post("/api/delete-text", textId)
            .then(({ data }) => {
                if (data.success) {
                    setUpdateList(false);
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
            {error && <p className="error">Something went wrong, try again!</p>}
            <p>Latest Textes:</p>
            {latestTextes && (
                <div className="latest-textes">
                    {latestTextes.map((text) => (
                        <div key={text.id}>
                            <p>Text</p>
                            {formateDateTime(text.timestamp)}
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

            <div className="toolbar">
                <button onMouseDown={() => {}}>Bold</button>
                <button onMouseDown={() => {}}>Code Block</button>
                <button onMouseDown={() => {}}>Italic</button>
                <button onClick={submitText}>save Text</button>
                {textSaved && <p className="text-saved"> You text is saved!</p>}
            </div>
        
            <textarea
                onChange={(e) => handleChange(e)}
                value={textareaValue}
            ></textarea>
        </div>
    );
}
